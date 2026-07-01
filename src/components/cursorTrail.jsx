"use client";
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
  trailLength = 22, // total points along the line — more = longer, flexible curve
  ease = 0.51, // how fast each point chases the one before it
  size = "3vw",
  lineWidth = 3,
}) {
  const pathRef = useRef(null);
  const bubbleRefs = useRef([]);
  const points = useRef([]);

  useEffect(() => {
    if (window.matchMedia("(max-width: 1096px)").matches) return;

    const mouse = { x: innerWidth / 2, y: innerHeight / 2 };
    points.current = Array.from({ length: trailLength }, () => ({ ...mouse }));

    // bubbles are markers at evenly spaced indices along the dense trail
    const step = (trailLength - 1) / (items.length - 1);
    const bubbleIndices = items.map((_, i) => Math.round(i * step));

    bubbleRefs.current.forEach((el) => {
      if (el)
        gsap.set(el, { xPercent: -50, yPercent: -50, x: mouse.x, y: mouse.y });
    });

    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove);

    // Catmull-Rom -> Bezier through every point = smooth flexible curve
    const buildPath = (pts) => {
      let d = `M ${pts[0].x} ${pts[0].y}`;
      for (let i = 0; i < pts.length - 1; i++) {
        const p0 = pts[i - 1] || pts[i];
        const p1 = pts[i];
        const p2 = pts[i + 1];
        const p3 = pts[i + 2] || p2;
        const c1x = p1.x + (p2.x - p0.x) / 6;
        const c1y = p1.y + (p2.y - p0.y) / 6;
        const c2x = p2.x - (p3.x - p1.x) / 6;
        const c2y = p2.y - (p3.y - p1.y) / 6;
        d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2.x} ${p2.y}`;
      }
      return d;
    };

    const tick = () => {
      const pts = points.current;
      pts[0].x += (mouse.x - pts[0].x) * ease;
      pts[0].y += (mouse.y - pts[0].y) * ease;
      for (let i = 1; i < pts.length; i++) {
        pts[i].x += (pts[i - 1].x - pts[i].x) * ease;
        pts[i].y += (pts[i - 1].y - pts[i].y) * ease;
      }

      bubbleIndices.forEach((idx, i) => {
        const el = bubbleRefs.current[i];
        if (el) gsap.set(el, { x: pts[idx].x, y: pts[idx].y });
      });

      pathRef.current?.setAttribute("d", buildPath(pts));
    };

    gsap.ticker.add(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      gsap.ticker.remove(tick);
    };
  }, [items, trailLength, ease]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[10000] max-[1096px]:hidden">
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
