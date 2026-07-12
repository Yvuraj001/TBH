import Link from "next/link";

const BagIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 8h12l-1 12H7L6 8Z" />
    <path d="M9 8V6a3 3 0 0 1 6 0v2" />
  </svg>
);

const PinIcon = () => (
  <svg
    width="19"
    height="19"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

const ArrowIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </svg>
);

export default function OrdersPage() {
  return (
    <main className="min-h-screen bg-[#ffc286] px-4 pb-16 pt-8 sm:px-6 sm:pt-12">
      <section className="mx-auto max-w-6xl">
        <header className="relative overflow-hidden rounded-[2.5rem] bg-[#F7D9A8] px-6 py-12 text-center sm:px-10">
          <img
            src="/images/img-webp/tomato.webp"
            alt=""
            className="pointer-events-none absolute -left-10 top-3 w-28 -rotate-12 sm:-left-4 sm:w-40"
          />
          <img
            src="/images/img-webp/lettuce.webp"
            alt=""
            className="pointer-events-none absolute -right-12 top-0 w-32 rotate-12 sm:-right-3 sm:w-44"
          />
          <p className="relative z-10 font-memories text-sm tracking-[0.25em] text-red-500 uppercase">
            Your burger story
          </p>
          <h1 className="relative z-10 mt-1 font-modak text-5xl leading-none text-red-500 [-webkit-text-stroke:5px_white] [paint-order:stroke] sm:text-7xl">
            My Orders
          </h1>
          <div className="relative z-10 mt-6 flex justify-center gap-2">
            {Array.from({ length: 9 }).map((_, index) => (
              <span
                key={index}
                className={`h-3 w-3 rounded-sm ${index % 2 === 0 ? "bg-red-500" : "bg-yellow-400"}`}
              />
            ))}
          </div>
        </header>

        <section className="mt-10">
          <div className="mb-4 flex items-center gap-3 px-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500 text-white shadow-md">
              <BagIcon />
            </span>
            <div>
              <p className="font-memories text-sm tracking-widest text-red-500 uppercase">
                Happening now
              </p>
              <h2 className="text-2xl font-black">Current order</h2>
            </div>
          </div>

          <article className="overflow-hidden rounded-[2rem] bg-white shadow-xl">
            <div className="flex h-3">
              {Array.from({ length: 18 }).map((_, index) => (
                <span
                  key={index}
                  className={`flex-1 ${index % 2 === 0 ? "bg-red-500" : "bg-yellow-400"}`}
                />
              ))}
            </div>
            <div className="grid gap-7 p-5 sm:p-7 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-memories text-sm tracking-widest text-gray-500 uppercase">
                      Order #TBH-1024
                    </p>
                    <h3 className="mt-1 text-2xl font-black sm:text-3xl">Making your magic</h3>
                  </div>
                  <span className="rounded-full bg-[#dff0d8] px-4 py-2 text-sm font-bold text-[#267348]">
                    Preparing
                  </span>
                </div>

                <div className="mt-6 rounded-3xl bg-[#f5e3cd] p-4 sm:p-5">
                  <div className="flex items-center gap-4">
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white p-2">
                      <img src="/images/demo.png" alt="Classic Smash Burger" className="h-full w-full object-contain" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <h4 className="font-memories text-xl leading-none text-red-500">Classic Smash Burger</h4>
                        <span className="font-black">₹299</span>
                      </div>
                      <p className="mt-2 text-sm font-medium text-gray-600">Double patty · Brioche bun · Extra cheese</p>
                      <p className="mt-1 text-sm font-bold">Qty 1</p>
                    </div>
                  </div>
                  <div className="mt-4 border-t-2 border-dashed border-black/10 pt-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white p-2">
                        <img src="/images/fries.webp" alt="Loaded Cheese Fries" className="h-full w-full object-contain" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <h4 className="font-memories text-xl leading-none text-red-500">Loaded Cheese Fries</h4>
                          <span className="font-black">₹149</span>
                        </div>
                        <p className="mt-2 text-sm font-medium text-gray-600">Crispy fries · Cheese sauce · House seasoning</p>
                        <p className="mt-1 text-sm font-bold">Qty 1</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-4 px-1">
                  <div className="flex items-center gap-2 text-gray-600">
                    <PinIcon />
                    <span className="text-sm font-semibold">Table 08 · Dine in</span>
                  </div>
                  <p className="text-sm font-bold uppercase tracking-wider text-gray-500">Total <span className="ml-2 text-2xl text-black">₹448</span></p>
                </div>
              </div>

              <aside className="rounded-3xl bg-black p-6 text-white sm:p-7">
                <p className="font-memories tracking-[0.22em] text-yellow-400 uppercase">Order progress</p>
                <h3 className="mt-2 text-2xl font-black">Almost burger time!</h3>
                <div className="mt-8 space-y-0">
                  <div className="relative flex gap-4 pb-8 before:absolute before:top-7 before:left-[13px] before:h-12 before:w-0.5 before:bg-yellow-400">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-yellow-400 text-sm font-black text-black">✓</span>
                    <div><p className="font-bold">Order received</p><p className="mt-1 text-sm text-white/60">12:32 PM</p></div>
                  </div>
                  <div className="relative flex gap-4 pb-8 before:absolute before:top-7 before:left-[13px] before:h-12 before:w-0.5 before:bg-white/20">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-500 text-sm font-black">2</span>
                    <div><p className="font-bold">In the kitchen</p><p className="mt-1 text-sm text-yellow-400">Your order is being prepared</p></div>
                  </div>
                  <div className="flex gap-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-white/30 text-sm font-black text-white/50">3</span>
                    <div><p className="font-bold text-white/60">Ready to enjoy</p><p className="mt-1 text-sm text-white/40">Estimated in 8–10 min</p></div>
                  </div>
                </div>
              </aside>
            </div>
          </article>
        </section>

        <section className="mt-12">
          <div className="mb-4 flex items-end justify-between gap-4 px-2">
            <div>
              <p className="font-memories text-sm tracking-widest text-red-500 uppercase">The good old stuff</p>
              <h2 className="text-2xl font-black">Previous orders</h2>
            </div>
            <p className="hidden text-sm font-bold text-gray-600 sm:block">2 delicious orders</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <article className="rounded-[2rem] bg-white p-5 shadow-lg sm:p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-memories text-sm tracking-widest text-gray-500 uppercase">Order #TBH-1018</p>
                  <h3 className="mt-1 text-xl font-black">Delivered with love</h3>
                </div>
                <span className="rounded-full bg-[#dff0d8] px-3 py-1.5 text-xs font-bold text-[#267348]">Delivered</span>
              </div>
              <div className="mt-5 flex items-center gap-4 rounded-2xl bg-[#f5e3cd] p-3">
                <div className="h-16 w-16 shrink-0 rounded-xl bg-white p-2"><img src="/images/demo.png" alt="BBQ Bacon Stack" className="h-full w-full object-contain" /></div>
                <div className="min-w-0 flex-1"><h4 className="font-memories text-xl leading-none text-red-500">BBQ Bacon Stack</h4><p className="mt-2 text-sm text-gray-600">+ Classic Vanilla Milkshake</p></div>
                <p className="font-black">₹518</p>
              </div>
              <div className="mt-5 flex items-center justify-between"><p className="text-sm font-semibold text-gray-500">June 28, 2026 · Delivery</p><button className="flex items-center gap-1 rounded-full bg-yellow-400 px-4 py-2 text-sm font-bold transition-transform hover:scale-105">Order again <ArrowIcon /></button></div>
            </article>

            <article className="rounded-[2rem] bg-white p-5 shadow-lg sm:p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-memories text-sm tracking-widest text-gray-500 uppercase">Order #TBH-1002</p>
                  <h3 className="mt-1 text-xl font-black">Burger date night</h3>
                </div>
                <span className="rounded-full bg-[#dff0d8] px-3 py-1.5 text-xs font-bold text-[#267348]">Delivered</span>
              </div>
              <div className="mt-5 flex items-center gap-4 rounded-2xl bg-[#f5e3cd] p-3">
                <div className="h-16 w-16 shrink-0 rounded-xl bg-white p-2"><img src="/images/burger.webp" alt="Double Cheese Deluxe" className="h-full w-full object-contain" /></div>
                <div className="min-w-0 flex-1"><h4 className="font-memories text-xl leading-none text-red-500">Double Cheese Deluxe</h4><p className="mt-2 text-sm text-gray-600">+ Crispy Onion Rings</p></div>
                <p className="font-black">₹624</p>
              </div>
              <div className="mt-5 flex items-center justify-between"><p className="text-sm font-semibold text-gray-500">June 14, 2026 · Dine in</p><button className="flex items-center gap-1 rounded-full bg-yellow-400 px-4 py-2 text-sm font-bold transition-transform hover:scale-105">Order again <ArrowIcon /></button></div>
            </article>
          </div>
        </section>

        <section className="mt-10 flex flex-col items-center justify-between gap-5 rounded-[2rem] bg-red-500 px-7 py-7 text-center text-white sm:flex-row sm:text-left">
          <div><p className="font-memories text-lg tracking-widest uppercase text-yellow-300">Craving something new?</p><h2 className="mt-1 text-2xl font-black">Your next favorite is waiting.</h2></div>
          <Link href="/menu" className="rounded-full bg-white px-6 py-3 font-bold text-black transition-transform hover:scale-105">Explore the menu</Link>
        </section>
      </section>
    </main>
  );
}
