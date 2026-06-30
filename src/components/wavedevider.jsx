import { useEffect, useRef } from "react";
import { gsap } from "gsap";

// the curve's anchor + control points from your original path, each gets
// its own phase offset so they don't all rise/fall in lockstep
const BASE_POINTS = [
  { x: -1, y: 154.70884 },
  { x: 184.32, y: 45.29116 },
  { x: 460.8, y: 174.70884 },
  { x: 860.16, y: 100.581796 },
  { x: 1121.28, y: 142.080934 },
  { x: 1413.12, y: 106.934227 },
  { x: 1536, y: 103.065773 },
];

export default function JellyWave({
  color = "#FF4128",
  amplitude = 18,
  speed = 0.6,
}) {
  const pathRef = useRef(null);

  useEffect(() => {
    const state = { t: 0 };

    const tick = () => {
      state.t += speed * (gsap.ticker.deltaRatio() * 0.016);

      const p = BASE_POINTS.map((pt, i) => ({
        x: pt.x,
        y: pt.y + Math.sin(state.t + i * 0.9) * amplitude,
      }));

      const d =
        `M1536,0 H-1 V${p[0].y} ` +
        `S${p[1].x},${p[1].y} ${p[2].x},${p[2].y} ` +
        `S${p[3].x},${p[3].y} ${p[4].x},${p[4].y} ` +
        `S${p[5].x},${p[5].y} ${p[6].x},${p[6].y} V0`;

      pathRef.current?.setAttribute("d", d);
    };

    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, [amplitude, speed]);

  return (
    <div className="z-99 w-full absolute left-0 right-0 overflow-x-clip max-md:left-0 max-md:right-0  rotate-180">
      <svg
        className="pointer-events-none block w-full max-w-[100vw] h-75 max-md:h-auto"
        width="100%"
        viewBox="0 0 1536 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path ref={pathRef} fill={color} />
      </svg>
    </div>
  );
}
