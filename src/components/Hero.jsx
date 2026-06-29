import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

const Hero = () => {
  useGSAP(() => {
      document.fonts.ready.then(() => {
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

    gsap.to(
      ".burger-text",
      {
        scale: 1,
        duration: 1.8,
        ease: "elastic.out",
      },
      0.2,
    );
    gsap.to(
      ".house",
      {
        scale: 1,
        duration: 1.8,
        ease: "elastic.out",
      },
      0.4,
    );

    // burgerimg animation
    gsap.to(".burger-img", { scale: 1 });
    burgerTimeline.to(
      ".burger-img",
      {
        y: 100,
        duration: 3,
        repeat: -1,
        yoyo: true,
      },
      0.6,
    );

    // animating Veggies
    gsap.to(".tomato", {
      left: -120,
      duration: 1.1,
      ease: "expo.out",
      delay: 1.4,
    });
    gsap.to(".lettuce", {
      right: -150,
      duration: 1.1,
      ease: "expo.out",
      delay: 1.5,
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
        delay: 0.7,
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
        delay: 0.7,
        stagger: 0.3,
        ease: "power1.in",
      },
    );
  })
  }, []);
  return (
    <section id="hero" className="hero-height overflow-x-hidden">
      <div id="top-section" className="grid place-items-center">

        <h1 className="title col-start-1 row-start-1 sm:text-[30vw] text-[130px] font-bolder leading-none sm:font-bold  whitespace-nowrap pointer-events-none select-none font-memories sm:[-webkit-text-stroke:16px_white] [paint-order:stroke] text-red-500 text-center sm:tracking-[25px] -translate-y-5 relative w-screen [-webkit-text-stroke:5px_white]">
          
          <div className={`burger-text scale-0`}>BURGER</div>
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

        <div className="relative w-full flex flex-col items-center justify-center lg:flex-row lg:-translate-y-15 p-5 gap-4">

          <div className="left order-2 relative lg:absolute lg:order-1 lg:right-[80vw] lg:top-1/2 lg:-translate-y-1/2 max-w-md lg:text-2xl text-[20px] text-center lg:text-start font-memories pl-3 pr-2 font-light">
            Smashed hot on the flat top, our prime patties lock in ultimate
            juiciness under a caramelized crust.
          </div>

          <span className="house order-1 text-amber-400 font-modak text-[18vw] font-normal scale-0 [-webkit-text-stroke:12px_white] [paint-order:stroke] sm:translate-y-10">
            HOUSE
          </span>

          <div className="right order-3 relative lg:absolute lg:left-[80vw] lg:top-1/2 lg:-translate-y-1/2 max-w-md text-[20px] lg:text-[22px] text-center lg:text-start pr-3 pl-7 font-memories font-light wrap-break-word">
            Topped with melted cheddar and our signature chili honey glaze
            crafted to satisfy your cravings since 1997.
          </div>
        </div>

        <img
          src="/images/burgerH.webp"
          alt="Burger"
          className="burger-img col-start-1 row-start-1 z-10 w-100  lg:w-135 translate-y-32 lg:translate-y-40 scale-0  "
        />
      </div>
    </section>
  );
};

export default Hero;
