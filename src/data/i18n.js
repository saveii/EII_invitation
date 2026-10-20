/**
 * i18n Translations and Date / Number formatters
 */

export const khmerNumerals = ['០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩'];

export const toKhmerNumber = (num) => String(num).replace(/[0-9]/g, (d) => khmerNumerals[d]);

export const khmerMonths = [
  'មករា', 'កុម្ភៈ', 'មីនា', 'មេសា', 'ឧសភា', 'មិថុនា',
  'កក្កដា', 'សីហា', 'កញ្ញា', 'តុលា', 'វិច្ឆិកា', 'ធ្នូ'
];

export const khmerWeekdays = [
  'អាទិត្យ', 'ច័ន្ទ', 'អង្គារ', 'ពុធ', 'ព្រហស្បតិ៍', 'សុក្រ', 'សៅរ៍'
];

export function parseDate(isoString) {
  const d = new Date(isoString);
  // UTC+7 offset calculation
  const target = new Date(d.getTime() + (420 + d.getTimezoneOffset()) * 60000);
  return {
    year: target.getFullYear(),
    month: target.getMonth(),
    day: target.getDate(),
    weekday: target.getDay(),
    hours: target.getHours(),
    minutes: target.getMinutes()
  };
}

export function formatDate(isoString, lang = 'km') {
  const dt = parseDate(isoString);
  if (lang === 'km') {
    const h12 = (dt.hours + 11) % 12 + 1;
    const period = dt.hours < 12 ? 'ព្រឹក' : dt.hours === 12 ? 'ថ្ងៃត្រង់' : dt.hours < 16 ? 'រសៀល' : dt.hours < 19 ? 'ល្ងាច' : 'យប់';
    return {
      weekday: `ថ្ងៃ${khmerWeekdays[dt.weekday]}`,
      weekdayShort: khmerWeekdays[dt.weekday],
      date: `ទី${toKhmerNumber(dt.day)} ខែ${khmerMonths[dt.month]} ឆ្នាំ${toKhmerNumber(dt.year)}`,
      time: `ម៉ោង ${toKhmerNumber(h12)}:${toKhmerNumber(String(dt.minutes).padStart(2, '0'))} ${period}`,
      short: `${toKhmerNumber(String(dt.day).padStart(2, '0'))} · ${toKhmerNumber(String(dt.month + 1).padStart(2, '0'))} · ${toKhmerNumber(dt.year)}`,
      day: toKhmerNumber(String(dt.day).padStart(2, '0')),
      month: khmerMonths[dt.month],
      year: toKhmerNumber(dt.year)
    };
  }

  const utc = new Date(Date.UTC(dt.year, dt.month, dt.day));
  const h12 = (dt.hours + 11) % 12 + 1;
  const period = dt.hours < 12 ? 'AM' : 'PM';
  return {
    weekday: utc.toLocaleDateString('en-GB', { weekday: 'long', timeZone: 'UTC' }),
    weekdayShort: utc.toLocaleDateString('en-GB', { weekday: 'short', timeZone: 'UTC' }),
    date: utc.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }),
    time: `${h12}:${String(dt.minutes).padStart(2, '0')} ${period}`,
    short: `${String(dt.day).padStart(2, '0')} · ${String(dt.month + 1).padStart(2, '0')} · ${dt.year}`,
    day: String(dt.day).padStart(2, '0'),
    month: utc.toLocaleDateString('en-GB', { month: 'short', timeZone: 'UTC' }),
    year: String(dt.year)
  };
}

