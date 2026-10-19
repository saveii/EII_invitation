/**
 * ====================================================================
 * THEAPKA DIGITAL WEDDING - CONTROLLER SCRIPT
 * Synchronized with Screens 1 through 4 & User Self-Customization
 * ====================================================================
 */

const STORAGE_KEY = "theapka_wedding_data_v3";

let appData = null;
let currentGuestFilter = "all";
let isSortAZ = false;

document.addEventListener("DOMContentLoaded", () => {
  initAppData();
  initNavigationTabs();
  initCardView();
  initGuestsView();
  initGiftsView();
  initScheduleView();
  initEditorView();
  initModals();
  initFullInvitation();
  initPetalsEffect();

  handleUrlParams();
});

/**
 * 1. INITIALIZE & PERSIST STATE
 */
function initAppData() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      appData = JSON.parse(saved);
    } catch (e) {
      console.error("Data parse error, fallback to default", e);
      appData = JSON.parse(JSON.stringify(DEFAULT_WEDDING_CONFIG));
    }
  } else {
    appData = JSON.parse(JSON.stringify(DEFAULT_WEDDING_CONFIG));
    saveAppData();
  }
}

function saveAppData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
  refreshAllViews();
}

function refreshAllViews() {
  renderCardView();
  renderGuestsList();
  renderGiftsList();
  renderScheduleList();
  populateEditorForm();
  renderFullInvitation();
}

/**
 * 2. TAB NAVIGATION (SYNCHRONIZES TOP SWITCHER, BOTTOM NAV, & CAPTIONS)
 */
function initNavigationTabs() {
  // Top switcher buttons
  document.querySelectorAll(".screen-switch-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-target");
      switchTab(targetId);
    });
  });

  // Bottom navbar buttons inside phone
  document.querySelectorAll(".nav-button-item").forEach(btn => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-tab");
      switchTab(targetId);
    });
  });

  // Subheader shortcuts
  const btnQuickSchedule = document.querySelector("#btnQuickSchedule");
  if (btnQuickSchedule) {
    btnQuickSchedule.addEventListener("click", () => switchTab("tab-schedule"));
  }

  const btnTemplatesStore = document.querySelector("#btnTemplatesStore");
  if (btnTemplatesStore) {
    btnTemplatesStore.addEventListener("click", () => {
      openModal("#presetModal");
      renderPresetGallery();
    });
  }

  // Back button in schedule
  const btnScheduleBack = document.querySelector("#btnScheduleBack");
  if (btnScheduleBack) {
    btnScheduleBack.addEventListener("click", () => switchTab("tab-card"));
  }

  // Dark/Light mode toggle
  const themeToggleBtn = document.querySelector("#themeToggleBtn");
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      themeToggleBtn.textContent = document.body.classList.contains("dark-mode") ? "🌙" : "☀️";
    });
  }
}

function switchTab(tabId) {
  // 1. Screens inside phone
  document.querySelectorAll(".app-screen-content").forEach(el => {
    el.classList.toggle("active", el.id === tabId);
  });

  // 2. Top switcher buttons
  document.querySelectorAll(".screen-switch-btn").forEach(btn => {
    btn.classList.toggle("active", btn.getAttribute("data-target") === tabId);
  });

  // 3. Bottom phone navigation items
  document.querySelectorAll(".nav-button-item").forEach(btn => {
    btn.classList.toggle("active", btn.getAttribute("data-tab") === tabId);
  });

  // 4. Caption blocks underneath phone
  document.querySelectorAll(".caption-block").forEach(cap => {
    cap.classList.toggle("active", cap.getAttribute("data-caption") === tabId);
  });

  // Scroll phone screen to top
  const activeContent = document.querySelector(`#${tabId}`);
  if (activeContent) activeContent.scrollTop = 0;
}

/**
 * 3. SCREEN 1: ធៀបការបែបឌីជីថល (WEDDING CARD)
 */
function initCardView() {
  renderCardView();

  const btnEditCard = document.querySelector("#btnEditCard");
  if (btnEditCard) {
    btnEditCard.addEventListener("click", () => switchTab("tab-editor"));
  }

  const btnMyTemplates = document.querySelector("#btnMyTemplates");
  if (btnMyTemplates) {
    btnMyTemplates.addEventListener("click", () => {
      openModal("#presetModal");
      renderPresetGallery();
    });
  }

  const btnSaveCard = document.querySelector("#btnSaveCard");
  if (btnSaveCard) {
    btnSaveCard.addEventListener("click", () => {
      saveAppData();
      showToast("💾 បានរក្សាទុកធៀបការរួចរាល់!");
    });
  }

  // Quick photo upload trigger
  const btnTriggerQuickUpload = document.querySelector("#btnTriggerQuickUpload");
  const heroPhotoFileInput = document.querySelector("#heroPhotoFileInput");

  if (btnTriggerQuickUpload && heroPhotoFileInput) {
    btnTriggerQuickUpload.addEventListener("click", () => heroPhotoFileInput.click());
    heroPhotoFileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        handleImageUpload(file, (dataUrl) => {
          appData.heroPhoto = dataUrl;
          saveAppData();
          showToast("✨ រូបថតត្រូវបានផ្លាស់ប្តូរដោយជោគជ័យ!");
        });
      }
    });
  }

  // Open Full Invitation view
  const btnOpenFullInvite = document.querySelector("#btnOpenFullInvite");
  if (btnOpenFullInvite) {
    btnOpenFullInvite.addEventListener("click", () => {
      document.querySelector("#fullInviteModal").classList.add("open");
    });
  }
}

