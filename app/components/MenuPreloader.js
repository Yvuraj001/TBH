"use client";

import { useEffect, useState } from "react";
import LoaderScreen from "./LoaderScreen";

const MenuPreloader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    let hasFinishedLoading = false;
    const startedAt = Date.now();
    const minimumDisplayTime = 150;

    document.documentElement.classList.add("page-loading");

    const finishLoading = () => {
      if (hasFinishedLoading) return;
      hasFinishedLoading = true;

      const remainingTime = Math.max(
        0,
        minimumDisplayTime - (Date.now() - startedAt),
      );

      window.setTimeout(() => {
        if (!isMounted) return;
        setIsLoading(false);
        document.documentElement.classList.remove("page-loading");
      }, remainingTime);
    };

    const fontsReady = document.fonts?.ready ?? Promise.resolve();
    const fallbackTimer = window.setTimeout(finishLoading, 2000);

    fontsReady.then(finishLoading);

    return () => {
      isMounted = false;
      window.clearTimeout(fallbackTimer);
      document.documentElement.classList.remove("page-loading");
    };
  }, []);

  return isLoading ? <LoaderScreen label="Setting the menu table" /> : null;
};

export default MenuPreloader;
