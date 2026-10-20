/**
 * Section 4: The Couple (កូនកំលោះ & កូនក្រមុំ)
 * Individual portrait cards side-by-side, roles, names, and parent honors
 */

import { createButterflySvg, createCornerSvg } from "./ornaments.js";

export function renderCouple(container, { wedding, lang = "km" }) {
  const isKm = lang === "km";
  const groom = wedding.couple.groom;
  const bride = wedding.couple.bride;
  const gParents = wedding.families?.groom;
  const bParents = wedding.families?.bride;

  const groomHonor = isKm
    ? (groom.parentHonorKm || (gParents ? `ជាកូនប្រុសរបស់ ${gParents.father.km} និង ${gParents.mother.km}` : ""))
    : (groom.parentHonorEn || (gParents ? `Son of ${gParents.father.en} & ${gParents.mother.en}` : ""));

  const brideHonor = isKm
    ? (bride.parentHonorKm || (bParents ? `ជាកូនស្រីរបស់ ${bParents.father.km} និង ${bParents.mother.km}` : ""))
    : (bride.parentHonorEn || (bParents ? `Daughter of ${bParents.father.en} & ${bParents.mother.en}` : ""));

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
            <span class="couple-card__role">${groom[isKm ? "roleKm" : "roleEn"] || (isKm ? "កូនកំលោះ" : "Groom")}</span>
            <h3 class="couple-card__name foil">${groom[lang]}</h3>
            <p class="couple-card__en">${groom.en}</p>
            ${groomHonor ? `<p class="couple-card__parents">${groomHonor}</p>` : ""}
            ${groom[isKm ? "quoteKm" : "quoteEn"] ? `<blockquote class="couple-card__quote">${groom[isKm ? "quoteKm" : "quoteEn"]}</blockquote>` : ""}
          </div>
        </article>

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
            <span class="couple-card__role">${bride[isKm ? "roleKm" : "roleEn"] || (isKm ? "កូនក្រមុំ" : "Bride")}</span>
            <h3 class="couple-card__name foil">${bride[lang]}</h3>
            <p class="couple-card__en">${bride.en}</p>
            ${brideHonor ? `<p class="couple-card__parents">${brideHonor}</p>` : ""}
            ${bride[isKm ? "quoteKm" : "quoteEn"] ? `<blockquote class="couple-card__quote">${bride[isKm ? "quoteKm" : "quoteEn"]}</blockquote>` : ""}
          </div>
        </article>
      </div>
    </section>
  `;
}

