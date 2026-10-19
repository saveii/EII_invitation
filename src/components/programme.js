/**
 * Section 6: Programme & Ceremonial Timeline (កម្មវិធីមង្គលការ)
 * Connected vertical gold drawing thread, ritual icons, and main event highlight
 */

import { createCeremonyIconSvg, createDividerSvg } from "./ornaments.js";
import { toKhmerNumber } from "../data/i18n.js";

export function renderProgramme(container, { wedding, lang = "km" }) {
  const isKm = lang === "km";
  const scheduleData = wedding.programme[0];

  const rowsHtml = scheduleData.rows.map((row, idx) => {
    const timeDisplay = isKm
      ? `ម៉ោង ${toKhmerNumber(row.t)} ${row.pkm}`
      : `${row.t} ${row.pen}`;

    const isMain = !!row.main;

    return `
      <div class="tl-item ${isMain ? "tl-item--main" : ""}" data-reveal="fade-up">
        <!-- Time Node & Icon -->
        <div class="tl-node">
          <div class="tl-icon-box">
            ${createCeremonyIconSvg(row.icon || "parade")}
          </div>
          <div class="tl-pulse"></div>
        </div>

        <!-- Content Card -->
        <div class="tl-content">
          <div class="tl-time-badge">${timeDisplay}</div>
          <h3 class="tl-title">${row[lang] || row.km}</h3>
          ${isMain ? `<span class="tl-badge foil">${isKm ? "កម្មវិធីធំ · ពិសាភោជនាហារ" : "Grand Reception Banquet"}</span>` : ""}
        </div>
      </div>
    `;
  }).join("");

  container.innerHTML = `
    <section class="sec sec-programme" id="programme" aria-label="Wedding Programme">
      <div class="sec-header">
        <span class="caps foil">${isKm ? "លំដាប់ពិធី" : "Order of Events"}</span>
        <h2 class="sec-title">${isKm ? "កម្មវិធីសិរីមង្គលអាពាហ៍ពិពាហ៍" : "Wedding Ceremonies"}</h2>
        <p class="sec-subtitle">${scheduleData[lang] || scheduleData.km}</p>
        ${createDividerSvg("sec-programme__divider")}
      </div>

      <div class="tl-container">
        <!-- Drawing Gold Thread -->
        <div class="tl-line" id="tl-line" aria-hidden="true">
          <div class="tl-line-fill" id="tl-line-fill"></div>
        </div>

        <div class="tl-list">
          ${rowsHtml}
        </div>
      </div>
    </section>
  `;
}
