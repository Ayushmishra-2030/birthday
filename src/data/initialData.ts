import { Letter, TimelineEvent, MemoryQuote, ReasonItem, QuizQuestion, DarkFantasyQuestion, SiteSettings, Photo } from '@/types';

export const initialSiteSettings: SiteSettings = {
  birthdayTargetIso: '2026-11-07T00:00:00+05:30',
  timezone: 'Asia/Kolkata',
  girlfriendName: 'Shree',
  boyfriendName: 'Ayush',
  relationshipStartDate: '2026-09-14',
  secretPreviewCode: 'shree7nov',
  unlockOverride: false,
  musicAutoPlayPrompt: true,
  bgMusicTitle: 'Enchanted Midnight Romance',
  bgMusicUrl: '/audio/romantic-ambiance.mp3',
  showAge20: false,
};

export const initialLetters: Letter[] = [
  {
    id: 'letter-1',
    slug: 'to-my-favourite-person',
    title: 'To My Favourite Person',
    subtitle: 'Kyunki tumhare bina mera din adhoora hai',
    envelopeTheme: 'rose',
    orderIndex: 1,
    content: `Meri pyari Shree,

Agar koi mujhse pooche ki meri poore din ki sabse khoobsurat cheez kya hoti hai, toh main bina ek pal soche tumhara naam loonga. 

Jab subah classroom mein hum ek doosre ko dekhte hain na, wahi se mera din sach mein shuru hota hai. Wo 8 ghante jo hum saath mein baithte hain, lectures sunte hain ya bina kuch bole bas ek doosre ko dekh kar muskura dete hain — wo pal mere liye kisi magical duniya se kam nahi hain.

Tum meri favourite person ho Shree, aur yeh sirf kehne ke liye nahi hai. Mere har thought mein, meri har aadat mein tum basi hui ho. Happy Birthday meri jaan! ❤️`,
  },
  {
    id: 'letter-2',
    slug: 'the-girl-who-became-my-world',
    title: 'The Girl Who Became My World',
    subtitle: 'Ek anjaan ladki se meri zindagi tak ka safar',
    envelopeTheme: 'lavender',
    orderIndex: 2,
    content: `Shree,

Kabhi kabhi main akele baith kar sochta hoon ki agar 14 September ko hamari shuruaat na hui hoti, toh meri zindagi kaisi hoti? Ganesh Chaturthi ka wo pavitra din sach mein mere liye Bappa ka sabse bada aashirwad banke aaya. 

Ek normal sa college student tha main, apne assignments aur routines mein uljha hua. Lekin tum aayi aur tumne is aam si zindagi ko ek fairytale bana diya. Tumhara wo masoom sa gussa, tumhari pyari si baatein, aur wo dhyan rakhna jaise main koi chhota bachha hoon... 

Tum sirf meri girlfriend nahi ho, tum meri poori duniya ban chuki ho. And today, I just want to celebrate everything that you are.`,
  },
  {
    id: 'letter-3',
    slug: 'meri-princess-ke-naam',
    title: 'Meri Princess Ke Naam',
    subtitle: 'Jo mere dil par raaj karti hai',
    envelopeTheme: 'gold',
    orderIndex: 3,
    content: `Oye meri princess,

Tumhe pata hai jab main tumhe 'Princess' bolta hoon toh mere chehre pe ek alag si muskurahat aa jaati hai? Kyunki tum sach mein kisi dark fantasy fairytale ki princess jaisi ho — graceful, thodi nakhrebaaz, lekin sabse zyaada caring.

Hostel ke 5 PM curfew ke baad jab hum alag hote hain, aur main boys' hostel ke room mein aakar phone lagata hoon, tab lagta hai ki bas tumhari aawaz hi meri sabse badi shanti hai. Tumhare har nakhre, har zid mujhe pyaari hai.

Aaj ke din main promise karta hoon ki chahe kuch bhi ho jaaye, tumhare chehre se yeh princess wali chamak kabhi kam nahi hone doonga.`,
  },
  {
    id: 'letter-4',
    slug: 'when-i-miss-you',
    title: 'When I Miss You',
    subtitle: '5 PM ke baad ka wo intezaar',
    envelopeTheme: 'wine',
    orderIndex: 4,
    content: `Shree,

Roz shaam ko 5 bajte hi hostel ki timing hume alag kar deti hai. Tum girls' hostel chali jaati ho aur main boys' hostel. Ek hi campus mein reh kar bhi jab hum mil nahi paate na, toh wo faasla hazaron meel jaisa lagta hai.

Phir aati hai hamari 6 ghante lambi calls. Pata hai log poochte hain ki 'roz 6 ghante kya baat karte ho?' Unhe kaise bataoon ki tumhare saath baat karte waqt ghante minutes ban jaate hain. Hum chup bhi rehte hain toh bhi lagta hai ki sab keh diya.

Jab bhi tumhe miss karta hoon, bas tumhari purani photos dekh leta hoon ya tumhari recording sunta hoon. Lekin sach boloon? Tumhare bina ek ghanta bhi mushkil lagta hai.`,
  },
  {
    id: 'letter-5',
    slug: 'our-little-college-universe',
    title: 'Our Little College Universe',
    subtitle: 'Classroom ki teesri bench aur hamara jahaan',
    envelopeTheme: 'rose',
    orderIndex: 5,
    content: `Meri pyari Shree,

College hum sabke liye ek building hota hai, lekin mere liye wo hamara chhota sa aashiyana hai. Subah se lekar dopahar tak lagbhag 8 ghante hum saath rehte hain. Ek hi class, ek hi branch, aur bagal wali chair par baithi meri sabse pyari ladki.

Jab teacher padha rahe hote hain aur hum secretly ek doosre ke notes par drawing banate hain, ya lunch time par ek doosre ko dekh kar poochte hain 'khana khaya?', wo yaadein hamesha mere dil ke sabse kareeb rahengi.

Duniya ke liye hum normal classmates hain, lekin hum jaante hain ki hamari classroom hamari love story ka sabse khoobsurat chapter hai.`,
  },
  {
    id: 'letter-6',
    slug: 'six-hours-are-never-enough',
    title: 'Six Hours Are Never Enough',
    subtitle: 'Midnight calls aur neend se ladti aawazein',
    envelopeTheme: 'lavender',
    orderIndex: 6,
    content: `Shree,

Raat ke 11 bajte hain, hamari call connect hoti hai. Hum shuru karte hain din bhar ki faltu baaton se — kisne kya bola, mentor ne kya task diya, hostel ke mess mein kya bana tha... aur baatein karte karte kab subah ke 4 ya 5 baj jaate hain, pata hi nahi chalta.

Roz 6 ghante baat karne ke baad bhi jab call cut karne ka waqt aata hai, toh lagta hai 'yaar abhi toh baat shuru hui thi, thodi der aur ruk jaao na'.

Tumhari neend bhari aawaz, wo dheere se 'Ayush suno na...', aur phir achanak phone par hi so jaana... yeh sab meri zindagi ke sabse anmol lamhe hain.`,
  },
  {
    id: 'letter-7',
    slug: 'my-favourite-everyday-habit',
    title: 'My Favourite Everyday Habit',
    subtitle: 'Saath mein khana khana aur ek doosre ki chinta karna',
    envelopeTheme: 'gold',
    orderIndex: 7,
    content: `Oye bhukkad (aur meri pyari) Shree,

Pata hai meri sabse favourite aadat kya hai? Roz dopahar ko tumhare bagal mein baith kar khana khana. 

Aur sabse ajeeb aur pyari baat yeh hai — agar kisi din tumhara khana khane ka mann nahi hota ya tum thoda sa chhod deti ho, toh kasam se mera bhi gala sookh jaata hai, ek niwala andar nahi jaata. Aur jab main pareshan hota hoon, toh tum zabardasti khilati ho.

Yeh koi formality nahi hai, yeh wo pyaar hai jo bina bole samjh aata hai. Hum dono ka pet bharna ek doosre ki khushi se juda hua hai. Isse pyara connection aur kya ho sakta hai bhala?`,
  },
  {
    id: 'letter-8',
    slug: 'a-letter-for-your-smile',
    title: 'A Letter for Your Smile',
    subtitle: 'Wo muskurahat jo mere saare stress mita deti hai',
    envelopeTheme: 'rose',
    orderIndex: 8,
    content: `Meri pyari Shree,

Jab tum hasti ho na, sach mein aisa lagta hai jaise kisi andheri raat mein saikdon sitare ek saath chamak uthe hon. 

Chahe college ke assignments ka stress ho, exams ka pressure ho, ya life ki koi bhi pareshani — jab tum mere samne aakar wo dimple wali smile deti ho na, toh lagta hai ki sab kuch theek ho jaayega.

Tumhari hasi meri medicine hai Shree. Aur is birthday par main khud se yeh wada karta hoon ki tumhare chehre par yeh smile hamesha banaye rakhunga, chahe mujhe kitna bhi joker banna pade!`,
  },
  {
    id: 'letter-9',
    slug: 'the-girl-i-want-to-celebrate-every-day',
    title: 'The Girl I Want to Celebrate Every Day',
    subtitle: 'Sirf 7 November nahi, saal ke 365 din',
    envelopeTheme: 'wine',
    orderIndex: 9,
    content: `Shree,

Aaj 7 November hai, tumhara birthday. Poori duniya ke liye yeh ek date ho sakti hai, lekin mere liye yeh saal ka sabse sacred aur magical din hai. Kyunki aaj ke din meri zindagi ki sabse khoobsurat blessing is duniya mein aayi thi.

Lekin main tumhe sirf aaj celebrate nahi karna chahta. Main tumhe har us din celebrate karna chahta hoon jab hum saath mein assignments complete karte hain, jab hum hostel gate par khade hokar 4:59 PM par last bye bolte hain, aur jab hum midnight par call par chupchap saans lete hain.

You deserve to be celebrated every single second, my princess.`,
  },
  {
    id: 'letter-10',
    slug: 'our-story-began-on-14-september',
    title: 'Our Story Began on 14 September',
    subtitle: 'Ganesh Chaturthi ka wo pavitra mod',
    envelopeTheme: 'gold',
    orderIndex: 10,
    content: `Shree,

14 September 2026. Ganesh Chaturthi. Yeh date mere dil par hamesha ke liye chhap chuki hai.

College shuru hue thoda waqt ho gaya tha, hum roz class mein ek doosre ko dekhte the. Lekin us din Bappa ke aashirwad ke saath kuch aisa badla jo lafzon mein bayaan nahi ho sakta. Hamari baatein shuru hui, aur hume ehsaas hua ki hum dono ki soch kitni milti hai.

Wahi mindset, wahi dreams, wahi college mentor ka guidance, aur wahi ek doosre ke liye respect. Hamara rishta kisi filmy romance se kam nahi hai, balki usse bhi zyaada gehra aur sachcha hai. Bappa bless our journey forever.`,
  },
  {
    id: 'letter-11',
    slug: 'my-midnight-thoughts',
    title: 'My Midnight Thoughts',
    subtitle: 'Jab poora hostel so raha hota hai aur main tumhe soch raha hota hoon',
    envelopeTheme: 'lavender',
    orderIndex: 11,
    content: `Shree,

Abhi raat ke 2 baj rahe hain jab main yeh letter likh raha hoon. Boys' hostel ke sabhi ladke so chuke hain. Chaaron taraf bilkul khamoshi hai, aur aasmaan mein chand chamak raha hai.

Main window ke paas khada hokar girls' hostel ki taraf dekh raha hoon aur soch raha hoon ki tum kitne sukoon se so rahi hogi. Pata hai, yeh ehsaas hi kitna comforting hai ki tum mere itne kareeb ho, usi campus mein, usi aasman ke neeche.

Yeh raat ki thandi hawa jab aati hai na, toh lagta hai jaise tumhara sparsh ho. Tum meri zindagi ki sabse pyaari raat ki chaandni ho Shree.`,
  },
  {
    id: 'letter-12',
    slug: 'to-my-forever-favourite',
    title: 'To My Forever Favourite',
    subtitle: 'Har janam mein sirf tum',
    envelopeTheme: 'rose',
    orderIndex: 12,
    content: `Meri Shree,

Duniya mein karodon log hain, lekin mere liye tumhara koi replacement nahi ho sakta. Tumhare jaisa koi dhyan nahi rakh sakta, tumhare jaisa koi meri aankhon ki baat bina bole nahi samajh sakta.

Hum dono jab ek saath hote hain na, toh aisa lagta hai jaise do alag insaan nahi balki ek hi aatma do shareer mein jee rahi ho. Hamari pasand ek hai, hamari soch ek hai, aur hamara college mentor bhi ek hi hai!

Chahe college khatam ho jaaye, chahe saal beet jaayein, mere dil ki har dhadkan sirf ek hi naam dohraegi — Shree, meri Shree.`,
  },
  {
    id: 'letter-13',
    slug: 'the-little-things-i-love-about-you',
    title: 'The Little Things I Love About You',
    subtitle: 'Chhoti baatein jo bohot badi khushi deti hain',
    envelopeTheme: 'wine',
    orderIndex: 13,
    content: `Oye suno,

Main tumhe batana chahta hoon ki mujhe tumhari kaun kaun si chhoti baatein pasand hain:
1. Jab tum gusse mein apna naak fula leti ho.
2. Jab tum bolti ho 'Ayush mujhe yeh bilkul pasand nahi aaya!' aur agle 2 minute mein khud hi has padti ho.
3. Jab tum khane ki plate aage karke bolti ho 'Pehla bite tum khao'.
4. Jab 4:58 PM par tum baar baar ghadi dekh kar udas ho jaati ho kyunki 5 PM hostel andar jaana hai.
5. Aur sabse zyaada, jab tum call par bolti ho 'Mujhe neend aa rahi hai par tumse baat karni hai'.

Yeh saari chhoti chhoti baatein hi toh meri poori zindagi hain.`,
  },
  {
    id: 'letter-14',
    slug: 'on-days-when-you-feel-low',
    title: 'On Days When You Feel Low',
    subtitle: 'Yeh letter tab kholna jab tum udas ho',
    envelopeTheme: 'lavender',
    orderIndex: 14,
    content: `Meri pyari bachi,

Agar aaj tumhara din achha nahi gaya, agar college mein koi tension hui, ya hostel mein akelepan laga... toh ek gehri saans lo aur meri baat dhyaan se suno.

Tum bohot strong ho, bohot pyaari ho, aur tum akele bilkul nahi ho. Chahe kitni bhi doori ho, chahe 5 PM ka curfew ho ya koi bhi pareshani — Ayush hamesha tumhare saath khada hai. Just close your eyes and feel my hand in yours.

Tum meri princess ho, aur kisi bhi mushkil ki itni himmat nahi ki wo meri princess ki smile chheen sake. Main hoon na tumhare saath, hamesha. Everything will be okay, my love. ❤️`,
  },
  {
    id: 'letter-15',
    slug: 'one-last-letter-for-my-birthday-princess',
    title: 'One Last Letter for My Birthday Princess',
    subtitle: 'Dil ki gehraiyon se ek aakhri birthday wish',
    envelopeTheme: 'gold',
    orderIndex: 15,
    content: `Happy Birthday, My Dearest Shree! 🎉🎂✨

Yeh website, yeh animations, yeh letters, yeh scrapbook... yeh sab maine tumhare liye apne haathon se, dil se banaya hai. Taaki jab tum ise dekho, toh tumhe ehsaas ho ki tum mere liye kitni special aur anmol ho.

Main chahta tha ki tumhara birthday kisi regular birthday jaisa na lage. Yeh tumhara apna ek enchanted universe bane jahan sirf tumhara raaj ho.

Tumhari har khwahish poori ho, tumhare saare sapne sach hon, aur hamara yeh college romance ek eternal love story ban jaaye. 

I love you Shree, more than words, more than 8 hours of class, more than 6 hours of midnight calls, more than anything in this universe.

Yours and only yours forever,
Ayush ❤️`,
  },
];

