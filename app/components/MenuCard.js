import { useEffect, useState } from "react";

const MenuCard = ({ item, index, onCardClick }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityIncrease = (change) => {
    setQuantity((prevQuantity) => prevQuantity + change);
  };

  const handleQuantityDecrease = (change) => {
    setQuantity((prevQuantity) => {
      if (quantity > 1) {
        return prevQuantity - change;
      }
      return prevQuantity;
    });
  };

  return (
    <div
      key={index}
      className="group relative bg-white rounded-4xl p-4 shadow-lg hover:shadow-2xl transition-shadow duration-300 "
    >
      <button
        onClick={() => onCardClick(item, quantity)}
        aria-label={`Quick add ${item.name}`}
        className="absolute top-4 right-4 z-30 w-11 h-11 rounded-full bg-yellow-400 hover:bg-yellow-300 flex items-center justify-center shadow-md transition-transform hover:scale-110 cursor-pointer"
      >
        <svg
          width="18"
          height="18"
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

      <div className="relative h-80 overflow-hidden rounded-3xl bg-white">
        <div className="absolute inset-x-0 top-[42%] h-9 flex z-0">
          {Array.from({ length: 14 }).map((_, i) => (
            <span
              key={i}
              className={`flex-1 h-full ${i % 2 === 0 ? "bg-red-500" : "bg-transparent"}`}
            />
          ))}
        </div>

        <div className="relative z-10 w-[90%] h-full flex items-center justify-center p-6 mx-auto">
          <img
            src={item.image}
            alt={item.name}
            className="max-w-full max-h-full w-auto h-auto object-contain rounded-2xl"
          />
        </div>

        <div className="absolute inset-x-3 bottom-3 z-20 bg-white/85 backdrop-blur-md rounded-2xl p-4 shadow-xl opacity-0 translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300">
          {/* Quick Details */}
          <div className="mb-3">
            <div className="flex items-center justify-between mb-2">
              <span className="font-memories text-xs tracking-widest text-gray-500 uppercase">
                Quick Details
              </span>
              <span className="font-memories text-xs text-gray-500 uppercase">
                {item.prepTime}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-1.5 mb-2">
              {item.quickDetails.map((detail, i) => (
                <div
                  key={i}
                  className="bg-black/5 rounded-xl px-2 py-1.5 text-center"
                >
                  <p className="text-[9px] text-gray-500 uppercase tracking-wide">
                    {detail.label}
                  </p>
                  <p className="font-bold text-gray-800 text-xs truncate">
                    {detail.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 bg-black/5 rounded-full px-2 py-1">
              {/* minus button */}
              <button
                onClick={() => handleQuantityDecrease(1)}
                className="w-6 h-6 flex items-center justify-center rounded-full bg-white shadow cursor-pointer"
              >
                <svg
                  width="14"
                  height="14"
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
                {quantity}
              </span>
              {/* plus button */}
              <button
                onClick={() => handleQuantityIncrease(1)}
                className="w-6 h-6 flex items-center justify-center rounded-full bg-white shadow cursor-pointer"
              >
                <svg
                  width="14"
                  height="14"
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
            {/* Cart Button */}
            <button
              onClick={() => onCardClick(item, quantity)}
              className="flex items-center gap-1.5 bg-red-500 hover:bg-black text-white text-xs font-bold px-3 py-2 rounded-full transition-colors cursor-pointer"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              Add
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-3 px-1">
        <h3 className="font-memories text-red-500 text-xl leading-none">
          {item.name}
        </h3>
        <p className="font-bold text-black text-2xl leading-none">
          <span className="text-sm align-top">$</span>
          {item.price}
        </p>
      </div>
    </div>
  );
};

export default MenuCard;
