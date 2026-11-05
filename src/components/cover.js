/**
 * Cover / Hero Section & Atmospheric Particle Embers
 * Matching PSB Target Design with Admin Guest Name Personalization & Clean Share Links
 */

import gsap from "gsap";

export function renderCover(container, { wedding, lang = "km" }) {
  const groomFull = wedding.couple.groom[lang === "km" ? "km" : "en"];
  const brideFull = wedding.couple.bride[lang === "km" ? "km" : "en"];

  // URL query parameter for personalized guest invitations (?to=... or ?guest=...)
  const urlParams = new URLSearchParams(window.location.search);
  const rawGuestParam = urlParams.get("to") || urlParams.get("guest") || urlParams.get("name") || "";
  let decodedGuest = rawGuestParam.trim();
  try {
    decodedGuest = decodeURIComponent(decodedGuest);
  } catch (e) {}

  // Convert pluses and hyphens back to natural Khmer spaces for badge display
  if (decodedGuest.includes("+")) {
    decodedGuest = decodedGuest.replace(/\+/g, " ");
  } else if (decodedGuest.includes("-") && !decodedGuest.includes(" ")) {
    decodedGuest = decodedGuest.replace(/-/g, " ");
  }

  const isCustomGuest = !!decodedGuest.trim();
  const defaultGuestTitle = lang === "km" ? "ភ្ញៀវកិត្តិយសទាំងអស់" : "All Valued Guests";
  const guestName = isCustomGuest ? decodedGuest : defaultGuestTitle;

  container.innerHTML = `
    <section class="hero cover" id="hero" aria-label="Wedding invitation cover">
      <!-- Atmospheric Backdrop -->
      <div class="hero__backdrop" style="background-image: url('${wedding.heroPhoto}');" aria-hidden="true"></div>
      <canvas class="hero__embers" id="hero-embers"></canvas>

      <!-- Unified Central Photo Card Stage (Locks text inside photo on all screens) -->
      <div class="hero__stage" id="hero-stage">
        <div class="hero__photo-box" id="hero-media">
          <img class="hero__photo" src="${wedding.heroPhoto}" alt="${groomFull} & ${brideFull}" fetchpriority="high" />
          <div class="hero__shade"></div>
        </div>

        <div class="cover__inner cover__inner--psb">
          <div class="cover__top-block">
            <div class="cover__kicker angkor-regular foil">${lang === "km" ? "សិរីសួស្តីអាពាហ៍ពិពាហ៍" : "We're Getting Married"}</div>
            <div class="cover__sub">${lang === "km" ? "the wedding Invitation" : "The Wedding Invitation"}</div>
          </div>

          <div class="cover__bottom-block">
            <div class="cover__invite-text">${lang === "km" ? "សូមគោរពអញ្ជើញ" : "Cordially Invites You"}</div>

            <!-- Luxury Gold Badge with Dynamic / Admin Editable Guest Name -->
            <div class="cover__guest-badge" id="guest-badge-wrap" role="button" tabindex="0" title="ចុចដើម្បីបញ្ចូល ឬកែប្រែឈ្មោះភ្ញៀវ (Admin)">
              <img class="badge-frame-img" src="/images/guest-badge-empty.png" alt="Guest Badge Frame" />
              <div class="badge-custom-name" id="badge-guest-name">${guestName}</div>
              <span class="badge-edit-hint" aria-hidden="true">✍️ កែប្រែ</span>
            </div>

            <a class="cover__cue" href="#words">
              <span>${lang === "km" ? "សូមរំកិលចុះ ដើម្បីទស្សនាធៀបការ" : "Scroll to explore"}</span>
              <i></i>
            </a>
          </div>
        </div>
      </div>

      <!-- Floating Admin Guest Trigger Button -->
      <button class="admin-float-btn" id="admin-float-btn" type="button" aria-label="បញ្ចូលឈ្មោះភ្ញៀវ (Admin)">
        <span class="admin-float-btn__icon">✍️</span>
        <span class="admin-float-btn__text">បញ្ចូលឈ្មោះភ្ញៀវ</span>
      </button>

      <!-- Admin Guest Personalization Modal -->
      <div class="admin-modal" id="admin-guest-modal" aria-hidden="true">
        <div class="admin-modal__backdrop" id="admin-modal-backdrop"></div>
        <div class="admin-modal__dialog">
          <button type="button" class="admin-modal__close" id="admin-modal-close" aria-label="បិទ">✕</button>

          <div class="admin-modal__header">
            <div class="admin-modal__badge">ADMIN TOOL</div>
            <h3 class="admin-modal__title">បញ្ចូលឈ្មោះហៅភ្ញៀវកិត្តិយស</h3>
            <p class="admin-modal__sub">វាយឈ្មោះភ្ញៀវដើម្បីឱ្យបង្ហាញក្នុងស៊ុមមាស និងបង្កើតសារអញ្ជើញស្អាត (មានតែអក្សរខ្មែរ ចុចចូលបានភ្លាម)</p>
          </div>

          <div class="admin-modal__body">
            <label for="admin-guest-input" class="admin-modal__label">ឈ្មោះភ្ញៀវលើធៀបការ៖</label>
            <div class="admin-modal__input-wrap">
              <input type="text" id="admin-guest-input" class="admin-modal__input" placeholder="ឧទាហរណ៍៖ ឯកឧត្តម និង លោកជំទាវ" value="${isCustomGuest ? guestName : ""}" />
              <button type="button" id="admin-guest-clear" class="admin-modal__input-clear" title="លុបឈ្មោះ">✕</button>
            </div>

            <!-- Quick Title Chips -->
            <div class="admin-modal__chips-label">ជ្រើសរើសងាររហ័ស (Quick Select)：</div>
            <div class="admin-modal__chips">
              <button type="button" class="admin-chip" data-name="ឯកឧត្តម និង លោកជំទាវ">ឯកឧត្តម និង លោកជំទាវ</button>
              <button type="button" class="admin-chip" data-name="លោក និង លោកស្រី">លោក និង លោកស្រី</button>
              <button type="button" class="admin-chip" data-name="លោកពូ និង អ្នកមីង">លោកពូ និង អ្នកមីង</button>
              <button type="button" class="admin-chip" data-name="បងប្រុស និង បងស្រី">បងប្រុស និង បងស្រី</button>
              <button type="button" class="admin-chip" data-name="មិត្តភក្តិ">មិត្តភក្តិ</button>
              <button type="button" class="admin-chip admin-chip--reset" data-name="${defaultGuestTitle}">🔄 ${defaultGuestTitle}</button>
            </div>

            <!-- Live Message Preview (រៀបរយ ស្អាត មិនរញ៉េរញ៉ៃ) -->
            <div class="admin-modal__preview-box">
              <div class="admin-modal__preview-label">💌 ទម្រង់សារអញ្ជើញ (រៀបរយ ស្អាត មិនរញ៉េរញ៉ៃ)៖</div>
              <div class="admin-modal__preview-card">
                <div class="preview-msg-line preview-msg-salutation">សូមគោរពអញ្ជើញ <b id="preview-guest-name">${guestName}</b></div>
                <div class="preview-msg-line">ចូលរួមពិធីសិរីសួស្តីអាពាហ៍ពិពាហ៍ <b>${groomFull} & ${brideFull}</b> 👰🤵</div>
                <div class="preview-msg-cue">សូមចុចតំណភ្ជាប់ខាងក្រោមដើម្បីទស្សនាធៀបការឌីជីថល៖</div>
                <div class="preview-msg-link-line">
                  <span class="preview-msg-clean-url" id="preview-msg-url">...</span>
                </div>
              </div>
            </div>

            <!-- Clean Web Address Display -->
            <div class="admin-modal__link-box">
              <span class="admin-modal__link-label">🌐 តំណភ្ជាប់ផ្ទាល់ (Clean Web Link)៖</span>
              <div class="admin-modal__link-display" id="admin-link-display">...</div>
            </div>
          </div>

          <div class="admin-modal__actions">
            <button type="button" id="admin-btn-copy-msg" class="admin-btn admin-btn--copy-msg" title="ចម្លងសារអញ្ជើញដែលមាន Link ភ្ជាប់លើអក្សរខ្មែរ ទៅ Paste ក្នុង Telegram/Messenger">
              <i>📋</i> <span>ចម្លងសារអញ្ជើញ (Copy Message)</span>
            </button>
            <button type="button" id="admin-btn-telegram" class="admin-btn admin-btn--telegram" title="ផ្ញើតាម Telegram ជាមួយសារស្អាត">
              <i>✈️</i> <span>ផ្ញើតាម Telegram</span>
            </button>
            <button type="button" id="admin-btn-copy-link" class="admin-btn admin-btn--copy-link" title="ចម្លងតែតំណភ្ជាប់ Link">
              <i>🔗</i> <span>ចម្លងតែ Link</span>
            </button>
            <button type="button" id="admin-btn-apply" class="admin-btn admin-btn--apply">
              <i>✅</i> <span>រួចរាល់ (Done)</span>
            </button>
          </div>

          <div class="admin-modal__toast" id="admin-toast"></div>
        </div>
      </div>
    </section>
  `;

  // Start Falling Flower Petals & Embers Canvas
  const canvas = document.getElementById("hero-embers");
  if (canvas) {
    initPetalsAndEmbers(canvas);
  }

  // Setup Admin Guest Modal Interactions
  setupAdminGuestModal({ defaultGuestTitle, groomFull, brideFull, siteUrl: wedding.siteUrl });
}