export const initialTimelineEvents: TimelineEvent[] = [
  {
    id: 'event-1',
    date: '14 September 2026',
    title: 'Ganesh Chaturthi — The Sacred Beginning',
    description: 'Jab Bappa ke aashirwad ke saath hamari kahani ka pehla panne likha gaya.',
    romanticNote: 'Uss din college ke mahaul mein ek ajeeb sa sukoon tha. Bappa ki aarti aur tumhari wo pehli pyari si muskaan... wahi se Ayush aur Shree ka rishta dil se jud gaya.',
    iconName: 'Sparkles',
    orderIndex: 1,
  },
  {
    id: 'event-2',
    date: 'Every College Day',
    title: '8 Hours in Classroom — Our Daily Haven',
    description: 'Roz classroom mein ek doosre ke bagal mein baith kar 8 ghante bitana.',
    romanticNote: 'Professors aate hain, lectures hote hain, blackboard bhar jaate hain... lekin mera dhyan toh bas tumhare chehre aur tumhari cute harqaton par hota hai.',
    iconName: 'BookOpen',
    orderIndex: 2,
  },
  {
    id: 'event-3',
    date: 'Every Afternoon & Evening',
    title: 'Eating Together — Hamari Khana Sharing Ritual',
    description: 'Agar Shree nahi khati, toh Ayush ka bhi mann nahi karta.',
    romanticNote: 'Tumhare bagal mein baith kar lunch karna meri daily habit ban chuki hai. Jab tak tum pehla niwala na khao, mera khana khane ka koi mood nahi banta.',
    iconName: 'Coffee',
    orderIndex: 3,
  },
  {
    id: 'event-4',
    date: 'Daily at 5:00 PM Sharp',
    title: '5 PM Hostel Curfew — The Hardest Goodbye',
    description: 'Girls\' Hostel aur Boys\' Hostel ki boundary, aur ek aakhri waved hand.',
    romanticNote: '4:55 PM hote hi dil dharakne lagta hai. 5 PM ke baad milne ki pabandi hai, lekin wo aakhri pal jab hum ek doosre ko dekh kar bye bolte hain, dil wahin chhoot jaata hai.',
    iconName: 'Clock',
    orderIndex: 4,
  },
  {
    id: 'event-5',
    date: 'Every Night (11 PM - 5 AM)',
    title: '6 Hours Midnight Calls — When The World Sleeps',
    description: 'Hostel ke kamron se shuru hui wo 6 ghante lambi baat-cheet.',
    romanticNote: 'Duniya so jaati hai aur hamari baatein shuru hoti hain. Kabhi serious, kabhi bilkul pagalpan wali, lekin 6 ghante bhi hume kam padte hain.',
    iconName: 'Moon',
    orderIndex: 5,
  },
  {
    id: 'event-6',
    date: 'The Shared Mindset',
    title: 'Same Mentor, Same Thinking — Two Souls As One',
    description: 'Same college mentor, identical values, aur aisi chemistry jo rare hoti hai.',
    romanticNote: 'Hum dono ka dimaag bilkul ek tarah sochta hai. Jab tum kuch bolne wali hoti ho, mujhe pehle hi pata hota hai. We are truly made for each other.',
    iconName: 'Flame',
    orderIndex: 6,
  },
  {
    id: 'event-7',
    date: '7 November 2026',
    title: 'The Princess\'s Birthday — A World Made For Shree',
    description: 'Meri princess ka sabse special din, ek aisi surprise ke saath jo hamesha yaad rahegi.',
    romanticNote: 'Yeh sirf ek website nahi hai, yeh Ayush ke dil ka har ek ehsaas hai jo usne apni Shree ke liye digital universe mein saja diya hai.',
    iconName: 'Heart',
    orderIndex: 7,
  },
];

