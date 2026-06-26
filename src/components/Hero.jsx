import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

const Hero = () => {
  useGSAP(() => {
    const burgerSplit = new SplitText(".title", { type: "chars" });
    const leftParaSplit = new SplitText(".left", { type: "lines" });
    const rightParaSplit = new SplitText(".right", { type: "lines" });

    const burgerTimeline = gsap.timeline();
    const titleArray = gsap.utils.toArray(burgerSplit.chars);

    titleArray[0].classList.add("redText");
    titleArray[5].classList.add("redText");

    // title's two char animation
    gsap.to(titleArray[0], {
      y: 30,
      rotation: -10,
      duration: 1.4,
      repeat: 4,
      repeatDelay: 2,
      yoyo: true,
      ease: "bounce",
      delay: 1.5,
    });
    gsap.to(titleArray[5], {
      y: 30,
      x: 7,
      rotation: 12,
      duration: 1.4,
      repeat: 3,
      repeatDelay: 2,
      yoyo: true,
      ease: "bounce",
      delay: 1.5,
    });
    // burgerimg animation
    gsap.to(".burger-img",{scale:1})
    burgerTimeline.to(".burger-img", {
      y: 100,
      duration: 3,
      repeat: -1,
      yoyo: true,
    });
    // animating Veggies
    gsap.to(".tomato", {
      left: -120,
      duration: 1.1,
      ease: "expo.out",
      delay: 1,
    });
    gsap.to(".lettuce", {
      right: -150,
      duration: 1.1,
      ease: "expo.out",
      delay: 1.1,
    });

    // animating left and right text lines
    gsap.fromTo(
      leftParaSplit.lines,
      {
        opacity: 0.1,
      },
      {
        opacity: 1,
        duration: 0.9,
        delay: 0.5,
        stagger: 0.3,
        ease: "power1.in",
      },
    );
    gsap.fromTo(
      rightParaSplit.lines,
      {
        opacity: 0.3,
      },
      {
        opacity: 1,
        duration: 0.9,
        delay: 0.5,
        stagger: 0.3,
        ease: "power1.in",
      },
    );
  }, []);
  return (
    <section id="hero" className="hero-height">
      <div id="top-section" className="grid place-items-center">
        <h1 className="title col-start-1 row-start-1 sm:text-[30vw] text-[130px] font-bolder leading-none sm:font-bold  whitespace-nowrap pointer-events-none select-none font-memories sm:[-webkit-text-stroke:16px_white] [paint-order:stroke] text-red-500 text-center sm:tracking-[25px] -translate-y-5 relative w-screen [-webkit-text-stroke:5px_white]">
          BURGER
          <div className="veggies-img flex justify-start  ">
            <img
              src="/images/tomato.webp"
              className="tomato md:w-60 w-55  absolute top-10 md:top-20 sm:-left-48 md:-left-50 -z-1 rotate-90"
              alt=""
            />
            <img
              src="/images/lettuce.webp"
              className="lettuce md:w-80 w-70 absolute top-48 md:top-40 sm:-right-48 md:-right-55 -z-1 rotate-340"
              alt=""
            />
          </div>
        </h1>

        <div className="relative w-full flex justify-center items-center md:-translate-y-15 p-5 gap-4">
          <div className="left absolute  right-[80vw] top-1/2 -translate-y-1/2 max-w-xs md:text-2xl  text-[13px]   text-start font-memories font-normal pl-3 pr-2">
            Smashed hot on the flat top, our prime patties lock in ultimate
            juiciness under a caramelized crust.
          </div>

          <span className="house text-amber-400 font-modak text-[18vw] font-normal [-webkit-text-stroke:12px_white] [paint-order:stroke]">
            HOUSE
          </span>

          <div className="right absolute   left-[80vw] top-1/2 -translate-y-1/2 max-w-xs text-[13px] md:text-[22px] pr-3   pl-7 text-start font-memories font-normal">
            Topped with melted cheddar and our signature chili honey glaze
            crafted to satisfy your cravings.
          </div>
        </div>

        <img
          src="/images/burgerH.webp"
          alt="Burger"
          className="burger-img col-start-1 row-start-1 z-10 w-100 md:w-135 translate-y-32 md:translate-y-40 scale-0"
        />
      </div>
    </section>
  );
};

export default Hero;