export function animateCoverEntrance() {
  const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

  tl.fromTo("#hero-media .hero__photo", { opacity: 0.85, scale: 1.02 }, { opacity: 1, scale: 1.0, duration: 2.2 }, 0);
  tl.from(".cover__top-block", { opacity: 0, y: -22, duration: 1.2, ease: "power2.out" }, 0.3);
  tl.from(".cover__bottom-block", { opacity: 0, y: 24, duration: 1.2, ease: "power2.out" }, 0.6);
}

function setupAdminGuestModal({ defaultGuestTitle, groomFull, brideFull, siteUrl }) {
  const modal = document.getElementById("admin-guest-modal");
  const backdrop = document.getElementById("admin-modal-backdrop");
  const closeBtn = document.getElementById("admin-modal-close");
  const floatBtn = document.getElementById("admin-float-btn");
  const badgeWrap = document.getElementById("guest-badge-wrap");
  const badgeNameEl = document.getElementById("badge-guest-name");
  const input = document.getElementById("admin-guest-input");
  const clearBtn = document.getElementById("admin-guest-clear");
  const linkDisplay = document.getElementById("admin-link-display");
  const previewGuestName = document.getElementById("preview-guest-name");
  const copyMsgBtn = document.getElementById("admin-btn-copy-msg");
  const copyLinkBtn = document.getElementById("admin-btn-copy-link");
  const telegramBtn = document.getElementById("admin-btn-telegram");
  const applyBtn = document.getElementById("admin-btn-apply");
  const toast = document.getElementById("admin-toast");
  const chips = document.querySelectorAll(".admin-chip");

  if (!modal || !input) return;

  // Base production/public web address for sharing
  const getBaseDomain = () => {
    const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
    if (isLocalhost && siteUrl) {
      return siteUrl.replace(/\/$/, "");
    }
    const url = new URL(window.location.href);
    url.search = "";
    url.hash = "";
    return url.toString().replace(/\/$/, "");
  };

  // Build clean, human-readable URL without ugly %E1%9E percent-encoding
  const getGuestShareUrl = (nameVal) => {
    const trimmed = (nameVal || "").trim();
    const base = getBaseDomain();
    if (!trimmed || trimmed === defaultGuestTitle) {
      return base;
    }
    // Remove zero-width characters (invisible spaces) that keyboard might insert
    const cleaned = trimmed.replace(/[\u200B\u200C\u200D\uFEFF]/g, "").trim();
    const param = cleaned.replace(/\s+/g, "+");
    return `${base}/?to=${param}`;
  };

  const getInvitationTexts = (nameVal) => {
    const guest = (nameVal || "").trim() || defaultGuestTitle;
    const shareUrl = getGuestShareUrl(guest);

    // 1. Plain text format exactly as requested:
    // Greeting & couple names first, call to action, and the clean link below it!
    const plainText = `សូមគោរពអញ្ជើញ ${guest}
ចូលរួមពិធីសិរីសួស្តីអាពាហ៍ពិពាហ៍ ${groomFull} & ${brideFull} 👰🤵

សូមចុចតំណភ្ជាប់ខាងក្រោមដើម្បីទស្សនាធៀបការឌីជីថល៖
${shareUrl}`;

    // 2. Rich HTML for pasting in formatted chat apps
    const richHtml = `
      <p style="font-family: sans-serif; font-size: 15px; color: #1f2937; line-height: 1.6; margin: 0 0 10px 0;">
        សូមគោរពអញ្ជើញ <b>${guest}</b><br>
        ចូលរួមពិធីសិរីសួស្តីអាពាហ៍ពិពាហ៍ <b>${groomFull} & ${brideFull}</b> 👰🤵
      </p>
      <p style="font-family: sans-serif; font-size: 14px; color: #374151; margin: 0 0 6px 0;">
        សូមចុចតំណភ្ជាប់ខាងក្រោមដើម្បីទស្សនាធៀបការឌីជីថល៖
      </p>
      <p style="font-family: sans-serif; font-size: 14px; margin: 0;">
        👉 <a href="${shareUrl}" style="color: #2563eb; font-weight: bold; text-decoration: underline;">${shareUrl}</a>
      </p>
    `.trim();

    return { guest, shareUrl, richHtml, plainText };
  };

  const updateGeneratedLink = (nameVal) => {
    const trimmed = (nameVal || "").trim();
    const displayGuest = trimmed || defaultGuestTitle;

    // Update Hero badge live
    if (badgeNameEl) {
      badgeNameEl.textContent = displayGuest;
      const len = displayGuest.length;
      if (len > 35) {
        badgeNameEl.style.fontSize = "clamp(0.68rem, 1.8vw, 0.88rem)";
      } else if (len > 24) {
        badgeNameEl.style.fontSize = "clamp(0.78rem, 2.1vw, 1.02rem)";
      } else {
        badgeNameEl.style.fontSize = "";
      }
    }

    // Update modal live preview
    if (previewGuestName) {
      previewGuestName.textContent = displayGuest;
    }
    const previewUrlEl = document.getElementById("preview-msg-url");
    if (previewUrlEl) {
      previewUrlEl.textContent = getGuestShareUrl(trimmed);
    }

    // Update clean URL display
    if (linkDisplay) {
      linkDisplay.textContent = getGuestShareUrl(trimmed);
    }
  };

  const showToast = (msg) => {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("is-visible");
    setTimeout(() => {
      toast.classList.remove("is-visible");
    }, 2800);
  };

  const openModal = () => {
    modal.classList.add("is-active");
    modal.setAttribute("aria-hidden", "false");
    updateGeneratedLink(input.value);
    input.focus();
  };

  const closeModal = () => {
    modal.classList.remove("is-active");
    modal.setAttribute("aria-hidden", "true");
  };

  // Triggers
  if (floatBtn) floatBtn.addEventListener("click", openModal);
  if (badgeWrap) badgeWrap.addEventListener("click", openModal);
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (backdrop) backdrop.addEventListener("click", closeModal);

  // Input typing real-time update
  input.addEventListener("input", () => {
    updateGeneratedLink(input.value);
  });

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      input.value = "";
      updateGeneratedLink("");
      input.focus();
    });
  }

  // Quick Chips
  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      const chipName = chip.dataset.name || "";
      if (chipName === defaultGuestTitle) {
        input.value = "";
      } else {
        input.value = chipName;
      }
      updateGeneratedLink(input.value);
      input.focus();
    });
  });

  // 1. Copy Formatted Khmer Message (Rich text with clickable link)
  if (copyMsgBtn) {
    copyMsgBtn.addEventListener("click", async () => {
      const { richHtml, plainText } = getInvitationTexts(input.value);
      let copied = false;

      if (navigator.clipboard && window.ClipboardItem) {
        try {
          const blobHtml = new Blob([richHtml], { type: "text/html" });
          const blobPlain = new Blob([plainText], { type: "text/plain" });
          const item = new ClipboardItem({
            "text/html": blobHtml,
            "text/plain": blobPlain
          });
          await navigator.clipboard.write([item]);
          copied = true;
        } catch (err) {
          console.warn("ClipboardItem rich text write failed:", err);
        }
      }

      if (!copied) {
        try {
          await navigator.clipboard.writeText(plainText);
          copied = true;
        } catch (err) {
          const textarea = document.createElement("textarea");
          textarea.value = plainText;
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand("copy");
          document.body.removeChild(textarea);
          copied = true;
        }
      }

      showToast("✅ បានចម្លងសារអញ្ជើញ! អាច Paste ក្នុង Telegram/Messenger បាន");
    });
  }

  // 2. Telegram Share Button (Greeting -> Couple -> Prompt -> Clean Link)
  if (telegramBtn) {
    telegramBtn.addEventListener("click", () => {
      const { plainText } = getInvitationTexts(input.value);
      // Pass full formatted message inside `text` without top `url` parameter.
      // This ensures the greeting is at the top, the prompt is in the middle,
      // and the clean link is at the bottom (never duplicated at the top).
      const tgUrl = `https://t.me/share/url?text=${encodeURIComponent(plainText)}`;
      window.open(tgUrl, "_blank");
    });
  }

  // 3. Copy Link Only
  if (copyLinkBtn) {
    copyLinkBtn.addEventListener("click", async () => {
      const { shareUrl } = getInvitationTexts(input.value);
      try {
        await navigator.clipboard.writeText(shareUrl);
      } catch (err) {
        const textarea = document.createElement("textarea");
        textarea.value = shareUrl;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      showToast("✅ បានចម្លងតែតំណភ្ជាប់ (Link) ដោយជោគជ័យ!");
    });
  }

  // 4. Apply & Close
  if (applyBtn) {
    applyBtn.addEventListener("click", () => {
      const name = input.value.trim();
      const newUrl = new URL(window.location.href);
      if (name && name !== defaultGuestTitle) {
        newUrl.searchParams.set("to", name.replace(/\s+/g, "+"));
      } else {
        newUrl.searchParams.delete("to");
        newUrl.searchParams.delete("guest");
        newUrl.searchParams.delete("name");
      }
      window.history.replaceState({}, "", newUrl.toString());
      closeModal();
    });
  }

  // Initialize display
  updateGeneratedLink(input.value);
}

