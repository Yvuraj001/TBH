import { useState, useEffect } from "react";

const DeviceBlock = ({ children }) => {
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    const checkWidth = () => setIsBlocked(window.innerWidth < 667);
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  if (!isBlocked) return children;

  return (
    <div className="w-screen h-screen bg-[#ffbb7887] flex flex-col items-center justify-center text-center px-6">
      <h1 className="font-modak text-amber-400 text-5xl [-webkit-text-stroke:6px_white] [paint-order:stroke] mb-4">
        OOPS!
      </h1>
      <p className="font-memories text-red-500 text-xl mb-2">
        This site isn't built for mobile yet.
      </p>
      <p className="font-memories text-black text-base max-w-xs mb-6">
        Please open this on a tablet or desktop for the full experience.
      </p>
      <p className="font-memories text-black/70 text-sm max-w-xs">
        On mobile? Open your browser menu and turn on{" "}
        <span className="text-red-500 font-bold">"Desktop site"</span> mode to
        continue here anyway.
      </p>
    </div>
  );
};

export default DeviceBlock;
