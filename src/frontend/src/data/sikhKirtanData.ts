// sikhKirtanData.ts
// Additional Sikh Kirtan/Nitnem entries using the EXISTING SikhKirtanEntry interface
// from sikhKirtansData.ts (which uses: id, title, titleGurmukhi, description,
// gurmukhi, romanTransliteration, englishMeaning, type, audioCredit)
//
// SikhKirtans.tsx already imports from sikhKirtansData.ts.
// This file can be merged into sikhKirtansData.ts by the admin, or
// imported into a new combined export.

import type { SikhKirtanEntry } from "./sikhKirtansData";

export const sikhKirtanNewBatch: SikhKirtanEntry[] = [
  {
    id: "japji-sahib-full",
    title: "Japji Sahib (Full)",
    titleGurmukhi: "ਜਪੁਜੀ ਸਾਹਿਬ",
    description:
      "Japji Sahib is the opening composition of the Sri Guru Granth Sahib Ji, composed by Guru Nanak Dev Ji. It begins with the Mool Mantar and contains 38 pauris (stanzas) plus a final shloka. It is recited every morning as part of Nitnem.",
    gurmukhi: `ੴ ਸਤਿ ਨਾਮੁ ਕਰਤਾ ਪੁਰਖੁ ਨਿਰਭਉ ਨਿਰਵੈਰੁ ਅਕਾਲ ਮੂਰਤਿ ਅਜੂਨੀ ਸੈਭੰ ਗੁਰ ਪ੍ਰਸਾਦਿ ॥
॥ ਜਪੁ ॥

ਆਦਿ ਸਚੁ ਜੁਗਾਦਿ ਸਚੁ ॥
ਹੈ ਭੀ ਸਚੁ ਨਾਨਕ ਹੋਸੀ ਭੀ ਸਚੁ ॥੧॥

ਸੋਚੈ ਸੋਚਿ ਨ ਹੋਵਈ ਜੇ ਸੋਚੀ ਲਖ ਵਾਰ ॥
ਚੁਪੈ ਚੁਪ ਨ ਹੋਵਈ ਜੇ ਲਾਇ ਰਹਾ ਲਿਵ ਤਾਰ ॥
ਭੁਖਿਆ ਭੁਖ ਨ ਉਤਰੀ ਜੇ ਬੰਨਾ ਪੁਰੀਆ ਭਾਰ ॥
ਸਹਸ ਸਿਆਣਪਾ ਲਖ ਹੋਹਿ ਤ ਇਕ ਨ ਚਲੈ ਨਾਲਿ ॥
ਕਿਵ ਸਚਿਆਰਾ ਹੋਈਐ ਕਿਵ ਕੂੜੈ ਤੁਟੈ ਪਾਲਿ ॥
ਹੁਕਮਿ ਰਜਾਈ ਚਲਣਾ ਨਾਨਕ ਲਿਖਿਆ ਨਾਲਿ ॥੧॥

ਹੁਕਮੀ ਹੋਵਨਿ ਆਕਾਰ ਹੁਕਮੁ ਨ ਕਹਿਆ ਜਾਈ ॥
ਹੁਕਮੀ ਹੋਵਨਿ ਜੀਅ ਹੁਕਮਿ ਮਿਲੈ ਵਡਿਆਈ ॥
ਹੁਕਮੀ ਉਤਮੁ ਨੀਚੁ ਹੁਕਮਿ ਲਿਖਿ ਦੁਖ ਸੁਖ ਪਾਈਅਹਿ ॥
ਇਕਨਾ ਹੁਕਮੀ ਬਖਸੀਸ ਇਕਿ ਹੁਕਮੀ ਸਦਾ ਭਵਾਈਅਹਿ ॥
ਹੁਕਮੈ ਅੰਦਰਿ ਸਭੁ ਕੋ ਬਾਹਰਿ ਹੁਕਮ ਨ ਕੋਇ ॥
ਨਾਨਕ ਹੁਕਮੈ ਜੇ ਬੁਝੈ ਤ ਹਉਮੈ ਕਹੈ ਨ ਕੋਇ ॥੨॥

[ਬਾਕੀ ੩੮ ਪਉੜੀਆਂ — Admin CMS ਦੁਆਰਾ ਭਰੀਆਂ ਜਾਣਗੀਆਂ]`,
    romanTransliteration: `Ik Onkar Sat Nam Karta Purakh Nirbhau Nirvair Akal Murat Ajuni Saibhang Gur Prasad.
|| Jap ||

Aad sach jugaad sach.
Hai bhi sach Nanak hosi bhi sach. ||1||

Sochai soch na hovai je sochi lakh vaar.
Chupai chup na hovai je laai raha liv taar.
Bhukhi-aa bhukh na utri je bannaa puri-aa bhaar.
Sahas si-aanapaa lakh hohi ta ik na chalai naal.
Kiv sachi-aaraa ho-ee-ai kiv koorai tutai paal.
Hukam rajaa-ee chalnaa Nanak likhi-aa naal. ||1||

Hukmi hovan aakaar hukam na kahi-aa jaa-ee.
Hukmi hovan jee-a hukam milai vadi-aa-ee.
Hukmi utam neech hukam likh dukh sukh paa-ee-ah.
Iknaa hukmi bakhsees ik hukmi sadaa bhavaa-ee-ah.
Hukmai andar sabh ko baahar hukam na ko-e.
Nanak hukmai je bujhai ta ha-umai kahai na ko-e. ||2||

[Remaining 38 pauris — to be filled via Admin CMS]`,
    englishMeaning: `One Universal Creator God. Truth Is The Name. Creative Being Personified. No Fear. No Hatred. Image Of The Undying. Beyond Birth. Self-Existent. By Guru's Grace.
|| Chant And Meditate: ||

True In The Primal Beginning. True Throughout The Ages.
True Here And Now. O Nanak, Forever And Ever True. ||1||

By thinking, He cannot be reduced to thought, even by thinking hundreds of thousands of times.
By remaining silent, inner silence is not obtained, even by remaining lovingly absorbed deep within.
The hunger of the hungry is not appeased, even by piling up loads of worldly goods.
Hundreds of thousands of clever tricks, but not even one of them will go along with you in the end.
So how can you become truthful? And how can the veil of illusion be torn away?
O Nanak, it is written that you shall obey the Hukam of His Command, and walk in the Way of His Will. ||1||

By His Command, bodies are created; His Command cannot be described.
By His Command, souls come into being; by His Command, glory and greatness are obtained.
By His Command, some are high and some are low; by His Written Command, pain and pleasure are obtained.
Some, by His Command, are blessed and forgiven; others, by His Command, wander aimlessly forever.
Everyone is subject to His Command; no one is beyond His Command.
O Nanak, one who understands His Command, does not speak in ego. ||2||

[Remaining 38 stanzas — to be filled via Admin CMS]`,
    type: "nitnem",
    audioCredit: "Gurbani Academy",
  },
  {
    id: "rehras-sahib",
    title: "Rehras Sahib (Evening Prayer)",
    titleGurmukhi: "ਰਹਰਾਸਿ ਸਾਹਿਬ",
    description:
      "Rehras Sahib is the evening prayer (Nitnem) of the Sikhs, recited at sunset. It contains shabads from Guru Nanak Dev Ji, Guru Amar Das Ji, Guru Ram Das Ji, Guru Arjan Dev Ji, and Guru Gobind Singh Ji. It expresses gratitude for the day and seeks the Lord's protection through the night.",
    gurmukhi: `ਸੋਦਰੁ ਰਹਰਾਸਿ ਸਾਹਿਬ ॥

ਸੋ ਦਰੁ ਕੇਹਾ ਸੋ ਘਰੁ ਕੇਹਾ ਜਿਤੁ ਬਹਿ ਸਰਬ ਸਮਾਲੇ ॥
ਵਾਜੇ ਨਾਦ ਅਨੇਕ ਅਸੰਖਾ ਕੇਤੇ ਵਾਵਣਹਾਰੇ ॥
ਕੇਤੇ ਰਾਗ ਪਰੀ ਸਿਉ ਕਹੀਅਹਿ ਕੇਤੇ ਗਾਵਣਹਾਰੇ ॥

ਗਾਵਹਿ ਤੁਹਨੋ ਪਉਣੁ ਪਾਣੀ ਬੈਸੰਤਰੁ ਗਾਵੈ ਰਾਜਾ ਧਰਮੁ ਦੁਆਰੇ ॥
ਗਾਵਹਿ ਚਿਤੁ ਗੁਪਤੁ ਲਿਖਿ ਜਾਣਹਿ ਲਿਖਿ ਲਿਖਿ ਧਰਮੁ ਵੀਚਾਰੇ ॥

ਆਸਾ ਮਹਲਾ ੧ ॥

ਤਿਤੁ ਸਰਵਰੜੈ ਭਈਲੇ ਨਿਵਾਸਾ ਪਾਣੀ ਪਾਵਕੁ ਤਿਨਹਿ ਕੀਆ ॥
ਪੰਕਜੁ ਮੋਹੁ ਪਗੁ ਨਹੀ ਚਾਲੈ ਹਮ ਦੇਖਾ ਤਹ ਡੂਬੀਅਲੇ ॥੧॥

[ਬਾਕੀ ਸ਼ਬਦ — Admin CMS ਦੁਆਰਾ ਭਰੇ ਜਾਣਗੇ]`,
    romanTransliteration: `So Dar Rehraas Sahib.

So dar kehaa so ghar kehaa jit behi sarab samaalay.
Vaaje naad anek asankhaa kete vaavan-haare.
Kete raag paree sio kahee-ah kete gaavan-haare.

Gaaveh tuhanno pa-un paanee baisantar gaavai raajaa dharam du-aarey.
Gaaveh chit gupat likh jaaneh likh likh dharam veechaarey.

Aasaa Mehlaa 1.

Tit saravrrhai bha-eelay nivaasaa paanee paavak tineh kee-aa.
Pankaj moh pag nahee chaalai ham daykhaa tah doobee-alay. ||1||

[Remaining shabads — to be filled via Admin CMS]`,
    englishMeaning: `So Dar Rehraas Sahib.

What is that Gate, and what is that Home, in which You sit and take care of all?
The Sound-current of the Naad vibrates there, and countless musicians play on all sorts of instruments there.
So many Ragas, so many musicians singing there — so many, they cannot be counted.

The wind, water and fire sing; the Righteous Judge of Dharma sings at Your Door.
Chitr and Gupt, the angels of the conscious and the subconscious who record actions, sing; they sing, and they record the accounts of actions and reflect upon them.

Aasaa, First Mehl.

Those who have been living in the world-ocean — they made their homes in it, with water and fire.
The swamp of Maya stuck to their feet; they could not walk. We behold them sinking there. ||1||

[Remaining shabads — to be filled via Admin CMS]`,
    type: "nitnem",
    audioCredit: "Gurbani Academy",
  },
  {
    id: "kirtan-sohila",
    title: "Kirtan Sohila (Bedtime Prayer)",
    titleGurmukhi: "ਕੀਰਤਨੁ ਸੋਹਿਲਾ",
    description:
      "Kirtan Sohila is the evening/bedtime prayer (Nitnem) of the Sikhs, recited before sleeping. It contains 5 shabads — 3 by Guru Nanak Dev Ji, 1 by Guru Ram Das Ji, and 1 by Guru Arjan Dev Ji. It is also recited at funeral ceremonies.",
    gurmukhi: `ਕੀਰਤਨੁ ਸੋਹਿਲਾ ਰਾਗੁ ਗਉੜੀ ਦੀਪਕੀ ਮਹਲਾ ੧ ॥

ਜੈ ਘਰਿ ਕੀਰਤਿ ਆਖੀਐ ਕਰਤੇ ਕਾ ਹੋਇ ਬੀਚਾਰੋ ॥
ਤਿਤੁ ਘਰਿ ਗਾਵਹੁ ਸੋਹਿਲਾ ਸਿਵਰਿਹੁ ਸਿਰਜਣਹਾਰੋ ॥੧॥

ਤੁਮ ਗਾਵਹੁ ਮੇਰੇ ਨਿਰਭਉ ਕਾ ਸੋਹਿਲਾ ॥
ਹਉ ਵਾਰੀ ਜਿਤੁ ਸੋਹਿਲੈ ਸਦਾ ਸੁਖੁ ਹੋਇ ॥੧॥ ਰਹਾਉ ॥

ਨਿਤ ਨਿਤ ਜੀਅੜੇ ਸਮਾਲੀਅਨਿ ਦੇਖੈਗਾ ਦੇਵਣਹਾਰੁ ॥
ਤੇਰੇ ਦਾਨੈ ਕੀਮਤਿ ਨਾ ਪਵੈ ਤਿਸੁ ਦਾਤੇ ਕਵਣੁ ਸੁਮਾਰੁ ॥੨॥

[ਬਾਕੀ ੪ ਸ਼ਬਦ — Admin CMS ਦੁਆਰਾ ਭਰੇ ਜਾਣਗੇ]`,
    romanTransliteration: `Kirtan Sohilaa Raag Ga-orhee Deepkee Mehlaa 1.

Jai ghar keerat aakhee-ai kartay kaa ho-ay beechaaro.
Tit ghar gaavhu sohilaa sivrihu sirjanhaaro. ||1||

Tum gaavhu mayray nirbha-o kaa sohilaa.
Ha-o vaaree jit sohilai sadaa sukh ho-ay. ||1|| Rahaa-o.

Nit nit jee-arhay samaalee-an daykhaigaa dayvan-haar.
Tayray daanai keemat naa pavai tis daatay kavan sumaar. ||2||

[Remaining 4 shabads — to be filled via Admin CMS]`,
    englishMeaning: `Kirtan Sohilaa — Raag Gaurhee Deepkee, First Mehl.

In that house where the Praises of the Creator are chanted and contemplated —
In that house, sing Songs of Praise; meditate and remember the Creator Lord. ||1||

Sing, O my fearless Lord's Praises.
I am a sacrifice to that song of praise which brings everlasting peace. ||1||Pause||

Day after day, He takes care of His beings; the Great Giver watches over all.
Your bounty cannot be appraised; You are such a Great Giver — what account can be given of You? ||2||

[Remaining 4 shabads — to be filled via Admin CMS]`,
    type: "nitnem",
    audioCredit: "Gurbani Academy",
  },
  {
    id: "anand-sahib",
    title: "Anand Sahib (Bliss Prayer)",
    titleGurmukhi: "ਅਨੰਦੁ ਸਾਹਿਬ",
    description:
      "Anand Sahib was composed by Guru Amar Das Ji (Third Guru) and is found in the Sri Guru Granth Sahib Ji. It contains 40 stanzas and is recited during major Gurdwara ceremonies including Anand Karaj (Sikh wedding). It describes the bliss of union with the Divine.",
    gurmukhi: `ਅਨੰਦੁ ਸਾਹਿਬ ਰਾਮਕਲੀ ਮਹਲਾ ੩ ਅਨੰਦੁ ॥

ਅਨੰਦੁ ਭਇਆ ਮੇਰੀ ਮਾਏ ਸਤਿਗੁਰੂ ਮੈ ਪਾਇਆ ॥
ਸਤਿਗੁਰੁ ਤ ਪਾਇਆ ਸਹਜ ਸੇਤੀ ਮਨਿ ਵਜੀਆ ਵਾਧਾਈਆ ॥
ਰਾਗ ਰਤਨ ਪਵਾਰ ਪਰੀਆ ਸਬਦ ਗਾਵਣ ਆਈਆ ॥
ਸਬਦੋ ਤ ਗਾਵਹੁ ਹਰੀ ਕੇਰਾ ਮਨਿ ਜਿਨੀ ਵਸਾਇਆ ॥
ਕਹੈ ਨਾਨਕੁ ਅਨੰਦੁ ਹੋਆ ਸਤਿਗੁਰੂ ਮੈ ਪਾਇਆ ॥੧॥

ਏ ਮਨ ਮੇਰਿਆ ਤੂ ਸਦਾ ਰਹੁ ਹਰਿ ਨਾਲੇ ॥
ਹਰਿ ਨਾਲਿ ਰਹੁ ਤੂ ਮੰਨ ਮੇਰੇ ਦੂਖ ਸਭਿ ਵਿਸਾਰਣਾ ॥
ਅੰਗੀਕਾਰੁ ਓਹੁ ਕਰੇ ਤੇਰਾ ਕਾਰਜ ਸਭਿ ਸਵਾਰਣਾ ॥
ਸਭਨਾ ਗਲਾ ਸਮਰਥੁ ਸੁਆਮੀ ਸੋ ਕਿਉ ਮਨਹੁ ਵਿਸਾਰੇ ॥
ਕਹੈ ਨਾਨਕੁ ਮੰਨ ਮੇਰੇ ਸਦਾ ਰਹੁ ਹਰਿ ਨਾਲੇ ॥੨॥

[ਬਾਕੀ ੩੮ ਪਉੜੀਆਂ — Admin CMS ਦੁਆਰਾ ਭਰੀਆਂ ਜਾਣਗੀਆਂ]`,
    romanTransliteration: `Anand Sahib Raamkalee Mehlaa 3 Anand.

Anand bha-i-aa mayree maa-ay satguroo mai paa-i-aa.
Satgur ta paa-i-aa sahj saytee man vajee-aa vaaDhaa-ee-aa.
Raag ratan pavaar paree-aa sabad gaavan aa-ee-aa.
Sabdo ta gaavahu haree kayraa man jinee vasaa-i-aa.
Kahai Naanak anand ho-aa satguroo mai paa-i-aa. ||1||

Ay man mayri-aa too sadaa rahu har naalay.
Har naal rahu too mann mayray dookh sabh visaaranaa.
Angeekar oh karay tayraa kaaraj sabh savaaranaa.
Sabhnaa galaa samarath su-aamee so ki-o manhu visaaray.
Kahai Naanak mann mayray sadaa rahu har naalay. ||2||

[Remaining 38 pauris — to be filled via Admin CMS]`,
    englishMeaning: `Anand Sahib — Raamkalee, Third Mehl, Anand (Bliss).

I am in ecstasy, O my mother, for I have found my True Guru.
I have found the True Guru, with intuitive ease, and my mind vibrates with the music of bliss.
The jewelled melodies and their related celestial harmonies have come to sing the Word of the Shabad.
The Lord's people sing the Shabad — those who have enshrined the Lord within their minds.
Says Nanak, I am in ecstasy, for I have found my True Guru. ||1||

O my mind, remain always with the Lord.
Remain with the Lord, O my mind, and all your troubles shall be forgotten.
He will accept you as His own, and all your affairs shall be resolved.
God is all-powerful to do everything — so why forget Him from your mind?
Says Nanak, O my mind, remain always with the Lord. ||2||

[Remaining 38 stanzas — to be filled via Admin CMS]`,
    type: "nitnem",
    audioCredit: "Gurbani Academy",
  },
  {
    id: "sukhmani-sahib-opening",
    title: "Sukhmani Sahib (Opening Shabad)",
    titleGurmukhi: "ਸੁਖਮਨੀ ਸਾਹਿਬ",
    description:
      "Sukhmani Sahib ('Peace of Mind') is a prayer composed by Guru Arjan Dev Ji (Fifth Guru). It contains 24 Ashtpadis (8-verse stanzas) and is recited for peace of mind, healing, and spiritual upliftment. This entry contains the opening Salok and first Ashtpadi.",
    gurmukhi: `ਸੁਖਮਨੀ ਸਾਹਿਬ ਰਾਗੁ ਗਉੜੀ ਸੁਖਮਨੀ ਮਹਲਾ ੫ ॥

ੴ ਸਤਿਗੁਰ ਪ੍ਰਸਾਦਿ ॥

ਸਲੋਕੁ ॥
ਆਦਿ ਗੁਰਏ ਨਮਹ ॥
ਜੁਗਾਦਿ ਗੁਰਏ ਨਮਹ ॥
ਸਤਿਗੁਰਏ ਨਮਹ ॥
ਸ੍ਰੀ ਗੁਰਦੇਵਏ ਨਮਹ ॥

ਅਸਟਪਦੀ ॥

ਸਿਮਰਉ ਸਿਮਰਿ ਸਿਮਰਿ ਸੁਖੁ ਪਾਵਉ ॥
ਕਲਿ ਕਲੇਸ ਤਨ ਮਾਹਿ ਮਿਟਾਵਉ ॥
ਸਿਮਰਉ ਜਾਸੁ ਬਿਸੁੰਭਰ ਏਕੈ ॥
ਨਾਮੁ ਜਪਤ ਅਗਨਤ ਅਨੇਕੈ ॥
ਬੇਦ ਪੁਰਾਨ ਸਿੰਮ੍ਰਿਤਿ ਸੁਧਾਖਰ ॥
ਕੀਨੇ ਰਾਮ ਨਾਮ ਇਕ ਆਖਰ ॥
ਕਿਨਕਾ ਏਕ ਜਿਸੁ ਜੀਅ ਬਸਾਵੈ ॥
ਤਾ ਕੀ ਮਹਿਮਾ ਗਨੀ ਨ ਆਵੈ ॥
ਕਾਂਖੀ ਏਕੈ ਦਰਸ ਤੁਹਾਰੋ ॥
ਨਾਨਕ ਉਨ ਸੰਗਿ ਮੋਹਿ ਉਧਾਰੋ ॥੧॥

[ਬਾਕੀ ੨੩ ਅਸਟਪਦੀਆਂ — Admin CMS ਦੁਆਰਾ ਭਰੀਆਂ ਜਾਣਗੀਆਂ]`,
    romanTransliteration: `Sukhmani Sahib Raag Ga-orhee Sukhmani Mehlaa 5.

Ik Onkar satgur parsaad.

Salok.
Aad gureh namah.
Jugaad gureh namah.
Satgureh namah.
Sree gurdayveh namah.

Ashtpadee.

Simra-o simar simar sukh paava-o.
Kal kayles tan maahi mitaava-o.
Simra-o jaas bisumbhar ekai.
Naam japat agnat anakai.
Bayd puraan simrit suDhaakhar.
Keenay raam naam ik aakhar.
Kinkaa ayk jis jee-a basaavai.
Taa kee mehimaa ganee na aavai.
Kaankhee ekai daras tuhaaro.
Naanak un sang mohi uDhaaro. ||1||

[Remaining 23 Ashtpadis — to be filled via Admin CMS]`,
    englishMeaning: `Sukhmani Sahib — Raag Gaurhee Sukhmani, Fifth Mehl.

One Universal Creator God. By The Grace Of The True Guru.

Salok.
I bow to the Primal Guru.
I bow to the Guru of the ages.
I bow to the True Guru.
I bow to the great, divine Guru.

Ashtpadee.

Meditate, meditate, meditate in remembrance of Him, and find peace.
Worry and anguish shall be dispelled from your body.
Remember in meditation the One who pervades the whole universe.
Chanting His Name, so many have been saved — beyond count.
The Vedas, the Puraanas and the Simritees — their essence is the pure and sacred Name of God, only one word, the Name of the Lord.
One, into whose heart the Lord places even a tiny particle of His Name —
That person's glory cannot be described.
I long for the Blessed Vision of Your Darshan.
O Nanak, save me, along with the company of those who love you. ||1||

[Remaining 23 Ashtpadis — to be filled via Admin CMS]`,
    type: "nitnem",
    audioCredit: "Gurbani Academy",
  },
];
