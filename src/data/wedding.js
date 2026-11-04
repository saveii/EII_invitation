/**
 * ====================================================================
 * 💒 ការកំណត់ទិន្នន័យធៀបការឌីជីថល (Wedding Configuration Data)
 * --------------------------------------------------------------------
 * ឯកសារនេះជាកន្លែងកែប្រែទិន្នន័យទាំងអស់ដែលត្រូវបង្ហាញលើគេហទំព័រធៀបការ។
 * អ្នកអាចកែសម្រួលព័ត៌មានខាងក្រោមដោយសេរីតាមតម្រូវការជាក់ស្ដែង៖
 * 
 *  ១. ព័ត៌មានកូនកំលោះ & កូនក្រមុំ (ឈ្មោះ, រូបថត, ពាក្យស្លោក)
 *  ២. ព័ត៌មានមាតាបិតាទាំងសងខាង (ឳពុកម្តាយខាងប្រុស & ខាងស្រី)
 *  ៣. ថ្ងៃខែឆ្នាំរៀបការ & កម្មវិធីរាប់ថយក្រោយ (Countdown)
 *  ៤. ទីតាំងរោងការ & ផែនទី Google Maps
 *  ៥. លេខទូរស័ព្ទទំនាក់ទំនង (ខាងកំលោះ & ខាងក្រមុំ)
 *  ៦. កាលវិភាគកម្មវិធីមង្គលការ (Programme / Schedule)
 *  ៧. ដំណើររឿងស្នេហា (Love Story Timeline)
 *  ៨. កម្រងរូបថតអនុស្សាវរីយ៍ (Photo Gallery)
 *  ៩. គណនីធនាគារទទួលចំណងដៃ (Bakong KHQR / ABA PAY)
 *  ១០. រូបភាពចម្បង និងបទចម្រៀងកំដរ (Hero Photo & Music)
 * ====================================================================
 */

import { DEFAULT_WEDDING_CONFIG } from "../../js/config.js";

// ទាញយកតម្លៃដើមពី js/config.js (បើមាន)
const c = DEFAULT_WEDDING_CONFIG || {};

// មុខងារជំនួយសម្រាប់ត្រួតពិនិត្យផ្លូវរូបភាព (Path format)
const formatImg = (path, fallback) => {
  if (!path) return fallback;
  return path.startsWith("/") ? path : `/${path}`;
};

