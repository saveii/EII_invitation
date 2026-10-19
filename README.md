 ធៀបការឌីជីថល (Khmer Luxury Wedding E-Invitation)
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
