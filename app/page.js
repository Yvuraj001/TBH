"use client";

import Hero from "./components/Hero";
import LenisConfig from "./LenisConfig";
import Info from "./components/Info";
import CursorTrail from "./components/cursorTrail";
import ThirdSection from "./components/ThirdSection";
import FourthSection from "./components/FourthSection";
import FifthSection from "./components/FifthSection";
import Footer from "./components/Footer";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/all";
import { InertiaPlugin } from "gsap/all";

import gsap from "gsap";
import HomeLoader from "./components/HomeLoader";
import PurchasePopup from "./components/PurchasePopup";

gsap.registerPlugin(ScrollTrigger, SplitText, InertiaPlugin);
const App = () => {
  return (
    <>
    <PurchasePopup />
    <LenisConfig/>
    <HomeLoader/>
      <CursorTrail
        items={[
          { src: "/images/img-webp/lettuce.webp", alt: "lettuce" },
          { src: "/images/img-webp/tomato.webp", alt: "tomato" },
          {
            src: "/images/img-webp/cheese.webp",
            alt: "cheese",
            rotate: -135,
          },
          { src: "/images/img-webp/meat.webp", alt: "patty" },
        ]}
        ineWidth={10}
        size={"32px"}
      />
      <main className="w-full select-none">
        <Hero />
        <Info />
        <ThirdSection />
        <FourthSection />
        <FifthSection />
        <Footer />
      </main>
    </>
  );
};

export default App;
