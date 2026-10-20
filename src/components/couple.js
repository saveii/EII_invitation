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

  const groomTitle = isKm ? (groom.titleKm || "លោក") : (groom.titleEn || "Mr.");
  const brideTitle = isKm ? (bride.titleKm || "អ្នកនាង") : (bride.titleEn || "Ms.");

  const groomHonor = isKm
    ? (groom.parentHonorKm || (gParents ? `បុត្រ ${gParents.father.km} និង ${gParents.mother.km}` : "បុត្រ លោក ................... និង លោកស្រី ....."))
    : (groom.parentHonorEn || (gParents ? `Son of ${gParents.father.en} & ${gParents.mother.en}` : "Son of ..."));

  const brideHonor = isKm
    ? (bride.parentHonorKm || (bParents ? `បុត្រី ${bParents.father.km} និង ${bParents.mother.km}` : "បុត្រី លោក ................... និង លោកស្រី ....."))
    : (bride.parentHonorEn || (bParents ? `Daughter of ${bParents.father.en} & ${bParents.mother.en}` : "Daughter of ..."));

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
            <h3 class="couple-card__name foil">${groomTitle} ${groom[lang]}</h3>
            <p class="couple-card__en">${groom.en}</p>
            <p class="couple-card__parents">${groomHonor}</p>
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
            <h3 class="couple-card__name foil">${brideTitle} ${bride[lang]}</h3>
            <p class="couple-card__en">${bride.en}</p>
            <p class="couple-card__parents">${brideHonor}</p>
          </div>
        </article>
      </div>
    </section>
  `;
}

