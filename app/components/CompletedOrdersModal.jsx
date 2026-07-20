"use client";

import { useEffect, useState } from "react";

const orderDateFormatter = new Intl.DateTimeFormat("en-IN", {
  dateStyle: "medium",
  timeStyle: "short",
});

export default function CompletedOrdersModal({ orders }) {
  const [isOpen, setIsOpen] = useState(false);

 

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="rounded-full px-3 py-2 text-sm font-bold text-gray-600 transition hover:bg-white/50 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        View all ({orders.length})
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 p-3 sm:p-6"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsOpen(false);
          }}
        >
          <section
            className="flex h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-4xl bg-[#ffc286] shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="completed-orders-title"
          >
            <header className="flex items-center justify-between gap-4 border-b border-black/10 bg-[#F7D9A8] px-5 py-5 sm:px-8">
              <div>
                <p className="font-memories text-sm tracking-widest text-red-500 uppercase">
                  Your order history
                </p>
                <h2 id="completed-orders-title" className="mt-1 text-2xl font-black sm:text-3xl">
                  Completed orders
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-2xl leading-none text-gray-700 transition hover:bg-red-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                aria-label="Close completed orders"
              >
                ×
              </button>
            </header>

            <div className="overflow-y-auto p-5 sm:p-8">
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {orders.map((order) => {
                  const total = order.order.reduce(
                    (sum, item) => sum + item.price * item.quantity,
                    0,
                  );

                  return (
                    <article key={order.id} className="rounded-3xl bg-white p-5 shadow-lg">
                      <div className="flex items-start justify-between gap-3">
                        <span className="rounded-full bg-[#dff0d8] px-3 py-1.5 text-xs font-bold text-[#267348]">
                          Delivered
                        </span>
                        <p className="text-right text-sm font-semibold text-gray-500">
                          {orderDateFormatter.format(new Date(order.orderPlaced))}
                        </p>
                      </div>

                      <div className="mt-5 space-y-3">
                        {order.order.map((item, index) => (
                          <div key={`${order.id}-${index}`} className="flex items-center gap-3 rounded-2xl bg-[#f5e3cd] p-3">
                            <div className="h-14 w-14 shrink-0 rounded-xl bg-white p-2">
                              <img src={item.image} alt={item.name} className="h-full w-full object-contain" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <h3 className="truncate font-memories text-lg leading-none text-red-500">
                                {item.name}
                              </h3>
                              <p className="mt-1 text-sm text-gray-600">Qty {item.quantity}</p>
                            </div>
                            <p className="font-black">₹{item.price * item.quantity}</p>
                          </div>
                        ))}
                      </div>

                      <div className="mt-5 flex justify-end border-t border-gray-100 pt-4">
                        <p className="text-lg font-black">Total ₹{total}</p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
