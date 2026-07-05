import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitText from "gsap/SplitText.js";
import ScrollTrigger from "gsap/ScrollTrigger.js";
import { useRef } from "react";
const Footer = () => {
  const footerRef = useRef(null);

  useGSAP(() => {
    const logoText = new SplitText(".logoCont", { type: "chars" });

    gsap.fromTo(
      logoText.chars,
      {
        y: 50,
      },
      {
        y: 0,
        stagger: 0.1,
        ease: "elastic.out",
        scrollTrigger: {
          trigger: "#footer",
          start: "center 80%",
        },
      },
    );

   
  }, []);

  return (
    <footer
      id="footer"
      className="bg-[#f3e2ce] overflow-hidden xl:min-h-[70vh] min-h-[40vh] relative"
      ref={footerRef}
    >
      <div className="upper flex justify-between items-center p-4 text-2xl font-memories">
        <div className="Upper-left">
          <ul className="flex items-center gap-7">
            <li>Home</li>
            <li>Burgers</li>
            <li>Contact</li>
          </ul>
        </div>
        <div className="Upper-right">
          &copy; {new Date().getFullYear()} THE BURGER HOUSE
        </div>
      </div>
      <hr className="text-gray-500 text-xl" />
      <div className="bottom">
        <div className="flex justify-between items-center p-4 text-xl font-memories">
          <div className="flex flex-col gap-4">
            <div className="info-text">
              Smashed Patties . Tosted Buns . Yummy Taste
            </div>
            <div className="logoCont font-modak [-webkit-text-stroke:12px_white] [paint-order:stroke] text-[#ff0000] text-[30vw] ml-40 lg:ml-60 xl:h-50 text-shadow-2xs">
              TBH
            </div>
          </div>
        </div>
      </div>

      
    </footer>
  );
};

export default Footer;
