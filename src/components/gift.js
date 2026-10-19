/**
 * Section 11: Wedding Gift & Digital KHQR (សំបុត្រចំណងដៃ)
 * Authentic Bakong KHQR & ABA Pay digital cards with Save QR & Copy Account actions
 */

import { createDividerSvg } from "./ornaments.js";

export function renderGift(container, { wedding, lang = "km" }) {
  const isKm = lang === "km";
  const accounts = wedding.gift?.accounts || [];

  const cardsHtml = accounts.map((acc, idx) => {
    const isBakong = acc.qrType === "khqr";
    const headerColor = isBakong ? "#e11b22" : "#004777";
    const bankLabel = isBakong ? "KHQR" : "ABA PAY";

    return `
      <div class="gift-card ${isBakong ? "gift-card--khqr" : "gift-card--aba"}" data-idx="${idx}">
        <div class="gift-card__header" style="background:${headerColor};">
          <div class="gift-card__brand">
            <span class="gift-card__bank-tag">${bankLabel}</span>
            <span class="gift-card__side">${acc.side[lang]}</span>
          </div>
        </div>

        <div class="gift-card__body">
          <!-- Realistic Crisp SVG QR Code -->
          <div class="gift-card__qr-box" id="qr-box-${idx}">
            <svg class="gift-qr-svg" viewBox="0 0 180 180" aria-label="QR Code for ${acc.accName}">
              <!-- Background -->
              <rect width="180" height="180" fill="#ffffff" rx="8"/>
              <!-- Finder Patterns -->
              <!-- Top-Left -->
              <rect x="15" y="15" width="42" height="42" fill="none" stroke="#1a1e0d" stroke-width="7" rx="4"/>
              <rect x="25" y="25" width="22" height="22" fill="#1a1e0d" rx="2"/>
              <!-- Top-Right -->
              <rect x="123" y="15" width="42" height="42" fill="none" stroke="#1a1e0d" stroke-width="7" rx="4"/>
              <rect x="133" y="25" width="22" height="22" fill="#1a1e0d" rx="2"/>
              <!-- Bottom-Left -->
              <rect x="15" y="123" width="42" height="42" fill="none" stroke="#1a1e0d" stroke-width="7" rx="4"/>
              <rect x="25" y="133" width="22" height="22" fill="#1a1e0d" rx="2"/>
              <!-- QR Data Matrix Dots -->
              <g fill="#262c14">
                <rect x="68" y="18" width="8" height="8" rx="1.5"/>
                <rect x="84" y="22" width="8" height="8" rx="1.5"/>
                <rect x="100" y="18" width="8" height="8" rx="1.5"/>
                <rect x="72" y="34" width="8" height="8" rx="1.5"/>
                <rect x="92" y="38" width="8" height="8" rx="1.5"/>
                <rect x="68" y="52" width="8" height="8" rx="1.5"/>
                <rect x="84" y="56" width="8" height="8" rx="1.5"/>
                <rect x="104" y="52" width="8" height="8" rx="1.5"/>

                <rect x="18" y="68" width="8" height="8" rx="1.5"/>
                <rect x="34" y="72" width="8" height="8" rx="1.5"/>
                <rect x="52" y="68" width="8" height="8" rx="1.5"/>
                <rect x="124" y="68" width="8" height="8" rx="1.5"/>
                <rect x="142" y="74" width="8" height="8" rx="1.5"/>
                <rect x="156" y="68" width="8" height="8" rx="1.5"/>

                <rect x="22" y="88" width="8" height="8" rx="1.5"/>
                <rect x="42" y="84" width="8" height="8" rx="1.5"/>
                <rect x="62" y="88" width="8" height="8" rx="1.5"/>
                <rect x="114" y="88" width="8" height="8" rx="1.5"/>
                <rect x="134" y="84" width="8" height="8" rx="1.5"/>
                <rect x="150" y="90" width="8" height="8" rx="1.5"/>

                <rect x="18" y="104" width="8" height="8" rx="1.5"/>
                <rect x="38" y="106" width="8" height="8" rx="1.5"/>
                <rect x="54" y="102" width="8" height="8" rx="1.5"/>
                <rect x="122" y="104" width="8" height="8" rx="1.5"/>
                <rect x="138" y="108" width="8" height="8" rx="1.5"/>
                <rect x="154" y="102" width="8" height="8" rx="1.5"/>

                <rect x="68" y="122" width="8" height="8" rx="1.5"/>
                <rect x="86" y="126" width="8" height="8" rx="1.5"/>
                <rect x="102" y="122" width="8" height="8" rx="1.5"/>
                <rect x="122" y="138" width="8" height="8" rx="1.5"/>
                <rect x="142" y="132" width="8" height="8" rx="1.5"/>
                <rect x="72" y="146" width="8" height="8" rx="1.5"/>
                <rect x="94" y="152" width="8" height="8" rx="1.5"/>
                <rect x="114" y="146" width="8" height="8" rx="1.5"/>
                <rect x="136" y="152" width="8" height="8" rx="1.5"/>
                <rect x="156" y="146" width="8" height="8" rx="1.5"/>
              </g>
              <!-- Center Bank Emblem -->
              <rect x="74" y="74" width="32" height="32" rx="6" fill="#ffffff" stroke="${headerColor}" stroke-width="2"/>
              <text x="90" y="94" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="12" fill="${headerColor}">
                ${isBakong ? "KH" : "ABA"}
              </text>
            </svg>
          </div>

          <!-- Account Details -->
          <div class="gift-card__account">
            <div class="gift-card__name">${acc.accName}</div>
            <div class="gift-card__num-row">
              <span class="gift-card__num" id="acc-num-${idx}">${acc.accNum}</span>
              <button class="btn-copy-num" data-num="${acc.accNum}" type="button" aria-label="Copy account number">
                <span>📋</span>
                <span>${isKm ? "ចម្លង" : "Copy"}</span>
              </button>
            </div>
          </div>

          <!-- Save QR Button -->
          <button class="btn btn-save-qr" data-idx="${idx}" type="button">
            <span>💾</span>
            <span>${isKm ? "រក្សាទុករូប QR" : "Save QR Code"}</span>
          </button>
        </div>
      </div>
    `;
  }).join("");

  container.innerHTML = `
    <section class="sec sec-gift" id="gift" aria-label="Wedding Gift">
      <div class="sec-header">
        <span class="caps foil">${isKm ? "ចំណងដៃមង្គលការ" : "Wedding Gift"}</span>
        <h2 class="sec-title">${isKm ? "សំបុត្រចំណងដៃ" : "Gift from the Heart"}</h2>
        <p class="sec-subtitle">
          ${isKm
            ? "វត្តមាន និងក្តីស្រឡាញ់របស់លោកអ្នក គឺជាកាដូដ៏មានតម្លៃបំផុត។ សម្រាប់លោកអ្នកដែលមានបំណងចងដៃ ឬផ្ញើអំណោយ អាចផ្ញើតាមរយៈ KHQR ខាងក្រោមនេះ។"
            : "Your presence and blessings are our greatest gifts. For friends and loved ones wishing to send wedding blessings, you may scan the KHQR below."}
        </p>
        ${createDividerSvg("sec-gift__divider")}
      </div>

      <div class="gift-grid">
        ${cardsHtml}
      </div>

      <!-- Toast Notification -->
      <div class="toast" id="gift-toast" aria-live="polite"></div>
    </section>
  `;

  // Attach Copy and Save events
  const toast = document.getElementById("gift-toast");
  const showToast = (msg) => {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("is-visible");
    setTimeout(() => toast.classList.remove("is-visible"), 2600);
  };

  container.querySelectorAll(".btn-copy-num").forEach((btn) => {
    btn.addEventListener("click", () => {
      const num = btn.dataset.num;
      navigator.clipboard.writeText(num).then(() => {
        showToast(isKm ? `បានចម្លងលេខគណនី: ${num}` : `Copied account: ${num}`);
      });
    });
  });

  container.querySelectorAll(".btn-save-qr").forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = btn.dataset.idx;
      const svg = document.querySelector(`#qr-box-${idx} svg`);
      if (!svg) return;

      const svgData = new XMLSerializer().serializeToString(svg);
      const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `wedding-qr-${accounts[idx].accName.toLowerCase().replace(/\s+/g, '-')}.svg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast(isKm ? "បានរក្សាទុក QR រួចរាល់!" : "QR Code downloaded!");
    });
  });
}