function renderCardView() {
  if (!appData) return;

  safeSetText("#cardGroomName", appData.groom.nameKh);
  safeSetText("#cardBrideName", appData.bride.nameKh);
  safeSetText("#cardEventDate", appData.eventDate.dateKhmer);
  safeSetText("#cardEventVenue", appData.venue.address);

  const cardBgImage = document.querySelector("#cardBgImage");
  if (cardBgImage && appData.heroPhoto) {
    cardBgImage.style.backgroundImage = `url('${appData.heroPhoto}')`;
  }

  const cardBtnCalendar = document.querySelector("#cardBtnCalendar");
  if (cardBtnCalendar && appData.eventDate) {
    const title = encodeURIComponent(`ពិធីមង្គលការ ${appData.groom.nameKh} & ${appData.bride.nameKh}`);
    const loc = encodeURIComponent(appData.venue.name + ", " + appData.venue.address);
    cardBtnCalendar.href = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&location=${loc}`;
  }
}

/**
 * 4. SCREEN 2: បញ្ជីឈ្មោះភ្ញៀវ (GUEST LIST)
 */
function initGuestsView() {
  renderGuestsList();

  const searchInput = document.querySelector("#guestSearchInput");
  if (searchInput) {
    searchInput.addEventListener("input", () => renderGuestsList());
  }

  const filterTabs = document.querySelectorAll(".filter-tab-btn");
  filterTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      filterTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      currentGuestFilter = tab.getAttribute("data-filter");
      renderGuestsList();
    });
  });

  const btnSortAZ = document.querySelector("#btnSortAZ");
  if (btnSortAZ) {
    btnSortAZ.addEventListener("click", () => {
      isSortAZ = !isSortAZ;
      btnSortAZ.style.color = isSortAZ ? "var(--primary-pink)" : "";
      renderGuestsList();
      showToast(isSortAZ ? "⇅ បានតម្រៀបតាម អ-ក" : "⇅ តម្រៀបតាមលំនាំដើម");
    });
  }

  const btnAddGuest = document.querySelector("#btnAddGuest");
  if (btnAddGuest) {
    btnAddGuest.addEventListener("click", () => {
      document.querySelector("#guestFormId").value = "";
      document.querySelector("#guestFormName").value = "";
      document.querySelector("#guestFormPhone").value = "";
      document.querySelector("#guestFormPax").value = "1";
      document.querySelector("#guestModalTitle").textContent = "➕ បន្ថែមភ្ញៀវកិត្តិយស";
      openModal("#guestModal");
    });
  }

  const guestForm = document.querySelector("#guestForm");
  if (guestForm) {
    guestForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const id = document.querySelector("#guestFormId").value;
      const name = document.querySelector("#guestFormName").value.trim();
      const side = document.querySelector("#guestFormSide").value;
      const phone = document.querySelector("#guestFormPhone").value.trim();
      const pax = parseInt(document.querySelector("#guestFormPax").value, 10) || 1;

      const groupLabel = side === "bride" ? "ភ្ញៀវកូនក្រមុំ" : side === "groom" ? "ភ្ញៀវកូនកំលោះ" : "មិត្តភក្តិ";

      if (id) {
        const g = appData.guests.find(x => x.id === id);
        if (g) {
          g.name = name;
          g.side = side;
          g.group = groupLabel;
          g.phone = phone;
          g.pax = pax;
        }
      } else {
        appData.guests.unshift({
          id: "gst_" + Date.now(),
          name: name,
          group: groupLabel,
          side: side,
          phone: phone,
          pax: pax,
          hasGift: false,
          giftAmount: 0,
          giftCurrency: "USD"
        });
      }

      saveAppData();
      closeModal("#guestModal");
      showToast("✅ បានរក្សាទុកភ្ញៀវកិត្តិយស!");
    });
  }

  const btnGenerateAllQR = document.querySelector("#btnGenerateAllQR");
  if (btnGenerateAllQR) {
    btnGenerateAllQR.addEventListener("click", () => {
      showGuestQrModal("ភ្ញៀវកិត្តិយសទាំងអស់", window.location.origin + window.location.pathname);
    });
  }

  const btnExcelOptions = document.querySelector("#btnExcelOptions");
  if (btnExcelOptions) {
    btnExcelOptions.addEventListener("click", () => openModal("#excelModal"));
  }
}

function renderGuestsList() {
  if (!appData) return;

  const container = document.querySelector("#guestsListContainer");
  if (!container) return;

  const query = (document.querySelector("#guestSearchInput")?.value || "").toLowerCase().trim();

  // Counters
  safeSetText("#countAllGuests", appData.guests.length);
  safeSetText("#countBrideGuests", appData.guests.filter(g => g.side === "bride").length);
  safeSetText("#countGroomGuests", appData.guests.filter(g => g.side === "groom").length);
  safeSetText("#countGiftedGuests", appData.guests.filter(g => g.hasGift).length);

  let list = [...appData.guests];
  if (currentGuestFilter === "bride") list = list.filter(g => g.side === "bride");
  else if (currentGuestFilter === "groom") list = list.filter(g => g.side === "groom");
  else if (currentGuestFilter === "gifted") list = list.filter(g => g.hasGift);

  if (query) {
    list = list.filter(g => g.name.toLowerCase().includes(query) || (g.phone && g.phone.includes(query)));
  }

  if (isSortAZ) {
    list.sort((a, b) => a.name.localeCompare(b.name, "km"));
  }

  if (list.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 25px 10px; color: var(--phone-text-muted); font-size: 11px;">
        🔍 មិនមានឈ្មោះភ្ញៀវដែលត្រូវគ្នានឹងការស្វែងរកឡើយ
      </div>
    `;
    return;
  }

  container.innerHTML = list.map(g => `
    <div class="guest-item-card" data-id="${g.id}">
      <div class="guest-left-col">
        <span class="guest-fullname">${escapeHtml(g.name)}</span>
        <span class="guest-side-badge">
          <span>❤</span>
          <span>${escapeHtml(g.group)}</span>
        </span>
      </div>

      <div class="guest-right-actions">
        <button class="btn-guest-gift ${g.hasGift ? 'is-gifted' : ''}" onclick="quickRecordGiftForGuest('${g.id}')">
          ${g.hasGift ? '✓ ចងដៃ' : 'ចងដៃ'}
        </button>
        <button class="btn-guest-icon" title="មើលធៀប" onclick="previewGuestCard('${encodeURIComponent(g.name)}')">
          👁️
        </button>
        <button class="btn-guest-icon" title="បង្កើត QR" onclick="showGuestQrCode('${g.id}')">
          🔲
        </button>
        <button class="btn-guest-icon" title="កែប្រែ / លុប" onclick="openGuestActions('${g.id}')">
          ···
        </button>
      </div>
    </div>
  `).join("");
}

