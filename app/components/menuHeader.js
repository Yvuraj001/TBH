export default function MenuHeader() {
  return (
    <div className="relative overflow-hidden bg-[#F7D9A8] pt-12 pb-8 rounded-t-4xl select-none">
      {/* floating ingredient cutouts */}
      <img
        src="/images/img-webp/tomato.webp"
        alt=""
        className="pointer-events-none absolute -left-15 top-4 w-32 -rotate-12 select-none md:w-40"
      />
      <img
        src="/images/img-webp/lettuce.webp"
        alt=""
        className="pointer-events-none absolute -right-11 top-5 w-36 rotate-359 select-none md:w-44"
      />

      <h1 className="relative z-10 text-center text-5xl font-bold text-red-500 [text-shadow:2px_2px_0_white,-2px_-2px_0_white,2px_-2px_0_white,-2px_2px_0_white]">
        Our Menu
      </h1>

      {/* red square divider */}
      <div className="relative z-10 mt-6 flex justify-center gap-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <span key={i} className="h-3 w-3 rounded-sm bg-red-500" />
        ))}
        
      </div>
    </div>
  );
}
