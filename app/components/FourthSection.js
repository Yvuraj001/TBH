import React from "react";
import JellyWave from "./wavedevider";

const FourthSection = () => {
  return (
    <section id="fourth">
      <div className="image ">
        <img src="/images/cheesyBurger.jpg" className="rounded-5xl" alt="" />
      </div>
      <div className="jelly  relative -mt-13">
        <JellyWave color="#f5e3cd" />
      </div>
    </section>
  );
};

export default FourthSection;
