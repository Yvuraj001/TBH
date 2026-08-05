"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const CONTACT_EMAIL = "work.with.mohit69@gmail.com";
const WHATSAPP_NUMBER = "918930398031";

export default function PurchasePopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsOpen(true), 10000);
    const onKeyDown = (event) => event.key === "Escape" && setIsOpen(false);

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[10001] grid place-items-center bg-black/45 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="purchase-popup-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) setIsOpen(false);
      }}
    >
      <section className="relative w-full max-w-md overflow-hidden rounded-[2rem] border-[3px] border-black bg-[#fff4e5] p-7 shadow-[8px_8px_0_#000] sm:p-9">
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="absolute right-4 top-3 grid h-9 w-9 place-items-center rounded-full border-2 border-black bg-white text-xl font-bold transition hover:bg-red-500 hover:text-white"
          aria-label="Close purchase information"
        >
          ×
        </button>
        <p className="font-memories text-lg tracking-[0.16em] text-red-500 uppercase">Own this website</p>
        <h2 id="purchase-popup-title" className="mt-2 font-Modern-Negra text-4xl leading-none sm:text-5xl">Want to buy TBH?</h2>
        <p className="mt-4 text-base leading-relaxed text-black/75">Get in touch to discuss buying this site. We would love to hear from you.</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <a href={`mailto:${CONTACT_EMAIL}`} className="rounded-2xl border-2 border-black bg-yellow-400 px-4 py-3 text-center text-sm font-bold shadow-[3px_3px_0_#000] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none">Email us</a>
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="rounded-2xl border-2 border-black bg-[#25D366] px-4 py-3 text-center text-sm font-bold shadow-[3px_3px_0_#000] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none">WhatsApp us</a>
        </div>
        <Link href="/contact" onClick={() => setIsOpen(false)} className="mt-5 block text-center font-bold underline decoration-2 underline-offset-4 hover:text-red-500">View contact details</Link>
      </section>
    </div>
  );
}
