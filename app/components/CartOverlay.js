const CartPopup = ({ items, onClose }) => {
  const reevaluatedCart = items.filter((item, index, array) => {
    return index === array.findIndex((i) => i.id === item.id);
  });
 
  let subtotal = reevaluatedCart
    .map((i) => i.price * i.quantity)
    .reduce((acc, curr) => acc + curr, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

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
                      //   onClick={() => onDecrement?.(item.id)}
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
                      //   onClick={() => onIncrement?.(item.id)}

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

                  <button
                    // onClick={() => onRemove?.(item.id)}
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

          <div className="mt-6 pt-4 border-t-2 border-dashed border-black/10">
            <div className="flex items-center justify-between mb-4">
              <span className="font-bold text-gray-600 text-sm tracking-widest uppercase">
                Subtotal
              </span>
              <span className="font-bold text-black text-2xl">
                <span className="text-sm align-top">$</span>
                {subtotal || 0}
              </span>
            </div>
            <button
              //   onClick={}
              className="w-full bg-red-500 hover:bg-black text-white font-bold text-sm tracking-wide py-3 rounded-full transition-colors cursor-pointer"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPopup;
