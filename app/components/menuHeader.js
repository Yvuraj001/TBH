export default function MenuHeader() {
  return (
    <div className="relative min-h-72 overflow-hidden rounded-t-[2.5rem] border-2 border-black/10 bg-[#f7d9a8] px-6 py-10 text-center shadow-xl sm:min-h-80 sm:px-10 sm:py-14 select-none">
      <img
        src="/images/img-webp/tomato.webp"
        alt=""
        className="pointer-events-none absolute -left-10 xl:-left-14 top-4 w-32 -rotate-12 select-none sm:-left-3 sm:w-44"
      />
      <img
        src="/images/img-webp/lettuce.webp"
        alt=""
        className="pointer-events-none absolute -right-12 xl:-right-16 top-2 w-36 rotate-12 select-none sm:-right-3 sm:w-48 xl:top-10"
      />

      <p className="relative z-10 font-memories text-sm tracking-[0.24em] text-red-500 uppercase sm:text-base">
        Bold flavor, zero boredom
      </p>
      <h1 className="relative z-10 mt-2 font-modak text-5xl leading-none text-red-500 [-webkit-text-stroke:5px_white] [paint-order:stroke] sm:text-7xl">
        Pick Your Treat
      </h1>
      <p className="relative z-10 mx-auto mt-4 max-w-md text-sm font-semibold text-black/65 sm:text-base">
        Explore the delicious flavors  our menu.
      </p>

      <div className="relative z-10 mt-7 flex justify-center gap-2">
        {Array.from({ length: 9 }).map((_, i) => (
          <span
            key={i}
            className={`h-3 w-3 rounded-sm ${i % 2 === 0 ? "bg-red-500" : "bg-yellow-400"}`}
          />
        ))}
      </div>
    </div>
  );
}
