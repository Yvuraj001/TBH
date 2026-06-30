import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import DeviceBlock from "./components/DeviceBlock";
import Info from "./components/Info";
import CursorTrail from "./components/cursorTrail";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";

const App = () => {
  // lenis scroll
  useEffect(() => {
    const lenis = new Lenis({ autoRaf: false });

    lenis.on("scroll", ScrollTrigger.update);

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    return () => lenis.destroy();
  }, []);

  return (
    <DeviceBlock>
      <CursorTrail
        items={[
          { src: "/images/img-webp/lettuce.webp", alt: "lettuce" },
          { src: "/images/img-webp/tomato.webp", alt: "tomato" },
          { src: "/images/img-webp/cheese.webp", alt: "cheese", rotate: -135 },
          { src: "/images/img-webp/meat.webp", alt: "patty" },
          { src: "/images/img-webp/meat.webp", alt: "patty" },
          { src: "/images/img-webp/meat.webp", alt: "patty" },
        ]}
        ineWidth={50}
        size={"42px"}
      />
      <main className="w-screen h-screen   select-none">
        <Navbar />
        <Hero />
        <Info />
        
      </main>
    </DeviceBlock>
  );
};

export default App;
