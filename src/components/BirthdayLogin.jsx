import React, { useState } from "react";

const PASSWORD = "ansonloveskhushi@"; // Hardcoded password

export default function BirthdayLogin({ children }) {
  const [input, setInput] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (input === PASSWORD) {
      setIsLoggedIn(true);
      setError("");
    } else {
      setError("Incorrect password. Try again!");
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200">
        <div className="bg-white/40 backdrop-blur-md shadow-xl rounded-2xl p-8 w-full max-w-sm">
          <h1 className="text-2xl font-bold text-center text-purple-700 mb-6">
            🎉 Birthday Surprise 🎉
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Enter Password"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 transition"
            >
              Unlock 🎁
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Once logged in, show the real content
  return <>{children}</>;
}
