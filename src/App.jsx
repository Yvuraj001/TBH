import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import DeviceBlock from "./components/DeviceBlock";
import Info from "./components/Info";
import CursorTrail from "./components/cursorTrail";
import ThirdSection from "./components/ThirdSection";
import FourthSection from "./components/FourthSection";
import FifthSection from "./components/FifthSection";
import Footer from "./components/Footer";
import HomeLoader from "./components/HomeLoader";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {SplitText} from "gsap/all";
import {InertiaPlugin} from "gsap/all";
import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger, SplitText, InertiaPlugin);
const App = () => {
  // lenis scroll

  useEffect(() => {
    const lenis = new Lenis();

    lenis.on("scroll", ScrollTrigger.update);

    // single source of truth for the raf loop — removed the duplicate requestAnimationFrame loop
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove((time) => lenis.raf(time * 1000)); // clean up ticker too
      lenis.destroy();
    };
  }, []);

  return (
    <DeviceBlock>
      <HomeLoader/>
      <CursorTrail
        items={[
          { src: "/images/img-webp/lettuce.webp", alt: "lettuce" },
          { src: "/images/img-webp/tomato.webp", alt: "tomato" },
          { src: "/images/img-webp/cheese.webp", alt: "cheese", rotate: -135 },
          { src: "/images/img-webp/meat.webp", alt: "patty" },
        ]}
        ineWidth={10}
        size={"32px"}
      />
      <main className="w-full select-none">
        <Navbar />
        <Hero />
        <Info />
        <ThirdSection />
        <FourthSection />
        <FifthSection/>
        <Footer />
      </main>
    </DeviceBlock>
  );
};;

export default App;