window.openGuestActions = function(id) {
  const g = appData.guests.find(x => x.id === id);
  if (!g) return;

  const action = prompt(`ភ្ញៀវ៖ "${g.name}"\nសូមវាយលេខ 1 ដើម្បី [កែប្រែ] ឬ 2 ដើម្បី [លុប]៖`, "1");
  if (action === "1") {
    editGuestItem(id);
  } else if (action === "2") {
    deleteGuestItem(id);
  }
};

window.editGuestItem = function(id) {
  const g = appData.guests.find(x => x.id === id);
  if (!g) return;

  document.querySelector("#guestFormId").value = g.id;
  document.querySelector("#guestFormName").value = g.name;
  document.querySelector("#guestFormSide").value = g.side || "bride";
  document.querySelector("#guestFormPhone").value = g.phone || "";
  document.querySelector("#guestFormPax").value = g.pax || 1;
  document.querySelector("#guestModalTitle").textContent = "✏️ កែប្រែភ្ញៀវកិត្តិយស";
  openModal("#guestModal");
};

window.deleteGuestItem = function(id) {
  if (confirm("តើអ្នកពិតជាចង់លុបឈ្មោះភ្ញៀវនេះមែនទេ?")) {
    appData.guests = appData.guests.filter(x => x.id !== id);
    saveAppData();
    showToast("🗑️ បានលុបឈ្មោះភ្ញៀវ!");
  }
};

window.previewGuestCard = function(encodedName) {
  const name = decodeURIComponent(encodedName);
  document.querySelector("#cardGuestName").textContent = name;
  switchTab("tab-card");
  showToast(`👁️ បង្ហាញធៀបសម្រាប់ "${name}"`);
};

window.showGuestQrCode = function(id) {
  const g = appData.guests.find(x => x.id === id);
  if (!g) return;

  const inviteUrl = `${window.location.origin}${window.location.pathname}?to=${encodeURIComponent(g.name)}`;
  showGuestQrModal(g.name, inviteUrl);
};

