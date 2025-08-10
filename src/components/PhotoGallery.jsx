import React, { useState, useEffect, useRef } from "react";
import Confetti from "react-confetti";

const galleryItems = [
  {
    type: "image",
    src: "/memories/aesthetic-kiss.jpg",
    note: "The most aesthetic kiss ever captured! ",
  },
  {
    type: "image",
    src: "/memories/most-aesthetic-couple.jpg",
    note: "Most aesthetic couple ever! ",
  },
  {
    type: "image",
    src: "/memories/Hot-one-out.jpg",
    note: "Hot one out challenge! (You won this one!)",
  },
  ,
  {
    type: "image",
    src: "/memories/random-fest.jpg",
    note: "IIT Delhi random fest vibes! ",
  },
  {
    type: "image",
    src: "/memories/diwali-vibes.jpg",
    note: "diwali 2k24 vibes! ",
  },
];

export default function PhotoGallery() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const galleryRef = useRef(null);
  const [gallerySize, setGallerySize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      if (galleryRef.current) {
        const rect = galleryRef.current.getBoundingClientRect();
        setGallerySize({ width: rect.width, height: rect.height });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const openModal = (item) => {
    setActiveItem(item);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && modalOpen) closeModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalOpen]);

  return (
    <div className="bg-gradient-to-br from-pink-200 via-pink-100 to-purple-100 py-14">
      <section
        ref={galleryRef}
        className="max-w-7xl mx-auto p-8 relative rounded-3xl shadow-2xl bg-white bg-opacity-90 backdrop-blur-md"
      >
        <Confetti
          width={gallerySize.width}
          height={gallerySize.height}
          colors={["#f9a8d4", "#f472b6", "#ec4899", "#c084fc", "#a78bfa"]}
          recycle={true}
          numberOfPieces={60}
          gravity={0.06}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            pointerEvents: "none",
            zIndex: 5,
          }}
        />

        <h2 className="text-4xl font-extrabold mb-10 text-center text-pink-700 drop-shadow-md relative z-10">
          Photo & Video Gallery
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 relative z-10">
          {galleryItems.map((item, idx) => (
            <div
              key={idx}
              onClick={() => openModal(item)}
              className="relative cursor-pointer rounded-xl overflow-hidden shadow-lg transform transition-transform hover:scale-[1.06] hover:shadow-2xl"
            >
              {item.type === "image" ? (
                <img
                  src={item.src}
                  alt={`Memory: ${item.note}`}
                  className="w-full h-64 object-cover rounded-xl"
                  loading="lazy"
                />
              ) : (
                <video
                  src={item.src}
                  className="w-full h-64 object-cover rounded-xl"
                  muted
                  playsInline
                  loop
                  preload="metadata"
                />
              )}
              <div className="absolute inset-0 bg-pink-700 bg-opacity-60 opacity-0 hover:opacity-100 flex items-center justify-center text-white text-center text-sm p-4 rounded-xl transition-opacity">
                {item.note}
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {modalOpen && activeItem && (
          <div
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out"
            onClick={closeModal}
          >
            <div
              className="bg-white rounded-2xl max-w-4xl w-full p-6 relative shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-pink-600 hover:text-pink-800 text-3xl font-bold"
                aria-label="Close gallery modal"
              >
                &times;
              </button>

              {activeItem.type === "image" ? (
                <img
                  src={activeItem.src}
                  alt={`Memory: ${activeItem.note}`}
                  className="w-full rounded-xl mb-6 object-contain max-h-[75vh]"
                />
              ) : (
                <video
                  src={activeItem.src}
                  controls
                  autoPlay
                  className="w-full rounded-xl mb-6 max-h-[75vh]"
                />
              )}

              <p className="text-center text-pink-700 font-semibold">
                {activeItem.note}
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
