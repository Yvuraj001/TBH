"use client";

import { useActionState } from "react";

const initialState = { message: "", success: false };

export default function DeliveryVerificationForm({ completeDelivery, customer }) {
  const [state, formAction, pending] = useActionState(
    completeDelivery,
    initialState,
  );

  return (
    <form action={formAction} className="mt-4 sm:flex sm:items-end sm:gap-5">
      <input type="hidden" name="customer" value={customer} />
      <div className="min-w-0 flex-1">
        <input
          required
          name="verificationCode"
          inputMode="numeric"
          pattern="[0-9]{6}"
          maxLength={6}
          placeholder="6-digit code"
          aria-label={`Verification code for ${customer}`}
          className="w-full rounded-xl bg-white px-4 py-3 font-mono text-lg font-black tracking-[0.3em] text-black outline-none sm:max-w-xs"
        />
        {state.message && (
          <p
            aria-live="polite"
            className={`mt-2 text-sm font-semibold ${state.success ? "text-green-300" : "text-red-300"}`}
          >
            {state.message}
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={pending}
        className="mt-4 block w-full shrink-0 rounded-full bg-yellow-400 px-5 py-3 text-center font-black text-black transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-70 sm:mt-0 sm:w-auto"
      >
        {pending ? "Verifying…" : "Complete delivery"}
      </button>
    </form>
  );
}
