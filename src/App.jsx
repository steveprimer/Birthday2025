import { useState, useEffect } from "react";
import CountdownPage from "./components/CountdownPage";
import BackgroundMusic from "./components/BackgroundMusic";
import Hero from "./components/Hero";
import ParallaxTimelineWrapper from "./components/Parallax";
import LoveLetter from "./components/LoveLetter";
import PhotoGallery from "./components/PhotoGallery";
import LoveQuiz from "./components/Quiz";
import CountdownSurprise from "./components/SurpriseReveal";
import "./App.css";

const TARGET_DATE = new Date("2025-08-10T04:23:00"); // Set your target date here

export default function App() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

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

  if (timeLeft) {
    // Still counting down → show countdown page
    return <CountdownPage timeLeft={timeLeft} />;
  }

  return (
    <>
      <BackgroundMusic />
      <Hero />
      <ParallaxTimelineWrapper />
      <LoveLetter />
      <PhotoGallery />
      <LoveQuiz />
      <CountdownSurprise />
    </>
  );
}
