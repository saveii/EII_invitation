/**
 * Cover / Hero Section & Atmospheric Particle Embers
 */

import gsap from "gsap";
import {
  createCornerSvg,
  createCrestSvg,
  createNameLogoLockup
} from "./ornaments.js";
import { formatDate } from "../data/i18n.js";

export function renderCover(container, { wedding, lang = "km" }) {
  const groomShort = wedding.couple.groom[lang === "km" ? "shortKm" : "shortEn"] || wedding.couple.groom.km;
  const brideShort = wedding.couple.bride[lang === "km" ? "shortKm" : "shortEn"] || wedding.couple.bride.km;
  const groomFull = wedding.couple.groom[lang === "km" ? "km" : "en"];
  const brideFull = wedding.couple.bride[lang === "km" ? "km" : "en"];

  const dateObj = formatDate(wedding.date, lang);
  const lunarText = wedding.lunar[lang] || "";
  const venueText = `${wedding.venue.name[lang]} · ${wedding.venue.address[lang]}`;

  container.innerHTML = `
    <section class="hero cover" id="hero" aria-label="Wedding invitation cover">
      <div class="hero__media" id="hero-media">
        <img src="${wedding.heroPhoto}" alt="${groomFull} & ${brideFull}" fetchpriority="high" />
        <div class="hero__shade"></div>
        <canvas class="hero__embers" id="hero-embers"></canvas>
      </div>

      <div class="cover__corners">
        ${createCornerSvg("tl")}
        ${createCornerSvg("tr")}
        ${createCornerSvg("bl")}
        ${createCornerSvg("br")}
      </div>

      <div class="cover__inner">
        <div class="cover__crest">
          ${createCrestSvg()}
        </div>
        <div class="cover__kicker foil">${lang === "km" ? "សិរីសួស្តីអាពាហ៍ពិពាហ៍" : "We're Getting Married"}</div>
        <div class="cover__sub">${lang === "km" ? "The Wedding Invitation" : "Official Digital Invitation"}</div>

        <div class="cover__lockup">
          ${createNameLogoLockup({
            groom: groomShort,
            bride: brideShort,
            cls: "lk-cover",
            crest: false
          })}
        </div>

        <div class="hero__en" id="names-en">${wedding.couple.groom.en}  &  ${wedding.couple.bride.en}</div>

        <div class="cover__invite">${lang === "km" ? "សូមគោរពអញ្ជើញ" : "Cordially Invites You"}</div>

        <div class="cover__chips">
          <div class="chip-d">
            <small>${lang === "km" ? "ថ្ងៃ" : "Day"}</small>
            <b>${dateObj.weekdayShort}</b>
          </div>
          <div class="chip-d">
            <small>${lang === "km" ? "ទី" : "Date"}</small>
            <b>${dateObj.day}</b>
          </div>
          <div class="chip-d">
            <small>${lang === "km" ? "ខែ" : "Month"}</small>
            <b>${dateObj.month}</b>
          </div>
          <div class="chip-d">
            <small>${lang === "km" ? "ឆ្នាំ" : "Year"}</small>
            <b>${dateObj.year}</b>
          </div>
        </div>

        <div class="cover__lunar">${lunarText}</div>
        <div class="cover__venue">${venueText}</div>

        <a class="cover__cue" href="#words">
          <span>${lang === "km" ? "សូមរំកិលចុះ ដើម្បីទស្សនាធៀបការ" : "Scroll to explore"}</span>
          <i></i>
        </a>
      </div>
    </section>
  `;

  // Start Canvas Embers
  const canvas = document.getElementById("hero-embers");
  if (canvas) {
    initEmbers(canvas);
  }
}

