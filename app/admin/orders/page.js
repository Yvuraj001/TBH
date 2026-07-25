import Link from "next/link";
import Orders from "@/schems/orders.model";
import connectDB from "@/lib/connectDb";

const statusStyle = {
  Preparing: "bg-[#fee2df] text-[#c93a2e]",
  Ready: "bg-[#fff0bd] text-[#8a5b00]",
  Delivered: "bg-[#dff0d8] text-[#267348]",
};

export default async function AllOrdersPage() {
  await connectDB();

  const orderRecords = await Orders.find().sort({ orderPlaced: -1 });
  const allOrders = orderRecords.map((order) => {
    const total = order.order.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    const status = order.delivered
      ? "Delivered"
      : order.status
        ? "Ready"
        : "Preparing";

    return {
      id: `#TBH-${order._id.toString().slice(-6).toUpperCase()}`,
      customer: order.user,
      orderType:
        order.orderType === "dine-in"
          ? "Eat here"
          : order.orderType === "takeaway"
            ? "Take home"
            : "Not specified",
      items: order.order
        .map((item) => `${item.quantity}× ${item.name}`)
        .join(" · "),
      total,
      placed: new Intl.DateTimeFormat("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(order.orderPlaced),
      status,
    };
  });

  const activeCount = orderRecords.filter((order) => !order.delivered).length;
  const deliveredCount = orderRecords.filter((order) => order.delivered).length;

  return (
    <main className="min-h-screen bg-[#ffc286] px-4 py-8 sm:px-6 sm:py-12">
      <section className="mx-auto max-w-6xl">
        <header className="rounded-4xl bg-[#f7d9a8] px-6 py-8 shadow-[0.5rem_0.5rem_0_#28130f] sm:px-10 sm:py-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-memories text-sm tracking-[0.24em] text-red-500 uppercase">
                The Burger House
              </p>
              <h1 className="mt-2 font-modak text-5xl leading-none text-red-500 [-webkit-text-stroke:5px_white] [paint-order:stroke] sm:text-7xl">
                All Orders
              </h1>
              <p className="mt-4 text-sm font-semibold text-black/60">
                Every customer order, from preparation through delivery.
              </p>
            </div>
            <Link
              href="/admin"
              className="w-fit rounded-full bg-red-500 px-5 py-3 text-sm font-black text-white transition hover:bg-red-600"
            >
              Back to active orders
            </Link>
          </div>
        </header>

        <section className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            ["All placed", allOrders.length, "bg-white"],
            ["Active", activeCount, "bg-[#fff0bd]"],
            ["Delivered", deliveredCount, "bg-[#dff0d8]"],
          ].map(([label, value, tone]) => (
            <article
              key={label}
              className={`${tone} rounded-3xl border-2 border-[#28130f] p-5 text-center shadow-[0.3rem_0.3rem_0_#28130f]`}
            >
              <p className="font-memories tracking-widest text-red-500 uppercase">
                {label}
              </p>
              <p className="mt-2 text-4xl font-black">{value}</p>
            </article>
          ))}
        </section>

        <section className="mt-8 overflow-hidden rounded-4xl border-2 border-[#28130f] bg-white shadow-[0.5rem_0.5rem_0_#28130f]">
          <div className="grid grid-cols-[1fr_auto] gap-4 border-b-2 border-[#28130f] bg-[#28130f] px-5 py-3 text-xs font-bold tracking-[0.16em] text-white uppercase sm:grid-cols-[1fr_1fr_auto] sm:px-7">
            <span>Customer & order</span>
            <span className="hidden sm:block">Items</span>
            <span>Status</span>
          </div>

          {allOrders.length === 0 ? (
            <div className="px-5 py-16 text-center sm:px-7">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#3e9b58] text-2xl font-black text-white">
                ✓
              </span>
              <h2 className="mt-5 text-2xl font-black">No orders yet</h2>
              <p className="mt-2 text-sm font-semibold text-black/55">
                New customer orders will appear here once they are placed.
              </p>
            </div>
          ) : (
            <div className="divide-y-2 divide-black/10">
              {allOrders.map((order) => (
                <article
                  key={order.id}
                  className="grid grid-cols-[1fr_auto] gap-4 px-5 py-5 sm:grid-cols-[1fr_1fr_auto] sm:items-center sm:px-7"
                >
                  <div>
                    <p className="break-all text-lg font-black">
                      {order.customer}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-black/55">
                      {order.id} · {order.placed}
                    </p>
                    <span className="mt-2 inline-flex rounded-full bg-[#f5e3cd] px-2.5 py-1 text-xs font-black text-[#8a5b00]">
                      {order.orderType}
                    </span>
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-sm font-bold">{order.items}</p>
                    <p className="mt-2 font-black">₹{order.total}</p>
                  </div>
                  <span
                    className={`h-fit w-fit rounded-full px-3 py-1.5 text-xs font-black ${statusStyle[order.status]}`}
                  >
                    {order.status}
                  </span>
                  <div className="col-span-2 sm:hidden">
                    <p className="text-sm font-bold">{order.items}</p>
                    <p className="mt-2 font-black">₹{order.total}</p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
