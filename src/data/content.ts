export interface MemoryItem {
  id: number;
  imageUrl: string;
  title?: string;
  caption?: string;
  tag?: string;
}

export interface BirthdayContent {
  recipient: {
    name: string;
    nickname: string;
    senderName: string;
  };
  intro: {
    badge: string;
    greeting: string;
    paragraphs: string[];
    buttonText: string;
  };
  envelope: {
    badge: string;
    title: string;
    paragraphs: string[];
    sealText: string;
    smallText?: string;
    footerNote: string;
  };
  memories: {
    badge: string;
    title: string;
    smallHeading?: string;
    paragraphs: string[];
    bottomText?: string;
    items: MemoryItem[];
  };
  song: {
    badge: string;
    title: string;
    paragraphs: string[];
    songTitle: string;
    subtitle?: string;
    artist?: string;
    albumArt: string;
    audioUrl?: string;
  };
  birthday: {
    badge: string;
    title: string;
    paragraphs: string[];
    wishHighlight: string;
    cakePrompt: string;
    cakeBlownText: string;
  };
  specialNote: {
    badge: string;
    title: string;
    paragraphs: string[];
    signOff: string;
  };
  finalScreen: {
    title: string;
    paragraphs: string[];
    closingLines?: string[];
    signature?: string;
    surpriseButtonText: string;
    surprisePopup: {
      title: string;
      paragraphs: string[];
      emoji: string;
    };
  };
}

