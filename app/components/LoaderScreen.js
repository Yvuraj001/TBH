const LoaderScreen = ({ label = "Preparing something delicious" }) => (
  <div
    className="tbh-loader"
    role="status"
    aria-live="polite"
    aria-label={label}
  >
    <span className="tbh-loader__scribble tbh-loader__scribble--one" aria-hidden="true">
      FRESH
    </span>
    <span className="tbh-loader__scribble tbh-loader__scribble--two" aria-hidden="true">
      &amp; TASTY
    </span>
    <span className="tbh-loader__orb tbh-loader__orb--one" aria-hidden="true" />
    <span className="tbh-loader__orb tbh-loader__orb--two" aria-hidden="true" />
    <div className="tbh-loader__content">
      <div className="tbh-loader__card">
        <p className="tbh-loader__eyebrow">THE BURGER HOUSE</p>
        <p className="tbh-loader__brand">TBH</p>
        <div className="tbh-loader__burger" aria-hidden="true">
          <span className="tbh-loader__bun-top" />
          <span className="tbh-loader__lettuce" />
          <span className="tbh-loader__cheese" />
          <span className="tbh-loader__patty" />
          <span className="tbh-loader__bun-bottom" />
        </div>
        <p className="tbh-loader__label">{label}</p>
        <div className="tbh-loader__progress" aria-hidden="true">
          <span />
        </div>
      </div>
      <p className="tbh-loader__tip">Good things take a little seasoning.</p>
    </div>
  </div>
);

export default LoaderScreen;