export const messages = {
  km: {
    kicker: 'សិរីសួស្តីអាពាហ៍ពិពាហ៍',
    weddingInvitation: 'The Wedding Invitation',
    inviteTo: 'សូមគោរពអញ្ជើញ',
    guestFallback: 'ភ្ញៀវកិត្តិយស',
    tapSeal: 'សូមចុចលើត្រា ដើម្បីបើកធៀបការ',
    cardHonor: 'មានកិត្តិយសសូមគោរពអញ្ជើញ',
    cardBody: 'ឯកឧត្តម អ្នកឧកញ៉ា លោកជំទាវ លោក លោកស្រី អ្នកនាង កញ្ញា និង ប្រិយមិត្តអញ្ជើញចូលរួមជាអធិបតី និងជាភ្ញៀវកិត្តិយស ដើម្បីប្រសិទ្ធពរជ័យសិរីសួស្តី ជ័យមង្គលក្នុង ពិធីរៀបអាពាហ៍ពិពាហ៍ កូនប្រុស-ស្រី របស់យើងខ្ញុំ',
    cardSon: 'កូនប្រុសនាម',
    cardDaughter: 'កូនស្រីនាម',
    cardWhen: 'ពិសាភោជនាហារប្រព្រឹត្តនៅ ថ្ងៃអាទិត្យ ៤កើត ខែមិគសិរ ឆ្នាំមមី អដ្ឋស័ក ព.ស. ២៥៧០ ត្រូវនឹងថ្ងៃ ទី១៣ ខែធ្នូ ឆ្នាំ២០២៦ វេលាម៉ោង ៥:០០ ល្ងាច ស្ថិតនៅគេហដ្ឋានខាងស្រី ភូមិត្រពាំងក្រសាំង ឃុំត្រាំកក់ ស្រុកត្រាំកក់ ខេត្តតាកែវ ដោយមេត្រីភាព។ សូមអរគុណ!',
    groomLabel: 'កូនកំលោះ',
    brideLabel: 'កូនក្រមុំ',
    groomParents: 'មាតាបិតាកូនកំលោះ',
    brideParents: 'មាតាបិតាកូនក្រមុំ',
    sonOf: 'កូនប្រុសរបស់',
    daughterOf: 'កូនស្រីរបស់',
    and: 'និង',
    coupleKicker: 'កូនកំលោះ និង កូនក្រមុំ',
    countdownKicker: 'រាប់ថយក្រោយ ឆ្ពោះទៅថ្ងៃមង្គល',
    days: 'ថ្ងៃ',
    hours: 'ម៉ោង',
    minutes: 'នាទី',
    seconds: 'វិនាទី',
    today: 'ថ្ងៃនេះ ជាថ្ងៃមង្គលការ',
    blessing: 'សូមឱ្យគូស្វាមីភរិយាថ្មី ជួបតែសេចក្តីសុខ សុភមង្គល និងស្រឡាញ់គ្នារហូតដល់ចាស់ជរា',
    programmeKicker: 'កម្មវិធី',
    programmeTitle: 'លំដាប់ពិធីសិរីមង្គល',
    programmeCardTitle: 'កម្មវិធីសិរីមង្គលអាពាហ៍ពិពាហ៍',
    timeWord: 'ម៉ោង',
    storyKicker: 'ពីពេលព្រឹក ដល់ពេលល្ងាច',
    storyTitle: 'ដំណើររឿងនៃស្នេហ៍',
    storyHint: 'រំកិលដើម្បីទស្សនា',
    pondKicker: 'ក្រោមពន្លឺភ្លើងទៀន',
    pondLine: 'សូមប៉ះលើផ្ទៃទឹក ដើម្បីបណ្ដែតប្រទីបក្ដីប្រាថ្នា',
    galleryKicker: 'វិចិត្រសាលរូបភាព',
    galleryTitle: 'អនុស្សាវរីយ៍មុនថ្ងៃមង្គល',
    venueKicker: 'ទីកន្លែងប្រារព្ធពិធី',
    openMap: 'បើកផែនទី Google',
    addCalendar: 'កត់ចំណាំក្នុងប្រតិទិន',
    contactTitle: 'លេខម្ចាស់កម្មវិធីការ',
    houseLabel: 'ផ្ទះកម្មវិធី',
    mapKicker: 'ផែនទីទៅកាន់ទីកន្លែង',
    giftKicker: 'ចំណងដៃ',
    giftNote: 'វត្តមានរបស់លោកអ្នក គឺជាកាដូដ៏មានតម្លៃបំផុត។ សម្រាប់អ្នកដែលមានបំណងចងដៃ ឬផ្ញើអំណោយ អាចផ្ញើតាមរយៈ KHQR។',
    saveQr: 'រក្សាទុករូប QR',
    thanks: 'សូមអរគុណ',
    thanksLine: 'យើងខ្ញុំសូមថ្លែងអំណរគុណយ៉ាងជ្រាលជ្រៅបំផុត ចំពោះវត្តមានដ៏ឧត្តុង្គឧត្តម និងពរជ័យដ៏ថ្លៃថ្លារបស់លោកអ្នក',
    shareVia: 'ផ្ញើតាម',
    copyLinkSmall: 'ចម្លង',
    copyLink: 'តំណភ្ជាប់',
    copied: 'បានចម្លងតំណភ្ជាប់',
    dayLabel: 'ថ្ងៃ',
    dateLabel: 'ទី',
    monthLabel: 'ខែ',
    yearLabel: 'ឆ្នាំ',
    scrollOpen: 'សូមរំកិលចុះ ដើម្បីទស្សនាធៀបការ',
    location: 'ទីតាំង',
    dateTbc: '* កាលបរិច្ឆេទកំពុងរង់ចាំការបញ្ជាក់'
  },
  en: {
    kicker: "We're getting married",
    weddingInvitation: 'The Wedding Invitation',
    inviteTo: 'Request the Honor of Your Presence',
    guestFallback: 'Our Honoured Guest',
    tapSeal: 'Tap the wax seal to open the invitation',
    cardHonor: 'Request the Honor of Your Presence',
    cardBody: 'on the Auspicious Occasion of the Wedding Reception of our Children to bestow your blessings upon the newlyweds',
    cardSon: 'Our son',
    cardDaughter: 'Our daughter',
    cardWhen: 'Which will be held on Sunday, 13 December 2026, 5:00 PM, at The Bride’s House, Trapeang Krasang Village, Tram Kak Commune, Tram Kak District, Takeo Province. Thank you!',
    groomLabel: 'The Groom',
    brideLabel: 'The Bride',
    groomParents: 'Parents of the Groom',
    brideParents: 'Parents of the Bride',
    sonOf: 'Son of',
    daughterOf: 'Daughter of',
    and: '&',
    coupleKicker: 'The Groom & The Bride',
    countdownKicker: 'Counting Down to the Big Day',
    days: 'Days',
    hours: 'Hours',
    minutes: 'Minutes',
    seconds: 'Seconds',
    today: 'Today is our Wedding Day!',
    blessing: 'May love, peace and everlasting happiness be with the newly wedded couple',
    programmeKicker: 'Programme',
    programmeTitle: 'Order of Ceremonies',
    programmeCardTitle: 'Wedding Ceremony Programme',
    timeWord: '',
    storyKicker: 'From Morning to Twilight',
    storyTitle: 'Our Love Story',
    storyHint: 'Scroll to explore',
    pondKicker: 'Candlelight Reflection',
    pondLine: 'Touch the water to float a lantern of love and wishes',
    galleryKicker: 'Gallery',
    galleryTitle: 'Pre-Wedding Memories',
    venueKicker: 'The Venue',
    openMap: 'Open in Google Maps',
    addCalendar: 'Save to Calendar',
    contactTitle: 'Host Contact Numbers',
    houseLabel: 'Wedding Venue',
    mapKicker: 'Map to the Venue',
    giftKicker: 'Wedding Gift',
    giftNote: 'Your presence is our greatest gift. For loved ones who wish to bestow blessings from afar, gifts can be sent via KHQR.',
    saveQr: 'Save QR Image',
    thanks: 'Thank You',
    thanksLine: 'With heartfelt gratitude for your gracious presence and heartfelt blessings',
    shareVia: 'Share via',
    copyLinkSmall: 'Copy',
    copyLink: 'Link',
    copied: 'Link copied to clipboard',
    dayLabel: 'Day',
    dateLabel: 'Date',
    monthLabel: 'Month',
    yearLabel: 'Year',
    scrollOpen: 'Scroll to explore the invitation',
    location: 'Venue',
    dateTbc: '* Date to be confirmed'
  }
};
