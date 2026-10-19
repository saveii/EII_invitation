/**
 * Section 10: Venue & Map (ទីតាំង និងផែនទី)
 * Google Maps integration, directions link, .ics calendar export, and host contact hotline
 */

import { createDividerSvg } from "./ornaments.js";

export function renderVenue(container, { wedding, lang = "km" }) {
  const isKm = lang === "km";
  const venue = wedding.venue;
  const contacts = wedding.contacts || [];

  container.innerHTML = `
    <section class="sec sec-venue" id="venue" aria-label="Wedding Venue and Location">
      <div class="sec-header">
        <span class="caps foil">${isKm ? "ទីតាំង និងផែនទី" : "Location"}</span>
        <h2 class="sec-title">${isKm ? "ទីកន្លែងប្រារព្ធពិធីមង្គលការ" : "Wedding Venue"}</h2>
        <p class="sec-subtitle">${venue.name[lang]}</p>
        ${createDividerSvg("sec-venue__divider")}
      </div>

      <div class="venue-card">
        <!-- Venue Details -->
        <div class="venue-info">
          <div class="venue-icon">📍</div>
          <h3 class="venue-name foil">${venue.name[lang]}</h3>
          <p class="venue-address">${venue.address[lang]}</p>
          <p class="venue-note"><em>${venue.note[lang]}</em></p>
        </div>

        <!-- Google Maps Embed / Interactive Box -->
        <div class="venue-map-wrap">
          <iframe
            class="venue-map-iframe"
            title="Wedding Venue Map"
            src="https://maps.google.com/maps?q=${venue.lat},${venue.lng}&z=14&output=embed"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <!-- Action Buttons: Open Maps & Add to Calendar -->
        <div class="venue-actions">
          <a
            class="btn btn-primary"
            href="${venue.mapsUrl}"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>🗺️</span>
            <span>${isKm ? "បើកផែនទី Google Maps" : "Open in Google Maps"}</span>
          </a>

          <button
            class="btn btn-secondary"
            id="btn-add-calendar"
            type="button"
          >
            <span>📅</span>
            <span>${isKm ? "កត់ចំណាំក្នុងប្រតិទិន (.ics)" : "Add to Calendar"}</span>
          </button>
        </div>

        <!-- Host Hotline Contact Numbers -->
        <div class="venue-contacts">
          <h4 class="venue-contacts-title">${isKm ? "លេខទូរស័ព្ទម្ចាស់ដើមការ" : "Host Contact Numbers"}</h4>
          <div class="contact-chips">
            ${contacts.map(c => `
              <a class="contact-chip" href="${c.tel}">
                <span>📞</span>
                <span>${c.label}</span>
              </a>
            `).join("")}
          </div>
        </div>
      </div>
    </section>
  `;

  // Attach .ics calendar downloader
  const calBtn = document.getElementById("btn-add-calendar");
  if (calBtn) {
    calBtn.addEventListener("click", () => {
      downloadIcsCalendar(wedding, lang);
    });
  }
}

function downloadIcsCalendar(wedding, lang) {
  const isKm = lang === "km";
  const title = isKm
    ? `អាពាហ៍ពិពាហ៍ ${wedding.couple.groom.km} & ${wedding.couple.bride.km}`
    : `Wedding of ${wedding.couple.groom.en} & ${wedding.couple.bride.en}`;

  const desc = isKm
    ? `សូមគោរពអញ្ជើញចូលរួមពិធីសិរីមង្គលអាពាហ៍ពិពាហ៍ ${wedding.couple.groom.km} & ${wedding.couple.bride.km}`
    : `Wedding celebration of ${wedding.couple.groom.en} and ${wedding.couple.bride.en}`;

  const loc = `${wedding.venue.name[lang]}, ${wedding.venue.address[lang]}`;

  // Start Date: 2026-12-13T07:00:00+07:00 (UTC: 20261213T000000Z)
  // End Date: 2026-12-13T22:00:00+07:00 (UTC: 20261213T150000Z)
  const dtStart = "20261213T000000Z";
  const dtEnd = "20261213T150000Z";

  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Khmer Luxury Wedding E-Invitation//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `SUMMARY:${title}`,
    `DESCRIPTION:${desc}`,
    `LOCATION:${loc}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    "STATUS:CONFIRMED",
    "BEGIN:VALARM",
    "TRIGGER:-PT24H",
    "ACTION:DISPLAY",
    `DESCRIPTION:Reminder: ${title}`,
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `wedding-${wedding.couple.groom.shortEn}-${wedding.couple.bride.shortEn}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
