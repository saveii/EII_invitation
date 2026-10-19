/**
 * Section 5: Live Countdown & Infinite Blessing Marquee (រាប់ថយក្រោយ)
 */

import { toKhmerNumber } from "../data/i18n.js";

let countdownInterval = null;

export function renderCountdown(container, { wedding, lang = "km" }) {
  const isKm = lang === "km";

  container.innerHTML = `
    <section class="sec sec-countdown" id="countdown" aria-label="Countdown to the wedding day">
      <!-- Background Infinite Blessing Marquee -->
      <div class="marquee-wrap" aria-hidden="true">
        <div class="marquee-track">
          <span>${isKm ? "សិរីសួស្តី ជ័យមង្គល វិបុលសុខ មហាប្រសើរ ✦ សុភមង្គល និងក្តីស្រឡាញ់អស់កាលជានិច្ច ✦ " : "Love · Joy · Peace · Happiness · Everlasting Union ✦ "}</span>
          <span>${isKm ? "សិរីសួស្តី ជ័យមង្គល វិបុលសុខ មហាប្រសើរ ✦ សុភមង្គល និងក្តីស្រឡាញ់អស់កាលជានិច្ច ✦ " : "Love · Joy · Peace · Happiness · Everlasting Union ✦ "}</span>
          <span>${isKm ? "សិរីសួស្តី ជ័យមង្គល វិបុលសុខ មហាប្រសើរ ✦ សុភមង្គល និងក្តីស្រឡាញ់អស់កាលជានិច្ច ✦ " : "Love · Joy · Peace · Happiness · Everlasting Union ✦ "}</span>
        </div>
      </div>

      <div class="sec-countdown__inner">
        <span class="caps foil">${isKm ? "ពេលវេលារង់ចាំ" : "Save The Date"}</span>
        <h2 class="sec-title">${isKm ? "រាប់ថយក្រោយ ឆ្ពោះទៅថ្ងៃមង្គល" : "Counting Down to Forever"}</h2>
        <p class="sec-subtitle">${isKm ? "រង់ចាំទទួលស្វាគមន៍វត្តមានដ៏មានតម្លៃរបស់លោកអ្នក" : "Looking forward to celebrating our big day with you"}</p>

        <!-- Live Clock Chips -->
        <div class="cd-grid" id="cd-grid">
          <div class="cd-cell">
            <div class="cd-val foil" id="cd-days">--</div>
            <div class="cd-lbl">${isKm ? "ថ្ងៃ" : "Days"}</div>
          </div>
          <div class="cd-colon">:</div>
          <div class="cd-cell">
            <div class="cd-val foil" id="cd-hours">--</div>
            <div class="cd-lbl">${isKm ? "ម៉ោង" : "Hours"}</div>
          </div>
          <div class="cd-colon">:</div>
          <div class="cd-cell">
            <div class="cd-val foil" id="cd-minutes">--</div>
            <div class="cd-lbl">${isKm ? "នាទី" : "Minutes"}</div>
          </div>
          <div class="cd-colon">:</div>
          <div class="cd-cell">
            <div class="cd-val foil" id="cd-seconds">--</div>
            <div class="cd-lbl">${isKm ? "វិនាទី" : "Seconds"}</div>
          </div>
        </div>

        <div class="cd-blessing">
          <p>${isKm ? "«សូមឱ្យគូស្វាមីភរិយាថ្មី ជួបតែសេចក្តីសុខ សុភមង្គល និងស្រឡាញ់គ្នារហូតដល់ចាស់ជរា»" : "“May every passing second bring the bride and groom closer to endless joy.”"}</p>
        </div>
      </div>
    </section>
  `;

  startCountdown(wedding.date, lang);
}

function startCountdown(targetIso, lang) {
  if (countdownInterval) clearInterval(countdownInterval);

  const target = new Date(targetIso).getTime();

  function update() {
    const now = Date.now();
    const diff = target - now;

    const daysEl = document.getElementById("cd-days");
    const hoursEl = document.getElementById("cd-hours");
    const minEl = document.getElementById("cd-minutes");
    const secEl = document.getElementById("cd-seconds");

    if (!daysEl || !hoursEl || !minEl || !secEl) return;

    if (diff <= 0) {
      daysEl.textContent = lang === "km" ? "០" : "0";
      hoursEl.textContent = lang === "km" ? "០" : "0";
      minEl.textContent = lang === "km" ? "០" : "0";
      secEl.textContent = lang === "km" ? "០" : "0";
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / 1000 / 60) % 60);
    const s = Math.floor((diff / 1000) % 60);

    const formatNum = (n) => {
      const padded = String(n).padStart(2, "0");
      return lang === "km" ? toKhmerNumber(padded) : padded;
    };

    daysEl.textContent = formatNum(d);
    hoursEl.textContent = formatNum(h);
    minEl.textContent = formatNum(m);
    secEl.textContent = formatNum(s);
  }

  update();
  countdownInterval = setInterval(update, 1000);
}
