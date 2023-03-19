import { Howl } from "howler";
import soundFile from "./quiz-music.mp3";

const soundObject = new Howl({
  src: [soundFile],
  volume: 0.5,
  autoplay: false,
  loop: true, // Add loop option to make it continuously play
});

export function playSound() {
  if (!soundObject.playing()) {
    soundObject.play();
  }
}

export function pauseSound() {
  if (soundObject.playing()) {
    soundObject.stop();
  }
}
