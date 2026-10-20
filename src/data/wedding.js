/**
 * Wedding Information Configuration (ធៀបការឌីជីថល)
 */

export const weddingData = {
  couple: {
    groom: {
      km: "ទេព សុធា",
      en: "Tep Sothea",
      shortKm: "សុធា",
      shortEn: "Sothea",
      initialKm: "ស",
      initialEn: "S",
      roleKm: "កូនកំលោះ",
      roleEn: "Groom",
      photo: "/images/groom.jpg",
      parentHonorKm: "ជាកូនប្រុសរបស់ លោក ទេព សុខា និង លោកស្រី ម៉ៅ សុភី",
      parentHonorEn: "Son of Mr. Tep Sokha & Mrs. Mao Sophy",
      quoteKm: "«ខ្ញុំសន្យាថានឹងស្រឡាញ់ ការពារ និងមើលថែអូនអស់មួយជីវិត»",
      quoteEn: "“I promise to love, protect, and cherish you for all of our days.”"
    },
    bride: {
      km: "ចាយ វិច្ឆិកា",
      en: "Chay Vicheka",
      shortKm: "វិច្ឆិកា",
      shortEn: "Vicheka",
      initialKm: "វ",
      initialEn: "V",
      roleKm: "កូនក្រមុំ",
      roleEn: "Bride",
      photo: "/images/bride.jpg",
      parentHonorKm: "ជាកូនស្រីរបស់ លោក ចាយ គឹមហុង និង លោកស្រី ង៉ែត ស៊ីណា",
      parentHonorEn: "Daughter of Mr. Chay Kimhong & Mrs. Ngat Sina",
      quoteKm: "«ក្តីស្រឡាញ់ដ៏កក់ក្តៅរបស់បង ជាជម្រកដ៏មានសុភមង្គលបំផុតរបស់អូន»",
      quoteEn: "“In your gentle warmth, I found my forever home and true happiness.”"
    }
  },

  families: {
    groom: {
      father: {
        km: "លោក ទេព សុខា",
        en: "Mr. Tep Sokha"
      },
      mother: {
        km: "លោកស្រី ម៉ៅ សុភី",
        en: "Mrs. Mao Sophy"
      }
    },
    bride: {
      father: {
        km: "លោក ចាយ គឹមហុង",
        en: "Mr. Chay Kimhong"
      },
      mother: {
        km: "លោកស្រី ង៉ែត ស៊ីណា",
        en: "Mrs. Ngat Sina"
      }
    }
  },

  // Date and Time
  date: "2026-12-13T07:00:00+07:00",
  dateIsPlaceholder: false,
  lunar: {
    km: "ថ្ងៃអាទិត្យ ៤កើត ខែមិគសិរ ឆ្នាំមមី អដ្ឋស័ក ព.ស. ២៥៧០",
    en: "Sunday, 4th waxing day of Migasira, Year of the Horse, B.E. 2570"
  },

  venue: {
    name: {
      km: "គេហដ្ឋានខាងស្រី (រោងមង្គលជ័យ)",
      en: "The Bride's Residence (Victory Pavilion)"
    },
    address: {
      km: "ភូមិត្រពាំងក្រសាំង ឃុំត្រាំកក់ ស្រុកត្រាំកក់ ខេត្តតាកែវ",
      en: "Trapeang Krasang Village, Tram Kak Commune, Tram Kak District, Takeo Province"
    },
    lat: 11.0500,
    lng: 104.7500,
    mapsUrl: "https://maps.google.com/?q=11.0500,104.7500",
    embedMapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125345.234123!2d104.75!3d11.05!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDAzJzAwLjAiTiAxMDTCsDQ1JzAwLjAiRQ!5e0!3m2!1sen!2skh!4v1600000000000",
    note: {
      km: "សូមអញ្ជើញចូលរួមពិសាភោជនាហារ និងប្រសិទ្ធពរជ័យដោយមេត្រីភាព",
      en: "We warmly welcome your presence to celebrate and bless our union"
    }
  },

  contacts: [
    { label: "012 345 678 (ខាងកំលោះ)", tel: "+85512345678" },
    { label: "098 765 432 (ខាងក្រមុំ)", tel: "+85598765432" }
  ],

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

  story: [
    {
      year: "2021",
      dateKm: "ខែ វិច្ឆិកា ឆ្នាំ ២០២១",
      dateEn: "November 2021",
      titleKm: "ថ្ងៃជួបគ្នាដំបូង",
      titleEn: "First Encounter",
      descKm: "ស្នាមញញឹមដំបូងដែលបានជួបគ្នា បានបើកទំព័រថ្មីនៃមិត្តភាពដ៏កក់ក្តៅ និងរឿងរ៉ាវដ៏ស្រស់ស្អាតបំផុតក្នុងជីវិត។",
      descEn: "A chance encounter over a warm afternoon coffee that sparked conversations lasting well into the sunset.",
      photo: "/images/couple.jpg"
    },
    {
      year: "2024",
      dateKm: "ខែ ធ្នូ ឆ្នាំ ២០២៤",
      dateEn: "December 2024",
      titleKm: "ពាក្យសន្យានៅថ្ងៃលិច",
      titleEn: "The Sunset Proposal",
      descKm: "ក្រោមពន្លឺថ្ងៃលិចពណ៌មាសនៅលើកំពូលភ្នំ បងបានលុតជង្គង់សុំអូនរៀបការ ជាមួយនឹងពាក្យសន្យាថានឹងមើលថែអូនជារៀងរហូត។",
      descEn: "Surrounded by the breathtaking mountain peaks at golden hour, he knelt down with a promise of forever.",
      photo: "/images/story-proposal.jpg"
    },
    {
      year: "2026",
      dateKm: "ខែ ធ្នូ ឆ្នាំ ២០២៦",
      dateEn: "December 2026",
      titleKm: "ដំណើរឆ្ពោះទៅកាន់ថ្ងៃជ័យ",
      titleEn: "Walking Down the Aisle",
      descKm: "ថ្ងៃមង្គលដ៏ពិសិដ្ឋ ដែលពួកយើងរួមចិត្តជាតែមួយ ចាប់ដៃគ្នាសាងគ្រួសារពោរពេញដោយក្តីស្រឡាញ់ និងភាពកក់ក្តៅ។",
      descEn: "Together with our families and beloved friends, celebrating our union and the beginning of a lifelong journey.",
      photo: "/images/gallery-garden.jpg"
    }
  ],

  gallery: [
    { src: "/images/couple.jpg", alt: "Pre-wedding couple portrait" },
    { src: "/images/gallery-garden.jpg", alt: "Walking through floral arch" },
    { src: "/images/candlelight.jpg", alt: "Candlelight evening reflection" },
    { src: "/images/story-proposal.jpg", alt: "Sunset proposal moment" },
    { src: "/images/bride.jpg", alt: "Bride in traditional Khmer silk" },
    { src: "/images/groom.jpg", alt: "Groom in tailored ivory suit" }
  ],

  gift: {
    enabled: true,
    accounts: [
      {
        side: { km: "ចាយ វិច្ឆិកា (កូនក្រមុំ)", en: "Chay Vicheka (Bride)" },
        bank: "Bakong KHQR",
        accName: "CHAY VICHEKA",
        accNum: "098 765 432",
        qrType: "khqr"
      },
      {
        side: { km: "ទេព សុធា (កូនកំលោះ)", en: "Tep Sothea (Groom)" },
        bank: "ABA PAY",
        accName: "TEP SOTHEA",
        accNum: "000 123 456",
        qrType: "aba"
      }
    ]
  },

  archPhoto: "/images/couple.jpg",
  candlelightPhoto: "/images/candlelight.jpg",
  heroPhoto: "/images/couple.jpg",
  music: "/audio/wedding-melody.mp3",
  siteUrl: "https://theapka-wedding.vercel.app"
};
