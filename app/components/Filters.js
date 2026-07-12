
const FilterBar = ({ active, handleActivity , categories}) => {
  return (
    <div className="relative z-20 -mt-7 mb-9 rounded-4xl border-2 border-black/10 bg-white p-3 shadow-lg sm:-mt-9 sm:p-4">
      <div className="flex items-center gap-4 overflow-x-auto no-scrollbar">
        <div className="hidden shrink-0 border-r-2 border-dashed border-black/10 pr-4 sm:block">
          <p className="font-memories text-sm tracking-widest text-red-500 uppercase">Explore</p>
          <p className="text-sm font-black">The good stuff</p>
        </div>
        <div className="flex gap-2.5">
          {categories.map((cat, i) => (
            <button
              key={cat}
              onClick={() => handleActivity(i)}
              className={`shrink-0 whitespace-nowrap rounded-full border-2 px-4 py-2.5 text-sm font-bold transition-all sm:px-5 ${
                i === active
                  ? "border-red-500 bg-red-500 text-white shadow-md shadow-red-500/25"
                  : "border-black/10 bg-[#fff7ed] text-black hover:border-black hover:bg-yellow-400"
              } cursor-pointer`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
export default FilterBar;