export const BIRTHDAY_DATA: BirthdayContent = {
  recipient: {
    name: "Padips",
    nickname: "Padips",
    senderName: "Deepak",
  },
  intro: {
    badge: "A Special Birthday Surprise ✨",
    greeting: "Heyy Padips 🩷",
    paragraphs: [
      "Enna idhu nu yosikaadha 😂",
      "Unakkaga oru chinna surprise panna try panniruken. 🫶",
      "Birthday appove send pannanum nu romba nenachen…\nKonjam late aayiduchu… but unakkaga pannadhu dhaan. ❤️",
      "So ippo nee inga vandhuta…\nfull-ah open panni paaru 👀😂",
    ],
    buttonText: "Open pannuu 👀",
  },
  envelope: {
    badge: "💌 A Letter For You 💗",
    title: "Unakkaga dhaan idhu ❤️",
    paragraphs: [
      "Heyy Padips ❤️",
      "Namma first time pesunadhe un birthday-ku wish pannithaan. 😂",
      "Appo just oru simple birthday wish dhaan…\naana adhu ivlo special-aana friendship-ku starting point aagum nu naan nenachadhe illa. 🥹",
      "Konjam konjam-ah pesinom…\nrandom talks, kalaaichadhu, sirichadhu, sanda, silly moments nu\ntheriyamaave namma romba close aayitom. ❤️",
      "Unakku naan eppadi feel panren nu maybe sometimes en words-la proper-ah sollirukka maaten…\nbut nee enakku romba special. 🫶",
      "Nee en life-la occupy panra place mattum romba special. ❤️",
      "Un mela enakku irukra care, respect, affection…\nidhellam just words-la explain panna mudiyadhu.",
      "I genuinely care about you, Padips. 🥹❤️",
      "And honestly, nee en life-la vandhadhu enakku romba happy-aana oru thing.",
      "So indha birthday-la naan wish panradhu onnu dhaan…",
      "nee eppavume happy-ah irukkanum, un smile apdiye irukkanum, unakku pidichadhellam nadakkanum. ✨❤️",
      "And one more thing… 🥹",
      "Naan konjam pesama irundhaalum, adha thappa eduthukaadha.\nUnna disturb panna koodadhu nu dhaan sometimes naan konjam back-a iruppen. ❤️",
      "Nee enakku oru gem maari. 🫶",
      "Un maari oru friend marupadiyum kedaippangala nu enakku theriyadhu…\nadhaan namma friendship enakku ivlo special.",
      "Happy Birthday once again, Padips! 🎂🫶",
      "And thank you…",
      "for becoming such a special part of my life. ❤️",
    ],
    sealText: "Tap to Open Letter 💌",
    smallText: "Oru small letter waiting for you ✨",
    footerNote: "Scroll down for more memories ↓",
  },
  memories: {
    badge: "Captured Moments 📸",
    title: "Konjam memories 📸",
    smallHeading: "Perusa edhuvum illa…",
    paragraphs: [
      "Aana namma pesuna sila random conversations kooda ippo nenacha sirippu varudhu 😂",
      "Sila moments romba small-ah irukkum…\nappo adhu perusa theriyadhu.",
      "Aana later thirumbi nenacha,\nadhu dhaan nalla memories-ah irukkum. 😌❤️",
      "Namma kooda apdi dhaan…\nperusa edhuvum illa nu nenacha moments dhaan,\nippo romba special-ah feel aagudhu. 🫶",
    ],
    items: [
      { id: 1, imageUrl: "/memory_1.jpg" },
      { id: 2, imageUrl: "/memory_2.jpg" },
      { id: 3, imageUrl: "/memory_3.jpg" },
      { id: 4, imageUrl: "/memory_4.jpg" },
      { id: 5, imageUrl: "/memory_5.jpg" },
      { id: 6, imageUrl: "/memory_6.jpg" },
    ],
  },
  song: {
    badge: "🎧 Melody Corner 🎶",
    title: "Oru song unakkaga 🎧",
    paragraphs: [
      "Unna nenacha indha song dhaan nyabagam varudhu nu illa 😂",
      "Aana unakkaga oru song vechuruken. ❤️",
      "Indha song kekkumbodhu,\nsila lyrics namma friendship-a nyabagam paduthudhu. 🥹",
      "Adhaan unakkaga indha song vechuruken. 🫶",
      "Headphones potu kelu…\nkonjam calm-ah enjoy pannu. 😌❤️",
    ],
    songTitle: "Mudhal Nee Mudivum Nee 🎶",
    subtitle: "Unakkaga indha song ❤️",
    albumArt: "/album_collage.jpg",
    audioUrl: "/song.mp3",
  },
  birthday: {
    badge: "The Big Moment 🎂",
    title: "Happy Birthdayyy Padips! 🥳❤️",
    paragraphs: [
      "Un birthday-ku enna wish panradhu nu yosichen...",
      "Perusa edhuvum solla theriyala 😂",
      "Nee eppavume happy ah irukanum,\nunakku pidichadhellam nadakanum,\nnalla nalla opportunities kedaikanum,\nlife la semma success varanum ✨",
      "Mukkiyama...\nippo irukra maariye iru 😌❤️",
      "Romba maaridatha 😂",
      "Once again,\nHappy Birthdayyy! 🎂🥳❤️",
    ],
    wishHighlight: "Make a wish & tap the candles to blow! 🕯️✨",
    cakePrompt: "Tap the candle to blow out and make a wish 🎂",
    cakeBlownText: "Yayyy! May all your wishes come true! 🎉✨",
  },
  specialNote: {
    badge: "Heart to Heart 💖",
    title: "One small note 🫶",
    paragraphs: [
      "Seri... ivlo dhaan 😂",
      "Namma friendship enakku romba special.\nAdha epdi explain panradhu nu enakku theriyadhu...",
      "But nee enakku oru nalla friend mattum illa,\nkonjam special-aana friend 😌❤️",
      "Idha paathu konjamachu smile pannina podhum 😂🫶",
    ],
    signOff: "Always grateful for our friendship 💫",
  },
  finalScreen: {
    title: "Nee yen life-la kedacha oru friend mattum illa… oru gem. 🥹🫶",
    paragraphs: [
      "Inime en life-la evlo friends varuvanganu enakku theriyadhu…\naana nee occupy panra place-a yaaralayum replace panna mudiyadhu. ❤️",
      "Thiruvum Shobana-vum eppadi oru special bond-o…\nadhe maari dhaan nee enakku. 🥹❤️",
      "Namma friendship-ku enna peru vechurundhaalum sari,\nenakku nee eppavume oru special person-ah dhaan iruppa.",
      "Naan pesama konjam distance-la irundhaalum,\nnee happy-ah irundha adhuve enakku podhum. 🫶",
      "Un happiness dhaan mukkiyam.\nNaan irundhaalum, konjam pesama irundhaalum…\nnee nalla irukkanum. ❤️",
      "Maybe idhellam konjam emotional-ah irukkalam… 🥹\nbut idhu dhaan naan unakkitta sollanum nu nenacha unmaiyana feeling. 🫶❤️",
    ],
    closingLines: [
      "Okay… bye 🥹❤️",
      "Thankyouu for being a gem. 🫶",
      "Always be happy, Padips. ❤️✨",
    ],
    surpriseButtonText: "One More Surprise 👀",
    surprisePopup: {
      title: "Okay okay... ivlo dhaan 😂❤️",
      paragraphs: [
        "Hope I made you smile at least for a few seconds.",
        "Happy Birthday once again, Padips! 🎂✨",
      ],
      emoji: "🥳🎁💖",
    },
  },
};
