"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { Send, Loader2, Check, AlertTriangle } from "lucide-react";
import { sendContactEmail } from "@/app/actions/contact";
import { INITIAL_CONTACT_STATE } from "@/lib/contact";

const inputBase =
  "w-full rounded-2xl border border-carbon bg-paper px-4 py-3 text-[15px] font-medium text-carbon placeholder:text-carbon/40 focus:outline-none focus:ring-2 focus:ring-violet";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-carbon bg-carbon px-6 py-3.5 text-[14px] font-bold tracking-[0.03em] text-paper transition-transform duration-150 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
    >
      {pending ? (
        <>
          <Loader2 size={16} strokeWidth={2.5} className="animate-spin" />
          Sending…
        </>
      ) : (
        <>
          Send Message
          <Send size={16} strokeWidth={2.5} />
        </>
      )}
    </button>
  );
}

export function ContactForm() {
  const [state, formAction] = useActionState(sendContactEmail, INITIAL_CONTACT_STATE);
  const formRef = useRef<HTMLFormElement>(null);

  // Clear the fields after a successful send.
  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
  }, [state]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="w-full rounded-[20px] border border-carbon bg-paper p-6 text-left md:p-8"
      noValidate
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="label-caps">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Ada Lovelace"
            className={inputBase}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="label-caps">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            className={inputBase}
          />
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <label htmlFor="message" className="label-caps">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          maxLength={5000}
          placeholder="Tell me about what you're building…"
          className={`${inputBase} resize-y`}
        />
      </div>

      {/* Honeypot — hidden from humans, catches bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-5 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SubmitButton />

        {state.status !== "idle" && (
          <p
            role="status"
            aria-live="polite"
            className={`flex items-center gap-2 text-[14px] font-bold ${
              state.status === "success" ? "text-carbon" : "text-ember"
            }`}
          >
            {state.status === "success" ? (
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-carbon bg-sunburst">
                <Check size={13} strokeWidth={3} className="text-carbon" />
              </span>
            ) : (
              <AlertTriangle size={16} strokeWidth={2.5} className="shrink-0" />
            )}
            {state.message}
          </p>
        )}
      </div>
    </form>
  );
}
