import React from "react";
import musicSrc from "../assets/the-1975-about-you.mp3"; // Your music file path

export default function BackgroundMusic() {
  return (
    <audio
      src={musicSrc}
      autoPlay
      loop
      muted={false}
      controls={false}
      style={{ display: "none" }} // hide the player UI
    />
  );
}
