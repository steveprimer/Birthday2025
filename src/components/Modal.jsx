import React, { useEffect } from "react";
import BlurText from "../effects/BlurText";

export default function Modal({ isOpen, onClose, children }) {
  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay with backdrop blur and fade-in */}
      <div
        className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm transition-opacity duration-300 ease-out z-50"
        onClick={onClose}
      />

      {/* Modal container with fade+scale animation */}
      <div className="fixed inset-0 flex justify-center items-center z-50 pointer-events-none">
        <div
          className="pointer-events-auto bg-white rounded-2xl max-w-md w-full p-8
                     shadow-2xl border border-gradient-to-tr from-orange-400 via-orange-300 to-yellow-200
                     transform scale-95 opacity-0 animate-modalIn relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Icon top right */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 text-orange-400 hover:text-orange-600 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Modal content */}
          <div className="flex flex-col items-center space-y-6">
            {/* Birthday photo */}
            <img
              src="/khushi-avatar.png" // put your image path here
              alt="Khushi"
              className="w-32 h-32 rounded-full shadow-lg border-4 border-orange-400"
            />

            {/* Heartfelt message */}
            <p className="text-lg text-gray-700 dark:text-gray-800 font-semibold">
              <BlurText
                text="Happy Birthday, Khushi! 🎉"
                delay={150}
                animateBy="words"
                direction="bottom"
                className="text-3xl font-semibold text-orange-600"
              />
              We hope your day is as wonderful as you are. May this year bring
              you endless joy and success.
            </p>

            {/* Gift reveal */}
            <div className="bg-orange-100 p-4 rounded-lg shadow-inner text-center text-orange-700 font-bold">
              🎁 Your gift is ready! Click the button below to unwrap your
              surprise.
            </div>

            {/* Action button inside modal */}
            <button
              onClick={() => alert("Here’s your gift! 🎉")}
              className="mt-2 px-6 py-3 bg-gradient-to-r from-orange-400 to-yellow-400 text-white rounded-full shadow-lg hover:scale-105 active:scale-95 transition transform font-semibold"
            >
              Unwrap Gift
            </button>
          </div>

          {/* Stylish Close button */}
          <button
            onClick={onClose}
            className="mt-8 w-full py-3 rounded-full bg-gradient-to-r from-orange-400 to-yellow-400
                       text-white font-semibold shadow-lg hover:scale-105 active:scale-95 transition transform"
          >
            Close
          </button>
        </div>
      </div>

      {/* Add keyframes animation in your global CSS or Tailwind config */}
      <style jsx>{`
        @keyframes modalIn {
          0% {
            opacity: 0;
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-modalIn {
          animation: modalIn 0.25s ease forwards;
        }
      `}</style>
    </>
  );
}
