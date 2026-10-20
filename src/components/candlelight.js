/**
 * Section 8: Candlelight Reflection & Floating Lotus Lanterns (បំភ្លឺទៀនជ័យ)
 * Interactive water surface where tapping floats glowing lotus lanterns with live wish counter
 */

import { createLotusLanternSvg } from "./ornaments.js";
import { toKhmerNumber } from "../data/i18n.js";

let candleCount = 108; // Lucky Khmer Buddhist starting count

export function renderCandlelight(container, { wedding, lang = "km" }) {
  const isKm = lang === "km";
  const storedCount = localStorage.getItem("khmer_wedding_candles");
  if (storedCount) candleCount = parseInt(storedCount, 10);

  const hasPhoto = Boolean(wedding.candlelightPhoto);

  container.innerHTML = `
    <section class="sec sec-candlelight ${hasPhoto ? "has-photo" : "no-photo"}" id="candlelight" aria-label="Candlelight Reflection">
      <div class="candlelight-bg">
        ${hasPhoto ? `<img src="${wedding.candlelightPhoto}" alt="Candlelight Reflection" loading="lazy" />` : ""}
        <div class="candlelight-shade"></div>
      </div>

      <!-- Water Pond Surface (Tap area) -->
      <div class="candlelight-pond" id="candle-pond" title="${isKm ? "សូមចុចលើផ្ទៃទឹក ដើម្បីបណ្ដែតប្រទីប" : "Tap the water to float a lotus lantern"}">
        <!-- Floating Lanterns Container -->
        <div class="lantern-layer" id="lantern-layer">
          <div class="floating-lantern l-1">${createLotusLanternSvg()}</div>
          <div class="floating-lantern l-2">${createLotusLanternSvg()}</div>
          <div class="floating-lantern l-3">${createLotusLanternSvg()}</div>
        </div>
      </div>

      <div class="candlelight-overlay">
        <span class="caps foil">${isKm ? "ក្រោមពន្លឺភ្លើងទៀន" : "Sacred Glow"}</span>
        <h2 class="sec-title foil">${isKm ? "បំភ្លឺទៀនជ័យ និងបណ្ដែតប្រទីប" : "Candlelight & Floating Lanterns"}</h2>
        <p class="sec-subtitle">${isKm ? "សូមប៉ះលើផ្ទៃទឹក ដើម្បីបណ្ដែតប្រទីបក្ដីប្រាថ្នា និងប្រសិទ្ធពរជ័យ" : "Tap anywhere on the water to release a glowing wish lantern"}</p>

        <div class="candle-counter">
          <span class="candle-count-label">${isKm ? "ចំនួនប្រទីបដែលបានបណ្ដែត" : "Lanterns Released"}</span>
          <div class="candle-count-val foil" id="candle-val">
            ${isKm ? toKhmerNumber(candleCount) : candleCount}
          </div>
        </div>

        <button class="btn btn-lantern" id="btn-light-candle" type="button">
          <span>🕯️</span>
          <span>${isKm ? "បណ្ដែតប្រទីបសិរីសួស្តី" : "Float a Wish Lantern"}</span>
        </button>
      </div>
    </section>
  `;

  // Attach tap interaction
  const pond = document.getElementById("candle-pond");
  const btn = document.getElementById("btn-light-candle");
  const layer = document.getElementById("lantern-layer");
  const valEl = document.getElementById("candle-val");

  function spawnLantern(clientX, clientY) {
    candleCount += 1;
    localStorage.setItem("khmer_wedding_candles", candleCount);
    if (valEl) {
      valEl.textContent = isKm ? toKhmerNumber(candleCount) : candleCount;
    }

    if (!layer) return;

    const rect = pond ? pond.getBoundingClientRect() : { left: 0, top: 0, width: 300, height: 400 };
    const x = clientX ? clientX - rect.left : Math.random() * (rect.width - 80) + 40;
    const y = clientY ? clientY - rect.top : rect.height * 0.7;

    // Create ripple effect
    const rip = document.createElement("div");
    rip.className = "pond-ripple";
    rip.style.left = `${x}px`;
    rip.style.top = `${y}px`;
    layer.appendChild(rip);
    setTimeout(() => rip.remove(), 1600);

    // Create lantern
    const el = document.createElement("div");
    el.className = "floating-lantern is-spawned";
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.innerHTML = createLotusLanternSvg();
    layer.appendChild(el);

    // Fade and float upward
    setTimeout(() => {
      el.style.transform = `translateY(-${Math.random() * 120 + 80}px) scale(${Math.random() * 0.4 + 0.8})`;
      el.style.opacity = "0";
    }, 50);

    setTimeout(() => el.remove(), 8000);
  }

  if (pond) {
    pond.addEventListener("pointerdown", (e) => {
      spawnLantern(e.clientX, e.clientY);
    });
  }

  if (btn) {
    btn.addEventListener("click", () => {
      spawnLantern();
    });
  }
}
