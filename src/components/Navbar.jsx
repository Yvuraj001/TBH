import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between px-5 py-2 mx-6 my-4 sticky top-2 z-4  ">
      <div className="font-modak text-red-500 text-5xl [-webkit-text-stroke:5px_white] [paint-order:stroke]">
        TBH
      </div>
      <ul className="flex-center gap-7 text-white">
        <li>
          <a href="#burger">
            <button className="bg-red-500 text-white px-5 py-2.5 rounded-3xl cursor-pointer    hover:bg-black transition-all ease-in duration-150 hover:transform hover:scale-[1.09]">
              Burgers
            </button>
          </a>
        </li>
        <li>
          <a href="#hero">
            <button className="bg-transparent text-black px-6 py-2 rounded-3xl cursor-pointer border-2 border-[#ceb79c] hover:border-[#000000] transition-all ease-in duration-150 hover:transform hover:scale-[1.09]">
              <span className="text-sm">MENU</span>
            </button>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
