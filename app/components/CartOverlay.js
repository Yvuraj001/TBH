import { useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { toast } from "react-toastify";
import { MessageToast } from "./showToast";


const CartPopup = ({ items, onClose, updateQuantity, handleDelete }) => {
  const [showSignin, setshowSignin] = useState(false);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [orderType, setOrderType] = useState("takeaway");

  let reevaluatedCart = items.filter((item, index, array) => {
    return index === array.findIndex((i) => i.id === item.id);
  });

  let subtotal = reevaluatedCart
    .map((i) => i.price * i.quantity)
    .reduce((acc, curr) => acc + curr, 0);
 

  const handleOrder = async () => {
    const me = await fetch("/api/auth/me", {
      method: "GET",
    });


    const response = await me.json();

    if (!response.sucess) {
      setshowSignin(() => true);
       return;
    }

    if (response.sucess) {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItems: reevaluatedCart, orderType }),
      });

      const data = await res.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        amount: data.amount,
        currency: "INR",
        name: "The Burger House",
        description: "https://www.cravburgers.shop/favicon.ico",
        image: "",
        order_id: data.id,
        handler: async function (response) {

          const verifyRes = await fetch("/api/verifyOrder", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...response}),
          });

          const result = await verifyRes.json();

          if (result.success) {
            reevaluatedCart.forEach((item) => handleDelete(item.id));
            setShowPaymentSuccess(true);
          }
          if (!result.success) {
            toast(<MessageToast message={result.msg} />, {
              closeButton: false,
              className: "!bg-transparent !shadow-none !p-0",
              autoClose: 3000,
            });
          }
        },
        theme: {
          color: "#3399cc",
        },
      };
      const pay = new Razorpay(options);
      pay.open();
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div className="relative w-full max-w-md bg-white rounded-4xl shadow-2xl overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-3 flex z-0">
          {Array.from({ length: 16 }).map((_, i) => (
            <span
              key={i}
              className={`flex-1 h-full ${i % 2 === 0 ? "bg-red-500" : "bg-[#f5e3cd]"}`}
            />
          ))}
        </div>

        <div className="relative z-10 p-6 pt-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-modak text-red-500 text-3xl [-webkit-text-stroke:4px_white] [paint-order:stroke]">
              Your Cart
            </h2>
            <button
              onClick={onClose}
              aria-label="Close cart"
              className="w-10 h-10 rounded-full bg-yellow-400 hover:bg-yellow-300 flex items-center justify-center shadow-md cursor-pointer"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="black"
                strokeWidth="3"
                strokeLinecap="round"
              >
                <path d="M18 6 6 18" />
                <path d="M6 6l12 12" />
              </svg>
            </button>
          </div>

          {reevaluatedCart.length === 0 || !reevaluatedCart ? (
            <p className="text-center text-gray-500 font-bold py-10">
              Your cart is empty.
            </p>
          ) : (
            <div className="flex flex-col gap-4 max-h-80 overflow-y-auto pr-1">
              {reevaluatedCart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 bg-[#f5e3cd]/60 rounded-2xl p-3"
                >
                  <div className="w-16 h-16 rounded-xl bg-white flex items-center justify-center overflow-hidden shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-memories text-red-500 text-base truncate">
                      {item.name}
                    </h3>
                    <p className="text-sm font-bold text-black">
                      ${item.price}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 bg-black/5 rounded-full px-2 py-1 shrink-0">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-6 h-6 flex items-center justify-center rounded-full bg-white shadow cursor-pointer"
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="black"
                        strokeWidth="3"
                        strokeLinecap="round"
                      >
                        <path d="M5 12h14" />
                      </svg>
                    </button>
                    <span className="text-sm font-bold w-4 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-6 h-6 flex items-center justify-center rounded-full bg-white shadow cursor-pointer"
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="black"
                        strokeWidth="3"
                        strokeLinecap="round"
                      >
                        <path d="M5 12h14" />
                        <path d="M12 5v14" />
                      </svg>
                    </button>
                  </div>
                  {/* delete butotn */}
                  <button
                    onClick={() => handleDelete(item.id)}
                    aria-label={`Remove ${item.name}`}
                    className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-red-100 cursor-pointer shrink-0"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    >
                      <path d="M3 6h18" />
                      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 rounded-2xl bg-[#f5e3cd]/60 p-4">
            <div className="px-1 text-sm font-black text-black">
              How would you like your order?
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {[
                ["dine-in", "Eat here"],
                ["takeaway", "Take home"],
              ].map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setOrderType(value)}
                  aria-pressed={orderType === value}
                  className={`rounded-xl border-2 px-3 py-3 text-sm font-black transition ${orderType === value ? "border-red-500 bg-red-500 text-white" : "border-transparent bg-white text-black hover:border-red-300"}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t-2 border-dashed border-black/10">
            <div className="flex items-center justify-between mb-4">
              <span className="font-bold text-gray-600 text-sm tracking-widest uppercase">
                Subtotal
              </span>
              <span className="font-bold text-black text-2xl">
                <span className="text-xl align-center">₹</span>
                {subtotal || 0}
              </span>
            </div>
            <p className="m-3 font-semibold text-red-500 text-sm text-center opacity-[0.8]">
             ‼️ Cancellation not available
            </p>
            <button
              onClick={handleOrder}
              disabled={reevaluatedCart.length === 0}
              className="w-full bg-red-500 hover:bg-black text-white font-bold text-sm tracking-wide py-3 rounded-full transition-colors cursor-pointer"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
      {showSignin && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/60 p-6 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-3xl border-2 border-black bg-[#fff9f1] p-6 text-center shadow-[6px_6px_0_#000]">
            <h3 className="font-modak text-4xl text-red-500 [-webkit-text-stroke:2px_white] [paint-order:stroke]">
              Sign in first!
            </h3>
            <p className="mt-3 font-semibold text-black/70">
              Please log in or create an account before checking out.
            </p>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setshowSignin(false)}
                className="flex-1 rounded-full border-2 border-black px-4 py-3 font-bold"
              >
                Not now
              </button>
              <Link
                href="/login?utm=menu"
                className="flex-1 rounded-full bg-red-500 px-4 py-3 font-bold text-white"
              >
                Log in
              </Link>
            </div>
          </div>
        </div>
      )}
      {showPaymentSuccess && (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/60 p-6 backdrop-blur-sm">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="payment-success-title"
            className="w-full max-w-sm rounded-3xl border-2 border-black bg-[#fff9f1] p-6 text-center shadow-[6px_6px_0_#000]"
          >
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-yellow-400 text-3xl font-black text-black">
              ✓
            </span>
            <h3
              id="payment-success-title"
              className="mt-4 font-modak text-4xl text-red-500 [-webkit-text-stroke:2px_white] [paint-order:stroke]"
            >
              Order placed!
            </h3>
            <p className="mt-3 font-semibold text-black/70">
              Your payment was successful. We&apos;ll start preparing your food
              soon.
            </p>

            <div className="mt-6 flex flex-col gap-3">
              <Link
                href="/orders"
                onClick={onClose}
                className="rounded-full bg-red-500 px-4 py-3 font-bold text-white"
              >
                See my orders
              </Link>
              <button
                onClick={() => {
                  setShowPaymentSuccess(false);
                  onClose();
                }}
                className="rounded-full border-2 border-black px-4 py-3 font-bold"
              >
                Continue ordering
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPopup;
