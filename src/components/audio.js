/**
 * Web Audio API synthesizer for realistic tactile interaction sounds
 * (Paper rustle, golden chime, water ripple drop) + Background Music player
 */

let audioCtx = null;
let masterGain = null;
let bgMusicAudio = null;
let isMusicPlaying = false;

export function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;
    audioCtx = new AudioContextClass();
    masterGain = audioCtx.createGain();
    masterGain.gain.value = 0.9;
    masterGain.connect(audioCtx.destination);
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

const PENTATONIC_FREQS = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25];

export function playChimeNote(freq, startTime, gainVal = 0.08) {
  const ctx = getAudioContext();
  if (!ctx) return;
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const noteGain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  osc1.type = 'sine';
  osc2.type = 'triangle';
  osc1.frequency.value = freq;
  osc2.frequency.value = freq * 2.01;

  filter.type = 'lowpass';
  filter.frequency.value = 2800;

  osc1.connect(noteGain);
  osc2.connect(noteGain);
  noteGain.connect(filter);
  filter.connect(masterGain);

  noteGain.gain.setValueAtTime(0, startTime);
  noteGain.gain.linearRampToValueAtTime(gainVal, startTime + 0.015);
  noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + 2.4);

  osc1.start(startTime);
  osc2.start(startTime);
  osc1.stop(startTime + 2.5);
  osc2.stop(startTime + 2.5);
}

export function playSound(type) {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  if (type === 'paper') {
    // Generate realistic textured paper rustle
    const bufferSize = Math.floor(ctx.sampleRate * 0.45);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 2);
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const bandpass = ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.value = 2200;
    bandpass.Q.value = 0.8;

    const gain = ctx.createGain();
    gain.gain.value = 0.15;

    noise.connect(bandpass).connect(gain).connect(masterGain);
    noise.start(now);
  } else if (type === 'chime') {
    playChimeNote(659.25, now + 0.05, 0.09); // E5
    playChimeNote(783.99, now + 0.22, 0.08); // G5
    playChimeNote(1046.50, now + 0.42, 0.07); // C6
  } else if (type === 'drop') {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(260, now + 0.2);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.08, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.32);

    osc.connect(gain).connect(masterGain);
    osc.start(now);
    osc.stop(now + 0.34);
  }
}

let ambientInterval = null;
let ambientNodes = [];

export function startAmbientRhythm() {
  const ctx = getAudioContext();
  if (!ctx) return;
  if (ambientInterval) return;

  const gain = ctx.createGain();
  gain.gain.value = 0.035;
  gain.connect(masterGain);

  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 650;
  filter.connect(gain);

  // Soft warm chord drones
  const drones = [130.81, 196.00, 261.63].map((f) => {
    const o = ctx.createOscillator();
    o.type = 'sine';
    o.frequency.value = f;
    o.connect(filter);
    o.start();
    return o;
  });

  ambientNodes = drones;

  const playRandomBell = () => {
    const t = ctx.currentTime + 0.05;
    const note = PENTATONIC_FREQS[Math.floor(Math.random() * PENTATONIC_FREQS.length)];
    playChimeNote(note, t, 0.045);
    ambientInterval = setTimeout(playRandomBell, 1800 + Math.random() * 2400);
  };

  playRandomBell();
}

export function stopAmbientRhythm() {
  if (ambientInterval) {
    clearTimeout(ambientInterval);
    ambientInterval = null;
  }
  ambientNodes.forEach((n) => {
    try { n.stop(); } catch {}
  });
  ambientNodes = [];
}

export async function toggleMusic(play, url) {
  isMusicPlaying = play;
  if (play) {
    getAudioContext();
    if (url) {
      if (!bgMusicAudio) {
        bgMusicAudio = new Audio(url);
        bgMusicAudio.loop = true;
        bgMusicAudio.volume = 0.55;
      }
      bgMusicAudio.play().catch(() => {
        // Fallback to synthesized ambient music if audio file not supported or blocked
        startAmbientRhythm();
      });
    } else {
      startAmbientRhythm();
    }
  } else {
    if (bgMusicAudio) {
      bgMusicAudio.pause();
    }
    stopAmbientRhythm();
  }
  return isMusicPlaying;
}

export function isAudioPlaying() {
  return isMusicPlaying;
}
