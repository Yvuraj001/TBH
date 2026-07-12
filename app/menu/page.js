"use client";
import {menuItems, categories} from "../components/Menu";
import MenuCard from "../components/MenuCard";
import CartPopup from "../components/CartOverlay";
import FilterBar from "../components/Filters";
import { useState } from "react";
import MenuHeader from "../components/menuHeader";
 

const MenuPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartVisiblity, setcartVisiblity] = useState(false);
  const [notificationVisiblity, setnotificationVisiblity] = useState(false);
  const [active, setActive] = useState(0);
  const [selectedFilter, setselectedFilter] = useState("All");


  // getting cart info
  const onCardClick = (item, quantity) => {
    setCartItems((prev) => [...prev, { ...item, quantity }]);
    setnotificationVisiblity(true);
    notificationFunction();
  };

  // showing cart
  const showCart = () => {
    setcartVisiblity(!cartVisiblity);
  };

  // hiding cart
  const handleCartClose = () => {
    setcartVisiblity((prev) => !prev);
  };

  // UpdateQuantity
  const updateQuantity = (id, change) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.quantity + change < 1) {
          return item.id === id ? { ...item, quantity: 1 } : item;
        }

        return item.id === id
          ? { ...item, quantity: item.quantity + change }
          : item;
      }),
    );
  };
  // handle Delete

  const handleDelete = (id) => {
    let newCart = cartItems.filter((item) => {
      return item.id != id;
    });

    setCartItems(newCart);
  };

  const notificationFunction = () => {
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(setnotificationVisiblity(false));
      }, 1200);
    });
  };
  // sets filters
  const handleActivity = (i) => {
    setActive(i);
    setselectedFilter(() => categories[i]);
  };

  const filteredItems =
    selectedFilter == "All"
      ? menuItems
      : menuItems.filter(
          (item) => item.type.toLowerCase() === selectedFilter.toLowerCase(),
        );
  

  return (
    <main className="min-h-screen bg-[#ffc286]">
      <div className="cartOverlay">
        {cartVisiblity ? (
          <CartPopup
            items={cartItems}
            onClose={handleCartClose}
            updateQuantity={updateQuantity}
            handleDelete={handleDelete}
          />
        ) : (
          ""
        )}
      </div>
      <section className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
        <MenuHeader />
        <FilterBar
          active={active}
          setActive={setActive}
          handleActivity={handleActivity}
          categories={categories}
        />
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3 px-2">
          <div>
            <p className="font-memories text-sm tracking-[0.2em] text-red-500 uppercase">Fresh from the kitchen</p>
            <h2 className="mt-1 text-2xl font-black sm:text-3xl">Choose your delicious</h2>
          </div>
          <p className="rounded-full border-2 border-black/10 bg-white/70 px-4 py-2 text-sm font-bold">Cooked to perfection</p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 sm:gap-7">
          {filteredItems.map((item, index) => (
            <MenuCard
              key={index}
              item={item}
              onCardClick={onCardClick}
              updateQuantity={updateQuantity}
            />
          ))}
        </div>

        {/* cart icon */}
        <div
          onClick={showCart}
          className="cartCont fixed bottom-6 right-5 z-10000 flex items-center justify-center rounded-full border-2 border-black bg-red-500 p-4 text-white shadow-[4px_4px_0_#000] transition-all duration-300 hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-black hover:shadow-none cursor-pointer sm:bottom-9 sm:right-9 sm:p-5"
        >
          <div
            className={`alert absolute right-16 z-10000 w-32 rounded-2xl border-2 border-black bg-yellow-400 px-4 py-2 text-center text-sm font-bold text-black shadow-[3px_3px_0_#000] sm:right-20 ${notificationVisiblity ? "opacity-[1]" : "opacity-0"} transition-opacity duration-500 ease-out`}
          >
            Item added !!
          </div>
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
