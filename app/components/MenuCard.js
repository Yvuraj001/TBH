import { useState } from "react";

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
      className="group relative overflow-hidden rounded-4xl border-2 border-black/10 bg-[#fffdf8] p-3 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:p-4"
    >
      <button
        onClick={() => onCardClick(item, quantity)}
        aria-label={`Quick add ${item.name}`}
        className="absolute right-6 top-6 z-30 flex h-11 w-11 items-center justify-center rounded-full border-2 border-black bg-yellow-400 shadow-[3px_3px_0_#000] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none cursor-pointer"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round">
          <path d="M5 12h14" />
          <path d="M12 5v14" />
        </svg>
      </button>

      <div className="relative h-64 overflow-hidden rounded-3xl bg-[#f7d9a8] sm:h-72">
        <div className="absolute left-4 top-4 z-20 rounded-full bg-black px-3 py-1.5 text-[10px] font-bold tracking-widest text-white uppercase">
          Coocked Fresh
        </div>
        <div className="absolute inset-x-0 bottom-0 z-0 flex h-10">
          {Array.from({ length: 15 }).map((_, i) => (
            <span key={i} className={`h-full flex-1 ${i % 2 === 0 ? "bg-red-500" : "bg-[#fffdf8]"}`} />
          ))}
        </div>
        <div className="relative z-10 mx-auto flex h-full w-[84%] items-center justify-center px-5 pb-8 pt-10">
          <img
            src={item.image}
            alt={item.name}
            className="h-full max-h-52 w-auto max-w-full object-contain drop-shadow-[0_12px_10px_rgba(0,0,0,0.22)] transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>

      <div className="px-2 pb-2 pt-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-memories text-xs tracking-[0.18em] text-red-500 uppercase">TBH's choice</p>
            <h3 className="mt-1 font-memories text-2xl leading-none text-red-500">{item.name}</h3>
          </div>
          <p className="shrink-0 text-2xl font-black leading-none text-black"><span className="mr-0.5 text-sm align-top">₹</span>{item.price}</p>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <span className="rounded-full bg-black px-3 py-1.5 font-memories text-xs tracking-wider text-yellow-400">{item.prepTime}</span>
          <p className="text-xs font-bold uppercase tracking-widest text-black/45">Kitchen time</p>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {item.quickDetails.map((detail, i) => (
            <div key={i} className="rounded-xl bg-[#f5e3cd] px-2 py-2 text-center">
              <p className="text-[9px] font-bold tracking-wide text-black/45 uppercase">{detail.label}</p>
              <p className="mt-0.5 truncate text-xs font-black text-black">{detail.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between gap-3 border-t-2 border-dashed border-black/10 pt-4">
          <div className="flex shrink-0 items-center gap-2 rounded-full bg-[#f5e3cd] p-1">
            <button
              onClick={() => handleQuantityDecrease(1)}
              aria-label={`Decrease quantity of ${item.name}`}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-sm transition-transform hover:scale-105 cursor-pointer"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round"><path d="M5 12h14" /></svg>
            </button>
            <span className="w-4 text-center text-sm font-black">{quantity}</span>
            <button
              onClick={() => handleQuantityIncrease(1)}
              aria-label={`Increase quantity of ${item.name}`}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-sm transition-transform hover:scale-105 cursor-pointer"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
            </button>
          </div>
          <button
            onClick={() => onCardClick(item, quantity)}
            className="flex items-center gap-1.5 rounded-full bg-red-500 px-4 py-2.5 text-xs font-bold text-white shadow-md transition-all hover:scale-105 hover:bg-black cursor-pointer"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
