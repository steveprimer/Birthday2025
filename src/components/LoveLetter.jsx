import React, { useState, useEffect, useRef } from "react";

const letterText = `Hey love,

Every day with you is a gift I cherish deeply. Your smile lights up my world, and your laughter is the sweetest melody to my ears. Thank you for being my rock, my joy, and my everything.

Forever yours,
[Your Name]`;

export default function LoveLetter() {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [started]);

  useEffect(() => {
    if (!started) return;

    let index = 0;
    const interval = setInterval(() => {
      index++;
      setDisplayedText(letterText.slice(0, index));
      if (index === letterText.length) clearInterval(interval);
    }, 45);

    return () => clearInterval(interval);
  }, [started]);

  return (
    <section
      ref={sectionRef}
      className="max-w-3xl mx-auto p-10 bg-gradient-to-br from-pink-100 via-pink-50 to-pink-100 rounded-3xl shadow-xl text-pink-900 font-serif relative"
    >
      <p
        style={{
          whiteSpace: "pre-wrap",
          minHeight: "12rem",
          fontSize: "1.125rem",
          lineHeight: "1.75rem",
          letterSpacing: "0.03em",
          fontWeight: "500",
          transition: "all 0.3s ease-out",
          userSelect: "text",
        }}
      >
        {displayedText}
        <span className="animate-blink text-pink-600">|</span>
      </p>
      <style>{`
        @keyframes blink {
          0%, 50%, 100% {opacity: 1;}
          25%, 75% {opacity: 0;}
        }
        .animate-blink {
          animation: blink 1.2s infinite;
        }
      `}</style>
    </section>
  );
}
