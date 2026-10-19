/**
 * Section 7: Our Story / Highlights (ដំណើររឿងនៃក្តីស្រឡាញ់)
 * Milestone cards with dates, photos, captions, and horizontal touch scroll
 */

import { createDividerSvg } from "./ornaments.js";

export function renderStory(container, { wedding, lang = "km" }) {
  const isKm = lang === "km";
  const stories = wedding.story || [];

  const cardsHtml = stories.map((s, idx) => `
    <article class="story-card" data-idx="${idx}">
      <div class="story-card__media">
        <img src="${s.photo}" alt="${s[isKm ? "titleKm" : "titleEn"]}" loading="lazy" />
        <div class="story-card__year foil">${s.year}</div>
      </div>
      <div class="story-card__body">
        <span class="story-card__date">${s[isKm ? "dateKm" : "dateEn"]}</span>
        <h3 class="story-card__title">${s[isKm ? "titleKm" : "titleEn"]}</h3>
        <p class="story-card__desc">${s[isKm ? "descKm" : "descEn"]}</p>
      </div>
    </article>
  `).join("");

  container.innerHTML = `
    <section class="sec sec-story" id="story" aria-label="Our Love Story">
      <div class="sec-header">
        <span class="caps foil">${isKm ? "អនុស្សាវរីយ៍" : "Our Journey"}</span>
        <h2 class="sec-title">${isKm ? "ដំណើររឿងនៃក្តីស្រឡាញ់" : "Our Love Story"}</h2>
        <p class="sec-subtitle">${isKm ? "ពីថ្ងៃជួបគ្នាដំបូង រហូតដល់ថ្ងៃសន្យាចាប់ដៃគ្នា" : "From the first hello to a lifetime of love"}</p>
        ${createDividerSvg("sec-story__divider")}
      </div>

      <div class="story-scroll-wrap">
        <div class="story-track" id="story-track">
          ${cardsHtml}
        </div>
      </div>

      <div class="story-dots" id="story-dots" aria-hidden="true">
        ${stories.map((_, i) => `<span class="s-dot ${i === 0 ? "is-active" : ""}"></span>`).join("")}
      </div>
    </section>
  `;

  // Attach scroll listener for dots
  const track = document.getElementById("story-track");
  const dots = document.querySelectorAll("#story-dots .s-dot");
  if (track && dots.length) {
    track.addEventListener("scroll", () => {
      const idx = Math.round(track.scrollLeft / (track.offsetWidth * 0.75));
      dots.forEach((dot, i) => dot.classList.toggle("is-active", i === idx));
    }, { passive: true });
  }
}