export const initialMemoryQuotes: MemoryQuote[] = [
  {
    id: 'quote-1',
    quote: '8 ghante class mein saath rehna bhi kabhi kabhi kam lagta hai.',
    context: 'Classroom Memories',
    heartsCount: 84,
    orderIndex: 1,
  },
  {
    id: 'quote-2',
    quote: 'College khatam ho jaata hai, lekin tumhare saath bitaya hua waqt nahi.',
    context: 'Campus Days',
    heartsCount: 96,
    orderIndex: 2,
  },
  {
    id: 'quote-3',
    quote: '6 hours ki calls bhi kabhi enough nahi lagti.',
    context: 'Midnight Talks',
    heartsCount: 112,
    orderIndex: 3,
  },
  {
    id: 'quote-4',
    quote: 'Hum dono ka ek saath khana khana bhi mere liye kisi special date se kam nahi.',
    context: 'Lunch Breaks',
    heartsCount: 78,
    orderIndex: 4,
  },
  {
    id: 'quote-5',
    quote: 'Alag hostels hain, lekin dil ka address ek hi hai.',
    context: 'Hostel Life Realities',
    heartsCount: 125,
    orderIndex: 5,
  },
  {
    id: 'quote-6',
    quote: 'Shree, tum meri favourite notification ho.',
    context: 'Phone Screen Confessions',
    heartsCount: 140,
    orderIndex: 6,
  },
  {
    id: 'quote-7',
    quote: 'Agar tum nahi khaogi, toh main bhi nahi khaoonga — yeh hamara unsaid rule hai.',
    context: 'Daily Care',
    heartsCount: 89,
    orderIndex: 7,
  },
  {
    id: 'quote-8',
    quote: 'Same mentor, same thoughts, aur ek doosre ke liye beintehaa pyaar.',
    context: 'College Bond',
    heartsCount: 72,
    orderIndex: 8,
  },
  {
    id: 'quote-9',
    quote: '5 PM ka curfew chahe hume physically alag kar de, hamare dil kabhi alag nahi hote.',
    context: 'Hostel Curfew Thoughts',
    heartsCount: 95,
    orderIndex: 9,
  },
];

