/**
 * Main Application Orchestrator
 */

import Lenis from "lenis";
import gsap from "gsap";
import { weddingData } from "./data/wedding.js";
import { messages } from "./data/i18n.js";
import { mountEnvelope } from "./components/envelope.js";
import { renderCover, animateCoverEntrance } from "./components/cover.js";
import { createNameLogoLockup } from "./components/ornaments.js";
import { toggleMusic, isAudioPlaying } from "./components/audio.js";

import { renderWords } from "./components/words.js";
import { renderCouple } from "./components/couple.js";
import { renderCountdown } from "./components/countdown.js";
import { renderProgramme } from "./components/programme.js";
import { renderStory } from "./components/story.js";
import { renderCandlelight } from "./components/candlelight.js";
import { renderGallery } from "./components/gallery.js";
import { renderVenue } from "./components/venue.js";
import { renderGift } from "./components/gift.js";
import { renderWishes } from "./components/wishes.js";

// State
let currentLang = "km";
let lenis = null;

// Render All Sections
function renderAllSections(lang) {
  const mountMap = [
    { id: "cover-mount", fn: renderCover },
    { id: "words-mount", fn: renderWords },
    { id: "couple-mount", fn: renderCouple },
    { id: "countdown-mount", fn: renderCountdown },
    { id: "programme-mount", fn: renderProgramme },
    { id: "story-mount", fn: renderStory },
    { id: "candlelight-mount", fn: renderCandlelight },
    { id: "gallery-mount", fn: renderGallery },
    { id: "venue-mount", fn: renderVenue },
    { id: "gift-mount", fn: renderGift },
    { id: "wishes-mount", fn: renderWishes }
  ];

  mountMap.forEach(({ id, fn }) => {
    const el = document.getElementById(id);
    if (el) fn(el, { wedding: weddingData, lang });
  });
}

// Initialize Smooth Scroll for fine pointers
function initLenis() {
  if (window.matchMedia("(pointer: fine)").matches) {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }
}

// Update Language
function updateLanguage(newLang) {
  currentLang = newLang;
  document.documentElement.lang = currentLang;
  document.body.dataset.lang = currentLang;

  const t = messages[currentLang];
  const groomFull = weddingData.couple.groom[currentLang === "km" ? "km" : "en"];
  const brideFull = weddingData.couple.bride[currentLang === "km" ? "km" : "en"];
  document.title = `${t.kicker} · ${groomFull} & ${brideFull}`;

  // Update HUD text & monogram logo
  const langText = document.querySelector(".lang-text");
  if (langText) {
    langText.textContent = currentLang === "km" ? "ខ្មែរ / EN" : "EN / ខ្មែរ";
  }
  const hudMono = document.getElementById("hud-mono");
  if (hudMono) {
    const groomShort = weddingData.couple.groom[currentLang === "km" ? "shortKm" : "shortEn"];
    const brideShort = weddingData.couple.bride[currentLang === "km" ? "shortKm" : "shortEn"];
    hudMono.innerHTML = createNameLogoLockup({
      groom: groomShort,
      bride: brideShort,
      cls: "lk-hud",
      crest: false
    });
  }

  // Update Gate Texts if still open
  const gateKicker = document.getElementById("gate-kicker");
  const gateSub = document.getElementById("gate-sub");
  const gateHint = document.getElementById("gate-hint");
  if (gateKicker) gateKicker.textContent = t.kicker;
  if (gateSub) gateSub.textContent = t.weddingInvitation;
  if (gateHint) gateHint.textContent = t.tapSeal;

  // Re-render all sections
  renderAllSections(currentLang);
}

// Setup Top HUD Controls
function initHUD() {
  const hudMono = document.getElementById("hud-mono");
  const groomShort = weddingData.couple.groom.shortKm;
  const brideShort = weddingData.couple.bride.shortKm;

  if (hudMono) {
    hudMono.innerHTML = createNameLogoLockup({
      groom: groomShort,
      bride: brideShort,
      cls: "lk-hud",
      crest: false
    });
  }

  const langBtn = document.getElementById("lang-toggle");
  if (langBtn) {
    langBtn.addEventListener("click", () => {
      updateLanguage(currentLang === "km" ? "en" : "km");
    });
  }

  const musicBtn = document.getElementById("music-toggle");
  if (musicBtn) {
    musicBtn.addEventListener("click", async () => {
      const playing = await toggleMusic(!isAudioPlaying(), weddingData.music);
      musicBtn.classList.toggle("is-playing", playing);
      musicBtn.setAttribute("aria-pressed", String(playing));
    });
  }

  // Scroll detection for HUD gradient backdrop
  window.addEventListener("scroll", () => {
    const hud = document.getElementById("hud");
    if (hud) {
      if (window.scrollY > 50) {
        hud.classList.add("is-scrolled");
      } else {
        hud.classList.remove("is-scrolled");
      }
    }
  });
}

// Initialize Application
function init() {
  initLenis();
  initHUD();

  const envMount = document.getElementById("env-mount");

  // Render all sections
  renderAllSections(currentLang);

  // Mount 3D Envelope
  mountEnvelope(envMount, {
    wedding: weddingData,
    lang: currentLang,
    onOpenStart: () => {
      const musicBtn = document.getElementById("music-toggle");
      if (musicBtn) {
        musicBtn.classList.add("is-playing");
        musicBtn.setAttribute("aria-pressed", "true");
      }
    },
    onOpenComplete: () => {
      document.body.classList.remove("is-locked");
      document.body.classList.add("is-open");
      animateCoverEntrance();
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
