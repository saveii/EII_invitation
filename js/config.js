/**
 * ====================================================================
 * ការកំណត់ទិន្នន័យកម្មវិធីមង្គលការ (Theapka Wedding Invitation Configuration)
 * ត្រូវគ្នានឹងគំរូរចនា ទេព សុធា & ចាយ វិច្ឆិកា
 * ====================================================================
 */

const DEFAULT_WEDDING_CONFIG = {
  // ព័ត៌មានទូទៅ
  groom: {
    nameKh: "ទេព សុធា",
    nameEn: "TEP SOTHEA",
    fatherKh: "លោក ទេព សុខា",
    motherKh: "លោកស្រី ម៉ៅ សុភី",
    roleKh: "កូនប្រុស",
    photo: "images/couple.jpg"
  },
  bride: {
    nameKh: "ចាយ វិច្ឆិកា",
    nameEn: "CHAY VICHEKA",
    fatherKh: "លោក ចាយ គឹមហុង",
    motherKh: "លោកស្រី ង៉ែត ស៊ីណា",
    roleKh: "កូនស្រី",
    photo: "images/couple.jpg"
  },

  // រូបថតគូស្នេហ៍ចម្បង (Hero Couple Photo)
  heroPhoto: "images/couple.jpg",

  // កាលបរិច្ឆេទកម្មវិធី
  eventDate: {
    targetDateTime: "2026-12-13T07:00:00",
    dateKhmer: "ថ្ងៃសុក្រ ទី ១៣ ខែ ធ្នូ ឆ្នាំ ២០២៤",
    dateSolar: "ត្រូវនឹងថ្ងៃទី ១៣ ខែធ្នូ ឆ្នាំ២០២៤",
    shortDate: "13 . 12 . 2024",
    isoDate: "2024-12-13"
  },

  // ទីតាំងកម្មវិធី
  venue: {
    name: "គេហដ្ឋានខាងស្រី",
    hall: "រោងមង្គលជ័យ",
    address: "ភូមិត្រពាំងក្រសាំង ឃុំត្រាំកក់ ស្រុកត្រាំកក់ ខេត្តតាកែវ",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3913.3456789!2d104.75!3d11.05!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDAzJzAwLjAiTiAxMDTCsDQ1JzAwLjAiRQ!5e0!3m2!1sen!2skh!4v1700000000000",
    googleMapDirectLink: "https://maps.google.com/?q=Tram+Kork+Takeo+Cambodia"
  },

  // កាលវិភាគកម្មវិធី (Schedule / Program ដូចក្នុងរូបទី ៤)
  schedule: [
    {
      id: "sch_1",
      time: "ម៉ោង 6:30 ព្រឹក",
      title: "ជួបជុំភ្ញៀវកិត្តិយស",
      description: "ជួបជុំភ្ញៀវកិត្តិយសរៀបចំពិធីហែជំនូនទៅគេហដ្ឋានខាងស្រី"
    },
    {
      id: "sch_2",
      time: "ម៉ោង 7:30 ព្រឹក",
      title: "ពិធីហែជំនូន",
      description: "ពិធីហែជំនូន ចូលរោងជ័យ និងអញ្ជើញភ្ញៀវកិត្តិយសពិសាអាហារពេលព្រឹក"
    },
    {
      id: "sch_3",
      time: "ម៉ោង 8:30 ព្រឹក",
      title: "ពិធីជូនបណ្ណាការ",
      description: "ពិធីជូនបណ្ណាការ ពិសាស្លា និងបំពាក់ចិញ្ចៀន"
    },
    {
      id: "sch_4",
      time: "ម៉ោង 8:40 ព្រឹក",
      title: "ពិធីកាត់សក់ បង្កក់សិរី",
      description: "ពិធីកាត់សក់ បង្កក់សិរី"
    },
    {
      id: "sch_5",
      time: "ម៉ោង 10:30 ព្រឹក",
      title: "ពិធីសែនដូនតា",
      description: "ពិធីសែនដូនតា"
    },
    {
      id: "sch_6",
      time: "ម៉ោង 12:00 ពេលថ្ងៃត្រង់",
      title: "ពិសាអាហារថ្ងៃត្រង់",
      description: "អញ្ជើញភ្ញៀវកិត្តិយសពិសាអាហារថ្ងៃត្រង់"
    },
    {
      id: "sch_7",
      time: "ម៉ោង 1:30 រសៀល",
      title: "ចម្រើនព្រះបរិត្ត",
      description: "និមន្តព្រះសង្ឃចម្រើនព្រះបរិត្ត"
    },
    {
      id: "sch_8",
      time: "ម៉ោង 5:00 ល្ងាច",
      title: "ពិធីពិសាភោជនាហារ",
      description: "អញ្ជើញភ្ញៀវកិត្តិយសពិសាភោជនាហារ"
    }
  ],

  // បញ្ជីភ្ញៀវកិត្តិយសគំរូ (ដូចក្នុងរូបទី ២)
  guests: [
    {
      id: "gst_1",
      name: "សម្ងាត់ ម៉ីន ស្រីមុំ",
      group: "ភ្ញៀវកូនក្រមុំ",
      side: "bride",
      phone: "012 345 678",
      pax: 2,
      hasGift: true,
      giftAmount: 60000,
      giftCurrency: "KHR"
    },
    {
      id: "gst_2",
      name: "ហ៊ឹម គឹមឡាង & ស្វាមី",
      group: "ភ្ញៀវកូនក្រមុំ",
      side: "bride",
      phone: "098 765 432",
      pax: 2,
      hasGift: true,
      giftAmount: 25,
      giftCurrency: "USD"
    },
    {
      id: "gst_3",
      name: "B Meas&Honey",
      group: "ភ្ញៀវកូនក្រមុំ",
      side: "bride",
      phone: "077 112 233",
      pax: 2,
      hasGift: true,
      giftAmount: 40,
      giftCurrency: "USD"
    },
    {
      id: "gst_4",
      name: "យ៉ែម សុវត្ថា & បងថ្លៃ",
      group: "ភ្ញៀវកូនក្រមុំ",
      side: "bride",
      phone: "089 998 877",
      pax: 2,
      hasGift: true,
      giftAmount: 30,
      giftCurrency: "USD"
    },
    {
      id: "gst_5",
      name: "លោក ចាន់ សុភា និងភរិយា",
      group: "ភ្ញៀវកូនកំលោះ",
      side: "groom",
      phone: "010 554 433",
      pax: 2,
      hasGift: false,
      giftAmount: 0,
      giftCurrency: "USD"
    },
    {
      id: "gst_6",
      name: "កញ្ញា រ័ត្ន សុធីតា",
      group: "មិត្តភក្តិ",
      side: "mutual",
      phone: "016 887 766",
      pax: 1,
      hasGift: false,
      giftAmount: 0,
      giftCurrency: "USD"
    }
  ],

  // បញ្ជីចំណងដៃគំរូ (ដូចក្នុងរូបទី ៣)
  gifts: [
    {
      id: "gft_1",
      guestName: "យ៉ង ពុទ្ធី (Yourng Puthy)",
      amount: 60000,
      currency: "KHR",
      method: "សាច់ប្រាក់",
      time: "26 ធ្នូ 2024, 5:24 ល្ងាច"
    },
    {
      id: "gft_2",
      guestName: "Yan Thona",
      amount: 25,
      currency: "USD",
      method: "KHQR",
      time: "26 ធ្នូ 2024, 5:23 ល្ងាច"
    },
    {
      id: "gft_3",
      guestName: "បងប្រុស ប៊ែន សុខាន&សោភា",
      amount: 40,
      currency: "USD",
      method: "KHQR",
      time: "26 ធ្នូ 2024, 5:23 ល្ងាច"
    },
    {
      id: "gft_4",
      guestName: "សូរិយា & កក្កដា",
      amount: 30,
      currency: "USD",
      method: "KHQR",
      time: "26 ធ្នូ 2024, 5:20 ល្ងាច"
    }
  ],

  // តន្ត្រីផ្ទៃក្រោយ (Background Music)
  music: {
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/05/16/audio_c97693510e.mp3?filename=romantic-wedding-114408.mp3",
    title: "Romantic Khmer Wedding Melody"
  },

  // រូបថត Pre-Wedding Gallery
  gallery: [
    {
      url: "images/couple.jpg",
      caption: "ស្នាមញញឹមដំបូងនៃក្តីស្រឡាញ់"
    },
    {
      url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop&q=80",
      caption: "ថ្ងៃដ៏មានសិរីសួស្តី"
    },
    {
      url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&auto=format&fit=crop&q=80",
      caption: "ដំណើរឆ្ពោះទៅកាន់អនាគតជាមួយគ្នា"
    },
    {
      url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&auto=format&fit=crop&q=80",
      caption: "ក្តីស្រឡាញ់ដែលមិនចេះរីងស្ងួត"
    }
  ],

  // គណនីទទួលចំណងដៃ / KHQR Gift
  khqr: {
    enabled: true,
    receiverName: "TEP SOTHEA & CHAY VICHEKA",
    bankName: "ABA Bank / Bakong KHQR",
    accountNumber: "001 234 567 (USD / KHR)",
    qrImageUrl: "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://bakong.nbc.org.kh",
    description: "សម្រាប់លោកអ្នកដែលមានបំណងចងដៃ ឬផ្ញើអំណោយតាមរយៈ KHQR"
  },

  rsvpEndpoint: "",
  isPostEvent: false,
  thankYouMessage: {
    title: "សូមថ្លែងអំណរគុណយ៉ាងជ្រាលជ្រៅ",
    description: "យើងខ្ញុំទាំងពីរព្រមទាំងក្រុមគ្រួសារទាំងសងខាង សូមថ្លែងអំណរគុណយ៉ាងជ្រាលជ្រៅបំផុតចំពោះវត្តមានដ៏ឧត្តុង្គឧត្តមរបស់ឯកឧត្តម លោកជំទាវ លោក លោកស្រី អ្នកនាងកញ្ញា ដែលបានអញ្ជើញចូលរួមជាសក្ខីភាព និងប្រសិទ្ធពរជ័យដល់យើងខ្ញុំ។"
  }
};
