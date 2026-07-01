import Eyes from "./Eyes";
import JellyWave from "./wavedevider";

const ThirdSection = () => {
  return (
    <section id="third" className="bg-[#ff0000] relative top-0 ">
      <div className="main flex items-center flex-col  relative overflow-x-hidden">
        <div className="topMostText font-modak [-webkit-text-stroke:12px_white] [paint-order:stroke] text-[#ff0000] text-4xl md:text-[4vw] -rotate-5 md:left-25 left-20 z-1000 h-10 mt-5 md:mt-0 ">
          Experience
        </div>
        <div className="topSection text-[16vw] font-memories tracking-wide flex flex-col text-[#ffffc7] mt-15 ">
          <span className="lg:h-57.5 h-20 relative flex items-center">
            <img
              src="/images/fries.webp"
              alt=""
              className="absolute right-full mr-[2vw] w-[10vw] md:w-[13vw] rotate-13"
            />
            Food That
          </span>

          <span className="lg:h-58.5 h-25 relative flex items-center text-shadow-2xl">
            Feels Good
            <div className="absolute left-full ml-[2vw] w-[13vw] md:w-[19vw] rotate-15">
              <img src="/images/burger.webp" alt="" className="w-full" />
            </div>
          </span>
        </div>
        <div className="bottomSection font-memories text-2xl lg:text-[1.7vw] flex items-center justify-around p-5 w-full overflow-x-hidden">
          <div className="leftText w-40 3xl:w-69 relative top-10 font-bold tracking-wide">
            40 kcal <br /> High Protien <br /> Fresh Ingredient
          </div>
          <div className="img relative">
            <img
              src="/images/burgerwithhands.webp"
              className="w-[80vw]"
              alt=""
            />
            <Eyes />
          </div>
          <div className="rightText w-40 relative top-10 font-bold tracking-wide">
            100% Orgainc <br /> Zero Guilt <br />
            True Taste
          </div>
        </div>
      </div>
      <div className="jelly relative rotate-180 lg:top-15 top-11 md:top-25 ">
        <JellyWave />
      </div>
    </section>
  );
};

export default ThirdSection;
