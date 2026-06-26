import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
const Info = () => {
  useGSAP(() => {
    gsap.set([".topText-1", ".topText-2"], { scale: 0 });
    const textTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#info",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.to(".topText-1", {
      scale: 1,
      ease: "elastic.out",
      duration: 1.4,
      delay: 0.3,
    });
    gsap.to(".topText-2", {
      scale: 1,
      duration: 1.4,
      ease: "elastic.out",
      delay: 0.3,
    });
    gsap.to(".top", {
      scale: 1,
      duration: 1.4,
      ease: "elastic.out",
      delay: 0.3,
    rotate: -20
    });
  }, []);
  return (
    <section id="info" className="">
      <div className="textSection font-Memories relative">
        <div className="top absolute text-4xl md:text-6xl font-modak [-webkit-text-stroke:12px_white] [paint-order:stroke] text-[#ff0f0f] rotate-335 md:left-25 left-20 z-10 scale-0">
          Top Classic
        </div>
        <div className="topText-1 text-[17vw] text-center flex items-center justify-center gap-5 [-webkit-text-stroke:12px_white] [paint-order:stroke] tracking-wider h-25 font-bold  ">
          <div className="text-[#ffba00]">Juicy</div>{" "}
          <div className="text-amber-500">Cheesy</div>
        </div>
        <div className="topText-2 text-[18vw] text-[#ff0f0f] text-center flex items-center justify-center gap-5 [-webkit-text-stroke:10px_white] [paint-order:stroke] tracking-wide ">
          <div>FUlly</div> <div>Loaded</div>
        </div>
        <div className="bottomText text-2xl md:text-4xl w-fit text-center mx-auto text-black/70">
          TBH is back and bloder than ever. Honoring our rich roots. We bring
          you our <br />
          ultimate smashed experience fully loaded, hot and fresh crafted{" "}
        </div>
      </div>
      <div className="bottomSection flex justify-center items-center gap-9 mt-10 relative">
        <img
          src="/images/about-1.jpg"
          className="md:w-70 md:h-90 w-50 h-60 rounded-2xl rotate-11"
          alt=""
        />
        <img
          src="/images/about-2.jpg"
          className="md:w-70 md:h-90 w-50 h-60 rounded-2xl rotate-345"
          alt=""
        />
        <img
          src="/images/about-3.jpg"
          className="md:w-70 md:h-90 w-50 h-60  rounded-2xl rotate-12"
          alt=""
        />
        <div className="sticker absolute left-0 bottom-70 md:bottom-50 rotate-18">
          <img
            src="/images/burgerselfie.png"
            className=" w-40 md:w-60 selfie"
            alt=""
          />
        </div>
      </div>
    </section>
  );
};

export default Info;
