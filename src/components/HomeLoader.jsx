
import { useEffect, useState } from "react";

const HomeLoader = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    let hasFinishedLoading = false;
    const startedAt = Date.now();
    const minimumDisplayTime = 450;

    document.documentElement.classList.add("home-loading");

    const finishLoading = () => {
      if (hasFinishedLoading) return;
      hasFinishedLoading = true;
      window.clearTimeout(fallbackTimer);

      const remainingTime = Math.max(0, minimumDisplayTime - (Date.now() - startedAt));

      window.setTimeout(() => {
        if (!isMounted) return;

        setIsLoading(false);
        document.documentElement.classList.remove("home-loading");
      }, remainingTime);
    };

    const pageReady = window.document.fonts?.ready ?? Promise.resolve();
    const resourcesReady =
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise((resolve) => window.addEventListener("load", resolve, { once: true }));

    // Never leave visitors on the loading screen if a third-party request stalls.
    const fallbackTimer = window.setTimeout(finishLoading, 10000);

    Promise.all([pageReady, resourcesReady]).then(finishLoading);

    return () => {
      isMounted = false;
      window.clearTimeout(fallbackTimer);
      document.documentElement.classList.remove("home-loading");
    };
  }, []);

  return (
    <>
      <div className={isLoading ? "home-page-content is-loading" : "home-page-content"}>
        {children}
      </div>

      {isLoading && (
        <div className="home-loader" role="status" aria-live="polite" aria-label="Loading The Burger House">
          <span className="home-loader__orb home-loader__orb--one" aria-hidden="true" />
          <span className="home-loader__orb home-loader__orb--two" aria-hidden="true" />
          <div className="home-loader__content">
            <p className="home-loader__brand">TBH</p>
            <div className="home-loader__burger" aria-hidden="true">
              <span className="home-loader__bun-top" />
              <span className="home-loader__lettuce" />
              <span className="home-loader__cheese" />
              <span className="home-loader__patty" />
              <span className="home-loader__bun-bottom" />
            </div>
            <p className="home-loader__label">Building your burger</p>
            <div className="home-loader__progress" aria-hidden="true">
              <span />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HomeLoader;
