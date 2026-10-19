/**
 * Section 3: Formal Invitation Words (ពាក្យអញ្ជើញ)
 * Features Arch-framed photo, two-column parents honorifics, and traditional formal Khmer wording
 */

import { createCrestSvg, createDividerSvg } from "./ornaments.js";

export function renderWords(container, { wedding, lang = "km" }) {
  const gParents = wedding.families.groom;
  const bParents = wedding.families.bride;

  const isKm = lang === "km";

  container.innerHTML = `
    <section class="sec sec-words" id="words" aria-label="Formal Wedding Invitation">
      <div class="sec-words__card">
        <!-- Top Arch Crest -->
        <div class="sec-words__crest">
          ${createCrestSvg()}
        </div>

        <div class="sec-words__kicker kicker foil">
          ${isKm ? "សិរីសួស្តីអាពាហ៍ពិពាហ៍" : "The Wedding Invitation"}
        </div>

        <!-- Arch Framed Photo -->
        <div class="sec-words__arch-wrap">
          <div class="sec-words__arch">
            <img src="${wedding.archPhoto || wedding.heroPhoto}" alt="${wedding.couple.groom.km} & ${wedding.couple.bride.km}" loading="lazy" />
            <div class="sec-words__arch-glow"></div>
          </div>
          <div class="sec-words__arch-border"></div>
        </div>

        <!-- Parents Honors Two Columns -->
        <div class="parents-grid">
          <!-- Groom's Parents -->
          <div class="parents-col parents-col--groom">
            <h3 class="parents-title">${isKm ? "មាតាបិតាកូនកំលោះ" : "Parents of the Groom"}</h3>
            <p class="parents-name">${gParents.father[lang]}</p>
            <p class="parents-name">${gParents.mother[lang]}</p>
          </div>

          <!-- Central Ampersand Divider -->
          <div class="parents-sep">
            <span class="parents-amp">&</span>
          </div>

          <!-- Bride's Parents -->
          <div class="parents-col parents-col--bride">
            <h3 class="parents-title">${isKm ? "មាតាបិតាកូនក្រមុំ" : "Parents of the Bride"}</h3>
            <p class="parents-name">${bParents.father[lang]}</p>
            <p class="parents-name">${bParents.mother[lang]}</p>
          </div>
        </div>

        ${createDividerSvg("sec-words__divider")}

        <!-- Formal Royal / Traditional Invitation Body -->
        <div class="sec-words__body">
          <p class="sec-words__honor">
            ${isKm ? "មានកិត្តិយសសូមគោរពអញ្ជើញ" : "Request the Honor of Your Presence"}
          </p>
          <p class="sec-words__text">
            ${isKm
              ? "ឯកឧត្តម អ្នកឧកញ៉ា លោកជំទាវ លោក លោកស្រី អ្នកនាង កញ្ញា និង ប្រិយមិត្តអញ្ជើញចូលរួមជាអធិបតី និងជាភ្ញៀវកិត្តិយស ដើម្បីប្រសិទ្ធពរជ័យសិរីសួស្តី ជ័យមង្គលក្នុង ពិធីរៀបអាពាហ៍ពិពាហ៍ កូនប្រុស-ស្រី របស់យើងខ្ញុំ"
              : "On the auspicious occasion of the wedding ceremony of our children, to bestow your warmest blessings and honor upon the newlyweds"}
          </p>
        </div>

        <!-- Couple Name Honors -->
        <div class="sec-words__couple">
          <div class="honored-child">
            <span class="honored-role">${isKm ? "កូនប្រុសនាម" : "Our Son"}</span>
            <span class="honored-name foil">${wedding.couple.groom[lang]}</span>
          </div>
          <div class="honored-conjunction">${isKm ? "ជាគូនឹង" : "Together with"}</div>
          <div class="honored-child">
            <span class="honored-role">${isKm ? "កូនស្រីនាម" : "Our Daughter"}</span>
            <span class="honored-name foil">${wedding.couple.bride[lang]}</span>
          </div>
        </div>

        <!-- Banquet & Time Sentence -->
        <div class="sec-words__schedule-box">
          <p class="sec-words__when">
            ${isKm
              ? `ពិសាភោជនាហារប្រព្រឹត្តនៅ <strong>${wedding.lunar.km}</strong> ត្រូវនឹង <strong>ថ្ងៃអាទិត្យ ទី១៣ ខែធ្នូ ឆ្នាំ២០២៦</strong> វេលាម៉ោង <strong>៥:០០ ល្ងាច</strong> ស្ថិតនៅ${wedding.venue.name.km} ${wedding.venue.address.km} ដោយមេត្រីភាព។`
              : `The wedding celebration will be held on <strong>Sunday, 13 December 2026</strong> at <strong>5:00 PM</strong> at ${wedding.venue.name.en}, ${wedding.venue.address.en}.`}
          </p>
          <p class="sec-words__gratitude">
            ${isKm ? "វត្តមានដ៏ឧត្តុង្គឧត្តមរបស់លោកអ្នក ជាកិត្តិយសដ៏ខ្ពង់ខ្ពស់បំផុតសម្រាប់គ្រួសារយើងខ្ញុំ!" : "Your presence will be our greatest honor and happiness!"}
          </p>
        </div>
      </div>
    </section>
  `;
}
