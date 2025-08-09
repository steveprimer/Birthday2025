import React, { useState, useEffect } from "react";
import BlurText from "../effects/BlurText";
import Ballpit from "../effects/BallPit";

export default function Hero() {
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

  return (
    <section className="relative h-screen flex flex-col justify-center items-center bg-gradient-to-br from-orange-400 to-orange-700 text-white text-center px-6 overflow-hidden">
      {/* Ballpit canvas behind */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none" />

      <div className="absolute top-0 left-0 w-screen h-screen z-0 pointer-events-none">
        <Ballpit
          count={100}
          gravity={0.1}
          friction={0.9975}
          wallBounce={0.95}
          followCursor={true}
        />
      </div>

      {/* Content on top */}
      <BlurText
        text="Happy Birthday, Bro! 🎉"
        delay={300}
        animateBy="words"
        direction="top"
        className="text-6xl font-extrabold mb-8 drop-shadow-lg z-10"
      />

      {timeLeft ? (
        <div className="text-3xl font-semibold tracking-widest mb-12 z-10 drop-shadow-md">
          {timeLeft.days}d : {timeLeft.hours}h : {timeLeft.minutes}m :{" "}
          {timeLeft.seconds}s
        </div>
      ) : (
        <p className="text-3xl mb-12 z-10 drop-shadow-md">
          🎉 The Birthday is Here! 🎉
        </p>
      )}

      <button
        onClick={() => alert("Surprise opened!")}
        className="bg-white text-orange-500 text-xl py-4 px-10 rounded-full font-semibold shadow-xl transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95 z-10"
      >
        Open Your Gift
      </button>
    </section>
  );
}