export const initialReasons: ReasonItem[] = [
  { id: 'reason-1', number: 1, title: 'Tumhari Pyari Si Muskaan', description: 'Jab tum hasti ho, toh lagta hai din bhar ka saara stress ek second mein gayab ho gaya.', category: 'Everyday' },
  { id: 'reason-2', number: 2, title: '8 Ghante Class Mein Saath Baithna', description: 'Har lecture boring lagta agar tum mere bagal wali seat par na baithi hoti.', category: 'College' },
  { id: 'reason-3', number: 3, title: 'Wo 6 Ghante Ki Midnight Calls', description: 'Kyunki tumhare bina raat ko neend aana ab namumkin sa lagta hai.', category: 'Everyday' },
  { id: 'reason-4', number: 4, title: 'Saath Mein Khana Khana', description: 'Jab tak tum mere bagal mein na baitho, khane ka koi swaad nahi aata.', category: 'Everyday' },
  { id: 'reason-5', number: 5, title: 'Agar Tum Nahi Khati, Mera Bhi Mann Nahi Karta', description: 'Yeh connection koi zabardasti ka nahi, yeh dil ka rishta hai.', category: 'Heart' },
  { id: 'reason-6', number: 6, title: '5 PM Curfew Ka Dukh', description: 'Kyunki 4:55 PM par tumhara chehra dekh kar samajh aata hai ki hum ek doosre se kitna door nahi reh sakte.', category: 'Hostel' },
  { id: 'reason-7', number: 7, title: 'Same Mentor, Same Thinking', description: 'Hamara mindset itna similar hai jaise hum ek hi dimaag ke do hisse hon.', category: 'College' },
  { id: 'reason-8', number: 8, title: '14 September Ka Pavitra Din', description: 'Ganesh Chaturthi ke din Bappa ne mujhe meri zindagi ki sabse khoobsurat nemat di.', category: 'Heart' },
  { id: 'reason-9', number: 9, title: 'Tumhara Masoom Sa Nakhra', description: 'Jab tum thodi si naraz hokar muh phula leti ho, toh aur bhi pyari lagti ho.', category: 'Everyday' },
  { id: 'reason-10', number: 10, title: 'Jab Tum Mera Dhyan Rakhti Ho', description: 'Meri dawai, meri health, mera assignment — sabki chinta mujhse zyaada tumhe hoti hai.', category: 'Heart' },
  { id: 'reason-11', number: 11, title: 'Hostel Balcony Se Haath Hilana', description: 'Ek hi campus mein reh kar alag hostels ka jo dard hai, wo bas hum dono samajhte hain.', category: 'Hostel' },
  { id: 'reason-12', number: 12, title: 'Tumhari Aankhein', description: 'Jinme dekh kar main sab kuch bhool jaata hoon.', category: 'Heart' },
  { id: 'reason-13', number: 13, title: 'Classroom Mein Secret Notes Dena', description: 'Jab teacher padha rahe hote hain aur hum chupke se baat karte hain.', category: 'College' },
  { id: 'reason-14', number: 14, title: 'Late Night Sleepy Voice', description: 'Call par jab tum aadhi neend mein bolti ho "Ayush abhi mat kaato na...", wo duniya ki sabse pyari aawaz hai.', category: 'Everyday' },
  { id: 'reason-15', number: 15, title: 'Tumhara Pure Heart', description: 'Kyunki tumhare dil mein kisi ke liye buraai nahi hai, tum bilkul saaf dil ki ho.', category: 'Heart' },
  { id: 'reason-16', number: 16, title: 'Assignments Mein Help Karna', description: 'Kyunki hum sirf lovers nahi, best study partners bhi hain.', category: 'College' },
  { id: 'reason-17', number: 17, title: 'Tumhari Bepanah Respect', description: 'Jis tarah tum meri baaton aur mere sapno ki izzat karti ho.', category: 'Heart' },
  { id: 'reason-18', number: 18, title: 'Hum Dono Ki Similar Habits', description: 'Hum dono ka ek jaisa react karna aur ek jaisi cheezon par hasna.', category: 'Everyday' },
  { id: 'reason-19', number: 19, title: '5 PM Ke Baad Ka Countdown', description: 'Subah 9 baje kab college start hoga uska intezaar sirf tumse milne ke liye hota hai.', category: 'Hostel' },
  { id: 'reason-20', number: 20, title: 'Jab Tum Mujhe "Ayush" Bolti Ho', description: 'Tumhare muh se mera naam sunna kisi gaane jaisa lagta hai.', category: 'Heart' },
  { id: 'reason-21', number: 21, title: 'Tumhara Sense of Humor', description: 'Tumhare wo silly jokes jinpe hum dono class ke kone mein has padte hain.', category: 'Everyday' },
  { id: 'reason-22', number: 22, title: 'Food Sharing Rule', description: 'Hamesha sabse pehla aur sabse achha bite mujhe khilana.', category: 'Everyday' },
  { id: 'reason-23', number: 23, title: 'Hamari Ganesh ji Ke Prati Astha', description: 'Hamara rishta Ganesh Chaturthi se shuru hua, isliye hamesha pavitra rahega.', category: 'Heart' },
  { id: 'reason-24', number: 24, title: 'Tumhari Princess Vibe', description: 'Tumhara wo classy, royal aur dignified tareeqa jo har kisi ko impress kar leta hai.', category: 'Heart' },
  { id: 'reason-25', number: 25, title: 'Mujhe Better Insaan Banana', description: 'Jabse tum meri zindagi mein aayi ho, main pehle se behtar ban gaya hoon.', category: 'Heart' },
  { id: 'reason-26', number: 26, title: 'College Ke Baad Bhi Saath Rehna', description: 'Kyunki classroom ke 8 ghante aur raat ke 6 ghante bhi hume kam lagte hain.', category: 'College' },
  { id: 'reason-27', number: 27, title: 'Tumhari Zid Jo Mujhe Pasand Hai', description: 'Jab tum bolti ho "Nahi, tum yeh karoge!" aur main has kar maan leta hoon.', category: 'Everyday' },
  { id: 'reason-28', number: 28, title: 'Hostel Ke Mess Ki Shikayat', description: 'Jab dono phone par mess ke khane ka mazaak udate hain.', category: 'Hostel' },
  { id: 'reason-29', number: 29, title: 'Tumhara Endless Support', description: 'Har situation mein mere saath khade rehna aur bolna "Ayush sab theek ho jaayega".', category: 'Heart' },
  { id: 'reason-30', number: 30, title: 'Kyunki Tum Shree Ho', description: 'Aur is poori universe mein tumhare jaisa koi doosra nahi ho sakta. You are simply irreplaceable.', category: 'Heart' },
];

