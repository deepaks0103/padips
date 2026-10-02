// Web Audio Synthesizer and Sound Effects utility
let audioCtx: AudioContext | null = null;
let bgMusicInterval: number | null = null;
let isPlayingBgMusic = false;

export function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playSynthNote(freq: number, type: OscillatorType = 'sine', duration = 0.3, gainVal = 0.15) {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(gainVal, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    console.warn("Synth note error:", e);
  }
}

class BackgroundMusicController {
  private audio: HTMLAudioElement | null = null;
  private isMuted: boolean = false;

  private initAudio() {
    if (!this.audio && typeof window !== 'undefined') {
      this.audio = new Audio('/bg_music.mp3');
      this.audio.loop = true;
      this.audio.volume = 0.45;
      this.audio.preload = 'auto';
      this.audio.addEventListener('error', () => {
        if (this.audio && !this.audio.src.includes('drive.google.com')) {
          this.audio.src = 'https://drive.google.com/uc?export=download&id=1XsHVGRUPlmrCBNBrBfLbsyOU_pSkY4qA';
          if (!this.isMuted) {
            this.audio.play().catch(() => {});
          }
        }
      });
    }
    return this.audio;
  }

  start() {
    this.isMuted = false;
    const audio = this.initAudio();
    if (audio) {
      audio.muted = false;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Background audio play interrupted or prevented:", err);
        });
      }
    }
  }

  stop() {
    this.isMuted = true;
    if (this.audio) {
      this.audio.pause();
    }
  }

  isPlaying() {
    return this.audio ? !this.audio.paused && !this.audio.muted : false;
  }
}

export const MelodyPlayer = new BackgroundMusicController();

export const SFX = {
  click() {
    playSynthNote(800, 'sine', 0.05, 0.08);
  },
  pop() {
    try {
      const ctx = getAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(520, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch {}
  },
  sparkle() {
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
      setTimeout(() => playSynthNote(freq, 'triangle', 0.18, 0.08), idx * 60);
    });
  },
  envelopeOpen() {
    [329.63, 392.00, 523.25, 659.25, 783.99].forEach((freq, idx) => {
      setTimeout(() => playSynthNote(freq, 'sine', 0.3, 0.12), idx * 75);
    });
  },
  blowCandle() {
    try {
      const ctx = getAudioContext();
      const bufferSize = ctx.sampleRate * 0.4;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      noise.connect(gain);
      gain.connect(ctx.destination);
      noise.start();
    } catch {}
  },
  cheer() {
    [523.25, 659.25, 783.99, 1046.50, 1318.51].forEach((freq, idx) => {
      setTimeout(() => playSynthNote(freq, 'sine', 0.4, 0.18), idx * 80);
    });
  }
};
