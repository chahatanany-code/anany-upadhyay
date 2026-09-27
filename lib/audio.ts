"use client";

let audioCtx: AudioContext | null = null;
let soundEnabled = false;

export function toggleAudio(enable?: boolean): boolean {
  if (typeof enable === "boolean") {
    soundEnabled = enable;
  } else {
    soundEnabled = !soundEnabled;
  }
  return soundEnabled;
}

export function isAudioEnabled(): boolean {
  return soundEnabled;
}

export function playTechClick(freq = 600, duration = 0.04) {
  if (!soundEnabled || typeof window === "undefined") return;

  try {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtx = new AudioContextClass();
    }

    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, audioCtx.currentTime + duration);

    gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch {
    // AudioContext blocked or not supported
  }
}

export function playSuccessChime() {
  if (!soundEnabled || typeof window === "undefined") return;
  try {
    playTechClick(520, 0.06);
    setTimeout(() => playTechClick(840, 0.08), 80);
  } catch {
    // Graceful fallback
  }
}