export const initialQuizQuestions: QuizQuestion[] = [
  {
    id: 'quiz-1',
    question: 'Hamara rishta kis pavitra tyohaar ke din shuru hua tha?',
    options: ['Diwali', 'Ganesh Chaturthi (14 September 2026)', 'Navratri', 'Janmashtami'],
    correctIndex: 1,
    explanation: '14 September 2026, Ganesh Chaturthi ke din Bappa ke aashirwad se hamari khoobsurat love story shuru hui thi! ❤️',
  },
  {
    id: 'quiz-2',
    question: 'College classroom mein hum lagbhag roz kitne ghante saath bitate hain?',
    options: ['2 Ghante', '4 Ghante', 'Almost 8 Ghante', 'Bas 1 Ghanta'],
    correctIndex: 2,
    explanation: 'Almost 8 ghante hum roz college class mein ek doosre ke bagal mein baithte hain!',
  },
  {
    id: 'quiz-3',
    question: 'Roz raat ko calls par hum lagbhag kitni der baat karte hain?',
    options: ['1 Ghanta', 'Approximately 6 Ghante', '30 Minutes', '2 Ghante'],
    correctIndex: 1,
    explanation: 'Roz raat ko lagbhag 6 ghante hamari calls chalti hain aur pata hi nahi chalta kab subah ho gayi!',
  },
  {
    id: 'quiz-4',
    question: 'Hostel restrictions ke mutabiq hum kitne baje ke baad campus mein mil nahi sakte?',
    options: ['5:00 PM', '8:00 PM', '10:00 PM', '6:30 PM'],
    correctIndex: 0,
    explanation: '5:00 PM ke baad hostel restrictions ki wajah se hum mil nahi sakte, isliye Shree girls\' hostel aur Ayush boys\' hostel chala jaata hai.',
  },
  {
    id: 'quiz-5',
    question: 'Agar Shree khana nahi khati, toh Ayush kya karta hai?',
    options: [
      'Ayush akele pura khana kha leta hai',
      'Ayush ka bhi bilkul khana khane ka mann nahi karta',
      'Ayush so jaata hai',
      'Ayush canteen chala jaata hai'
    ],
    correctIndex: 1,
    explanation: 'Yeh hamara sacred rule hai — agar Shree nahi khayegi, toh Ayush ka bhi ek niwala andar nahi jaayega!',
  },
  {
    id: 'quiz-6',
    question: 'Ayush aur Shree kahan rehte hain?',
    options: [
      'Dono alag cities mein',
      'Same campus, lekin Shree Girls\' Hostel aur Ayush Boys\' Hostel mein',
      'Dono day scholar hain',
      'Same flat mein'
    ],
    correctIndex: 1,
    explanation: 'Same college campus mein rehte hain lekin Shree Girls\' Hostel mein aur Ayush Boys\' Hostel mein!',
  },
  {
    id: 'quiz-7',
    question: 'College mein hamare beech aisi kaunsi cheez common hai jo hum dono share karte hain?',
    options: [
      'Same College Mentor aur Same Mindset',
      'Same Room',
      'Same Laptop',
      'Same Phone Number'
    ],
    correctIndex: 0,
    explanation: 'Hum dono ka same college mentor hai aur hamari thinking aur mindset bilkul ek jaisi hai!',
  },
  {
    id: 'quiz-8',
    question: 'Lunch time par hamara sabse favorite ritual kya hai?',
    options: [
      'Alag alag baith kar khana',
      'Ek doosre ke bagal mein baith kar saath mein khana khana',
      'Fast food order karna',
      'Library mein sona'
    ],
    correctIndex: 1,
    explanation: 'Roz lunch time par ek doosre ke bagal mein baith kar saath mein khana khana!',
  },
  {
    id: 'quiz-9',
    question: 'Shree ka birthday kis date ko hota hai?',
    options: ['7 November', '14 September', '25 December', '1 January'],
    correctIndex: 0,
    explanation: '7 November ko meri princess Shree ka birthday hota hai!',
  },
  {
    id: 'quiz-10',
    question: 'Ayush Shree ko pyaar se kya bulata hai?',
    options: ['Princess / Meri Jaan', 'Madam', 'Friend', 'Classmate'],
    correctIndex: 0,
    explanation: 'Princess! Kyunki wo Ayush ke dil par raaj karti hai.',
  },
  {
    id: 'quiz-11',
    question: 'Hum dono pehli baar kahan mile the?',
    options: ['College Classroom mein', 'Mall mein', 'Social Media par', 'Train mein'],
    correctIndex: 0,
    explanation: 'Hum dono college mein mile the aur same class mein padhte hain!',
  },
  {
    id: 'quiz-12',
    question: 'Jab 4:58 PM hota hai, toh hamare dimaag mein kya chal raha hota hai?',
    options: [
      'Ki hostel curfew hone wala hai aur alag hona padega',
      'Ki party karne chalte hain',
      'Ki exam ki tayari karein',
      'Ki game khelein'
    ],
    correctIndex: 0,
    explanation: '5 PM ka curfew aane wala hai aur ab seedha phone call par milna hoga!',
  },
  {
    id: 'quiz-13',
    question: 'Hamari calls kab shuru hoti hain?',
    options: ['Late night jab hostel ke kamre shant ho jaate hain', 'Sirf subah 5 baje', 'Khabar nahi', 'Bas 5 minute'],
    correctIndex: 0,
    explanation: 'Late night shuru hoti hain aur lagbhag subah tak 6 ghante chalti hain!',
  },
  {
    id: 'quiz-14',
    question: 'Shree Ayush ke liye kya hai?',
    options: ['Uski favourite notification aur uski poori duniya', 'Bas ek achhi dost', 'Classmate', 'Senior'],
    correctIndex: 0,
    explanation: 'Shree Ayush ki favourite notification, uski princess aur uski poori duniya hai! ❤️',
  },
  {
    id: 'quiz-15',
    question: 'Ayush Shree se kitna pyaar karta hai?',
    options: [
      'Infinite — more than words can ever describe',
      'Thoda sa',
      'Sirf 8 ghante',
      'Normal sa'
    ],
    correctIndex: 0,
    explanation: 'Infinite! Dil ki gehraiyon se, har lamha, har janam mein. Forever and always! ❤️✨',
  },
];

