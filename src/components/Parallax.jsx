import React, { useState, useEffect, useRef } from "react";
import MemoryTimeline from "./MemoryTimeline";

export default function ParallaxTimelineWrapper() {
  const [offsetY, setOffsetY] = useState(0);
  const timelineRef = useRef(null);

  const handleScroll = () => {
    if (timelineRef.current) {
      const top = timelineRef.current.getBoundingClientRect().top;
      setOffsetY(-top * 0.3); // adjust speed multiplier (0.3) as needed
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={timelineRef}
      className="relative overflow-hidden"
      style={{
        background: `linear-gradient(
    to bottom,
    rgba(205, 126, 73, 1) 0%,
    rgba(211, 146, 73, 0.85) 30%,
    rgba(235, 190, 140, 0.6) 60%,
    #ffffff 100%
  )`,
        backgroundPositionY: `${offsetY}px`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <MemoryTimeline />
    </section>
  );
}
