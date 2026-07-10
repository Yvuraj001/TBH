
const FilterBar = ({ active, handleActivity , categories}) => {
  return (
    <div className="flex gap-3 overflow-x-auto bg-[#ffffff5c] px-4 py-3 no-scrollbar rounded-b-4xl mb-7 shadow-xl justify-between">
      {categories.map((cat, i) => (
        <button
          key={cat}
          onClick={() => handleActivity(i)}
          className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-bold transition-colors ${
            i === active
              ? "bg-red-500 text-white"
              : "bg-neutral-800 text-white hover:bg-neutral-700"
          } cursor-pointer`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};
export default FilterBar;
