import { getCurrentUser } from "@/lib/getCurrentUser";
import connectDB from "@/lib/connectDb";
import User from "@/schems/user.model";
import Orders from "@/schems/orders.model";
import Link from "next/link";
import CompletedOrdersModal from "@/app/components/CompletedOrdersModal";

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

export default async function OrdersPage() {
  const userID = await getCurrentUser();
  const userId = userID.userId ? userID.userId : null;

  await connectDB();
  // getting user email
  const user = await User.findOne({ _id: userId });
  const email = user.email;

  const pendingItem = await Orders.find({
    user: email,
    delivered: false,
  }).sort({ orderPlaced: -1 });

  const pendingOrders = pendingItem.flatMap((order) => order.order);
  const isPreparing = pendingItem.some((order) => order.status === false);
  const activeOrderPlacedAt = pendingItem[0]?.orderPlaced;

  const completedItem = await Orders.find({
    user: email,
    status: true,
    delivered: true,
  }).sort({ orderPlaced: -1 });

  const completedOrders = completedItem.map((order) => ({
    id: order._id.toString(),
    orderPlaced: order.orderPlaced.toISOString(),
    order: order.order.map((item) => ({
      name: item.name,
      image: item.image,
      price: item.price,
      quantity: item.quantity,
    })),
  }));

  const subtotal = pendingOrders
    .map((i) => i.price * i.quantity)
    .reduce((acc, curr) => acc + curr, 0);

  return (
    <main className="min-h-screen bg-[#ffc286] px-4 pb-16 pt-8 sm:px-6 sm:pt-12">
      <section className="mx-auto max-w-6xl">
        <header className="relative overflow-hidden rounded-[2.5rem] bg-[#F7D9A8] px-6 py-12 text-center sm:px-10">
          <img
            src="/images/img-webp/tomato.webp"
            alt=""
            className="pointer-events-none absolute -left-10 top-3 w-28 -rotate-12 sm:-left-4 sm:w-40 xl:-left-14"
          />
          <img
            src="/images/img-webp/lettuce.webp"
            alt=""
            className="pointer-events-none absolute -right-12 top-0 w-32 rotate-12 sm:-right-3 sm:w-44 xl:-right-16 xl:top-10"
          />
          <p className="relative z-10 font-memories text-sm tracking-[0.25em] text-red-500 uppercase">
            Your Food Journey
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

          <article className="overflow-hidden rounded-4xl bg-white shadow-xl">
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
                  {pendingOrders.length > 0 && (
                    <div>
                      <p className="font-memories text-sm tracking-widest text-gray-500 uppercase">
                        Order #TBH
                      </p>
                      <h3 className="mt-1 text-2xl font-black sm:text-3xl">
                        {isPreparing ? "Preparing Your Food" : "Ready for Pickup"}
                      </h3>
                      <div className="flex gap-4 items-center mt-2 ">
                        <p className="font-memories text-md tracking-widest text-gray-500 uppercase">
                          Items:
                          <span className="font-bold text-red-500">
                            {pendingOrders.length}{" "}
                          </span>
                        </p>
                        ||
                        <p className="font-memories text-md tracking-widest text-gray-500 uppercase">
                          Total:
                          <span className="font-bold text-red-500">
                            {subtotal}
                          </span>
                        </p>
                      </div>
                    </div>
                  )}
                  {pendingOrders.length === 0 && (
                    <div>
                      <p className="font-memories text-sm tracking-widest text-gray-500 uppercase">
                        Order #TBH
                      </p>
                      <h3 className="mt-1 text-2xl font-black sm:text-3xl">
                        No orders
                      </h3>
                    </div>
                  )}
                  {pendingOrders.length === 0 && (
                    <span
                      className={`rounded-full ${pendingOrders.length > 0 ? "bg-[#dff0d8] text-[#267348]" : "bg-[#f0d8d8] text-[#c81313]"} px-4 py-2 text-sm font-bold text-[#267348]`}
                    >
                      Place a order first
                    </span>
                  )}
                  {pendingOrders.length > 0 && (
                    <span
                      className={`rounded-full ${pendingOrders.length > 0 ? "bg-[#dff0d8] text-[#267348]" : "bg-[#f0d8d8] text-[#c81313]"} px-4 py-2 text-sm font-bold text-[#267348]`}
                    >
                      {isPreparing ? "Preparing" : "Ready for pickup"}
                    </span>
                  )}
                </div>

                <div
                  className={`mt-6 divide-y-2 divide-dashed divide-black/10 rounded-2xl bg-[#f5e3cd] p-4 sm:p-5 ${pendingOrders.length === 1 ? "h-fit" : "h-68"} overflow-scroll `}
                >
                  {pendingOrders.length > 0 ? (
                    pendingOrders.map((order, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 py-4 first:pt-0 last:pb-0"
                      >
                        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white p-2">
                          <img
                            src={order.image}
                            alt={order.name}
                            className="h-full w-full object-contain"
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <h4 className="font-memories text-xl leading-none text-red-500">
                              {order.name}
                            </h4>
                            <span className="font-black">₹{order.price}</span>
                          </div>
                          <div className="mx-20 m-3 text-xl font-medium text-gray-600 flex gap-10 items-center  ">
                            {order.quickDetails.map((detail, index) => (
                              <div
                                key={index}
                                className="rounded-xl bg-[#f5e3cd] text-center  "
                              >
                                <p className="text-[11px] font-bold tracking-wide text-black/45 uppercase">
                                  {detail.label}
                                </p>
                                <p className="mt-0.5 truncate text-xs font-black text-black">
                                  {detail.value}
                                </p>
                              </div>
                            ))}
                          </div>
                          <p className="mt-1 text-sm font-bold">
                            Qty {order.quantity}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center gap-3 py-10 text-center">
                      <p className="text-gray-500 font-medium">
                        You have no pending orders
                      </p>
                      <Link
                        href="/menu"
                        className="rounded-full bg-red-500 px-6 py-2 text-sm font-bold text-white transition hover:bg-red-600"
                      >
                        Go to Menu
                      </Link>
                    </div>
                  )}
                </div>
              </div>
              {pendingOrders.length > 0 ? (
                <aside className="rounded-3xl bg-[#686868] p-6 text-white sm:p-7">
                  <p className="font-memories tracking-[0.22em] text-yellow-400 uppercase">
                    Order progress
                  </p>
                  <h3 className="mt-2 text-2xl font-black">
                    {isPreparing ? "Almost ready!" : "Ready to enjoy!"}
                  </h3>
                  <div className="mt-8 space-y-0">
                    <div className="relative flex gap-4 pb-8 before:absolute before:top-7 before:left-3.25 before:h-12 before:w-0.5 before:bg-yellow-400">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-yellow-400 text-sm font-black text-black">
                        ✓
                      </span>
                      <div>
                        <p className="font-bold">Order received</p>
                        <p className="mt-1 text-sm text-white/60">
                          {activeOrderPlacedAt &&
                            new Intl.DateTimeFormat("en-IN", {
                              dateStyle: "medium",
                              timeStyle: "short",
                            }).format(activeOrderPlacedAt)}
                        </p>
                      </div>
                    </div>
                    <div className="relative flex gap-4 pb-8 before:absolute before:top-7 before:left-3.25 before:h-12 before:w-0.5 before:bg-white/20">
                      <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-black ${isPreparing ? "bg-red-500" : "bg-yellow-400 text-black"}`}>
                        {isPreparing ? "2" : "✓"}
                      </span>
                      <div>
                        <p className="font-bold">
                          {isPreparing ? "In the kitchen" : "Order prepared"}
                        </p>
                        <p className="mt-1 text-sm text-yellow-400">
                          {isPreparing
                            ? "Your order is being prepared"
                            : "Your order is ready for pickup"}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-black ${isPreparing ? "border-2 border-white/30 text-white/50" : "bg-yellow-400 text-black"}`}>
                        {isPreparing ? "3" : "✓"}
                      </span>
                      <div>
                        <p className={`font-bold ${isPreparing ? "text-white/60" : "text-white"}`}>
                          Ready to enjoy
                        </p>
                        <p className={`mt-1 text-sm ${isPreparing ? "text-white/40" : "text-yellow-400"}`}>
                          {isPreparing
                            ? "Estimated in 8–10 min"
                            : "Please collect your order"}
                        </p>
                      </div>
                    </div>
                  </div>
                </aside>
              ) : (
                <aside className="rounded-3xl bg-[#f5e3cd] p-6 text-black sm:p-7 flex flex-col items-center justify-center text-center min-h-70">
                  <p className="font-memories tracking-[0.22em] text-red-400 uppercase">
                    Order progress
                  </p>
                  <h3 className="mt-2 text-2xl font-black  ">
                    Nothing here yet
                  </h3>
                  <p className="mt-2 text-sm   text-black/60">
                    Place an order to see live status updates
                  </p>
                </aside>
              )}
            </div>
          </article>
        </section>

        <section className="mt-12">
          <div className="mb-4 flex items-end justify-between gap-4 px-2">
            <div>
              <p className="font-memories text-sm tracking-widest text-red-500 uppercase">
                The good old stuff
              </p>
              <h2 className="text-2xl font-black">Previous orders</h2>
            </div>
            {completedOrders.length > 0 && <CompletedOrdersModal orders={completedOrders} />}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {completedOrders.length > 0 ? (
              completedOrders.slice(0, 2).map((completedOrder) => {
                const items = completedOrder.order;
                const firstItem = items[0];
                const total = items.reduce(
                  (sum, item) => sum + item.price * item.quantity,
                  0,
                );

                return (
                  <article
                    key={completedOrder.id}
                    className="rounded-4xl bg-white p-5 shadow-lg sm:p-6"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="rounded-full bg-[#dff0d8] px-3 py-1.5 text-xs font-bold text-[#267348]">
                        Delivered
                      </span>
                    </div>

                    <div className="mt-5 flex items-center gap-4 rounded-2xl bg-[#f5e3cd] p-3">
                      <div className="h-16 w-16 shrink-0 rounded-xl bg-white p-2">
                        <img
                          src={firstItem.image}
                          alt={firstItem.name}
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-memories text-xl leading-none text-red-500">
                          {firstItem.name}
                        </h4>
                        {items.length > 1 && (
                          <p className="mt-2 text-sm text-gray-600">
                            + {items.length - 1} more item{items.length > 2 ? "s" : ""}
                          </p>
                        )}
                      </div>
                      <p className="font-black">₹{total}</p>
                    </div>
                    <div className="mt-5 flex items-center justify-between">
                      <p className="text-sm font-semibold text-gray-500">
                        {new Intl.DateTimeFormat("en-IN", {
                          dateStyle: "medium",
                        }).format(new Date(completedOrder.orderPlaced))}
                      </p>
                    </div>
                  </article>
                );
              })
            ) : (
              <p className="rounded-3xl bg-white p-6 text-center font-medium text-gray-500 md:col-span-2">
                Your delivered orders will appear here.
              </p>
            )}
          </div>
        </section>

        <section className="mt-10 flex flex-col items-center justify-between gap-5 rounded-4xl bg-red-500 px-7 py-7 text-center text-white sm:flex-row sm:text-left">
          <div>
            <p className="font-memories text-lg tracking-widest uppercase text-yellow-300">
              Craving something new?
            </p>
            <h2 className="mt-1 text-2xl font-black">
              Your next favorite is waiting.
            </h2>
          </div>
          <Link
            href="/menu"
            className="rounded-full bg-white px-6 py-3 font-bold text-black transition-transform hover:scale-105"
          >
            Explore the menu
          </Link>
        </section>
      </section>
    </main>
  );
}