export const initialDarkFantasyQuiz: DarkFantasyQuestion[] = [
  {
    id: 'df-1',
    chapter: 'Act I',
    title: 'The Eclipse of the Dual Citadel',
    scenario: 'Two towering spires stand across an enchanted mist — one of Boys and one of Maidens. The iron bells chime the fifth hour of twilight (5 PM). A shadow falls across the courtyard...',
    question: 'What relic do you summon to bridge the forbidden barrier?',
    options: [
      {
        text: 'The Moonstone Mirror — to weave a 6-hour celestial whisper through midnight.',
        affinity: 'moon',
        lore: 'The echoes of late-night calls resonate across the starry firmament, defying all barriers.',
      },
      {
        text: 'The Crimson Rose Ribbon — tied to the classroom threshold where eight hours feel like seconds.',
        affinity: 'rose',
        lore: 'The memories of shared desks and stolen glances forge an unbreakable tether.',
      },
      {
        text: 'The Golden Chalice of Amrit — so that when she hungers, his soul hungers; when she feasts, both rejoice.',
        affinity: 'starlight',
        lore: 'A sacred bloodline vow: never shall one eat while the other sits starved in twilight.',
      },
      {
        text: 'The Shadow Key of 14 September — forged in the holy fires of Ganesh Chaturthi.',
        affinity: 'shadow',
        lore: 'An ancient blessing granted by the divine breaker of obstacles, shielding them from all harm.',
      },
    ],
  },
  {
    id: 'df-2',
    chapter: 'Act II',
    title: 'The Great Scholastic Chamber',
    scenario: 'Within the Grand Hall of Mentors, thousands of scrolls drift through enchanted candles. The Arch-Mentor tests the minds of the two chosen scholars...',
    question: 'How do Ayush and Shree defeat the riddle of the Grand Mentor?',
    options: [
      {
        text: 'With Synchronized Thought: because their minds have been identical since the first dawn.',
        affinity: 'starlight',
        lore: 'Before one speaks, the other already knows the cadence of their answer.',
      },
      {
        text: 'By Sharing the Sacred Tablet: scribbling secret sigils under the professor’s gaze.',
        affinity: 'rose',
        lore: 'Love thrives in quiet defiance amidst eight hours of scholastic enchantment.',
      },
      {
        text: 'With the Shield of Patience: waiting for the midnight stars to unleash their true power.',
        affinity: 'moon',
        lore: 'For twilight is fleeting, but the 6-hour midnight domain belongs solely to them.',
      },
      {
        text: 'With the Eternal Vow: declaring that no curriculum is greater than their intertwined destiny.',
        affinity: 'shadow',
        lore: 'Dark lords and mentors alike bow before their unshakable alliance.',
      },
    ],
  },
  {
    id: 'df-3',
    chapter: 'Act III',
    title: 'The Banquet of Shadows',
    scenario: 'A grand enchanted banquet table stretches into infinity. Princess Shree sits on the obsidian throne, but hesitates before tasting the silver grapes...',
    question: 'What does Guardian Ayush do at the banquet table?',
    options: [
      {
        text: 'Refuses every morsel until his Princess takes her first sweet bite.',
        affinity: 'starlight',
        lore: 'His plate remains untouched until her hunger is satisfied; their souls are bound in nourish-lock.',
      },
      {
        text: 'Offers the Golden Spoon and sits right beside her, whispering gentle Hinglish words.',
        affinity: 'rose',
        lore: 'Sitting side-by-side, every meal becomes a royal banquet beyond time.',
      },
      {
        text: 'Casts a protective ward against the 5 PM curfew curse, extending dinner into eternity.',
        affinity: 'shadow',
        lore: 'Curfews crumble beneath the weight of unconditional adoration.',
      },
      {
        text: 'Captures the essence of her smile in a crystal pendant to illuminate the midnight call.',
        affinity: 'moon',
        lore: 'Her smile banishes all darkness from the haunted chambers of the hostel.',
      },
    ],
  },
  {
    id: 'df-4',
    chapter: 'Act IV',
    title: 'The Gates of the 7th Dawn',
    scenario: 'The sky turns burgundy and deep violet. A celestial clock strikes 00:00. The seventh day of the eleventh month has arrived...',
    question: 'What title shall Princess Shree claim in this newborn romantic realm?',
    options: [
      {
        text: 'The Ethereal Moon Empress — Sovereign of Midnight Whispers and Infinite Calls.',
        affinity: 'moon',
        lore: 'Ruler of the quiet hours, her voice is the soothing rain after 5 PM.',
      },
      {
        text: 'The Enchanted Rose Princess — Mistress of Classroom Hearts and Stolen Glances.',
        affinity: 'rose',
        lore: 'Whose smile bends the light of eight collegiate hours into pure joy.',
      },
      {
        text: 'The Divine Starlight Sovereign — Blessed on Ganesh Chaturthi with Eternal Devotion.',
        affinity: 'starlight',
        lore: 'Whose union was consecrated under holy skies and destined to conquer all epochs.',
      },
      {
        text: 'The Dark Fantasy Queen — Conqueror of Hostels and Keeper of Ayush\'s Soul.',
        affinity: 'shadow',
        lore: 'Fierce, tender, and forever reigning over the universe Ayush handcrafted for her.',
      },
    ],
  },
];

