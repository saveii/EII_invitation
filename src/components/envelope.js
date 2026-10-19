/**
 * 3D Envelope Component & Cinematic Opening Sequence
 */

import gsap from "gsap";
import {
  generateScallopPath,
  generateScallopViewbox,
  createCornerSvg,
  createCrestSvg,
  createNameLogoLockup,
  createWaxSealSvg
} from "./ornaments.js";
import { playSound, toggleMusic } from "./audio.js";

export function mountEnvelope(container, { wedding, lang = "km", onOpenStart, onOpenComplete }) {
  const groomShort = wedding.couple.groom[lang === "km" ? "shortKm" : "shortEn"] || wedding.couple.groom.km;
  const brideShort = wedding.couple.bride[lang === "km" ? "shortKm" : "shortEn"] || wedding.couple.bride.km;
  const dateFormatted = lang === "km" ? "១៣ · ១២ · ២០២៦" : "13 · 12 · 2026";
  const kickerText = lang === "km" ? "សិរីសួស្តីអាពាហ៍ពិពាហ៍" : "The Wedding Invitation";
  const inviteText = lang === "km" ? "សូមគោរពអញ្ជើញ" : "Cordially Invites You";

  const scallopClipDef = generateScallopPath(9, 0.028);
  const scallopFoilD = generateScallopViewbox(9, 0.028);

  container.innerHTML = `
    <!-- Global SVG ClipPaths for Envelope -->
    <svg width="0" height="0" style="position:absolute" aria-hidden="true">
      <defs>
        <clipPath id="clip-flap" clipPathUnits="objectBoundingBox">
          <path d="${scallopClipDef}"/>
        </clipPath>
      </defs>
    </svg>

    <div class="e2" id="env">
      <div class="e2__ground" id="env-ground" aria-hidden="true"></div>
      <div class="e2__stage" id="env-stage">
        <!-- 1. Back panel -->
        <div class="e2__part e2__back" id="env-back"></div>

        <!-- 2. Inside Invitation Card -->
        <div class="e2__card" id="env-card">
          <div class="e2__card-frame"></div>
          <div class="e2__card-corners">
            ${createCornerSvg("tl")}
            ${createCornerSvg("tr")}
            ${createCornerSvg("bl")}
            ${createCornerSvg("br")}
          </div>
          <div class="e2__card-inner">
            <div class="e2__card-kicker">${kickerText}</div>
            ${createNameLogoLockup({
              groom: groomShort,
              bride: brideShort,
              cls: "lk-card",
              crest: true
            })}
            <div class="e2__card-invite">${inviteText}</div>
            <div class="e2__card-date">${dateFormatted}</div>
          </div>
        </div>

        <!-- 3. Front Pocket (Folded Left, Right, Bottom Panels) -->
        <div class="e2__part e2__pocket" id="env-pocket">
          <div class="e2__pocket-l"></div>
          <div class="e2__pocket-r"></div>
          <div class="e2__pocket-b"></div>
          <div class="e2__emboss">
            ${createCornerSvg("bl")}
            ${createCornerSvg("br")}
          </div>
          <div class="e2__date">${dateFormatted}</div>
        </div>

        <!-- 4. Flap Shadow -->
        <div class="e2__part e2__flapshadow" id="flap-shadow"></div>

        <!-- 5. Top Flap (Scalloped 3D Fold) -->
        <div class="e2__part e2__flap" id="env-flap">
          <div class="e2__flap-front">
            <svg class="e2__flap-foil" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <path d="${scallopFoilD}" transform="translate(50 2.5) scale(0.93) translate(-50 0)" />
            </svg>
            <div class="e2__flap-logo">
              ${createNameLogoLockup({
                groom: groomShort,
                bride: brideShort,
                cls: "lk-env",
                crest: false
              })}
            </div>
          </div>
          <!-- Cream Back Lining visible when flap opens 180° -->
          <div class="e2__flap-back">
            <div class="e2__flap-crest">
              ${createCrestSvg()}
            </div>
          </div>
        </div>

        <!-- 6. Golden Wax Seal Button -->
        <button class="e2__seal" id="seal" type="button" aria-label="Open wedding invitation">
          ${createWaxSealSvg()}
        </button>
      </div>
    </div>
  `;

  initEnvelopeInteractions({
    wedding,
    onOpenStart,
    onOpenComplete
  });
}

