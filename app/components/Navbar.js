"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

const ChevronDown = (p) => (
  <svg
    viewBox="0 0 24 24"
    width={p.size}
    height={p.size}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={p.className}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);
const User = ({ size }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
  </svg>
);
const Package = ({ size }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="m7.5 4.27 9 5.15" />
    <path d="M21 8v8a2 2 0 0 1-1 1.73l-7 4a2 2 0 0 1-2 0l-7-4A2 2 0 0 1 3 16V8a2 2 0 0 1 1-1.73l7-4a2 2 0 0 1 2 0l7 4A2 2 0 0 1 21 8Z" />
    <path d="M3.3 7 12 12l8.7-5" />
    <path d="M12 22V12" />
  </svg>
);
const LogOut = ({ size }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const Navbar = ({ userId }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const router = useRouter();

  const handleLogout = async () => {
    const response = await fetch("/api/auth/logout", { method: "POST" });

    if (!response.ok) return;

    setOpen(false);
    router.replace("/login");
    router.refresh();
  };

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);

    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <nav className="navbar flex justify-between px-5 py-2 mx-6 sticky top-0 backdrop-blur-[3px] border-2 border-yellow-600 bg-[#ffa31f78] rounded-b-4xl items-center shadow-xl z-100 h-16">
      <Link href="/">
        <div className="font-modak text-red-500 text-3xl md:text-5xl [-webkit-text-stroke:5px_white] [paint-order:stroke] cursor-pointer">
          TBH
        </div>
      </Link>

      <ul className="flex-center sm:gap-7 gap-3 text-white">
        
        <li>
          <Link href="/menu">
            <button className="menu-btn">
              <span className="text-sm">MENU</span>
            </button>
          </Link>
        </li>

        {userId ? (
          <li className="relative" ref={ref}>
            <button
              onClick={() => setOpen((o) => !o)}
              className="flex items-center gap-1.5 rounded-full border-2 border-yellow-600 bg-red-500 p-2.75 text-white transition hover:bg-[#f61111ee]  "
            >
              <User size={16} />
              <span className="text-sm hidden sm:inline">Explore</span>  <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
              />
            </button>

            {open && (
              <div className="absolute right-0 z-20 mt-3 w-48 rounded-2xl border-2 border-yellow-600 bg-[#fff9f1]/95 backdrop-blur-md p-2 shadow-[4px_4px_0_#000] animate-in fade-in slide-in-from-top-1 duration-150 ">
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-black/80 transition hover:bg-red-500 hover:text-white"
                >
                  <User size={15} /> Contact
                </Link>
                <Link
                  href="/orders"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-black/80 transition hover:bg-red-500 hover:text-white"
                >
                  <Package size={15} /> My Orders
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-black/80 transition hover:bg-red-500 hover:text-white"
                >
                  <LogOut size={15} /> Log Out
                </button>
              </div>
            )}
          </li>
        ) : (
          <li>
            <Link href="/login">
              <button className="burger-btn">
                <span className="text-sm">LOGIN</span>
              </button>
            </Link>
          </li>
        )}
        <li>
          <Link href="/contact">
            <button className="menu-btn">
              <span className="text-sm">CONTACT</span>
            </button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