export function animateCoverEntrance() {
  const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

  tl.fromTo("#hero-media img", { scale: 1.15 }, { scale: 1.05, duration: 2.8 }, 0);
  tl.from(".cover__corners .kbach-corner", { opacity: 0, scale: 0.7, duration: 1.2, stagger: 0.08 }, 0.2);
  tl.from(".cover__crest", { opacity: 0, y: 20, duration: 1 }, 0.4);
  tl.from(".cover__kicker, .cover__sub", { opacity: 0, y: 15, duration: 0.9, stagger: 0.1 }, 0.6);

  // Logo lockup cinematic reveal
  const lockup = document.querySelector(".cover__lockup");
  if (lockup) {
    tl.fromTo(".cover__lockup .lk-groom",
      { clipPath: "inset(-20% 105% -20% -10%)" },
      { clipPath: "inset(-20% -10% -20% -10%)", duration: 1.4, ease: "power2.inOut" },
      0.8
    );
    tl.fromTo(".cover__lockup .lk-bride",
      { clipPath: "inset(-20% 105% -20% -10%)" },
      { clipPath: "inset(-20% -10% -20% -10%)", duration: 1.4, ease: "power2.inOut" },
      1.1
    );
    tl.from(".cover__lockup .lk-swash", {
      strokeDashoffset: 400,
      strokeDasharray: 400,
      duration: 1.4,
      stagger: 0.2
    }, 1.0);
    tl.from(".cover__lockup .lk-heart", {
      scale: 0,
      transformOrigin: "50% 50%",
      duration: 0.8,
      ease: "back.out(2.2)"
    }, 1.6);
    tl.from(".cover__lockup .lk-butterfly", {
      opacity: 0,
      x: 50,
      y: -40,
      rotate: 35,
      duration: 1.4,
      ease: "power2.out"
    }, 1.5);
  }

  tl.from("#names-en", { opacity: 0, y: 12, duration: 0.9 }, 1.8);
  tl.from(".cover__invite", { opacity: 0, y: 12, duration: 0.9 }, 2.0);
  tl.from(".cover__chips .chip-d", { opacity: 0, y: 22, duration: 0.8, stagger: 0.1 }, 2.2);
  tl.from(".cover__lunar, .cover__venue, .cover__cue", { opacity: 0, y: 12, duration: 0.9, stagger: 0.1 }, 2.5);

  // Gentle continuous breathing sway
  gsap.to(".cover__corners .kb-sway", {
    rotate: 2.2,
    duration: 3.8,
    yoyo: true,
    repeat: -1,
    ease: "sine.inOut"
  });

  gsap.to(".cover .lk-butterfly", {
    y: -7,
    x: 4,
    duration: 2.4,
    yoyo: true,
    repeat: -1,
    ease: "sine.inOut",
    delay: 3
  });
}

function initEmbers(canvas) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let width = 0;
  let height = 0;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const particles = [];
  const count = 32;

  const resize = () => {
    width = canvas.parentElement.offsetWidth;
    height = canvas.parentElement.offsetHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const createParticle = (spawnEverywhere = false) => ({
    x: Math.random() * width,
    y: spawnEverywhere ? Math.random() * height : height + 10,
    r: 0.6 + Math.random() * 1.8,
    vx: (Math.random() - 0.5) * 0.3,
    vy: 0.2 + Math.random() * 0.5,
    phase: Math.random() * Math.PI * 2,
    life: 0.4 + Math.random() * 0.6
  });

  resize();
  window.addEventListener("resize", resize);

  for (let i = 0; i < count; i++) {
    particles.push(createParticle(true));
  }

  let animFrame;
  const loop = (t) => {
    animFrame = requestAnimationFrame(loop);
    ctx.clearRect(0, 0, width, height);
    ctx.globalCompositeOperation = "lighter";

    for (const p of particles) {
      p.y -= p.vy;
      p.x += p.vx + Math.sin(t * 0.001 + p.phase) * 0.25;

      if (p.y < -10) {
        Object.assign(p, createParticle(false));
      }

      const fade = Math.min(1, (height - p.y) / (height * 0.2)) * Math.min(1, p.y / (height * 0.2));
      const alpha = Math.max(0, fade) * p.life * (0.6 + 0.4 * Math.sin(t * 0.003 + p.phase));

      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5);
      grad.addColorStop(0, `rgba(255, 238, 195, ${alpha})`);
      grad.addColorStop(0.35, `rgba(217, 177, 90, ${alpha * 0.6})`);
      grad.addColorStop(1, `rgba(255, 140, 60, 0)`);

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * 5, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  requestAnimationFrame(loop);
}
