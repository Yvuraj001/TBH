import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const DEFAULT_ITEMS = [
  { src: "/img-webp/lettuce.webp", alt: "lettuce", rotate: 0 },
  { src: "/img-webp/tomato.webp", alt: "tomato", rotate: 0 },
  { src: "/img-webp/cheese-logo.webp", alt: "cheese", rotate: -135 },
  { src: "/img-webp/meat.webp", alt: "patty", rotate: 0 },
];

export default function CursorTrail({
  items = DEFAULT_ITEMS,
  lag = 0.2, // 0-1, lower = laggier chain
  headEase = 0.17, // how fast the lead bubble catches the real cursor
  size = "3vw", // bubble diameter (desktop)
  mobileSize = "9vw", // bubble diameter (mobile, only relevant if you remove max-md:hidden)
  lineWidth = 3, // white trail thickness in px
}) {
  const pathRef = useRef(null);
  const bubbleRefs = useRef([]);

  useEffect(() => {
    if (window.matchMedia("(max-width: 768px)").matches) return; // desktop only

    const mouse = { x: innerWidth / 2, y: innerHeight / 2 };
    const positions = items.map(() => ({ ...mouse }));

    bubbleRefs.current.forEach((el) => {
      if (el)
        gsap.set(el, { xPercent: -50, yPercent: -50, x: mouse.x, y: mouse.y });
    });

    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove);

    const buildPath = (pts) => {
      let d = `M ${pts[0].x} ${pts[0].y}`;
      for (let i = 1; i < pts.length - 1; i++) {
        const xc = (pts[i].x + pts[i + 1].x) / 2;
        const yc = (pts[i].y + pts[i + 1].y) / 2;
        d += ` Q ${pts[i].x} ${pts[i].y} ${xc} ${yc}`;
      }
      const last = pts[pts.length - 1];
      d += ` L ${last.x} ${last.y}`; // finish exactly at the lead point
      return d;
    };

    const tick = () => {
      // lead bubble eases straight toward the cursor
      positions[0].x += (mouse.x - positions[0].x) * headEase;
      positions[0].y += (mouse.y - positions[0].y) * headEase;

      for (let i = 1; i < positions.length; i++) {
        positions[i].x += (positions[i - 1].x - positions[i].x) * lag;
        positions[i].y += (positions[i - 1].y - positions[i].y) * lag;
      }
      positions.forEach((p, i) => {
        const el = bubbleRefs.current[i];
        if (el) gsap.set(el, { x: p.x, y: p.y });
      });

      // line is drawn through every bubble's current center, in order —
      // anchored to the eased lead bubble (not the raw cursor) so the
      // line stays synced to the first image, never poking out past it
      pathRef.current?.setAttribute("d", buildPath(positions));
    };

    gsap.ticker.add(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      gsap.ticker.remove(tick);
    };
  }, [items, lag, headEase]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[10000] max-md:hidden">
      <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
        <path
          ref={pathRef}
          fill="none"
          stroke="#fff"
          strokeWidth={lineWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {items.map((item, i) => (
        <div
          key={item.alt}
          ref={(el) => (bubbleRefs.current[i] = el)}
          className="absolute left-0 top-0"
          style={{ zIndex: 10000 - i, rotate: `${item.rotate}deg` }}
        >
          <div
            className="grid place-items-center rounded-full border border-black/20 bg-white/80 backdrop-blur-md"
            style={{ width: size, height: size }}
          >
            <img
              src={item.src}
              alt={item.alt}
              draggable="false"
              className="h-[70%] w-[70%] select-none object-contain"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
