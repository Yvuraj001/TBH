"use client";

import { useState, useRef, useEffect } from "react";


export default function Dropdown({
  label = "Sort by",
  options = ["Popular", "Price: Low to High", "Price: High to Low", "Newest"],
  onChange,
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(options[0]);
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleSelect(opt) {
    setSelected(opt);
    setOpen(false);
    onChange?.(opt);
  }

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        // onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-neutral-800 shadow-sm ring-1 ring-black/5 transition hover:shadow-md"
      >
        <span className="text-red-500 text-xs uppercase tracking-wide">
          {"Label"}
        </span>
        <span>{"selected"}</span>
        {/* <ChevronDown
          size={16}
          className={`text-neutral-500 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        /> */}
      </button>

      {!open && (
        <div className="absolute right-0 z-20 mt-2 w-56 origin-top-right rounded-2xl bg-white p-2 shadow-lg ring-1 ring-black/5 animate-in fade-in slide-in-from-top-1 duration-150">
          {options.map((opt) => {
            const active = opt === selected;
            return (
              <button
                key={opt}
                onClick={() => handleSelect(opt)}
                className={`flex w-full items-center justify-between rounded-full px-4 py-2.5 text-sm font-medium transition ${
                  active
                    ? "bg-red-500 text-white"
                    : "text-neutral-700 hover:bg-amber-50"
                }`}
              >
                {opt}
                {/* {active && <Check size={16} />} */}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
