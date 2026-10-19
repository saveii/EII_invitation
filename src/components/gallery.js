/**
 * Section 9: Pre-Wedding Gallery (កម្រងរូបភាពអនុស្សាវរីយ៍)
 * Editorial grid with interactive full-screen lightbox modal
 */

import { createDividerSvg } from "./ornaments.js";

let activeIdx = 0;
let galleryItems = [];

export function renderGallery(container, { wedding, lang = "km" }) {
  const isKm = lang === "km";
  galleryItems = wedding.gallery || [];

  const itemsHtml = galleryItems.map((item, idx) => `
    <div class="gallery-item" data-idx="${idx}">
      <img src="${item.src}" alt="${item.alt || 'Wedding photo'}" loading="lazy" />
      <div class="gallery-item__overlay">
        <span class="gallery-item__zoom">🔍</span>
      </div>
    </div>
  `).join("");

  container.innerHTML = `
    <section class="sec sec-gallery" id="gallery" aria-label="Pre-Wedding Gallery">
      <div class="sec-header">
        <span class="caps foil">${isKm ? "អនុស្សាវរីយ៍" : "Photo Memories"}</span>
        <h2 class="sec-title">${isKm ? "កម្រងរូបភាពអនុស្សាវរីយ៍" : "Pre-Wedding Gallery"}</h2>
        <p class="sec-subtitle">${isKm ? "រូបភាពនៃក្តីស្រឡាញ់ មុនថ្ងៃមង្គលការ" : "Cherished moments leading to our special day"}</p>
        ${createDividerSvg("sec-gallery__divider")}
      </div>

      <div class="gallery-grid">
        ${itemsHtml}
      </div>

      <!-- Lightbox Modal -->
      <div class="lightbox" id="lightbox" aria-hidden="true" role="dialog" aria-label="Photo viewer">
        <div class="lightbox__backdrop" id="lb-backdrop"></div>
        <button class="lightbox__close" id="lb-close" aria-label="Close viewer">✕</button>
        <button class="lightbox__nav lb-prev" id="lb-prev" aria-label="Previous photo">‹</button>
        <div class="lightbox__content">
          <img id="lb-img" src="" alt="Full view" />
          <div class="lightbox__caption" id="lb-caption"></div>
        </div>
        <button class="lightbox__nav lb-next" id="lb-next" aria-label="Next photo">›</button>
      </div>
    </section>
  `;

  // Attach gallery click events
  const grid = container.querySelector(".gallery-grid");
  const lightbox = document.getElementById("lightbox");
  const lbImg = document.getElementById("lb-img");
  const lbCaption = document.getElementById("lb-caption");
  const lbClose = document.getElementById("lb-close");
  const lbBackdrop = document.getElementById("lb-backdrop");
  const lbPrev = document.getElementById("lb-prev");
  const lbNext = document.getElementById("lb-next");

  function openLightbox(idx) {
    activeIdx = idx;
    const item = galleryItems[activeIdx];
    if (!item) return;

    lbImg.src = item.src;
    lbCaption.textContent = item.alt || "";
    lightbox.classList.add("is-active");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("is-lightbox-open");
  }

  function closeLightbox() {
    lightbox.classList.remove("is-active");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("is-lightbox-open");
  }

  function step(dir) {
    activeIdx = (activeIdx + dir + galleryItems.length) % galleryItems.length;
    openLightbox(activeIdx);
  }

  if (grid) {
    grid.addEventListener("click", (e) => {
      const itemEl = e.target.closest(".gallery-item");
      if (itemEl) {
        const idx = parseInt(itemEl.dataset.idx, 10);
        openLightbox(idx);
      }
    });
  }

  if (lbClose) lbClose.addEventListener("click", closeLightbox);
  if (lbBackdrop) lbBackdrop.addEventListener("click", closeLightbox);
  if (lbPrev) lbPrev.addEventListener("click", () => step(-1));
  if (lbNext) lbNext.addEventListener("click", () => step(1));

  // Keyboard navigation
  window.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("is-active")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });
}
