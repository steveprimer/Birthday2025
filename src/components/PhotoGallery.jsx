import React, { useState, useEffect, useRef } from "react";
import Confetti from "react-confetti";

const galleryItems = [
  {
    type: "image",
    src: "/memories/selfie1.jpg",
    note: "This was the day you made the best pasta ever 🍝",
  },
  {
    type: "image",
    src: "/memories/trip1.jpg",
    note: "Sunset on our mountain trip 🌄",
  },
  {
    type: "video",
    src: "/memories/candid-video.mp4",
    note: "Caught you dancing like no one’s watching! 💃",
  },
];

export default function PhotoGallery() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  // Refs & state for gallery container dimensions
  const galleryRef = useRef(null);
  const [gallerySize, setGallerySize] = useState({ width: 0, height: 0 });

  // Measure gallery container size to size confetti
  useEffect(() => {
    const updateSize = () => {
      if (galleryRef.current) {
        const rect = galleryRef.current.getBoundingClientRect();
        setGallerySize({ width: rect.width, height: rect.height });
      }
    };

    updateSize(); // Initial size
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const openModal = (item) => {
    setActiveItem(item);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && modalOpen) {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalOpen]);

  return (
    <div className="bg-gradient-to-br from-orange-200 via-orange-100 to-orange-200 py-12">
      <section
        ref={galleryRef}
        className="max-w-6xl mx-auto p-6 relative overflow-hidden rounded-lg shadow-lg bg-white"
      >
        {/* Confetti fills the gallery container */}
        <Confetti
          width={gallerySize.width}
          height={gallerySize.height}
          colors={["#f87171", "#fb923c", "#fbbf24", "#34d399", "#60a5fa"]}
          recycle={true}
          numberOfPieces={70}
          gravity={0.08}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            pointerEvents: "none",
            zIndex: 5,
          }}
        />

        <h2 className="text-4xl font-bold mb-8 text-center relative z-10">
          Photo & Video Gallery
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 relative z-10">
          {galleryItems.map((item, idx) => (
            <div
              key={idx}
              className="relative cursor-pointer rounded-lg overflow-hidden shadow-lg hover:scale-105 transform transition"
              onClick={() => openModal(item)}
            >
              {item.type === "image" ? (
                <img
                  src={item.src}
                  alt={`Memory: ${item.note}`}
                  className="w-full h-64 object-cover"
                  loading="lazy"
                />
              ) : (
                <video
                  src={item.src}
                  className="w-full h-64 object-cover"
                  muted
                  playsInline
                  loop
                  preload="metadata"
                />
              )}
              <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 hover:opacity-100 flex items-center justify-center text-white text-sm px-4 text-center transition-opacity">
                {item.note}
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {modalOpen && activeItem && (
          <div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out"
            onClick={closeModal}
            style={{ opacity: modalOpen ? 1 : 0 }}
          >
            <div
              className="bg-white rounded-lg max-w-3xl w-full p-4 relative shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute top-3 right-3 text-gray-700 hover:text-gray-900 text-2xl font-bold"
                aria-label="Close gallery modal"
              >
                &times;
              </button>

              {activeItem.type === "image" ? (
                <img
                  src={activeItem.src}
                  alt={`Memory: ${activeItem.note}`}
                  className="w-full rounded-md mb-4 object-contain max-h-[70vh]"
                />
              ) : (
                <video
                  src={activeItem.src}
                  controls
                  autoPlay
                  className="w-full rounded-md mb-4 max-h-[70vh]"
                />
              )}

              <p className="text-center text-gray-700">{activeItem.note}</p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
