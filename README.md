# 🌸 ធៀបការឌីជីថល (Khmer Luxury Wedding E-Invitation)

A production-ready, mobile-first Khmer wedding e-invitation (ធៀបការឌីជីថល) engineered with fine printed-card craft aesthetics and cinematic 3D motion. Designed for modern guests opening links inside Telegram, Messenger, and mobile browsers.

> **Design Inspiration**: Modeled after Someth Phay's refined craft aesthetic (*somethphay.me*), featuring olive paper textures, metallic gold foil sweeps, cream cardstock, custom Khmer kbach ornaments, and atmospheric lighting.

---

## ✨ Features & Architecture

1. **3D Interactive Envelope Gate**:
   - Folded paper pocket construction with directional drop shadows.
   - Mathematically generated scalloped flap with metallic gold foil border path.
   - Poured wax seal with realistic specular lighting and touch-responsive 3D lift.
   - Smooth 5.5s hand-tuned opening timeline with synthesized audio (paper rustle, seal chime).
2. **Atmospheric Cover Hero**:
   - Full-bleed couple portrait with ambient vignette and floating canvas ember particles.
   - Animated SVG Couple Monogram Lockup (ឡូហ្គោឈ្មោះ) with stroke-dashoffset reveal.
   - Dual-language instant switcher (**ខ្មែរ / EN**) and audio equalizer toggle in top HUD.
   - Glassmorphic gold date chips (ថ្ងៃ, ទី, ខែ, ឆ្នាំ) and traditional Khmer lunar date.
3. **Formal Invitation Words (ពាក្យអញ្ជើញ)**:
   - Arched couple portrait with dashed gold halo border.
   - Two-column parents honorifics (Groom's parents on the left, Bride's parents on the right) with calligraphy ampersand.
   - Formal traditional royal Khmer wording and banquet schedule.
4. **The Couple (កូនកំលោះ & កូនក្រមុំ)**:
   - Individual portrait cards with gold corner kbach elements.
   - Traditional and English titles, names in Moul/Moulpali, and vows/quotes.
5. **Live Countdown & Blessing Marquee (រាប់ថយក្រោយ)**:
   - Real-time countdown ticker with Khmer numerals conversion (`៥៤ ថ្ងៃ · ១៤ ម៉ោង...`).
   - Infinite background marquee with traditional Khmer wedding blessings (*សិរីសួស្តី ជ័យមង្គល វិបុលសុខ មហាប្រសើរ*).
6. **Programme / Schedule (កម្មវិធីមង្គលការ)**:
   - Vertical timeline connected by a continuous drawing gold thread.
   - 8 custom ceremony ritual icons (parade, breakfast, ring, haircut, ancestors, popil/wrist tying, banquet, grand reception).
   - Evening dinner banquet highlight card.
7. **Our Story / Highlights (ដំណើររឿងនៃក្តីស្រឡាញ់)**:
   - Horizontal swipeable milestone cards (First Encounter 2021, Sunset Proposal 2024, Walking Down the Aisle 2026).
   - Dynamic active dot indicator.
8. **Candlelight Reflection (បំភ្លឺទៀនជ័យ)**:
   - Nocturnal emotional photo background.
   - Floating glowing lotus lanterns on water.
   - Interactive: tap water to float a wish lantern with live Khmer numeral counter.
9. **Pre-Wedding Gallery (កម្រងរូបភាពអនុស្សាវរីយ៍)**:
   - Editorial photo grid.
   - Lightbox modal with zoom effect, swipe gestures, keyboard arrows (Esc/Left/Right), and close button.
10. **Venue & Map (ទីតាំង និងផែនទី)**:
    - Venue title, address, note, and embedded Google Maps iframe.
    - One-click "Open in Google Maps" and "Add to Calendar (.ics)" export.
    - Direct host hotline phone chips with clickable `tel:` links.
11. **Wedding Gift / QR (សំបុត្រចំណងដៃ)**:
    - Authentic Bakong KHQR (Bride) and ABA PAY (Groom) cards.
    - Sharp SVG QR codes, one-click "Copy Account Number" with toast alert, and "Save QR Image" download.
12. **Finale, RSVP Guestbook & Social Share (ពាក្យជូនពរ & វត្តមាន)**:
    - Interactive Guestbook form with attendance choice and live local persistence.
    - Social share buttons for **Telegram**, **Facebook**, **Messenger**, and **Copy Link**.
    - Romantic thank-you card and footer credit.

