import Link from "next/link";
import { revalidatePath } from "next/cache";
import DeliveryVerificationForm from "@/app/components/DeliveryVerificationForm";
import PrepareOrderButton from "@/app/components/PrepareOrderButton";
import Orders from "@/schems/orders.model";
import connectDB from "@/lib/connectDb";
import { getCurrentAdmin } from "@/lib/getCurrentAdmin";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import OrderPoller from "@/app/components/OrderPoller";
import { getKitchenStatus } from "@/lib/Getkitchenstatus";
import KitchenStatus from "@/schems/Kitchenstatus.model";

export default async function AdminPage() {

  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect("/admin/login");
  }

  async function handleLogout() {
    "use server";
    const cookieStore = await cookies();
    cookieStore.set("admtok", "", {
      expires: new Date(0),
      httpOnly: true,
      maxAge: 0,
      path: "/",
    });
    redirect("/admin/login");
  }

  async function handleToggleKitchen() {
    "use server";
    await connectDB();
    const status = await KitchenStatus.findOne();
    if (status) {
      status.isOpen = !status.isOpen;
      await status.save();
    } else {
      await KitchenStatus.create({ isOpen: false });
    }
    revalidatePath("/", "layout");
  }

  async function handlePrepared(formData) {
    "use server";

    const orderId = formData.get("orderId");
    const nextStatus = formData.get("nextStatus");

    if (
      typeof orderId !== "string" ||
      !/^[a-f\d]{24}$/i.test(orderId) ||
      !["true", "false"].includes(nextStatus)
    ) {
      return;
    }

    await connectDB();
    await Orders.findOneAndUpdate(
      { _id: orderId, delivered: false },
      { $set: { status: nextStatus === "true" } },
    );
    revalidatePath("/admin");
  }

  async function handleCompleteDelivery(previousState, formData) {
    "use server";

    const customer = formData.get("customer");
    const verificationCode = formData.get("verificationCode");

    if (
      typeof customer !== "string" ||
      typeof verificationCode !== "string" ||
      !/^\d{6}$/.test(verificationCode)
    ) {
      return { success: false, message: "Enter a valid six-digit code." };
    }

    await connectDB();
    const activeOrders = await Orders.find({
      user: customer,
      delivered: false,
    });

    if (!activeOrders.length) {
      return {
        success: false,
        message: "There are no active orders for this customer.",
      };
    }

    if (activeOrders.some((order) => !order.status)) {
      return {
        success: false,
        message: "Mark every order as ready before completing delivery.",
      };
    }

    if (
      activeOrders.some(
        (order) => order.orderVerificationCode !== verificationCode,
      )
    ) {
      return {
        success: false,
        message: "That verification code is incorrect.",
      };
    }

    await Orders.updateMany(
      { user: customer, delivered: false, status: true },
      { $set: { delivered: true } },
    );
    revalidatePath("/admin");

    return { success: true, message: "Delivery completed." };
  }

  await connectDB();
  const kitchenIsOpen = await getKitchenStatus();

  const pendingItems = await Orders.find({ delivered: false }).sort({
    orderPlaced: -1,
  });

  const completedItem = await Orders.find({
    status: true,
    delivered: false,
  }).sort({
    orderPlaced: -1,
  });

  const finishedItem = await Orders.find({ status: true, delivered: true });

  const pendingOrders = pendingItems.flatMap((order) => order.order);

  const completedOrders = completedItem.flatMap((order) => order.order);

  const finishedOrders = finishedItem.flatMap((order) => order.order);

  const pendingOrderGroups = Object.values(
    pendingItems.reduce((groups, pendingOrder) => {
      const customer = pendingOrder.user;

      if (!groups[customer]) {
        groups[customer] = {
          customer,
          orders: [],
        };
      }

      const orderId = pendingOrder._id.toString();
      const items = pendingOrder.order.map((item, itemIndex) => ({
        key: `${orderId}-${itemIndex}`,
        label: `${item.quantity}× ${item.name}`,
        total: item.price * item.quantity,
      }));

      groups[customer].orders.push({
        id: `#TBH-${orderId.slice(-6).toUpperCase()}`,
        orderId,
        orderType:
          pendingOrder.orderType === "dine-in"
            ? "Eat here"
            : pendingOrder.orderType === "takeaway"
              ? "Take home"
              : "Not specified",
        items,
        total: items.reduce((sum, item) => sum + item.total, 0),
        time: new Intl.DateTimeFormat("en-IN", {
          dateStyle: "medium",
          timeStyle: "short",
        }).format(pendingOrder.orderPlaced),
        ready: pendingOrder.status,
      });

      return groups;
    }, {}),
  );

  return (
    <main className="min-h-screen bg-[#ffc286] px-4 py-8 sm:px-6 sm:py-12">
      <OrderPoller intervalMs={5000} />
      <section className="mx-auto max-w-6xl">
        <header className="overflow-hidden rounded-4xl bg-[#f7d9a8] px-6 py-8 shadow-[0.5rem_0.5rem_0_#28130f] sm:px-10 sm:py-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-memories text-sm tracking-[0.24em] text-red-500 uppercase">
                The Burger House
              </p>
              <h1 className="mt-2 font-modak text-5xl leading-none text-red-500 [-webkit-text-stroke:5px_white] [paint-order:stroke] sm:text-7xl">
                Pending Orders
              </h1>
              <p className="mt-4 text-sm font-semibold text-black/60">
                UI preview — connect the sample data and actions to your
                backend.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/admin/orders"
                className="rounded-full bg-red-500 px-5 py-3 text-sm font-black text-white transition hover:bg-red-600"
              >
                View all orders
              </Link>
              <form action={handleToggleKitchen}>
                <button
                  type="submit"
                  className={`flex items-center gap-2 rounded-full border-2 border-[#28130f] px-4 py-2 text-sm font-bold transition ${
                    kitchenIsOpen ? "bg-white" : "bg-[#fee2df]"
                  }`}
                >
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      kitchenIsOpen ? "bg-[#3e9b58]" : "bg-red-500"
                    }`}
                  />
                  {kitchenIsOpen ? "Kitchen is open" : "Kitchen is closed"}
                </button>
              </form>
              <form action={handleLogout}>
                <button
                  type="submit"
                  className="rounded-full border-2 border-[#28130f] bg-white px-5 py-3 text-sm font-black transition hover:bg-[#28130f] hover:text-white"
                >
                  Logout
                </button>
              </form>
            </div>
          </div>
        </header>

        <section
          className="mt-8 grid gap-4 sm:grid-cols-3"
          aria-label="Order summary"
        >
          {[
            [
              "Orders in queue",
              pendingOrders.length,
              "Across all customers",
              "bg-[#fff0bd]",
            ],

            [
              "Ready to hand off",
              completedOrders.length,
              "Awaiting pickup",
              "bg-[#dff0d8]",
            ],
            [
              "Delivhered Orders",
              finishedOrders.length,
              "Order recived by customers",
              "bg-[#fee2df]",
            ],
          ].map(([label, value, detail, tone]) => (
            <article
              key={label}
              className={`${tone} rounded-3xl border-2 border-[#28130f] p-5 shadow-[0.3rem_0.3rem_0_#28130f]`}
            >
              <p className="text-sm font-bold tracking-wide text-black/60 uppercase">
                {label}
              </p>
              <p className="mt-2 text-4xl font-black leading-none">{value}</p>
              <p className="mt-3 text-sm font-semibold text-black/65">
                {detail}
              </p>
            </article>
          ))}
        </section>

        <section className="mt-10">
          <p className="font-memories text-sm tracking-[0.2em] text-red-500 uppercase">
            Orders queue
          </p>
          <h2 className="mt-1 text-3xl font-black sm:text-4xl">
            Grouped by customer
          </h2>

          <div className="mt-6 space-y-6">
            {pendingOrderGroups.length === 0 ? (
              <div className="rounded-4xl border-2 border-dashed border-[#28130f] bg-[#fff0bd] px-6 py-14 text-center shadow-[0.4rem_0.4rem_0_#28130f] sm:px-10">
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#3e9b58] text-3xl font-black text-white shadow-[0.2rem_0.2rem_0_#28130f]">
                  ✓
                </span>
                <p className="mt-6 font-memories text-sm tracking-[0.2em] text-red-500 uppercase">
                  Kitchen is clear
                </p>
                <h3 className="mt-2 text-3xl font-black">All caught up!</h3>
                <p className="mx-auto mt-3 max-w-md text-sm font-semibold text-black/60">
                  There are no active orders right now. New customer orders will
                  appear here automatically.
                </p>
                <Link
                  href="/admin/orders"
                  className="mt-6 inline-flex rounded-full bg-red-500 px-5 py-3 text-sm font-black text-white transition hover:bg-red-600"
                >
                  View all orders
                </Link>
              </div>
            ) : (
              pendingOrderGroups.map((group) => {
                const groupTotal = group.orders.reduce(
                  (sum, order) => sum + order.total,
                  0,
                );
                const readyCount = group.orders.filter(
                  (order) => order.ready,
                ).length;
                return (
                  <article
                    key={group.customer}
                    className="overflow-hidden rounded-4xl border-2 border-[#28130f] bg-white shadow-[0.5rem_0.5rem_0_#28130f]"
                  >
                    <div className="flex h-3">
                      {Array.from({ length: 18 }).map((_, index) => (
                        <span
                          key={index}
                          className={`flex-1 ${index % 2 === 0 ? "bg-red-500" : "bg-yellow-400"}`}
                        />
                      ))}
                    </div>
                    {/* orders headers */}

                    <div className="p-5 sm:p-7">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <p className="font-memories text-sm tracking-widest text-red-500 uppercase">
                            Customer
                          </p>
                          <h3 className="mt-1 break-all text-2xl font-black">
                            {group.customer}
                          </h3>
                          <p className="mt-2 text-sm font-bold text-black/60">
                            {group.orders.length} orders · ₹{groupTotal}
                          </p>
                        </div>
                        <span className="w-fit rounded-full bg-[#fff0bd] px-4 py-2 text-sm font-black text-[#8a5b00]">
                          {readyCount}/{group.orders.length} ready
                        </span>
                      </div>
                      {/* Orders body */}

                      <div className="mt-6 space-y-3">
                        {group.orders.map((order) => (
                          <div
                            key={order.orderId}
                            className="rounded-2xl bg-[#f5e3cd] p-4"
                          >
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                              <div>
                                <p className="font-black">
                                  {order.id}{" "}
                                  <span className="ml-2 text-sm font-semibold text-black/50">
                                    {order.time}
                                  </span>
                                </p>
                                <span className="mt-2 inline-flex rounded-full bg-white px-3 py-1 text-xs font-black text-[#8a5b00]">
                                  {order.orderType}
                                </span>
                                <div className="mt-3 space-y-2">
                                  {order.items.map((item) => (
                                    <div
                                      key={item.key}
                                      className="flex items-center justify-between gap-4 rounded-xl bg-white/55 px-3 py-2 text-sm font-semibold text-black/65"
                                    >
                                      <p>{item.label}</p>
                                      <p className="shrink-0 font-black text-black">
                                        ₹{item.total}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                                <p className="mt-3 font-black">
                                  Total ₹{order.total}
                                </p>
                              </div>
                              <form action={handlePrepared}>
                                <input
                                  type="hidden"
                                  name="orderId"
                                  value={order.orderId}
                                />
                                <input
                                  type="hidden"
                                  name="nextStatus"
                                  value={order.ready ? "false" : "true"}
                                />
                                <PrepareOrderButton ready={order.ready} />
                              </form>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 rounded-3xl bg-[#28130f] p-4 text-white sm:flex sm:items-end sm:justify-between sm:gap-5 sm:p-5">
                        <div className="min-w-0 flex-1">
                          <p className="font-memories tracking-widest text-yellow-400 uppercase">
                            Complete delivery
                          </p>
                          <p className="mt-1 text-sm font-semibold text-white/65">
                            Enter the customer’s six-digit verification code to
                            complete this grouped order.
                          </p>
                        </div>
                        <DeliveryVerificationForm
                          completeDelivery={handleCompleteDelivery}
                          customer={group.customer}
                        />
                      </div>
                    </div>
                  </article>
                );
              })
            )}
          </div>
        </section>
      </section>
    </main>
  );
}
