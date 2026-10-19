/**
 * Section 12: Finale, Guestbook Wishes, Social Share & Credits (ពាក្យជូនពរ & វត្តមាន)
 */

import { createCrestSvg, createDividerSvg } from "./ornaments.js";

const DEFAULT_WISHES = [
  {
    name: "សុខ ចាន់ដារ៉ា",
    attendance: "attending",
    message: "សូមប្រសិទ្ធពរជ័យសិរីសួស្តី ជ័យមង្គល វិបុលសុខ ដល់គូស្វាមីភរិយាថ្មី ស្រឡាញ់គ្នារហូតដល់ចាស់កោងខ្នង និងឆាប់មានកូនពៅ!",
    time: "១ ម៉ោងមុន"
  },
  {
    name: "លី ស្រីម៉ៅ & គ្រួសារ",
    attendance: "attending",
    message: "រីករាយថ្ងៃមង្គលការ! សូមឱ្យគ្រួសារថ្មីនេះពោរពេញដោយសុភមង្គល ក្តីស្រឡាញ់ និងភាពរុងរឿងជានិច្ចនិរន្តរ៍។",
    time: "៣ ម៉ោងមុន"
  },
  {
    name: "Bunly & Mary",
    attendance: "wishes",
    message: "Wishing Tep Sothea & Chay Vicheka a lifetime of love, laughter, and endless adventure together! Congratulations!",
    time: "៥ ម៉ោងមុន"
  }
];

