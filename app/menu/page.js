"use client";
import menuItems from "../components/Menu";
import MenuCard from "../components/MenuCard";
import CartPopup from "../components/CartOverlay";
import { useState } from "react";

const MenuPage = () => {

  const [cartItems, setCartItems] = useState([]);
  const [cartVisiblity, setcartVisiblity] = useState(false);

  // getting cart info
  const onCardClick = (item, quantity) => {
     setCartItems((prev) => [...prev, { ...item, quantity }]);

 

   
  };
  // showing cart
  const showCart = () => {
    setcartVisiblity(!cartVisiblity);
  };

  // hiding cart
  const handleCartClose = () => {
    setcartVisiblity(!cartVisiblity);
  };

  // increment and decrement fo items

  return (
    <main className="min-h-screen bg-[#f5e3cd]">
      <div className="cartOverlay">
        {cartVisiblity ? (
          <CartPopup items={cartItems} onClose={handleCartClose} />
        ) : (
          ""
        )}
      </div>
      <section className="max-w-7xl mx-auto px-6 py-14">
        <h1 className="font-modak text-red-500 [-webkit-text-stroke:6px_white] [paint-order:stroke] text-5xl md:text-6xl text-center mb-12">
          Our Menu
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems.map((item, index) => (
            <MenuCard key={index} item={item} onCardClick={onCardClick} />
          ))}
        </div>

        {/* cart icon */}
        <div
          onClick={showCart}
          className="cartCont bg-red-500 fixed right-10 bottom-10   rounded-full flex items-center justify-center p-5 cursor-pointer hover:bg-black transition-colors duration-300"
        >
       
          <div className="svg">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MenuPage;
