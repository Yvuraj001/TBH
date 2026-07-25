const KitchenBanner = ({ isOpen }) => {
  if (isOpen) return null;

  return (
    <div className="w-full bg-[#28130f] px-4 py-3 text-center text-sm font-bold text-white">
      Kitchen is currently closed — order processing is paused. You can still
      place your order, it will be prepared as soon as the kitchen reopens.
    </div>
  );
};

export default KitchenBanner;
