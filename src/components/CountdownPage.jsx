import React, { useState, useEffect } from "react";
// import your main birthday site component here
import App from "../App"; // replace with your actual component path

const TARGET_DATE = new Date("2025-08-13T05:00:00"); // Set your target date/time here

export default function CountdownPage() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const [timeUp, setTimeUp] = useState(false);

  function getTimeLeft() {
    const now = new Date();
    const diff = TARGET_DATE - now;

    if (diff <= 0) return null;

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const updatedTimeLeft = getTimeLeft();
      setTimeLeft(updatedTimeLeft);

      if (!updatedTimeLeft) {
        setTimeUp(true);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (timeUp) {
    // Show main birthday site after countdown
    return <App />;
  }

  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-pink-300 via-pink-200 to-pink-100 text-pink-900 font-serif p-6">
      <h1 className="text-6xl font-extrabold mb-8 drop-shadow-lg text-center">
        Counting down to your special day...
      </h1>

      {timeLeft ? (
        <div className="text-4xl font-semibold tracking-widest bg-white bg-opacity-70 rounded-3xl px-10 py-6 shadow-lg text-center select-none">
          {timeLeft.days} <span className="text-lg">Days</span> :{" "}
          {timeLeft.hours} <span className="text-lg">Hours</span> :{" "}
          {timeLeft.minutes} <span className="text-lg">Minutes</span> :{" "}
          {timeLeft.seconds} <span className="text-lg">Seconds</span>
        </div>
      ) : (
        <p className="text-2xl mt-6">Loading...</p>
      )}
    </section>
  );
}