export const initialPhotos: Photo[] = [
  {
    id: 'photo-1',
    title: 'Hamari Pavitra Shuruaat',
    caption: '14 September 2026 — Ganesh Chaturthi ke din Bappa ke aashirwad se shuru hui hamari pyari duniya.',
    imageUrl: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1200&q=80',
    date: '14 September 2026',
    category: 'Milestones',
    featured: true,
    orderIndex: 1,
  },
  {
    id: 'photo-2',
    title: 'Classroom Ki Wo 8 Ghante',
    caption: 'Roz ek doosre ke bagal mein baithna aur bina kuch bole aankhon se baatein karna.',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
    date: 'October 2026',
    category: 'College Days',
    featured: true,
    orderIndex: 2,
  },
  {
    id: 'photo-3',
    title: 'Lunch Break Magic',
    caption: 'Saath mein khana khana... agar Shree na khaye toh Ayush ka bhi mann nahi karta.',
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80',
    date: 'October 2026',
    category: 'Everyday Moments',
    featured: true,
    orderIndex: 3,
  },
  {
    id: 'photo-4',
    title: 'The 6-Hour Midnight Phone Calls',
    caption: 'Jab hostel ki light band hoti hai aur hamari baatein shuru hoti hain.',
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80',
    date: 'November 2026',
    category: 'Late Night',
    featured: true,
    orderIndex: 4,
  },
  {
    id: 'photo-5',
    title: 'Hostel Boundaries, One Heart',
    caption: 'Girls\' Hostel aur Boys\' Hostel ke beech ka fasla sirf physical hai, dil ek hi hai.',
    imageUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1200&q=80',
    date: 'November 2026',
    category: 'Hostel Life',
    featured: false,
    orderIndex: 5,
  },
  {
    id: 'photo-6',
    title: 'My Forever Princess',
    caption: 'Happy Birthday Shree! Aaj ka din aur meri har saans tumhare naam.',
    imageUrl: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1200&q=80',
    date: '7 November 2026',
    category: 'Birthday Special',
    featured: true,
    orderIndex: 6,
  },
];

