import Link from "next/link";

const email = "work.with.mohit69@gmail.com";
const whatsappNumber = "918930398031";

export const metadata = {
  title: "Contact | TBH",
  description: "Contact TBH to discuss buying this website.",
};

export default function ContactPage() {
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-[#ffc286] px-4 py-12 sm:px-6 sm:py-18">
      <section className="mx-auto max-w-4xl overflow-hidden rounded-[2.5rem] border-[3px] border-black bg-[#fff4e5] shadow-[10px_10px_0_#000]">
        <div className="bg-red-500 px-7 py-8 text-white sm:px-12 sm:py-11">
          <p className="font-memories text-xl tracking-[0.17em] uppercase">The Burger House</p>
          <h1 className="mt-2 font-Modern-Negra text-5xl leading-none sm:text-7xl">Let&apos;s make a deal.</h1>
          <p className="mt-4 max-w-xl text-lg text-white/90">Interested in buying this website? Reach out and let&apos;s talk.</p>
        </div>
        <div className="grid gap-5 p-7 sm:grid-cols-2 sm:p-12">
          <a href={`mailto:${email}`} className="group rounded-3xl border-[3px] border-black bg-yellow-400 p-6 shadow-[5px_5px_0_#000] transition hover:translate-x-1 hover:translate-y-1 hover:shadow-none">
            <p className="font-memories text-lg uppercase">Email</p>
            <p className="mt-2 break-all text-lg font-bold underline decoration-2 underline-offset-4">{email}</p>
            <p className="mt-5 font-bold group-hover:text-red-500">Send an email →</p>
          </a>
          <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer" className="group rounded-3xl border-[3px] border-black bg-[#25D366] p-6 shadow-[5px_5px_0_#000] transition hover:translate-x-1 hover:translate-y-1 hover:shadow-none">
            <p className="font-memories text-lg uppercase">WhatsApp</p>
            <p className="mt-2 text-2xl font-bold">8930398031</p>
            <p className="mt-5 font-bold group-hover:text-white">Message on WhatsApp →</p>
          </a>
        </div>
        <div className="border-t-2 border-black/15 px-7 py-6 text-center sm:px-12"><Link href="/" className="font-bold underline decoration-2 underline-offset-4 hover:text-red-500">← Back to TBH</Link></div>
      </section>
    </main>
  );
}