function showGuestQrModal(guestName, url) {
  document.querySelector("#qrGuestLabel").textContent = guestName;
  const qrImg = document.querySelector("#qrDisplayImg");
  const linkInput = document.querySelector("#qrInviteLinkInput");

  qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(url)}`;
  linkInput.value = url;

  openModal("#qrModal");
}

/**
 * 5. SCREEN 3: បញ្ជីចំណងដៃ (GIFTS REGISTRY)
 */
function initGiftsView() {
  renderGiftsList();

  const btnAddGift = document.querySelector("#btnAddGift");
  if (btnAddGift) {
    btnAddGift.addEventListener("click", () => {
      document.querySelector("#giftFormId").value = "";
      document.querySelector("#giftFormName").value = "";
      document.querySelector("#giftFormAmount").value = "";
      document.querySelector("#giftModalTitle").textContent = "🧧 កត់ត្រាចំណងដៃថ្មី";
      openModal("#giftModal");
    });
  }

  const giftForm = document.querySelector("#giftForm");
  if (giftForm) {
    giftForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const id = document.querySelector("#giftFormId").value;
      const name = document.querySelector("#giftFormName").value.trim();
      const amount = parseFloat(document.querySelector("#giftFormAmount").value) || 0;
      const currency = document.querySelector("#giftFormCurrency").value;
      const method = document.querySelector("#giftFormMethod").value;

      const now = new Date();
      const timeStr = `${now.getDate()} ធ្នូ ${now.getFullYear()}, ${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')} ${now.getHours() >= 12 ? 'ល្ងាច' : 'ព្រឹក'}`;

      if (id) {
        const item = appData.gifts.find(x => x.id === id);
        if (item) {
          item.guestName = name;
          item.amount = amount;
          item.currency = currency;
          item.method = method;
        }
      } else {
        appData.gifts.unshift({
          id: "gft_" + Date.now(),
          guestName: name,
          amount: amount,
          currency: currency,
          method: method,
          time: timeStr
        });

        // Mark guest as gifted
        const matched = appData.guests.find(g => g.name.toLowerCase() === name.toLowerCase());
        if (matched) {
          matched.hasGift = true;
          matched.giftAmount = amount;
          matched.giftCurrency = currency;
        }
      }

      saveAppData();
      closeModal("#giftModal");
      showToast("🧧 បានកត់ត្រាចំណងដៃរួចរាល់!");
    });
  }
}

