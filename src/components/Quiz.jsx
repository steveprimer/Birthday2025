import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import DecryptedText from "../effects/DecryptedText";

const questions = [
  {
    question: "What is my favourite drink?",
    options: ["Sting", "Pepsi", "Keventers Milkshake", "Your special coffee "],
    answer: 3,
    // index of the correct option
  },
  {
    question: "What’s our favourite food?",
    options: ["Maggi", "Your Pasta", "Biryani", "Ice Cream"],
    answer: 2,
  },
  {
    question: "Which song reminds me most of you?",
    options: ["Iris", "Perfect", "About You", "Teenage Dream"],
    answer: 2,
  }, // Add more questions as you like
];

export default function LoveQuiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [confettiRun, setConfettiRun] = useState(false);
  const [fade, setFade] = useState(true);

  const handleAnswer = (index) => {
    if (index === questions[currentQ].answer) {
      setScore((prev) => prev + 1);
    }
    setFade(false); // start fade out

    setTimeout(() => {
      if (currentQ + 1 < questions.length) {
        setCurrentQ((prev) => prev + 1);
        setFade(true); // fade in next question
      } else {
        setShowScore(true);
        setConfettiRun(true);
      }
    }, 400); // fade duration
  };

  const resetQuiz = () => {
    setScore(0);
    setCurrentQ(0);
    setShowScore(false);
    setConfettiRun(false);
    setFade(true);
  };

  // To stop confetti after some seconds
  useEffect(() => {
    if (confettiRun) {
      const timer = setTimeout(() => setConfettiRun(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [confettiRun]);

  return (
    <section className="max-w-3xl mx-auto p-8 bg-gradient-to-br from-pink-100 via-pink-50 to-pink-100 rounded-3xl shadow-xl text-pink-900 font-serif relative overflow-hidden mt-12 mb-12">
      <h2 className="text-4xl font-bold mb-8 text-center">
        <DecryptedText
          text="How well do you know me?"
          className="text-pink-700"
          speed={100}
          maxIterations={20}
          characters="ABCD1234!?"
          animateOn="view"
          parentClassName="all-letters"
          encryptedClassName="encrypted"
        />
      </h2>

      {confettiRun && <Confetti recycle={false} numberOfPieces={300} />}

      {!showScore ? (
        <div
          className={`transition-opacity duration-400 ${
            fade ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="mb-6 text-lg font-semibold">
            {questions[currentQ].question}
          </div>

          <div className="grid gap-4">
            {questions[currentQ].options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                className="bg-white hover:bg-pink-200 transition rounded-lg py-3 text-pink-900 font-medium shadow-md"
              >
                {opt}
              </button>
            ))}
          </div>

          <div className="mt-6 text-center text-sm text-pink-700">
            Question {currentQ + 1} of {questions.length}
          </div>
        </div>
      ) : (
        <div className="text-center space-y-4">
          <div className="text-2xl font-bold">
            You scored {score} out of {questions.length} ❤️
          </div>
          <button
            onClick={resetQuiz}
            className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-6 rounded-lg font-semibold shadow-md transition"
          >
            Try Again
          </button>
        </div>
      )}
    </section>
  );
}