export function renderWishes(container, { wedding, lang = "km" }) {
  const isKm = lang === "km";
  const siteUrl = wedding.siteUrl || window.location.href;
  const shareTitle = encodeURIComponent(
    isKm
      ? `ធៀបការឌីជីថល អាពាហ៍ពិពាហ៍ ${wedding.couple.groom.km} & ${wedding.couple.bride.km}`
      : `Wedding Invitation: ${wedding.couple.groom.en} & ${wedding.couple.bride.en}`
  );
  const shareUrl = encodeURIComponent(siteUrl);

  const storedWishes = JSON.parse(localStorage.getItem("khmer_wedding_wishes") || "null") || DEFAULT_WISHES;

  const wishesListHtml = storedWishes.map(w => `
    <div class="wish-item">
      <div class="wish-item__head">
        <span class="wish-item__author">${w.name}</span>
        <span class="wish-item__badge ${w.attendance === 'attending' ? 'is-attending' : ''}">
          ${w.attendance === 'attending' ? (isKm ? '✓ ចូលរួម' : '✓ Attending') : (isKm ? '💌 ផ្ញើពរ' : '💌 Blessings')}
        </span>
      </div>
      <p class="wish-item__msg">${w.message}</p>
      <span class="wish-item__time">${w.time || (isKm ? 'ទើបតែផ្ញើ' : 'Just now')}</span>
    </div>
  `).join("");

  container.innerHTML = `
    <section class="sec sec-wishes" id="wishes" aria-label="Guestbook and Blessings">
      <div class="sec-header">
        <span class="caps foil">${isKm ? "វត្តមាន និងពាក្យជូនពរ" : "RSVP & Wishes"}</span>
        <h2 class="sec-title">${isKm ? "សៀវភៅកត់ត្រាពរជ័យ" : "Wedding Guestbook"}</h2>
        <p class="sec-subtitle">${isKm ? "សូមផ្ញើពាក្យជូនពរ និងការបញ្ជាក់វត្តមានដ៏មានតម្លៃរបស់លោកអ្នក" : "Leave your warmest blessings and wishes for the couple"}</p>
        ${createDividerSvg("sec-wishes__divider")}
      </div>

      <!-- Guestbook Form Card -->
      <div class="guestbook-card">
        <form class="guestbook-form" id="guestbook-form">
          <div class="form-group">
            <label class="form-label" for="gb-name">${isKm ? "ឈ្មោះ ឬស្ថាប័នរបស់អ្នក *" : "Your Name *"}</label>
            <input class="form-input" id="gb-name" type="text" placeholder="${isKm ? 'ឧ. លោក សុខ ចាន់ថុល' : 'e.g. John Doe'}" required />
          </div>

          <div class="form-group">
            <label class="form-label">${isKm ? "ការចូលរួមរបស់អ្នក" : "Your Attendance"}</label>
            <div class="attendance-options">
              <label class="radio-label">
                <input type="radio" name="attendance" value="attending" checked />
                <span>${isKm ? "✓ ចូលរួមដោយផ្ទាល់" : "✓ Attending in person"}</span>
              </label>
              <label class="radio-label">
                <input type="radio" name="attendance" value="wishes" />
                <span>${isKm ? "💌 ផ្ញើពរជ័យពីចម្ងាយ" : "💌 Sending wishes from afar"}</span>
              </label>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label" for="gb-msg">${isKm ? "សារជូនពរមង្គលការ *" : "Your Blessing Message *"}</label>
            <textarea class="form-textarea" id="gb-msg" rows="3" placeholder="${isKm ? 'សូមជូនពរឱ្យគូស្វាមីភរិយាថ្មី...' : 'Wishing you a lifetime of love and joy...'}" required></textarea>
          </div>

          <button class="btn btn-primary btn-submit-wish" type="submit">
            <span>💌</span>
            <span>${isKm ? "ផ្ញើពាក្យជូនពរ" : "Send Blessings"}</span>
          </button>
        </form>

        <!-- Live List of Wishes -->
        <div class="wishes-list" id="wishes-list">
          ${wishesListHtml}
        </div>
      </div>

      <!-- Social Share Suite -->
      <div class="share-suite">
        <span class="caps foil">${isKm ? "ចែករំលែកធៀបការ" : "Share Invitation"}</span>
        <div class="share-buttons">
          <a
            class="btn btn-share btn-tg"
            href="https://t.me/share/url?url=${shareUrl}&text=${shareTitle}"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share to Telegram"
          >
            <span>✈️ Telegram</span>
          </a>

          <a
            class="btn btn-share btn-fb"
            href="https://www.facebook.com/sharer/sharer.php?u=${shareUrl}"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share to Facebook"
          >
            <span>📘 Facebook</span>
          </a>

          <a
            class="btn btn-share btn-ms"
            href="fb-messenger://share/?link=${shareUrl}"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share to Messenger"
          >
            <span>💬 Messenger</span>
          </a>

          <button class="btn btn-share btn-copy" id="btn-copy-link" type="button" aria-label="Copy invitation link">
            <span>🔗 ${isKm ? "ចម្លងតំណ" : "Copy Link"}</span>
          </button>
        </div>
      </div>

      <!-- Thank You Card & Credits -->
      <div class="finale-card">
        <div class="finale-crest">
          ${createCrestSvg()}
        </div>
        <h3 class="finale-title foil">${isKm ? "សូមអរគុណយ៉ាងជ្រាលជ្រៅ" : "With Our Deepest Gratitude"}</h3>
        <p class="finale-text">
          ${isKm
            ? "យើងខ្ញុំសូមថ្លែងអំណរគុណយ៉ាងជ្រាលជ្រៅបំផុត ចំពោះវត្តមានដ៏ឧត្តុង្គឧត្តម និងពរជ័យដ៏ថ្លៃថ្លារបស់លោកអ្នក ដែលបានមកចូលរួមបំពេញសិរីមង្គលក្នុងថ្ងៃពិសេសរបស់យើងខ្ញុំ!"
            : "We wholeheartedly thank you for being a cherished part of our love story and sharing in our joy!"}
        </p>
        <div class="finale-couple-sign foil">
          ${wedding.couple.groom.shortKm} & ${wedding.couple.bride.shortKm}
        </div>
      </div>

      <!-- Footer Credits -->
      <footer class="app-footer">
        <p class="app-footer__copy">
          Made with love for <strong>${wedding.couple.groom.km} & ${wedding.couple.bride.km}</strong>
        </p>
        <p class="app-footer__credit">
          Design inspired by <a href="https://somethphay.me" target="_blank" rel="noopener noreferrer">Someth Phay · somethphay.me</a>
        </p>
      </footer>
    </section>
  `;

  // Attach Form Submit
  const form = document.getElementById("guestbook-form");
  const listEl = document.getElementById("wishes-list");
  if (form && listEl) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const nameInput = document.getElementById("gb-name");
      const msgInput = document.getElementById("gb-msg");
      const attendance = form.querySelector("input[name='attendance']:checked")?.value || "attending";

      const newWish = {
        name: nameInput.value.trim(),
        attendance,
        message: msgInput.value.trim(),
        time: isKm ? "ទើបតែផ្ញើ" : "Just now"
      };

      storedWishes.unshift(newWish);
      localStorage.setItem("khmer_wedding_wishes", JSON.stringify(storedWishes));

      // Append to list with animation
      const item = document.createElement("div");
      item.className = "wish-item is-new";
      item.innerHTML = `
        <div class="wish-item__head">
          <span class="wish-item__author">${newWish.name}</span>
          <span class="wish-item__badge ${newWish.attendance === 'attending' ? 'is-attending' : ''}">
            ${newWish.attendance === 'attending' ? (isKm ? '✓ ចូលរួម' : '✓ Attending') : (isKm ? '💌 ផ្ញើពរ' : '💌 Blessings')}
          </span>
        </div>
        <p class="wish-item__msg">${newWish.message}</p>
        <span class="wish-item__time">${newWish.time}</span>
      `;
      listEl.prepend(item);

      form.reset();
      const toast = document.getElementById("gift-toast");
      if (toast) {
        toast.textContent = isKm ? "បានផ្ញើពាក្យជូនពររួចរាល់! សូមអរគុណ" : "Blessings sent! Thank you!";
        toast.classList.add("is-visible");
        setTimeout(() => toast.classList.remove("is-visible"), 2600);
      }
    });
  }

  // Copy Link Button
  const copyBtn = document.getElementById("btn-copy-link");
  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(siteUrl).then(() => {
        const toast = document.getElementById("gift-toast");
        if (toast) {
          toast.textContent = isKm ? "បានចម្លងតំណភ្ជាប់ធៀបការ!" : "Invitation link copied to clipboard!";
          toast.classList.add("is-visible");
          setTimeout(() => toast.classList.remove("is-visible"), 2600);
        }
      });
    });
  }
}
