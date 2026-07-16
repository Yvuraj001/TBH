import { toast } from "react-toastify";

export const MessageToast = ({
  message,

  onClose,
}) => {
  return (
    <div className="pointer-events-auto w-[min(360px,calc(100vw-2rem))] overflow-hidden rounded-3xl border-2 border-black bg-[#fff9f1] shadow-[6px_6px_0_#000]">
      <div className="flex items-stretch">
        <div className="w-6 shrink-0 bg-red-500" />

        <div className="flex flex-1 items-start gap-3 p-1">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-2xl border-2 border-black bg-[#ffc61b]">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 7V13"
                stroke="#FF3131"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <circle cx="12" cy="17" r="1.8" fill="#FF3131" />
            </svg>
          </div>

          <div className="itemCont flex gap-13 w-63.75">
            <p className="mt-1.5 text-sm font-semibold leading-5 text-red-500/80">
              {message}
            </p>

            <button
              type="button"
              aria-label="Dismiss notification"
              onClick={() => (onClose ? onClose() : toast.dismiss())}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-transparent transition hover:border-black hover:bg-[#ffc286] "
            >
              <svg width="15" height="15" viewBox="0 0 20 20" fill="none">
                <path
                  d="M5 5L15 15M15 5L5 15"
                  stroke="#2B2B2B"
                  strokeWidth="2.3"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SucessToast = ({ message, onClose }) => {
  return (
    <div className="pointer-events-auto absolute right-0 w-90 overflow-hidden rounded-3xl border-2 border-[#E8D3B8] bg-[#FFF7EF] shadow-[0_10px_30px_rgba(0,0,0,.18)]">
      <div className="flex items-start justify-between gap-3 p-2">
        <div className="flex gap-3">
          {/* Icon */}
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-[3px] border-black bg-[#FFC61B]">
            <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
              <path
                d="M5 10.5L8.5 14L15.5 7"
                stroke="#000"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Content */}
          <div>
            <h4 className="font-black text-[16px] text-[#FF3131]">
              Delicious!
            </h4>

            <p className="mt-1 text-[13px] font-medium text-[#3B3028]">
              {message}
            </p>
          </div>
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#E8D3B8] bg-white transition hover:bg-[#FFF0E2]"
        >
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
            <path
              d="M5 5L15 15M15 5L5 15"
              stroke="#1D1D1D"
              strokeWidth="2.3"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* Bottom Accent */}
      <div className="h-0.5 w-full bg-[#FF3131]" />
    </div>
  );
};