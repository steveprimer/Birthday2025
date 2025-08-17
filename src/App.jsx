import { useState, useEffect, useRef } from "react";
import CountdownPage from "./components/CountdownPage";
import BackgroundMusic from "./components/BackgroundMusic";
import Hero from "./components/Hero";
import LoveLetter from "./components/LoveLetter";
import PhotoGallery from "./components/PhotoGallery";
import LoveQuiz from "./components/Quiz";
import CountdownSurprise from "./components/SurpriseReveal";
import MemoryTimeline from "./components/MemoryTimeline";
import BirthdayLogin from "./components/BirthdayLogin"; // ✅ new login wrapper
import "./App.css";

const TARGET_DATE = new Date("2025-08-17T23:59:59"); // Set your target date here

export default function App() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const musicRef = useRef();

  const playMusic = () => {
    if (musicRef.current) {
      musicRef.current.play();
    }
  };

  function getTimeLeft() {
    const now = new Date();
    const diff = TARGET_DATE - now;
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
    <BirthdayLogin>
      {" "}
      {/* ✅ password gate */}
      {timeLeft ? (
        // Still counting down → show countdown page
        <CountdownPage timeLeft={timeLeft} />
      ) : (
        <>
          <BackgroundMusic ref={musicRef} />
          <Hero playMusic={playMusic} />
          <MemoryTimeline />
          <div className="bg-gradient-to-br from-pink-700 via-pink-400 to-pink-200 px-6 py-12 min-h-screen">
            <LoveLetter />
          </div>
          <PhotoGallery />
          <div className="bg-gradient-to-br from-pink-700 via-pink-400 to-pink-200 px-6 py-12 min-h-screen">
            <LoveQuiz />
          </div>
          <CountdownSurprise />
        </>
      )}
    </BirthdayLogin>
  );
}
