import React, { forwardRef, useImperativeHandle, useRef } from "react";
import musicSrc from "../assets/the-1975-about-you.mp3";

const BackgroundMusic = forwardRef((props, ref) => {
  const audioRef = useRef();

  // Expose play method to parent via ref
  useImperativeHandle(ref, () => ({
    play: () => {
      audioRef.current.play().catch(() => {
        // Handle play() promise rejection silently
      });
    },
    pause: () => {
      audioRef.current.pause();
    },
  }));

  return (
    <audio
      ref={audioRef}
      src={musicSrc}
      loop
      muted={false}
      controls={false}
      style={{ display: "none" }}
    />
  );
});

export default BackgroundMusic;
