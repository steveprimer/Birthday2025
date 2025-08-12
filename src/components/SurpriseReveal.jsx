import React, { useState, useEffect, useRef } from "react";

const TARGET_DATE = new Date("2025-08-18T23:11:00");

export default function SurpriseRevealPage() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const [showSurprise, setShowSurprise] = useState(false);
  const [timeUp, setTimeUp] = useState(new Date() >= TARGET_DATE);
  const videoRef = useRef(null);

  function getTimeLeft() {
    const now = new Date();
    const diff = TARGET_DATE - now;
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }

  useEffect(() => {
    if (showSurprise) return; // stop timer after reveal

    const timerId = setInterval(() => {
      const updatedTimeLeft = getTimeLeft();
      setTimeLeft(updatedTimeLeft);

      if (
        updatedTimeLeft.days === 0 &&
        updatedTimeLeft.hours === 0 &&
        updatedTimeLeft.minutes === 0 &&
        updatedTimeLeft.seconds === 0
      ) {
        setTimeUp(true); // make button clickable
        clearInterval(timerId);
      }
    }, 1000);

    return () => clearInterval(timerId);
  }, [showSurprise]);

  // Pause / resume background music when video plays/pauses
  useEffect(() => {
    if (!videoRef.current) return;
    const bgAudio = document.querySelector("audio"); // from BackgroundMusic component

    const handlePlay = () => {
      if (bgAudio) bgAudio.pause();
    };
    const handlePause = () => {
      if (bgAudio) bgAudio.play();
    };

    const vid = videoRef.current;
    vid.addEventListener("play", handlePlay);
    vid.addEventListener("pause", handlePause);
    vid.addEventListener("ended", handlePause);

    return () => {
      vid.removeEventListener("play", handlePlay);
      vid.removeEventListener("pause", handlePause);
      vid.removeEventListener("ended", handlePause);
    };
  }, [showSurprise]);

  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-pink-200 via-pink-100 to-purple-200 p-8">
      {!showSurprise ? (
        <>
          <h1 className="text-5xl font-extrabold mb-6 text-pink-700 text-center drop-shadow-md">
            Countdown to Your Surprise
          </h1>

          <div className="flex space-x-8 text-center text-pink-700 text-4xl font-mono font-semibold mb-8 select-none">
            <div>
              <div>{timeLeft.days}</div>
              <div className="text-sm font-normal">Days</div>
            </div>
            <div>
              <div>{timeLeft.hours}</div>
              <div className="text-sm font-normal">Hours</div>
            </div>
            <div>
              <div>{timeLeft.minutes}</div>
              <div className="text-sm font-normal">Minutes</div>
            </div>
            <div>
              <div>{timeLeft.seconds}</div>
              <div className="text-sm font-normal">Seconds</div>
            </div>
          </div>

          <button
            onClick={() => setShowSurprise(true)}
            disabled={!timeUp}
            className={`px-10 py-4 rounded-full text-white font-semibold text-lg transition-shadow duration-300 ${
              timeUp
                ? "bg-pink-600 hover:bg-pink-700 shadow-lg cursor-pointer"
                : "bg-pink-300 cursor-not-allowed"
            }`}
          >
            Reveal Surprise Now
          </button>

          {!timeUp && (
            <p className="mt-4 text-pink-700 italic text-sm max-w-xs text-center">
              The surprise can only be revealed once the countdown reaches zero.
            </p>
          )}
        </>
      ) : (
        <section className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-pink-50 to-purple-100 rounded-3xl shadow-xl text-pink-900 font-serif flex flex-col items-center">
          <h2 className="text-3xl font-bold mb-6 text-pink-600 text-center drop-shadow-sm">
            Got me learning Video Editing for this haha
          </h2>
          <p className="mb-6 text-center italic text-pink-600 max-w-lg">
            Here’s a little something I made, Hope you like it.
          </p>

          <video
            ref={videoRef}
            src="/memories/memory.mp4"
            controls
            autoPlay
            className="rounded-xl shadow-lg max-w-full w-full sm:w-3/4"
          >
            Sorry, your browser does not support embedded videos.
          </video>

          <p className="mt-6 text-center text-pink-700 font-semibold">
            With all my love, always. Thank me w a bj ;)
          </p>
        </section>
      )}
    </main>
  );
}
