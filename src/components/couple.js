/**
 * Section 4: The Couple (កូនកំលោះ & កូនក្រមុំ)
 * Individual portrait cards, roles, quotes, and interactive fluttering butterfly
 */

import { createButterflySvg, createCornerSvg } from "./ornaments.js";

export function renderCouple(container, { wedding, lang = "km" }) {
  const isKm = lang === "km";
  const groom = wedding.couple.groom;
  const bride = wedding.couple.bride;

  container.innerHTML = `
    <section class="sec sec-couple" id="couple" aria-label="The Bride and Groom">
      <div class="sec-header">
        <span class="caps foil">${isKm ? "គូស្វាមីភរិយា" : "The Happy Couple"}</span>
        <h2 class="sec-title">${isKm ? "កូនកំលោះ និង កូនក្រមុំ" : "Groom & Bride"}</h2>
        <div class="sec-butterfly-cue">${createButterflySvg("is-fluttering")}</div>
      </div>

      <div class="couple-grid">
        <!-- Groom Card -->
        <article class="couple-card couple-card--groom" data-reveal="fade-up">
          <div class="couple-card__frame">
            <div class="couple-card__photo">
              <img src="${groom.photo}" alt="${groom[lang]}" loading="lazy" />
              <div class="couple-card__overlay"></div>
            </div>
            <div class="couple-card__corners">
              ${createCornerSvg("tl")}
              ${createCornerSvg("tr")}
              ${createCornerSvg("bl")}
              ${createCornerSvg("br")}
            </div>
          </div>
          <div class="couple-card__info">
            <span class="couple-card__role">${groom[isKm ? "roleKm" : "roleEn"]}</span>
            <h3 class="couple-card__name foil">${groom[lang]}</h3>
            <p class="couple-card__en">${groom.en}</p>
            <blockquote class="couple-card__quote">
              ${groom[isKm ? "quoteKm" : "quoteEn"]}
            </blockquote>
          </div>
        </article>

        <!-- Center Monogram Heart Symbol -->
        <div class="couple-interlock" aria-hidden="true">
          <svg viewBox="0 0 100 100" class="couple-interlock__svg">
            <path d="M50 82 C50 82 18 56 18 34 C18 20 28 14 38 18 C46 22 50 30 50 30 C50 30 54 22 62 18 C72 14 82 20 82 34 C82 56 50 82 50 82 Z"
              fill="none" stroke="url(#g-foil)" stroke-width="2" stroke-dasharray="4 3"/>
            <circle cx="50" cy="46" r="4" fill="url(#g-foil)"/>
          </svg>
        </div>

        <!-- Bride Card -->
        <article class="couple-card couple-card--bride" data-reveal="fade-up">
          <div class="couple-card__frame">
            <div class="couple-card__photo">
              <img src="${bride.photo}" alt="${bride[lang]}" loading="lazy" />
              <div class="couple-card__overlay"></div>
            </div>
            <div class="couple-card__corners">
              ${createCornerSvg("tl")}
              ${createCornerSvg("tr")}
              ${createCornerSvg("bl")}
              ${createCornerSvg("br")}
            </div>
          </div>
          <div class="couple-card__info">
            <span class="couple-card__role">${bride[isKm ? "roleKm" : "roleEn"]}</span>
            <h3 class="couple-card__name foil">${bride[lang]}</h3>
            <p class="couple-card__en">${bride.en}</p>
            <blockquote class="couple-card__quote">
              ${bride[isKm ? "quoteKm" : "quoteEn"]}
            </blockquote>
          </div>
        </article>
      </div>
    </section>
  `;
}
