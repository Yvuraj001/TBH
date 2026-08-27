"use client";

import { useEffect, useState } from "react";
import { menuItems } from "./Menu";
import LoaderScreen from "./LoaderScreen";

const loadImage = (src) =>
  new Promise((resolve) => {
    const image = new Image();
    image.onload = resolve;
    image.onerror = resolve;
    image.src = src.trim();

    if (image.complete) resolve();
  });

const MenuPreloader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    let hasFinishedLoading = false;
    const startedAt = Date.now();
    const minimumDisplayTime = 450;

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
    const imagesReady = Promise.all(menuItems.map((item) => loadImage(item.image)));
    const fallbackTimer = window.setTimeout(finishLoading, 8000);

    Promise.all([fontsReady, imagesReady]).then(() => {
      window.clearTimeout(fallbackTimer);
      finishLoading();
    });

    return () => {
      isMounted = false;
      window.clearTimeout(fallbackTimer);
      document.documentElement.classList.remove("page-loading");
    };
  }, []);

  return isLoading ? <LoaderScreen label="Setting the menu table" /> : null;
};

export default MenuPreloader;
