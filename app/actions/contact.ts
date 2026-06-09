"use server";

import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { Resend } from "resend";
import type { ContactState } from "@/lib/contact";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME = 100;
const MAX_EMAIL = 200;
const MAX_MESSAGE = 5000;

// Best-effort in-memory rate limit (per warm instance). For multi-instance
// production scale, back this with Upstash/Redis — but combined with the
// honeypot + validation it stops casual abuse and protects the Resend quota.
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 3;
const rateBuckets = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (rateBuckets.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_MAX) {
    rateBuckets.set(ip, recent);
    return true;
  }
  recent.push(now);
  rateBuckets.set(ip, recent);
  return false;
}

/**
 * Where messages land. Reply-to is set to the visitor so replies go straight back.
 * Currently the Resend account's verified owner address (works in test mode).
 * After verifying a domain at resend.com/domains and setting CONTACT_FROM_EMAIL,
 * switch this to "andrewsundaradhas56@gmail.com".
 */
const TO_ADDRESS = "andrew.sundaradhas2023@vitstudent.ac.in";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Server Action behind the portfolio contact form.
 * Follows the Resend SDK contract: env-var API key, awaited send, and the
 * { data, error } response pattern (no try/catch for API errors — only a
 * thin guard around genuine network failures).
 */
export async function sendContactEmail(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot: bots fill hidden fields. Pretend success, send nothing.
  if ((formData.get("company") as string)?.trim()) {
    return { status: "success", message: "Thanks! Your message is on its way." };
  }

  // Per-IP rate limit.
  const hdrs = await headers();
  const ip =
    hdrs.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    hdrs.get("x-real-ip")?.trim() ||
    "unknown";
  if (isRateLimited(ip)) {
    return {
      status: "error",
      message: "You've sent a few messages already — please wait a minute and try again.",
    };
  }

  const name = ((formData.get("name") as string) ?? "").trim();
  const email = ((formData.get("email") as string) ?? "").trim();
  const message = ((formData.get("message") as string) ?? "").trim();

  if (!name || !email || !message) {
    return { status: "error", message: "Please fill in your name, email, and message." };
  }
  if (name.length > MAX_NAME || email.length > MAX_EMAIL) {
    return { status: "error", message: "Your name or email is unexpectedly long — please shorten it." };
  }
  if (!EMAIL_RE.test(email)) {
    return { status: "error", message: "That email address doesn't look right." };
  }
  if (message.length > MAX_MESSAGE) {
    return { status: "error", message: `Message is too long (${MAX_MESSAGE} characters max).` };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return {
      status: "error",
      message: "The contact form isn't configured yet — please email me directly.",
    };
  }

  // Verified-domain sender for production; falls back to Resend's test address
  // for local dev only. Set CONTACT_FROM_EMAIL once your domain is verified.
  const from = process.env.CONTACT_FROM_EMAIL ?? "Portfolio Contact <onboarding@resend.dev>";

  // Stable key so an accidental double-submit within 24h isn't delivered twice.
  const idempotencyKey = `contact/${createHash("sha256")
    .update(`${email}:${message}`)
    .digest("hex")
    .slice(0, 40)}`;

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

  try {
    const { data, error } = await resendSend(apiKey, {
      from,
      to: [TO_ADDRESS],
      replyTo: email,
      subject: `New portfolio message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `
        <div style="font-family: ui-sans-serif, system-ui, sans-serif; line-height: 1.6; color: #0a0a0a;">
          <h2 style="margin: 0 0 12px;">New message from your portfolio</h2>
          <p style="margin: 0 0 4px;"><strong>Name:</strong> ${safeName}</p>
          <p style="margin: 0 0 16px;"><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
          <div style="padding: 16px; border: 1px solid #1f1f1f; border-radius: 12px; background: #fafafa;">
            ${safeMessage}
          </div>
        </div>
      `,
    }, idempotencyKey);

    if (error) {
      console.error("Resend send error:", error);
      return {
        status: "error",
        message: "Something went wrong sending your message. Try again, or email me directly.",
      };
    }

    console.log("Contact email sent:", data?.id);
    return { status: "success", message: "Thanks! Your message just landed in my inbox — I'll reply soon." };
  } catch (networkError) {
    // Only network-level failures throw; API errors come back as { error }.
    console.error("Resend network error:", networkError);
    return {
      status: "error",
      message: "Couldn't reach the mail server. Please try again in a moment, or email me directly.",
    };
  }
}

/** Thin wrapper so the SDK client is constructed per request (serverless-safe). */
function resendSend(
  apiKey: string,
  payload: Parameters<Resend["emails"]["send"]>[0],
  idempotencyKey: string,
) {
  const resend = new Resend(apiKey);
  return resend.emails.send(payload, { idempotencyKey });
}