function initPetalsAndEmbers(canvas) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let width = 0;
  let height = 0;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  const resize = () => {
    width = canvas.parentElement ? canvas.parentElement.offsetWidth : window.innerWidth;
    height = canvas.parentElement ? canvas.parentElement.offsetHeight : window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  resize();
  window.addEventListener("resize", resize);

  // Gentle Falling Petals (កម្ទិចផ្កាធ្លាក់មកតិចៗៗ)
  const PETAL_COUNT = 32;
  const petals = [];

  const createPetal = (spawnEverywhere = false) => {
    const isBlush = Math.random() > 0.42;
    const isGolden = Math.random() < 0.18;
    return {
      x: Math.random() * width,
      y: spawnEverywhere ? Math.random() * height : -20 - Math.random() * 50,
      size: 6.5 + Math.random() * 9.5, // 6.5px to 16px
      speedY: 0.55 + Math.random() * 0.75, // gentle slow fall
      swaySpeed: 0.0012 + Math.random() * 0.0015,
      swayAngle: Math.random() * Math.PI * 2,
      swayWidth: 20 + Math.random() * 32,
      rotX: Math.random() * Math.PI,
      rotY: Math.random() * Math.PI,
      rotSpeedX: 0.008 + Math.random() * 0.012,
      rotSpeedY: 0.006 + Math.random() * 0.01,
      color: isGolden ? "rgba(235, 195, 115, 0.75)" : isBlush ? "rgba(248, 222, 224, 0.78)" : "rgba(255, 255, 255, 0.82)"
    };
  };

  for (let i = 0; i < PETAL_COUNT; i++) {
    petals.push(createPetal(true));
  }

  let animId;
  const render = (time) => {
    ctx.clearRect(0, 0, width, height);

    petals.forEach(p => {
      p.y += p.speedY;
      p.swayAngle += p.swaySpeed * 16;
      p.rotX += p.rotSpeedX;
      p.rotY += p.rotSpeedY;

      const currentX = p.x + Math.sin(p.swayAngle) * p.swayWidth;

      if (p.y > height + 25) {
        Object.assign(p, createPetal(false));
      }

      ctx.save();
      ctx.translate(currentX, p.y);
      ctx.rotate(Math.sin(p.rotX) * 0.4);
      ctx.scale(Math.cos(p.rotX), Math.sin(p.rotY));

      ctx.beginPath();
      ctx.fillStyle = p.color;
      ctx.ellipse(0, 0, p.size * 0.6, p.size, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    });

    animId = requestAnimationFrame(render);
  };

  animId = requestAnimationFrame(render);
}
