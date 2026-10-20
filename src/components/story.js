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

      <div class="story-scroll-wrap" id="story-scroll-wrap">
        <div class="story-track" id="story-track">
          ${cardsHtml}
        </div>
      </div>

      <div class="story-dots" id="story-dots" role="tablist" aria-label="Story cards pagination">
        ${stories.map((_, i) => `<button type="button" class="s-dot ${i === 0 ? "is-active" : ""}" role="tab" aria-selected="${i === 0}" aria-label="Slide ${i + 1}"></button>`).join("")}
      </div>
    </section>
  `;

  // Attach smooth scroll listener and dot navigation
  const wrap = container.querySelector(".story-scroll-wrap");
  const cards = container.querySelectorAll(".story-card");
  const dots = container.querySelectorAll(".s-dot");

  if (wrap && cards.length && dots.length) {
    let ticking = false;

    function updateActive() {
      const wrapRect = wrap.getBoundingClientRect();
      const wrapCenter = wrapRect.left + wrapRect.width / 2;
      let closestIdx = 0;
      let minDiff = Infinity;

      cards.forEach((card, i) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;
        const diff = Math.abs(cardCenter - wrapCenter);
        if (diff < minDiff) {
          minDiff = diff;
          closestIdx = i;
        }
      });

      dots.forEach((dot, i) => {
        const isActive = i === closestIdx;
        dot.classList.toggle("is-active", isActive);
        dot.setAttribute("aria-selected", isActive ? "true" : "false");
      });

      cards.forEach((card, i) => {
        card.classList.toggle("is-active", i === closestIdx);
      });

      ticking = false;
    }

    wrap.addEventListener("scroll", () => {
      if (!ticking) {
        window.requestAnimationFrame(updateActive);
        ticking = true;
      }
    }, { passive: true });

    // Click dot to navigate smoothly to card
    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => {
        if (cards[i]) {
          cards[i].scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
        }
      });
    });

    // Initial sync
    updateActive();
  }
}
