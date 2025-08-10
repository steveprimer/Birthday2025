import React, { useState, useEffect, useRef } from "react";

const letterText = `Hey Khushi,

I'm really so glad that its you, You who is my girlfriend.
I tend to forget my struggles and pain when i see your hand dangling in mine.
Whenever i see you laugh and be like a little girl, it makes me forget everything else and makes me want
to be with you.
Thank you for always being there for me, though what we had was mostly hardships.
But i can say, everyday you choose me over everything else, gives me courage and hope that we
will make it in the end.
"Dekh sutta toh me chodh skta hu, lekin tuje nhi chodh sktaa.. ☺️"

All yours,
Anson`;

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
      className="max-w-3xl mx-auto p-12 bg-gradient-to-br from-red-300 via-pink-100 to-pink-200 rounded-3xl shadow-2xl text-pink-900 font-serif relative min-h-[70vh] flex items-center"
      style={{ minHeight: "100vh" }} // enough vertical space, can be adjusted
    >
      <p
        style={{
          whiteSpace: "pre-wrap",
          minHeight: "14rem", // higher minHeight to reserve space for full letter
          fontSize: "1.25rem",
          lineHeight: "2rem",
          letterSpacing: "0.04em",
          fontWeight: "600",
          transition: "all 0.3s ease-out",
          userSelect: "text",
          margin: 0,
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
