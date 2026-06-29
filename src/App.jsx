import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import DeviceBlock from "./components/DeviceBlock";
import Info from "./components/Info";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";


const App = () => {
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
      <main className="w-screen h-screen ">
        <Navbar />
        <Hero />
        <Info/>
      </main>
    </DeviceBlock>
  );
};

export default App;
