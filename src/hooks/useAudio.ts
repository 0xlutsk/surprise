import { useCallback, useEffect, useRef } from "react";

export type SoundName =
  | "pop"
  | "sparkle"
  | "reveal"
  | "whoosh"
  | "chime"
  | "tick";

type AudioContextWindow = Window &
  typeof globalThis & {
    webkitAudioContext?: typeof AudioContext;
  };

function makeNoiseBuffer(ctx: AudioContext, seconds: number) {
  const length = Math.floor(ctx.sampleRate * seconds);
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const channel = buffer.getChannelData(0);
  for (let i = 0; i < length; i += 1) {
    channel[i] = Math.random() * 2 - 1;
  }
  return buffer;
}

export function useAudio(muted: boolean) {
  const mutedRef = useRef(muted);
  const contextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    mutedRef.current = muted;
  }, [muted]);

  useEffect(() => {
    return () => {
      if (contextRef.current) {
        void contextRef.current.close();
        contextRef.current = null;
      }
    };
  }, []);

  const getContext = useCallback(() => {
    if (typeof window === "undefined") return null;
    if (!contextRef.current) {
      const AudioContextClass =
        window.AudioContext ??
        (window as AudioContextWindow).webkitAudioContext;
      if (!AudioContextClass) return null;
      contextRef.current = new AudioContextClass();
    }
    if (contextRef.current.state === "suspended") {
      void contextRef.current.resume();
    }
    return contextRef.current;
  }, []);

  const note = useCallback(
    (
      ctx: AudioContext,
      frequency: number,
      start: number,
      duration: number,
      volume: number,
      type: OscillatorType = "sine",
    ) => {
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();
      oscillator.type = type;
      oscillator.frequency.setValueAtTime(frequency, start);
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(volume, start + 0.018);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
      oscillator.connect(gain);
      gain.connect(ctx.destination);
      oscillator.start(start);
      oscillator.stop(start + duration + 0.04);
    },
    [],
  );

  const play = useCallback(
    (sound: SoundName) => {
      if (mutedRef.current) return;
      const ctx = getContext();
      if (!ctx) return;
      const now = ctx.currentTime + 0.01;

      if (sound === "reveal") {
        [523.25, 659.25, 783.99, 1046.5].forEach((frequency, index) => {
          note(ctx, frequency, now + index * 0.12, 0.9, 0.055, "triangle");
        });
        note(ctx, 1567.98, now + 0.56, 1.3, 0.03, "sine");
        return;
      }

      if (sound === "chime") {
        [392, 523.25, 659.25, 783.99].forEach((frequency, index) => {
          note(ctx, frequency, now + index * 0.16, 1.5, 0.032, "sine");
        });
        return;
      }

      if (sound === "sparkle") {
        [1318.5, 1567.98, 1975.53, 2349.32].forEach((frequency, index) => {
          note(
            ctx,
            frequency,
            now + index * 0.055,
            0.35,
            0.026,
            index % 2 ? "sine" : "triangle",
          );
        });
        return;
      }

      if (sound === "pop") {
        const oscillator = ctx.createOscillator();
        const gain = ctx.createGain();
        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(240, now);
        oscillator.frequency.exponentialRampToValueAtTime(90, now + 0.16);
        gain.gain.setValueAtTime(0.075, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.19);
        oscillator.connect(gain);
        gain.connect(ctx.destination);
        oscillator.start(now);
        oscillator.stop(now + 0.22);
        return;
      }

      if (sound === "tick") {
        note(ctx, 880, now, 0.09, 0.02, "triangle");
        return;
      }

      if (sound === "whoosh") {
        const source = ctx.createBufferSource();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();
        source.buffer = makeNoiseBuffer(ctx, 1.2);
        filter.type = "bandpass";
        filter.Q.setValueAtTime(0.8, now);
        filter.frequency.setValueAtTime(240, now);
        filter.frequency.exponentialRampToValueAtTime(1500, now + 0.42);
        filter.frequency.exponentialRampToValueAtTime(280, now + 1.05);
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(0.06, now + 0.22);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.15);
        source.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        source.start(now);
        source.stop(now + 1.2);
      }
    },
    [getContext, note],
  );

  return play;
}
