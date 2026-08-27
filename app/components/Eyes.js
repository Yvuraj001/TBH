import React from "react";

export default function Eyes() {
  return (
    <>
      {/* Left eye */}
      <div className="absolute top-[2%] left-[36%] max-md:left-[38.5%] -translate-x-1/2 z-20">
        <div className="w-[7vw] max-md:w-[14vw] mb-[.8vw] max-md:mb-[1.8vw] mx-auto flex items-center justify-center">
          <svg
            width="100%"
            viewBox="0 0 182 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.2666 74.5742C7.2666 74.5742 45.7896 11.0167 85.7666 8.57418C128.957 5.93536 174.767 74.5742 174.767 74.5742"
              stroke="white"
              strokeWidth="17"
            ></path>
          </svg>
        </div>

        <div
          className="bg-white flex items-center justify-center overflow-hidden mx-auto"
          style={{
            width: "6vw",
            height: "9vw",
            maxWidth: "12vw",
            maxHeight: "18vw",
            borderRadius: "50% / 60%",
          }}
        >
          <div
            className="relative bg-white"
            style={{ width: "70%", height: "75%", borderRadius: "50% / 60%" }}
          >
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "100%",
                height: "2.2vw",
                maxHeight: "4.2vw",
                transform:
                  "translate(-50%, -50%) translate(0.1328px, -0.168px) rotate(-14.1226deg)",
                transformOrigin: "50% 50%",
              }}
            >
              <div
                style={{
                  width: "2.2vw",
                  height: "3vw",
                  maxWidth: "4vw",
                  maxHeight: "6vw",
                  borderRadius: "50% / 55%",
                  background: "black",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right eye */}
      <div className="absolute top-[2%] left-[64%] max-md:left-[61.5%] -translate-x-1/2 z-20">
        <div className="w-[7vw] max-md:w-[14vw] mb-[.8vw] max-md:mb-[1.8vw] mx-auto flex items-center justify-center">
          <svg
            width="100%"
            viewBox="0 0 182 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.2666 74.5742C7.2666 74.5742 45.7896 11.0167 85.7666 8.57418C128.957 5.93536 174.767 74.5742 174.767 74.5742"
              stroke="white"
              strokeWidth="17"
            ></path>
          </svg>
        </div>

        <div
          className="bg-white flex items-center justify-center overflow-hidden mx-auto"
          style={{
            width: "6vw",
            height: "9vw",
            maxWidth: "12vw",
            maxHeight: "18vw",
            borderRadius: "50% / 60%",
          }}
        >
          <div
            className="relative bg-white"
            style={{ width: "70%", height: "75%", borderRadius: "50% / 60%" }}
          >
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "100%",
                height: "2.2vw",
                maxHeight: "4.2vw",
                transform:
                  "translate(-50%, -50%) translate(0.1328px, -0.168px) rotate(-14.1226deg)",
                transformOrigin: "50% 50%",
              }}
            >
              <div
                style={{
                  width: "2.2vw",
                  height: "3vw",
                  maxWidth: "4vw",
                  maxHeight: "6vw",
                  borderRadius: "50% / 55%",
                  background: "black",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
