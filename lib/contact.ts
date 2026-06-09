/** Shared types/state for the contact form (kept out of the "use server" file). */

export interface ContactState {
  status: "idle" | "success" | "error";
  message: string;
}

export const INITIAL_CONTACT_STATE: ContactState = { status: "idle", message: "" };
