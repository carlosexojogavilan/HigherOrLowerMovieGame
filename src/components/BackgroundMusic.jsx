import { useEffect } from "react";
import music from "../assets/neon-gaming-128925.mp3";

const BackgroundMusic = () => {
  useEffect(() => {
    const audio = new Audio(music);
    audio.loop = true;
    audio.play();

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  return null;
};

export default BackgroundMusic;
