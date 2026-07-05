import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitText from "gsap/SplitText.js";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const FifthSection = () => {
  useGSAP(() => {
    const texts = new SplitText(".textContainer", { type: "lines" });

  gsap.fromTo(
    ".text-1",
    { y: 400 },
    {
      y: 0,
      duration: 1.4,
      ease: "expo",
      scrollTrigger: { trigger: ".text-1", start: "top 130%" },
    },
  );
  gsap.fromTo(
    ".text-2",
    { y: 400 },
    {
      y: 0,
      duration: 1.4,
      ease: "expo",
      scrollTrigger: { trigger: ".text-2", start: "top 130%" },
    },
  );
  gsap.fromTo(
    ".text-3",
    { y: 400 },
    {
      y: 0,
      duration: 1.4,
      ease: "expo",
      scrollTrigger: { trigger: ".text-3", start: "top 130%" },
    },
  );
  gsap.fromTo(
    ".text-4",
    { y: 400 },
    {
      y: 0,
      duration: 1.4,
      ease: "expo",
      scrollTrigger: { trigger: ".text-3", start: "top 130%" },
    },
  );

  // animating image opacity
  ["1", "2", "3", "4"].forEach((n) => {
    gsap.fromTo(
      `.text-${n}`,
      { y: 400 },
      {
        y: 0,
        duration: 1.4,
        ease: "expo",
        scrollTrigger: { trigger: `.text-${n}`, start: "top 130%" },
      },
    );
    gsap.fromTo(
      `.img-${n}`,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1.4,
        ease: "expo",
        scrollTrigger: { trigger: `.text-${n}`, start: "top 130%" },
      },
    );
  });
    ScrollTrigger.refresh();
  }, []);
  return (
    <section id="fifth" className="  bg-[#f5e3cd]">
      <div className="textContainer relative text-center text-[18vw] leading-none font-Memories [-webkit-text-stroke:12px_white] [paint-order:stroke] text-[#ff0f0f] overflow-hidden">
        <div className="upperMost text-[3vw] [-webkit-text-stroke:5px_white] font-modak">
          PURE QUALITY
        </div>

        <div className="relative overflow-hidden">
          <div className="imgCont img-1 absolute lg:left-50 left-30  ">
            <img src="/images/lettuce.webp" className="lg:w-85 w-40" alt="" />
          </div>
          <span className="text-1 inline-block relative text-[16vw]">
            EVERY LAYER
          </span>
        </div>

        <div className="relative -mt-5 md:-mt-7 lg:-mt-10 overflow-hidden">
          <div className="imgCont img-2 absolute lg:top-10  lg:right-50 right-20 rotate-10">
            <img src="/images/tomato.webp" className="lg:w-60 w-30" alt="" />
          </div>
          <span className="text-2 inline-block relative">PACKED WITH</span>
        </div>

        <div className="relative -mt-5 md:-mt-7 lg:-mt-10 overflow-hidden">
          <div className="imgCont img-3 absolute lg:top-20 lg:left-70 left-20 ">
            <img src="/images/img-webp/cheese.webp" className="lg:w-90 w-50" alt="" />
          </div>
          <span className="text-3 inline-block relative">SIGNATURE</span>
        </div>

        <div className="relative -mt-8 md:-mt-8 lg:-mt-12 overflow-hidden">
          <div className="imgCont img-4 absolute l top-10 lg:right-80 right-40 ">
            <img src="/images/img-webp/meat.webp" className="lg:w-70 w-30 md:block hidden xl:block lg:hidden" alt="" />
          </div>
          <span className="text-4 inline-block relative text-[16vw]">
            FLAVOUR
          </span>
        </div>
      </div>
    </section>
  );
};

export default FifthSection;
