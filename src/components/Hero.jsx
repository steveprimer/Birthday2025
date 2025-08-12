import React, { useState, useEffect } from "react";
import BlurText from "../effects/BlurText";
import Ballpit from "../effects/Ballpit";
import videoSrc from "../assets/sparkle.mp4"; // Adjust path as needed

export default function Hero({ playMusic }) {
  // Scroll handler
  const scrollToTimeline = () => {
    if (playMusic) playMusic();
    const el = document.getElementById("timelineSection");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative h-screen flex flex-col justify-center items-center text-white text-center overflow-hidden">
      {/* Video background */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover -z-10 opacity-100"
        src={videoSrc}
        type="video/mp4"
      />

      {/* Ballpit balloons */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-5">
        <Ballpit
          count={80}
          gravity={-0.02} // negative gravity to float balloons upward
          friction={0.998}
          wallBounce={0.9}
          followCursor={true}
          // colors={["#F87171", "#FBBF24", "#34D399", "#60A5FA"]}
        />
      </div>

      {/* Headline with bounce */}
      <BlurText
        text="Happy Birthday, Khushi! 🎂❤️"
        delay={200}
        animateBy="words"
        direction="top"
        className="text-6xl font-extrabold mb-8 animate-bounce"
      />

      {/* Scroll to begin button */}
      <button
        onClick={scrollToTimeline}
        className="bg-white text-orange-500 font-bold py-3 px-10 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-transform z-10"
      >
        Scroll to Begin
      </button>
    </section>
  );
}
