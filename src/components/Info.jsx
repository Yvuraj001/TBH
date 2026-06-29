import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/all";
import { InertiaPlugin } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, SplitText, InertiaPlugin);
const Info = () => {
  useGSAP(() => {
    const paraLines = new SplitText(".bottomText-text", { type: "lines" });
    gsap.set([".topText-1", ".topText-2"], { scale: 0 });

    // animating top text
    const textTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#info",
        start: "top 75%",
        toggleActions: "play none none none",
      },
    });

    textTl
      .to(".topText-1", { scale: 1, duration: 1.8, ease: "elastic.out" }, 0)
      .to(".topText-2", { scale: 1, duration: 1.8, ease: "elastic.out" }, 0.2);

    // animating bottomText

    textTl.fromTo(
      paraLines.lines,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "expo",
        stagger: 0.3,
        delay: 0.7,
      },
      0.4,
    );

    // animating images in bottom with cursor intraction

    let oldX = 0;
    let oldY = 0;
    let displacedX = 0;
    let displacedY = 0;
    let speed = 80;
    
    window.addEventListener("mousemove", (e) => {
      displacedX = e.clientX - oldX;
      displacedY = e.clientY - oldY;
      oldX = e.clientX;
      oldY = e.clientY;
    });

    document.querySelectorAll(".images").forEach((i) => {
      i.addEventListener("mouseenter", () => {
        const tl = gsap.timeline();
        const images = i.querySelector("img");
        const maxV = 900;

        tl.to(images, {
          inertia: {
            x: {
              velocity: gsap.utils.clamp(-maxV, maxV, displacedX * speed),
              end: 0,
            },
            y: {
              velocity: gsap.utils.clamp(-maxV, maxV, displacedY * speed),
              end: 0,
            },
          },
        });
      });
    });
  }, []);
  return (
    <section id="info" className="h-full relative mt-5 ">
      <div className="textSection font-Memories relative">
        <div className="top absolute text-[5vw] md:text-[4vw] font-modak [-webkit-text-stroke:12px_white] [paint-order:stroke] text-[#ff0f0f] rotate-335 md:left-25 left-20 z-10">
          Top Classic
        </div>
        <div className="topText-1 text-[17vw] text-center flex items-center justify-center gap-5 [-webkit-text-stroke:12px_white] [paint-order:stroke] tracking-wider h-25 font-bold  ">
          <div className="text-[#ffba00]">Juicy</div>{" "}
          <div className="text-amber-500">Cheesy</div>
        </div>
        <div className="topText-2 text-[18vw] text-[#ff0f0f] text-center flex items-center justify-center gap-5 [-webkit-text-stroke:10px_white] [paint-order:stroke] tracking-wide ">
          <div>FUlly</div>
          <div>Loaded</div>
        </div>
        <div className="bottomText text-2xl md:text-3xl h-fit text-center mx-auto text-black/70 overflow-y-hidden  ">
          <div className="bottomText-text">
            TBH is back and bloder than ever. Honoring our rich roots. We bring
            you our <br />
            ultimate smashed experience fully loaded, hot and fresh crafted{" "}
          </div>
        </div>
      </div>
      <div className="bottomSection flex  items-center gap-9 mt-10 relative w-[70vw] mx-auto">
        <div className="max-w-1/3 object-cover images">
          <img
            src="/images/about-1.jpg"
            className=" rounded-2xl rotate-11"
            alt=""
          />
        </div>
        <div className="max-w-1/3 object-cover images">
          {" "}
          <img
            src="/images/about-2.jpg"
            className=" rounded-2xl rotate-345"
            alt=""
          />
        </div>
        <div className="max-w-1/3 object-cover images">
          <img
            src="/images/about-3.jpg"
            className="  rounded-2xl rotate-12"
            alt=""
          />
        </div>

        <div className="sticker hidden lg:block absolute -right-40 bottom-90 md:bottom-50 rotate-18">
          <img
            src="/images/burgerselfie.png"
            className="w-40 lg:w-60 selfie"
            alt=""
          />
        </div>
      </div>
    </section>
  );
};

export default Info;

// useGSAP(() => {
//   let oldX = 0;
//   let oldY = 0;
//   let displacedX = 0;
//   let displacedY = 0;
//   let speed = 30;

//   window.addEventListener("mousemove", (e) => {
//     displacedX = e.clientX - oldX;
//     displacedY = e.clientY - oldY;
//     oldX = e.clientX;
//     oldY = e.clientY;
//   });

//   document.querySelectorAll(".images").forEach((i) => {
//     i.addEventListener("mouseenter", () => {
//       const tl = gsap.timeline();
//       const images = i.querySelector("img");
//       const maxV = 500;

//       tl.to(images, {
//         inertia: {
//           x: {
//             velocity: gsap.utils.clamp(-maxV, maxV, displacedX * speed),
//             end: 0,
//           },
//           y: {
//             velocity: gsap.utils.clamp(-maxV, maxV, displacedY * speed),
//             end: 0,
//           },
//         },
//       });
//     });
//   });
// }, []);