export const weddingData = {
  // ==================================================================
  // ១. ព័ត៌មានកូនកំលោះ និងកូនក្រមុំ (Couple Information)
  // ==================================================================
  couple: {
    // ----------------------------------------------------------------
    // 🤵 ព័ត៌មានខាងកូនកំលោះ (Groom)
    // ----------------------------------------------------------------
    groom: {
      km: c.groom?.nameKh || "ដា រ៉ា", // ឈ្មោះពេញជាភាសាខ្មែរ
      en: c.groom?.nameEn || "DA RAI", // ឈ្មោះជាអក្សរឡាតាំង / អង់គ្លេស
      shortKm: c.groom?.nameKh?.replace(/\s+/g, "") || "ដារ៉ា", // ឈ្មោះហៅក្រៅ/ឈ្មោះកាត់ (ខ្មែរ)
      shortEn: c.groom?.nameEn?.split(/\s+/)[0] || "Dara", // ឈ្មោះកាត់ (អង់គ្លេស)
      initialKm: (c.groom?.nameKh || "ដ").trim()[0] || "ដ", // តួអក្សរកាត់ដើមខ្មែរ សម្រាប់ធ្វើ Monogram / Logo
      initialEn: (c.groom?.nameEn || "D").trim()[0] || "D", // តួអក្សរកាត់ដើមឡាតាំង សម្រាប់ធ្វើ Monogram / Logo
      roleKm: c.groom?.roleKh || "កូនប្រុស", // តួនាទីក្នុងគ្រួសារ (ឧទាហរណ៍៖ "កូនប្រុស", "កូនប្រុសច្បង", "កូនប្រុសពៅ")
      roleEn: "Groom",
      photo: formatImg(c.groom?.photo, "/images/1.jpg"), // ផ្លូវរូបថតកូនកំលោះ (នៅក្នុង public/images/)
      parentHonorKm: `ជា${c.groom?.roleKh || "កូនប្រុស"}របស់ ${c.groom?.fatherKh || "លោក ហែម ណារិទ្ធិ"} និង ${c.groom?.motherKh || "លោកស្រី ផន សាម៉េត"}`,
      parentHonorEn: "Son of Mr. Hem Narith & Mrs. Phorn Samet",
      quoteKm: "«ខ្ញុំសន្យាថានឹងស្រឡាញ់ ការពារ និងមើលថែអូនអស់មួយជីវិត»", // ពាក្យស្លោក/សារសច្ចារបស់កូនកំលោះ
      quoteEn: "“I promise to love, protect, and cherish you for all of our days.”"
    },

    // ----------------------------------------------------------------
    // 👰 ព័ត៌មានខាងកូនក្រមុំ (Bride)
    // ----------------------------------------------------------------
    bride: {
      km: c.bride?.nameKh || "កែវ សុវណ្ណារី", // ឈ្មោះពេញជាភាសាខ្មែរ
      en: c.bride?.nameEn || "KAO SOVANNAREI", // ឈ្មោះជាអក្សរឡាតាំង / អង់គ្លេស
      shortKm: c.bride?.shortKh || c.bride?.nameKh?.split(/\s+/).pop() || "សុវណ្ណារី", // ឈ្មោះហៅក្រៅ/ឈ្មោះកាត់ (ខ្មែរ)
      shortEn: c.bride?.nameEn?.split(/\s+/).pop() || "Sovannarei", // ឈ្មោះកាត់ (អង់គ្លេស)
      initialKm: (c.bride?.nameKh || "ក").trim()[0] || "ក", // តួអក្សរកាត់ដើមខ្មែរ សម្រាប់ធ្វើ Monogram / Logo
      initialEn: (c.bride?.nameEn || "K").trim()[0] || "K", // តួអក្សរកាត់ដើមឡាតាំង សម្រាប់ធ្វើ Monogram / Logo
      roleKm: c.bride?.roleKh || "កូនស្រី", // តួនាទីក្នុងគ្រួសារ (ឧទាហរណ៍៖ "កូនស្រី", "កូនស្រីច្បង", "កូនស្រីពៅ")
      roleEn: "Bride",
      photo: formatImg(c.bride?.photo, "/images/2.jpg"), // ផ្លូវរូបថតកូនក្រមុំ (នៅក្នុង public/images/)
      parentHonorKm: `ជា${c.bride?.roleKh || "កូនស្រី"}របស់ ${c.bride?.fatherKh || "លោក កែវ សុវណ្ណារា"} និង ${c.bride?.motherKh || "លោកស្រី សេង ភក្តី"}`,
      parentHonorEn: "Daughter of Mr. Keo Sovannara & Mrs. Seng Pheakdey",
      quoteKm: "«ក្តីស្រឡាញ់ដ៏កក់ក្តៅរបស់បង ជាជម្រកដ៏មានសុភមង្គលបំផុតរបស់អូន»", // ពាក្យស្លោក/សារស្នេហារបស់កូនក្រមុំ
      quoteEn: "“In your gentle warmth, I found my forever home and true happiness.”"
    }
  },

  // ==================================================================
  // ២. ព័ត៌មានមាតាបិតាទាំងសងខាង (Families Information)
  // ==================================================================
  families: {
    // មាតាបិតាខាងកូនកំលោះ
    groom: {
      father: {
        km: c.groom?.fatherKh || "លោក ហែម ណារិទ្ធិ", // ឈ្មោះឪពុកកូនកំលោះ (ខ្មែរ)
        en: "Mr. Hem Narith" // ឈ្មោះឪពុកកូនកំលោះ (អង់គ្លេស)
      },
      mother: {
        km: c.groom?.motherKh || "លោកស្រី ផន សាម៉េត", // ឈ្មោះម្តាយកូនកំលោះ (ខ្មែរ)
        en: "Mrs. Phorn Samet" // ឈ្មោះម្តាយកូនកំលោះ (អង់គ្លេស)
      }
    },
    // មាតាបិតាខាងកូនក្រមុំ
    bride: {
      father: {
        km: c.bride?.fatherKh || "លោក កែវ សុវណ្ណារា", // ឈ្មោះឪពុកកូនក្រមុំ (ខ្មែរ)
        en: "Mr. Keo Sovannara" // ឈ្មោះឪពុកកូនក្រមុំ (អង់គ្លេស)
      },
      mother: {
        km: c.bride?.motherKh || "លោកស្រី សេង ភក្តី", // ឈ្មោះម្តាយកូនក្រមុំ (ខ្មែរ)
        en: "Mrs. Seng Pheakdey" // ឈ្មោះម្តាយកូនក្រមុំ (អង់គ្លេស)
      }
    }
  },

  // ==================================================================
  // ៣. កាលបរិច្ឆេទ & ពេលវេលាកម្មវិធី (Event Date & Countdown)
  // ==================================================================
  // ℹ️ ចំណាំ៖ targetDateTime ត្រូវកំណត់តាមទម្រង់ YYYY-MM-DDTHH:mm:ss+07:00 សម្រាប់ដំណើរការនាឡិការាប់ថយក្រោយ (Countdown Timer)
  date: c.eventDate?.targetDateTime ? `${c.eventDate.targetDateTime}+07:00` : "2026-12-13T07:00:00+07:00",
  dateIsPlaceholder: false,
  lunar: {
    km: c.eventDate?.dateKhmer || "ថ្ងៃសុក្រ ទី ១៣ ខែ ធ្នូ ឆ្នាំ ២០២៤", // កាលបរិច្ឆេទបង្ហាញជាភាសាខ្មែរ
    en: "Sunday, 13 December 2026" // កាលបរិច្ឆេទបង្ហាញជាភាសាអង់គ្លេស
  },

  // ==================================================================
  // ៤. ទីតាំងរៀបចំពិធី & ផែនទី (Venue & Google Maps)
  // ==================================================================
  venue: {
    name: {
      km: c.venue?.name ? `${c.venue.name} (${c.venue.hall || "រោងមង្គលជ័យ"})` : "គេហដ្ឋានខាងស្រី (រោងមង្គលជ័យ)", // ឈ្មោះទីតាំង/រោងជ័យ
      en: "The Bride's Residence (Victory Pavilion)"
    },
    address: {
      km: c.venue?.address || "ភូមិត្រពាំងក្រសាំង ឃុំត្រាំកក់ ស្រុកត្រាំកក់ ខេត្តតាកែវ", // អាសយដ្ឋានទីតាំង (ខ្មែរ)
      en: "Trapeang Krasang Village, Tram Kak Commune, Tram Kak District, Takeo Province" // អាសយដ្ឋាន (អង់គ្លេស)
    },
    lat: 11.0500, // កូអរដោនេ Latitude (សម្រាប់គណនា ឬ Map Marker)
    lng: 104.7500, // កូអរដោនេ Longitude
    mapsUrl: c.venue?.googleMapDirectLink || "https://maps.google.com/?q=Tram+Kork+Takeo+Cambodia", // តំណភ្ជាប់បើកក្នុង Google Maps app លើទូរស័ព្ទ
    embedMapUrl: c.venue?.mapEmbedUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125345.234123!2d104.75!3d11.05!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDAzJzAwLjAiTiAxMDTCsDQ1JzAwLjAiRQ!5e0!3m2!1sen!2skh!4v1600000000000", // តំណភ្ជាប់ Google Maps Embed (iframe)
    note: {
      km: "សូមអញ្ជើញចូលរួមពិសាភោជនាហារ និងប្រសិទ្ធពរជ័យដោយមេត្រីភាព", // សេចក្តីថ្លែងអំណរគុណ/ការអញ្ជើញ
      en: "We warmly welcome your presence to celebrate and bless our union"
    }
  },

  // ==================================================================
  // ៥. លេខទូរស័ព្ទទំនាក់ទំនង (Contact Phone Numbers)
  // ==================================================================
  // ℹ️ ចំណាំ៖
  // - label: អក្សរដែលត្រូវបង្ហាញនៅលើអេក្រង់
  // - tel: លេខកូដទូរស័ព្ទអន្តរជាតិ (+855...) សម្រាប់ឱ្យភ្ញៀវចុច Call ចេញផ្ទាល់ពីទូរស័ព្ទដៃ
  contacts: [
    { label: "069 908 052 (ខាងកំលោះ)", tel: "+85569908052" },
    { label: "098 765 432 (ខាងក្រមុំ)", tel: "+85598765432" }
  ],

  // ==================================================================
  // ៦. កាលវិភាគកម្មវិធីមង្គលការ (Wedding Programme / Schedule)
  // ==================================================================
  // ℹ️ ចំណាំ៖
  // - t: ម៉ោងកម្មវិធី (ឧ. "06:30", "07:30", "12:00")
  // - pkm / pen: ពេល (ព្រឹក / AM, ថ្ងៃត្រង់ / PM, ល្ងាច / PM)
  // - icon: ប្រភេទរូបតំណាងកម្មវិធី ("parade", "breakfast", "ring", "haircut", "ancestors", "blessing", "lunch", "reception")
  // - main: true ប្រសិនបើចង់ Highlight កម្មវិធីធំចម្បង (ឧ. ពិធីពិសាភោជនាហារពេលល្ងាច)
  programme: [
    {
      km: "កម្មវិធីមង្គលការ ថ្ងៃអាទិត្យ ទី១៣ ខែធ្នូ ឆ្នាំ២០២៦",
      en: "Wedding Ceremonies · Sunday 13 December 2026",
      rows: [
        {
          t: "06:30",
          pkm: "ព្រឹក",
          pen: "AM",
          icon: "parade",
          km: "ជួបជុំភ្ញៀវកិត្តិយស ដើម្បីរៀបចំហែជំនូន",
          en: "Guests gather for the Hae Chamnoun procession"
        },
        {
          t: "07:30",
          pkm: "ព្រឹក",
          pen: "AM",
          icon: "breakfast",
          km: "ពិធីហែជំនូនចូលរោងជ័យ និងអញ្ជើញភ្ញៀវពិសាអាហារពេលព្រឹក",
          en: "Procession enters the pavilion & morning breakfast"
        },
        {
          t: "08:30",
          pkm: "ព្រឹក",
          pen: "AM",
          icon: "ring",
          km: "ពិធីជូនបណ្ណាការ ពិសាស្លា និងបំពាក់ចិញ្ចៀន",
          en: "Dowry presentation, betel chewing & ring exchange"
        },
        {
          t: "08:40",
          pkm: "ព្រឹក",
          pen: "AM",
          icon: "haircut",
          km: "ពិធីកាត់សក់ បង្កក់សិរី កូនប្រុស-កូនស្រី",
          en: "Kat Sak — hair-cutting blessing ceremony"
        },
        {
          t: "10:30",
          pkm: "ព្រឹក",
          pen: "AM",
          icon: "ancestors",
          km: "ពិធីសែនដូនតា",
          en: "Sen Daun Ta — ancestral homage ceremony"
        },
        {
          t: "11:30",
          pkm: "ព្រឹក",
          pen: "AM",
          icon: "blessing",
          km: "ពិធីសំពះផ្ទឹម បង្វិលពពិល និងចងដៃប្រសិទ្ធពរជ័យ",
          en: "Sampeah Ptem, Bongvil Popil & wrist tying blessing"
        },
        {
          t: "12:00",
          pkm: "ថ្ងៃត្រង់",
          pen: "PM",
          icon: "lunch",
          km: "អញ្ជើញភ្ញៀវកិត្តិយសពិសាអាហារថ្ងៃត្រង់",
          en: "Wedding banquet lunch for honoured guests"
        },
        {
          t: "05:00",
          pkm: "ល្ងាច",
          pen: "PM",
          icon: "reception",
          km: "អញ្ជើញភ្ញៀវកិត្តិយសពិសាភោជនាហារ នៅគេហដ្ឋានខាងស្រី ដោយមេត្រីភាព",
          en: "Grand evening dinner reception at the bride's house",
          main: true
        }
      ]
    }
  ],

  // ==================================================================
  // ៧. ដំណើររឿងស្នេហា (Love Story Timeline)
  // ==================================================================
  // ℹ️ អ្នកអាចបន្ថែម ឬកែប្រែដំណាក់កាលស្នេហាតាមឆ្នាំជាក់ស្តែង
  story: [
    {
      year: "2021",
      dateKm: "ខែ វិច្ឆិកា ឆ្នាំ ២០២១",
      dateEn: "November 2021",
      titleKm: "ថ្ងៃជួបគ្នាដំបូង",
      titleEn: "First Encounter",
      descKm: "ស្នាមញញឹមដំបូងដែលបានជួបគ្នា បានបើកទំព័រថ្មីនៃមិត្តភាពដ៏កក់ក្តៅ និងរឿងរ៉ាវដ៏ស្រស់ស្អាតបំផុតក្នុងជីវិត។",
      descEn: "A chance encounter over a warm afternoon coffee that sparked conversations lasting well into the sunset.",
      photo: formatImg(c.heroPhoto, "/images/3.jpg") // រូបថតដំណាក់កាលទី ១
    },
    {
      year: "2024",
      dateKm: "ខែ ធ្នូ ឆ្នាំ ២០២៤",
      dateEn: "December 2024",
      titleKm: "ពាក្យសន្យានៅថ្ងៃលិច",
      titleEn: "The Sunset Proposal",
      descKm: "ក្រោមពន្លឺថ្ងៃលិចពណ៌មាសនៅលើកំពូលភ្នំ បងបានលុតជង្គង់សុំអូនរៀបការ ជាមួយនឹងពាក្យសន្យាថានឹងមើលថែអូនជារៀងរហូត។",
      descEn: "Surrounded by the breathtaking mountain peaks at golden hour, he knelt down with a promise of forever.",
      photo: "/images/story-proposal.jpg" // រូបថតដំណាក់កាលទី ២
    },
    {
      year: "2026",
      dateKm: "ខែ ធ្នូ ឆ្នាំ ២០២៦",
      dateEn: "December 2026",
      titleKm: "ដំណើរឆ្ពោះទៅកាន់ថ្ងៃជ័យ",
      titleEn: "Walking Down the Aisle",
      descKm: "ថ្ងៃមង្គលដ៏ពិសិដ្ឋ ដែលពួកយើងរួមចិត្តជាតែមួយ ចាប់ដៃគ្នាសាងគ្រួសារពោរពេញដោយក្តីស្រឡាញ់ និងភាពកក់ក្តៅ។",
      descEn: "Together with our families and beloved friends, celebrating our union and the beginning of a lifelong journey.",
      photo: "/images/gallery-garden.jpg" // រូបថតដំណាក់កាលទី ៣
    }
  ],

  // ==================================================================
  // ៨. កម្រងរូបថតអនុស្សាវរីយ៍ (Photo Gallery)
  // ==================================================================
  // ℹ️ ដាក់រូបភាព Pre-wedding ក្នុង folder public/images/ រួចដាក់ឈ្មោះ file ទីនេះ
  gallery: [
    { src: formatImg(c.heroPhoto, "/images/3.jpg"), alt: "Pre-wedding couple portrait" },
    { src: "/images/gallery-garden.jpg", alt: "Walking through floral arch" },
    { src: "/images/candlelight.jpg", alt: "Candlelight evening reflection" },
    { src: "/images/story-proposal.jpg", alt: "Sunset proposal moment" },
    { src: formatImg(c.bride?.photo, "/images/2.jpg"), alt: "Bride portrait" },
    { src: formatImg(c.groom?.photo, "/images/1.jpg"), alt: "Groom portrait" }
  ],

  // ==================================================================
  // ៩. ទទួលចំណងដៃ / គណនីធនាគារ (Gift & QR Code Payments)
  // ==================================================================
  // ℹ️ ចំណាំ៖
  // - enabled: កំណត់ true ដើម្បីបង្ហាញផ្ទាំងចំណងដៃ (ឬ false ប្រសិនបើមិនចង់បង្ហាញ)
  // - qrType: "khqr" (សម្រាប់ Bakong KHQR) ឬ "aba" (សម្រាប់ ABA PAY)
  gift: {
    enabled: true,
    accounts: [
      {
        side: { km: `${c.bride?.nameKh || "កែវ សុវណ្ណារី"} (កូនក្រមុំ)`, en: `${c.bride?.nameEn || "KAO SOVANNAREI"} (Bride)` },
        bank: "Bakong KHQR",
        accName: c.bride?.nameEn || "KAO SOVANNAREI",
        accNum: "098 765 432",
        qrType: "khqr"
      },
      {
        side: { km: `${c.groom?.nameKh || "ដា រ៉ា"} (កូនកំលោះ)`, en: `${c.groom?.nameEn || "DA RAI"} (Groom)` },
        bank: "ABA PAY",
        accName: c.groom?.nameEn || "DA RAI",
        accNum: "000 123 456",
        qrType: "aba"
      }
    ]
  },

  // ==================================================================
  // ១០. រូបភាពចម្បង និងបទចម្រៀងកំដរ (Main Photos & Background Music)
  // ==================================================================
  archPhoto: formatImg(c.heroPhoto, "/images/3.jpg"), // រូបភាពក្លោងទ្វារផ្កា
  candlelightPhoto: null, // រូបភាពពន្លឺទៀនពេលរាត្រី (បើមាន)
  heroPhoto: formatImg(c.heroPhoto, "/images/3.jpg"), // រូបថតគូស្នេហ៍ផ្ទាំងធំខាងលើគេបង្អស់ (Hero Banner)
  music: "/audio/wedding-melody.mp3", // ផ្លូវឯកសារបទចម្រៀងកំដរ (នៅក្នុង public/audio/)
  siteUrl: "https://eii-invitation.vercel.app" // តំណភ្ជាប់គេហទំព័រធៀបការ
};
