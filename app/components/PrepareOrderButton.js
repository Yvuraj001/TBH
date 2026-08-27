"use client";

import { useFormStatus } from "react-dom";

export default function PrepareOrderButton({ ready }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`rounded-full px-4 py-2.5 text-sm font-black text-white transition disabled:cursor-not-allowed disabled:opacity-70 ${ready ? "bg-[#267348]" : "bg-red-500 hover:bg-red-600"}`}
    >
      {pending ? "Updating…" : ready ? "Mark as preparing" : "Mark as ready"}
    </button>
  );
}