function renderGiftsList() {
  if (!appData) return;

  const container = document.querySelector("#giftsListContainer");
  if (!container) return;

  let totalKHR = 0;
  let totalUSD = 0;

  appData.gifts.forEach(g => {
    if (g.currency === "KHR") totalKHR += g.amount;
    else totalUSD += g.amount;
  });

  safeSetText("#totalMoneyKHR", totalKHR.toLocaleString() + " រៀល");
  safeSetText("#totalMoneyUSD", totalUSD.toLocaleString() + " ដុល្លារ");

  safeSetText("#statTotalGuestsCount", `${appData.guests.length} នាក់`);
  safeSetText("#statGiftedGuestsCount", `${appData.guests.filter(g => g.hasGift).length} នាក់`);

  if (appData.gifts.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 25px 10px; color: var(--phone-text-muted); font-size: 11px;">
        🧧 មិនទាន់មានទិន្នន័យចំណងដៃនៅឡើយ
      </div>
    `;
    return;
  }

  container.innerHTML = appData.gifts.map(g => {
    const isUSD = g.currency === "USD";
    const amountLabel = isUSD ? `${g.amount.toLocaleString()} ដុល្លារ` : `${g.amount.toLocaleString()} រៀល`;

    return `
      <div class="gift-card-row">
        <div class="gift-row-info">
          <div class="gift-name-line">ឈ្មោះ: ${escapeHtml(g.guestName)}</div>
          <div class="gift-amt-line">ចំនួនចំណងដៃ: ${amountLabel}</div>
          <div class="gift-sub-line">តាមរយៈ: ${escapeHtml(g.method)}</div>
          <div class="gift-sub-line">ពេលវេលា: ${escapeHtml(g.time)}</div>
        </div>
        <div class="gift-row-btns">
          <button class="btn-row-action" title="កែប្រែ" onclick="editGiftItem('${g.id}')">✏️</button>
          <button class="btn-row-action" title="លុប" onclick="deleteGiftItem('${g.id}')">🗑️</button>
        </div>
      </div>
    `;
  }).join("");
}

window.quickRecordGiftForGuest = function(guestId) {
  const g = appData.guests.find(x => x.id === guestId);
  if (!g) return;

  document.querySelector("#giftFormId").value = "";
  document.querySelector("#giftFormName").value = g.name;
  document.querySelector("#giftFormAmount").value = g.giftAmount > 0 ? g.giftAmount : "25";
  document.querySelector("#giftFormCurrency").value = g.giftCurrency || "USD";
  document.querySelector("#giftModalTitle").textContent = `🧧 កត់ត្រាចំណងដៃ (${g.name})`;

  openModal("#giftModal");
};

window.editGiftItem = function(id) {
  const item = appData.gifts.find(x => x.id === id);
  if (!item) return;

  document.querySelector("#giftFormId").value = item.id;
  document.querySelector("#giftFormName").value = item.guestName;
  document.querySelector("#giftFormAmount").value = item.amount;
  document.querySelector("#giftFormCurrency").value = item.currency;
  document.querySelector("#giftFormMethod").value = item.method;
  document.querySelector("#giftModalTitle").textContent = "✏️ កែប្រែចំណងដៃ";

  openModal("#giftModal");
};

window.deleteGiftItem = function(id) {
  if (confirm("តើអ្នកចង់លុបទិន្នន័យចំណងដៃនេះមែនទេ?")) {
    appData.gifts = appData.gifts.filter(x => x.id !== id);
    saveAppData();
    showToast("🗑️ បានលុបចំណងដៃ!");
  }
};

/**
 * 6. SCREEN 4: កាលវិភាគកម្មវិធី (SCHEDULE)
 */
function initScheduleView() {
  renderScheduleList();

  const btnSubmit = document.querySelector("#btnSubmitNewSchedule");
  if (btnSubmit) {
    btnSubmit.addEventListener("click", () => {
      const time = document.querySelector("#newSchTime").value.trim();
      const desc = document.querySelector("#newSchDesc").value.trim();

      if (!time || !desc) {
        showToast("⚠️ សូមបញ្ចូលពេលវេលា និងបរិយាយកម្មវិធី");
        return;
      }

      appData.schedule.push({
        id: "sch_" + Date.now(),
        time: time,
        title: desc,
        description: desc
      });
      saveAppData();

      document.querySelector("#newSchTime").value = "";
      document.querySelector("#newSchDesc").value = "";
      showToast("➕ បានបន្ថែមកាលវិភាគថ្មី!");
    });
  }
}

function renderScheduleList() {
  if (!appData) return;

  const container = document.querySelector("#scheduleListContainer");
  const titleEl = document.querySelector("#schHeaderTitle");

  if (titleEl) {
    titleEl.textContent = `សិរីមង្គលអាពាហ៍ពិពាហ៍ ${appData.groom.nameKh} និង ${appData.bride.nameKh}`;
  }

  if (!container) return;

  container.innerHTML = appData.schedule.map(item => `
    <div class="schedule-timeline-row" data-id="${item.id}">
      <div class="sch-left-col">
        <span class="sch-time-str">⏱️ ${escapeHtml(item.time)}</span>
        <span class="sch-desc-str">${escapeHtml(item.description)}</span>
      </div>
      <div class="sch-right-btns">
        <button class="btn-row-action" title="កែប្រែ" onclick="editScheduleItem('${item.id}')">✏️</button>
        <button class="btn-row-action" title="លុប" onclick="deleteScheduleItem('${item.id}')">🗑️</button>
      </div>
    </div>
  `).join("");
}

window.editScheduleItem = function(id) {
  const item = appData.schedule.find(x => x.id === id);
  if (!item) return;

  const newTime = prompt("កែប្រែពេលវេលា៖", item.time);
  if (newTime === null) return;
  const newDesc = prompt("កែប្រែបរិយាយកម្មវិធី៖", item.description);
  if (newDesc === null) return;

  item.time = newTime;
  item.title = newDesc;
  item.description = newDesc;

  saveAppData();
  showToast("✏️ បានកែប្រែកាលវិភាគ!");
};

window.deleteScheduleItem = function(id) {
  if (confirm("តើអ្នកចង់លុបកាលវិភាគនេះមែនទេ?")) {
    appData.schedule = appData.schedule.filter(x => x.id !== id);
    saveAppData();
    showToast("🗑️ បានលុបកាលវិភាគ!");
  }
};

/**
 * 7. SCREEN 5: ផ្ទាំងកែប្រែ និង UPLOAD រូបថត (EDITOR)
 */
function initEditorView() {
  populateEditorForm();

  // Hero Couple Photo Upload
  const btnUploadHero = document.querySelector("#btnUploadHero");
  const editorHeroFileInput = document.querySelector("#editorHeroFileInput");
  const heroBox = document.querySelector("#heroPhotoPreviewBox");

  if (btnUploadHero && editorHeroFileInput) {
    btnUploadHero.addEventListener("click", () => editorHeroFileInput.click());
    if (heroBox) heroBox.addEventListener("click", () => editorHeroFileInput.click());

    editorHeroFileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        handleImageUpload(file, (dataUrl) => {
          appData.heroPhoto = dataUrl;
          document.querySelector("#editHeroPreviewImg").src = dataUrl;
          showToast("📸 រូបថតត្រូវបានផ្ទុកឡើង!");
        });
      }
    });
  }

  // KHQR Upload
  const btnUploadKhqr = document.querySelector("#btnUploadKhqr");
  const editorKhqrFileInput = document.querySelector("#editorKhqrFileInput");

  if (btnUploadKhqr && editorKhqrFileInput) {
    btnUploadKhqr.addEventListener("click", () => editorKhqrFileInput.click());
    editorKhqrFileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        handleImageUpload(file, (dataUrl) => {
          appData.khqr.qrImageUrl = dataUrl;
          document.querySelector("#editKhqrPreviewImg").src = dataUrl;
          showToast("💳 រូប KHQR ត្រូវបានផ្ទុកឡើង!");
        });
      }
    });
  }

  // Presets
  const btnPickPreset = document.querySelector("#btnPickPreset");
  if (btnPickPreset) {
    btnPickPreset.addEventListener("click", () => {
      openModal("#presetModal");
      renderPresetGallery();
    });
  }

  // Edit form submit
  const editForm = document.querySelector("#weddingEditForm");
  if (editForm) {
    editForm.addEventListener("submit", (e) => {
      e.preventDefault();

      appData.groom.nameKh = document.querySelector("#editGroomKh").value.trim();
      appData.bride.nameKh = document.querySelector("#editBrideKh").value.trim();
      appData.groom.fatherKh = document.querySelector("#editGroomFather").value.trim();
      appData.groom.motherKh = document.querySelector("#editGroomMother").value.trim();
      appData.bride.fatherKh = document.querySelector("#editBrideFather").value.trim();
      appData.bride.motherKh = document.querySelector("#editBrideMother").value.trim();

      appData.eventDate.dateKhmer = document.querySelector("#editDateKhmer").value.trim();
      appData.venue.name = document.querySelector("#editVenueName").value.trim();
      appData.venue.address = document.querySelector("#editVenueAddress").value.trim();
      appData.venue.googleMapDirectLink = document.querySelector("#editGoogleMapsUrl").value.trim();

      appData.khqr.receiverName = document.querySelector("#editKhqrReceiver").value.trim();
      appData.khqr.bankName = document.querySelector("#editKhqrBank").value.trim();
      appData.khqr.accountNumber = document.querySelector("#editKhqrAccount").value.trim();

      saveAppData();
      showToast("💾 បានរក្សាទុកព័ត៌មានទាំងអស់ដោយជោគជ័យ!");
      switchTab("tab-card");
    });
  }

  // Reset
  const btnResetConfig = document.querySelector("#btnResetConfig");
  if (btnResetConfig) {
    btnResetConfig.addEventListener("click", () => {
      if (confirm("តើអ្នកចង់កំណត់ទិន្នន័យទាំងអស់ទៅជាលំនាំដើមវិញមែនទេ?")) {
        appData = JSON.parse(JSON.stringify(DEFAULT_WEDDING_CONFIG));
        saveAppData();
        showToast("🔄 បានកំណត់ឡើងវិញជោគជ័យ!");
      }
    });
  }
}

function populateEditorForm() {
  if (!appData) return;

  safeSetValue("#editGroomKh", appData.groom.nameKh);
  safeSetValue("#editBrideKh", appData.bride.nameKh);
  safeSetValue("#editGroomFather", appData.groom.fatherKh);
  safeSetValue("#editGroomMother", appData.groom.motherKh);
  safeSetValue("#editBrideFather", appData.bride.fatherKh);
  safeSetValue("#editBrideMother", appData.bride.motherKh);

  safeSetValue("#editDateKhmer", appData.eventDate.dateKhmer);
  safeSetValue("#editVenueName", appData.venue.name);
  safeSetValue("#editVenueAddress", appData.venue.address);
  safeSetValue("#editGoogleMapsUrl", appData.venue.googleMapDirectLink);

  safeSetValue("#editKhqrReceiver", appData.khqr.receiverName);
  safeSetValue("#editKhqrBank", appData.khqr.bankName);
  safeSetValue("#editKhqrAccount", appData.khqr.accountNumber);

  const heroPreview = document.querySelector("#editHeroPreviewImg");
  if (heroPreview && appData.heroPhoto) heroPreview.src = appData.heroPhoto;

  const khqrPreview = document.querySelector("#editKhqrPreviewImg");
  if (khqrPreview && appData.khqr.qrImageUrl) khqrPreview.src = appData.khqr.qrImageUrl;
}

/**
 * 8. IMAGE UPLOAD HANDLER
 */
function handleImageUpload(file, callback) {
  if (!file || !file.type.startsWith("image/")) {
    showToast("⚠️ សូមជ្រើសរើសឯកសាររូបភាពត្រឹមត្រូវ");
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {
      const canvas = document.createElement("canvas");
      const MAX_WIDTH = 1200;
      let width = img.width;
      let height = img.height;

      if (width > MAX_WIDTH) {
        height = Math.round((height * MAX_WIDTH) / width);
        width = MAX_WIDTH;
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);

      const optimizedDataUrl = canvas.toDataURL("image/jpeg", 0.85);
      callback(optimizedDataUrl);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

/**
 * 9. PRESETS GALLERY
 */
function renderPresetGallery() {
  const container = document.querySelector("#presetsGrid");
  if (!container) return;

  const presets = [
    { name: "គំរូដើម (Sothea & Vicheka)", url: "images/couple.jpg" },
    { name: "គំរូ Romantic Studio", url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop&q=80" },
    { name: "គំរូ Classic Sunset", url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&auto=format&fit=crop&q=80" },
    { name: "គំរូ Elegant Outdoor", url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&auto=format&fit=crop&q=80" }
  ];

  container.innerHTML = presets.map(p => `
    <div class="preset-thumb-card" onclick="selectPresetPhoto('${p.url}')">
      <img src="${p.url}" alt="${p.name}">
      <div class="preset-caption">${p.name}</div>
    </div>
  `).join("");
}

window.selectPresetPhoto = function(url) {
  appData.heroPhoto = url;
  saveAppData();
  closeModal("#presetModal");
  showToast("✨ បានជ្រើសរើសរូបថតគំរូ!");
};

/**
 * 10. MODALS & EXCEL IMPORT/EXPORT
 */
function initModals() {
  document.querySelectorAll(".modal-close").forEach(btn => {
    btn.addEventListener("click", () => {
      const modal = btn.closest(".modal-backdrop");
      if (modal) modal.classList.remove("open");
    });
  });

  const btnCopy = document.querySelector("#btnCopyInviteLink");
  if (btnCopy) {
    btnCopy.addEventListener("click", () => {
      const input = document.querySelector("#qrInviteLinkInput");
      input.select();
      navigator.clipboard.writeText(input.value).then(() => {
        showToast("📋 បានចម្លង Link រួចរាល់!");
      });
    });
  }

  // Export Guests CSV
  const btnExportGuests = document.querySelector("#btnExportGuestsCsv");
  if (btnExportGuests) {
    btnExportGuests.addEventListener("click", () => {
      let csv = "\uFEFFឈ្មោះ,ក្រុម,លេខទូរស័ព្ទ,ចំនួនភ្ញៀវ,បានចងដៃ,ទឹកប្រាក់\n";
      appData.guests.forEach(g => {
        csv += `"${g.name}","${g.group}","${g.phone || ''}","${g.pax}","${g.hasGift ? 'បាទ/ចាស' : 'ទេ'}","${g.giftAmount || 0} ${g.giftCurrency || ''}"\n`;
      });
      downloadCsvFile(csv, "បញ្ជីភ្ញៀវ_Theapka.csv");
    });
  }

  // Export Gifts CSV
  const btnExportGifts = document.querySelector("#btnExportGiftsCsv");
  if (btnExportGifts) {
    btnExportGifts.addEventListener("click", () => {
      let csv = "\uFEFFឈ្មោះ,ចំនួនទឹកប្រាក់,រូបិយប័ណ្ណ,មធ្យោបាយ,ពេលវេលា\n";
      appData.gifts.forEach(g => {
        csv += `"${g.guestName}","${g.amount}","${g.currency}","${g.method}","${g.time}"\n`;
      });
      downloadCsvFile(csv, "បញ្ជីចំណងដៃ_Theapka.csv");
    });
  }

  // Import CSV
  const btnProcessImport = document.querySelector("#btnProcessImportCsv");
  const fileInput = document.querySelector("#importCsvFileInput");
  if (btnProcessImport && fileInput) {
    btnProcessImport.addEventListener("click", () => {
      const file = fileInput.files[0];
      if (!file) {
        showToast("⚠️ សូមជ្រើសរើសឯកសារ CSV ជាមុន");
        return;
      }

      const reader = new FileReader();
      reader.onload = function(e) {
        const text = e.target.result;
        const lines = text.split("\n");
        let addedCount = 0;

        for (let i = 1; i < lines.length; i++) {
          const line = lines[i].trim();
          if (!line) continue;
          const cols = line.split(",").map(c => c.replace(/^"|"$/g, "").trim());
          if (cols[0]) {
            appData.guests.push({
              id: "gst_" + Date.now() + "_" + i,
              name: cols[0],
              group: cols[1] || "ភ្ញៀវកិត្តិយស",
              side: (cols[1] && cols[1].includes("ប្រុស")) ? "groom" : "bride",
              phone: cols[2] || "",
              pax: parseInt(cols[3], 10) || 1,
              hasGift: false,
              giftAmount: 0,
              giftCurrency: "USD"
            });
            addedCount++;
          }
        }

        saveAppData();
        closeModal("#excelModal");
        showToast(`📊 បាននាំចូលភ្ញៀវចំនួន ${addedCount} នាក់!`);
      };
      reader.readAsText(file);
    });
  }
}

function downloadCsvFile(content, fileName) {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  showToast("📥 កំពុងទាញយកឯកសារ...");
}

function openModal(selector) {
  const m = document.querySelector(selector);
  if (m) m.classList.add("open");
}

function closeModal(selector) {
  const m = document.querySelector(selector);
  if (m) m.classList.remove("open");
}

/**
 * 11. FULL INVITATION (WAX SEAL & MUSIC)
 */
function initFullInvitation() {
  const modal = document.querySelector("#fullInviteModal");
  const btnClose = document.querySelector("#btnCloseFullInvite");
  const waxBtn = document.querySelector("#waxSealBtn");
  const envelope = document.querySelector("#envelopeCover");
  const audio = document.querySelector("#bgMusic");
  const musicToggle = document.querySelector("#musicToggleBtn");

  if (btnClose) {
    btnClose.addEventListener("click", () => {
      modal.classList.remove("open");
      if (audio) audio.pause();
    });
  }

  if (waxBtn && envelope) {
    waxBtn.addEventListener("click", () => {
      envelope.classList.add("opened");
      if (audio) {
        audio.src = appData.music.audioUrl;
        audio.play().catch(e => console.log("Audio play blocked", e));
      }
    });
  }

  if (musicToggle && audio) {
    musicToggle.addEventListener("click", () => {
      if (audio.paused) {
        audio.play();
        musicToggle.textContent = "🎵";
      } else {
        audio.pause();
        musicToggle.textContent = "🔇";
      }
    });
  }

  const rsvpForm = document.querySelector("#publicRsvpForm");
  if (rsvpForm) {
    rsvpForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const guestName = document.querySelector("#rsvpGuestName").value.trim();
      const phone = document.querySelector("#rsvpGuestPhone").value.trim();
      const attending = document.querySelector("#rsvpAttending").value;
      const count = document.querySelector("#rsvpGuestCount").value;

      const existing = appData.guests.find(g => g.name.toLowerCase() === guestName.toLowerCase());
      if (!existing && attending === "yes") {
        appData.guests.unshift({
          id: "gst_" + Date.now(),
          name: guestName,
          group: "ភ្ញៀវឆ្លើយតប RSVP",
          side: "mutual",
          phone: phone,
          pax: parseInt(count, 10) || 1,
          hasGift: false
        });
        saveAppData();
      }

      showToast("💌 សូមអរគុណចំពោះការឆ្លើយតប!");
      rsvpForm.reset();
    });
  }

  renderFullInvitation();
  initCountdownTimer();
}

function renderFullInvitation() {
  if (!appData) return;

  safeSetText("#envelopeCoupleTitle", `${appData.groom.nameKh} & ${appData.bride.nameKh}`);
  safeSetText("#fullGroomKh", appData.groom.nameKh);
  safeSetText("#fullBrideKh", appData.bride.nameKh);
  safeSetText("#fullDateKhmer", appData.eventDate.dateKhmer);

  safeSetText("#fullGroomFather", appData.groom.fatherKh);
  safeSetText("#fullGroomMother", appData.groom.motherKh);
  safeSetText("#fullBrideFather", appData.bride.fatherKh);
  safeSetText("#fullBrideMother", appData.bride.motherKh);

  safeSetText("#fullVenueName", appData.venue.name);
  safeSetText("#fullVenueAddress", appData.venue.address);

  const directMap = document.querySelector("#fullBtnDirectMap");
  if (directMap) directMap.href = appData.venue.googleMapDirectLink;

  const coupleImg = document.querySelector("#fullCouplePhoto");
  if (coupleImg && appData.heroPhoto) {
    coupleImg.src = appData.heroPhoto;
  }

  safeSetText("#fullKhqrReceiver", appData.khqr.receiverName);
  safeSetText("#fullKhqrBank", appData.khqr.bankName);
  safeSetText("#fullKhqrAcc", appData.khqr.accountNumber);
  const khqrImg = document.querySelector("#fullKhqrImg");
  if (khqrImg && appData.khqr.qrImageUrl) {
    khqrImg.src = appData.khqr.qrImageUrl;
  }

  const schTimeline = document.querySelector("#fullScheduleTimeline");
  if (schTimeline) {
    schTimeline.innerHTML = appData.schedule.map(s => `
      <div style="background: #ffffff; border: 1px solid rgba(197, 155, 39, 0.25); border-radius: 8px; padding: 8px 12px; margin-bottom: 6px;">
        <span style="color: #c59b27; font-weight: 700; font-size: 11px;">⏱️ ${escapeHtml(s.time)}</span>
        <p style="font-size: 11px; color: #333; margin-top: 2px;">${escapeHtml(s.description)}</p>
      </div>
    `).join("");
  }
}

/**
 * 12. COUNTDOWN TIMER
 */
function initCountdownTimer() {
  function updateTimer() {
    const target = new Date("2026-12-13T07:00:00").getTime();
    const now = new Date().getTime();
    const diff = target - now;

    if (diff > 0) {
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      safeSetText("#daysCount", String(d).padStart(2, "0"));
      safeSetText("#hoursCount", String(h).padStart(2, "0"));
      safeSetText("#minutesCount", String(m).padStart(2, "0"));
      safeSetText("#secondsCount", String(s).padStart(2, "0"));
    }
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

/**
 * 13. URL PARAMETERS
 */
function handleUrlParams() {
  const params = new URLSearchParams(window.location.search);
  const guestParam = params.get("to");
  const tabParam = params.get("tab");
  const modeParam = params.get("mode");

  if (guestParam) {
    const guestName = decodeURIComponent(guestParam);
    safeSetText("#cardGuestName", guestName);
    const rsvpName = document.querySelector("#rsvpGuestName");
    if (rsvpName) rsvpName.value = guestName;
  }

  if (tabParam) {
    const validTabs = ["tab-card", "tab-guests", "tab-gifts", "tab-schedule", "tab-editor"];
    if (validTabs.includes("tab-" + tabParam)) {
      switchTab("tab-" + tabParam);
    }
  }

  if (modeParam === "invite") {
    document.querySelector("#fullInviteModal").classList.add("open");
  }
}

/**
 * 14. FLOATING PETALS
 */
function initPetalsEffect() {
  const canvas = document.querySelector("#particles-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let w = (canvas.width = window.innerWidth);
  let h = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  });

  const petals = [];
  const TOTAL = 20;

  for (let i = 0; i < TOTAL; i++) {
    petals.push({
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 7 + 4,
      speedX: Math.random() * 0.8 - 0.4,
      speedY: Math.random() * 1.0 + 0.5,
      angle: Math.random() * 360,
      spin: Math.random() * 2 - 1,
      color: Math.random() > 0.4 ? "rgba(255, 182, 193, 0.4)" : "rgba(243, 207, 101, 0.35)"
    });
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    petals.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;
      p.angle += p.spin;

      if (p.y > h) p.y = -10;
      if (p.x > w) p.x = 0;
      if (p.x < 0) p.x = w;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.angle * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.ellipse(0, 0, p.size, p.size / 2, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    requestAnimationFrame(draw);
  }

  draw();
}

/**
 * UTILITIES
 */
function showToast(message) {
  const container = document.querySelector("#toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast-msg";
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    if (toast.parentNode) toast.parentNode.removeChild(toast);
  }, 2800);
}

function safeSetText(selector, text) {
  const el = document.querySelector(selector);
  if (el) el.textContent = text || "";
}

function safeSetValue(selector, val) {
  const el = document.querySelector(selector);
  if (el) el.value = val || "";
}

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