---

## 🎨 How to Customize (ការកែសម្រួលទិន្នន័យ)

All wedding details are cleanly separated into a single configuration file:
**[`src/data/wedding.js`](file:///c:/Users/ASUS/.gemini/antigravity-ide/scratch/e-invitation/src/data/wedding.js)**

### 1. Couple Names & Quotes
Open `src/data/wedding.js` and modify `couple`:
```javascript
couple: {
  groom: {
    km: "ឈ្មោះកូនកំលោះ",        // Khmer Full Name
    en: "Groom English Name",  // English Full Name
    shortKm: "ឈ្មោះហៅក្រៅ",      // Monogram short name
    shortEn: "Groom",
    photo: "/images/groom.jpg", // Photo path
    quoteKm: "«ពាក្យសន្យា ឬពាក្យក្នុងចិត្ត»",
    quoteEn: "“English vow quote”"
  },
  bride: {
    km: "ឈ្មោះកូនក្រមុំ",
    en: "Bride English Name",
    shortKm: "ឈ្មោះហៅក្រៅ",
    shortEn: "Bride",
    photo: "/images/bride.jpg",
    quoteKm: "«ពាក្យសន្យា ឬពាក្យក្នុងចិត្ត»",
    quoteEn: "“English vow quote”"
  }
}
```

### 2. Parents' Names
Modify `families` in `src/data/wedding.js`:
```javascript
families: {
  groom: {
    father: { km: "លោក ...", en: "Mr. ..." },
    mother: { km: "លោកស្រី ...", en: "Mrs. ..." }
  },
  bride: {
    father: { km: "លោក ...", en: "Mr. ..." },
    mother: { km: "លោកស្រី ...", en: "Mrs. ..." }
  }
}
```

### 3. Date, Time & Lunar Calendar
```javascript
date: "2026-12-13T07:00:00+07:00", // ISO format (Year-Month-DayTHour:Min:Sec+07:00)
lunar: {
  km: "ត្រូវនឹងថ្ងៃ... ...កើត ខែ... ឆ្នាំ... ព.ស. ...",
  en: "... waxing day of ..., Year of the ..., B.E. ..."
}
```

### 4. Venue & Map
```javascript
venue: {
  name: { km: "គេហដ្ឋានខាងស្រី...", en: "Venue Name..." },
  address: { km: "ភូមិ... ឃុំ... ស្រុក... ខេត្ត...", en: "Address..." },
  lat: 11.0500,
  lng: 104.7500,
  mapsUrl: "https://maps.google.com/?q=11.0500,104.7500"
}
```

### 5. Photos
Place your high-resolution photos into `public/images/`:
- `public/images/couple.jpg` (Hero & Cover photo)
- `public/images/groom.jpg` (Groom portrait)
- `public/images/bride.jpg` (Bride portrait)
- `public/images/candlelight.jpg` (Candlelight section background)
- `public/images/story-proposal.jpg` (Love story proposal photo)
- `public/images/gallery-garden.jpg` (Gallery photo)

### 6. Music
Place your background audio file into `public/audio/wedding-melody.mp3` or update the URL in `src/data/wedding.js`:
```javascript
music: "/audio/wedding-melody.mp3"
```

---

## 🚀 Deployment to Vercel (ការបង្ហោះលើ Vercel)

Deploying takes under 2 minutes:

### Option 1: Via Vercel CLI (Recommended)
1. In this directory, run:
   ```bash
   npx vercel
   ```
2. Follow the prompt (accept defaults with `Enter`).
3. Deploy to production:
   ```bash
   npx vercel --prod
   ```
4. You will receive your live URL (e.g., `https://theapka-wedding.vercel.app`)!

### Option 2: Via GitHub & Vercel Dashboard
1. Push this repository to your GitHub account:
   ```bash
   git init
   git add .
   git commit -m "feat: luxury Khmer digital wedding e-invitation"
   git remote add origin https://github.com/YOUR_USERNAME/khmer-wedding-e-invitation.git
   git branch -M main
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository. Vercel automatically detects **Vite**.
4. Click **Deploy**. Your custom domain or `.vercel.app` URL is ready instantly!

---

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Start Vite dev server
npm run dev

# Run full visual test suite
node test-full-suite.js

# Build production bundle
npm run build
```
