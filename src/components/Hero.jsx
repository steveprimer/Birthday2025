import React, { useState, useEffect } from "react";
import BlurText from "../effects/BlurText";
import Ballpit from "../effects/Ballpit";
import videoSrc from "../assets/sparkle.mp4"; // Adjust path as needed

export default function Hero() {
  // Birthday date for countdown (optional, you can move countdown elsewhere)
  const birthdayDate = new Date("2025-08-18T00:00:00");
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  function getTimeLeft() {
    const now = new Date();
    const diff = birthdayDate - now;

    return diff > 0
      ? {
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        }
      : null;
  }

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Scroll handler
  const scrollToTimeline = () => {
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
        className="absolute top-0 left-0 w-full h-full object-cover -z-10 opacity-70"
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
          colors={["#F87171", "#FBBF24", "#34D399", "#60A5FA"]} // Optional: pass colors for balloons
        />
      </div>

      {/* Headline with bounce */}
      <BlurText
        text="Happy Birthday, bro! 🎂❤️"
        delay={200}
        animateBy="words"
        direction="top"
        className="text-6xl font-extrabold mb-8 animate-bounce"
      />

      {/* Optional countdown below headline */}
      {timeLeft && (
        <div className="text-2xl font-semibold tracking-widest mb-12 drop-shadow-lg bg-black bg-opacity-30 rounded-lg px-6 py-3">
          {timeLeft.days}d : {timeLeft.hours}h : {timeLeft.minutes}m :{" "}
          {timeLeft.seconds}s
        </div>
      )}

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