function initEnvelopeInteractions({ wedding, onOpenStart, onOpenComplete }) {
  const env = document.getElementById("env");
  const stage = document.getElementById("env-stage");
  const seal = document.getElementById("seal");
  const flap = document.getElementById("env-flap");
  const flapShadow = document.getElementById("flap-shadow");
  const card = document.getElementById("env-card");
  const pocket = document.getElementById("env-pocket");
  const back = document.getElementById("env-back");
  const ground = document.getElementById("env-ground");
  const gate = document.getElementById("gate");
  const dim = document.getElementById("gate-dim");

  // Initial Entrance Animation
  gsap.from(env, {
    y: 70,
    rotateX: 20,
    opacity: 0,
    duration: 1.4,
    ease: "power3.out",
    delay: 0.2
  });

  gsap.from(seal, {
    scale: 1.3,
    opacity: 0,
    duration: 0.9,
    ease: "back.out(2)",
    delay: 0.8
  });

  // Idle Floating Motion
  const floatTween = gsap.to(stage, {
    y: -6,
    duration: 2.8,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1
  });

  // Interactive 3D Tilt on Pointer Move
  const handlePointerMove = (e) => {
    const rx = ((e.clientY / window.innerHeight) - 0.5) * -12;
    const ry = ((e.clientX / window.innerWidth) - 0.5) * 16;
    gsap.to(stage, {
      rotateX: 6 + rx,
      rotateY: ry,
      duration: 0.8,
      ease: "power2.out",
      overwrite: "auto"
    });
  };

  window.addEventListener("pointermove", handlePointerMove);

  // Opening Trigger
  let isOpen = false;

  const openEnvelope = () => {
    if (isOpen) return;
    isOpen = true;

    // Remove tilt listener & idle float
    window.removeEventListener("pointermove", handlePointerMove);
    floatTween.kill();

    gate.classList.add("is-opening");

    // Tactile Audio triggers
    playSound("paper");
    setTimeout(() => playSound("chime"), 900);
    toggleMusic(true, wedding.music);

    if (navigator.vibrate) {
      try { navigator.vibrate([15, 60, 25]); } catch {}
    }

    if (onOpenStart) onOpenStart();

    // Cinematic Opening Timeline (~5.5s slow "by hand")
    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut" }
    });

    // 1. Reset stage tilt to neutral viewing angle
    tl.to(stage, {
      rotateX: 0,
      rotateY: 0,
      y: 0,
      duration: 0.6
    }, 0);

    // Hide gate kicker & hint smoothly
    tl.to(".gate__invite, .gate__hint", {
      opacity: 0,
      y: -14,
      duration: 0.5
    }, 0);

    // 2. Press seal down slightly
    tl.to(seal, {
      scale: 0.94,
      duration: 0.18,
      ease: "power1.in"
    }, 0);

    // 3. Lift seal with growing shadow
    tl.to(seal, {
      scale: 1.12,
      y: -20,
      rotate: -8,
      "--seal-shadow": 1,
      duration: 0.55,
      ease: "power2.out"
    }, 0.18);

    // 4. Set seal aside off screen
    tl.to(seal, {
      x: "42vw",
      y: "55vh",
      rotate: 65,
      scale: 0.85,
      opacity: 0,
      duration: 0.95,
      ease: "power2.in"
    }, 0.7);

    // 5. Flap unfolds 180° in 3D & shadow lifts
    tl.to(flapShadow, {
      opacity: 0,
      scaleY: 0.2,
      duration: 0.7
    }, 0.75);

    tl.to(flap, {
      rotateX: 180,
      duration: 1.45,
      ease: "power2.inOut",
      onUpdate() {
        const rot = gsap.getProperty(flap, "rotateX");
        // Layer order fix: once flap passes 90°, put behind card
        if (rot > 90) {
          flap.style.zIndex = "1";
        } else {
          flap.style.zIndex = "4";
        }
      }
    }, 0.75);

    // 6. Draw card out of the pocket at slight angle while envelope moves down
    tl.to([pocket, back, flap, ground], {
      yPercent: 35,
      duration: 1.4,
      ease: "power2.inOut"
    }, 1.6);

    tl.to(card, {
      zIndex: 10,
      yPercent: -55,
      rotateZ: -2.5,
      scale: 1.08,
      duration: 1.4,
      ease: "power2.out"
    }, 1.7);

    // 7. Envelope drops out of frame
    tl.to([pocket, back, flap, ground], {
      yPercent: 140,
      opacity: 0,
      duration: 1.1,
      ease: "power2.in"
    }, 2.8);

    // 8. Card comes to center & camera view
    tl.to(card, {
      yPercent: 0,
      rotateZ: 0,
      scale: 1.45,
      duration: 1.6,
      ease: "power2.inOut"
    }, 3.0);

    // 9. Fade through dark into the Cover section
    tl.to(dim, {
      opacity: 1,
      duration: 0.95,
      ease: "power1.in"
    }, 4.4);

    tl.to(card, {
      scale: 2.2,
      opacity: 0,
      duration: 0.95,
      ease: "power1.in"
    }, 4.4);

    tl.call(() => {
      if (onOpenComplete) onOpenComplete();
      gsap.to(gate, {
        opacity: 0,
        duration: 0.8,
        onComplete: () => {
          gate.style.display = "none";
        }
      });
    }, null, 5.35);
  };

  seal.addEventListener("click", openEnvelope);
  env.addEventListener("click", (e) => {
    if (!isOpen) openEnvelope();
  });
}
