const Navbar = () => {
  return (
    <nav className="navbar flex justify-between px-5 py-2 mx-6  sticky top-0 backdrop-blur-[3px] border-2 border-yellow-600 bg-[#ffa31f78] rounded-b-4xl items-center shadow-xl ">
      <a
        href="/"
        className="font-modak text-red-500 text-3xl md:text-5xl [-webkit-text-stroke:5px_white] [paint-order:stroke] cursor-pointer"
      >
        TBH
      </a>
      <ul className="flex-center sm:gap-7 gap-3 text-white">
        <li>
          <a href="#burger">
            <button className="burger-btn">Burgers</button>
          </a>
        </li>
        <li>
          <a href="#menu">
            <button className="menu-btn">
              <span className="text-sm">MENU</span>
            </button>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
