# A WORLD MADE FOR SHREE — THE ULTIMATE BIRTHDAY SURPRISE ❤️👑

> An immersive, cinematic, interactive digital universe handcrafted by **Ayush** for his princess **Shree** on her special birthday (**7 November 2026**).

---

## 🌟 Overview & Atmosphere

This is not a static birthday greeting or simple landing page. It is an enchanted digital realm combining **dark fantasy romance, fairytale aesthetics, interactive storytelling, 5 playable games, a permanent photo scrapbook, 15 heartfelt letters, and a live countdown lock system**.

- **Boyfriend:** Ayush
- **Girlfriend:** Shree (Birthday: 7 November 2026)
- **Relationship Began:** 14 September 2026 (Ganesh Chaturthi)
- **Real College Memories:**
  - Same college, same class, sitting beside each other for ~8 hours daily.
  - Sacred ~6-hour nightly phone calls.
  - Same campus with separate hostels (Girls' Hostel vs Boys' Hostel).
  - Strict 5:00 PM hostel curfew.
  - Shared lunch ritual: *If Shree doesn't eat, Ayush doesn't feel like eating, and vice versa.*
  - Same college mentor, shared mindset, and infinite love.

---

## 🔒 The Birthday Access Lock System

- **Public Pre-Birthday State:** Before midnight on **7 November 2026 (Asia/Kolkata)**, normal visitors see **ONLY** the Countdown World.
- All letters, scrapbooks, games, quizzes, and surprises remain strictly locked.
- **Automatic Midnight Unlock:** At 00:00:00 on 7 November 2026, the website automatically unlocks the full birthday celebration for everyone without requiring any manual redeployment or setting changes.

### 🗝️ Ayush's Secret Preview Mode
- A subtle glowing star is embedded in the top corner of the countdown page.
- **Clicking the star 3 times** reveals the mysterious secret access modal.
- Enter the server-verified secret code: `shree7nov`.
- **Security:** Validated completely server-side via `/api/preview/verify` with rate-limiting (max 5 attempts with cooldown). Never exposed in client code or public configurations.

---

## ✨ Features & Experiences

1. **Section A: The Countdown World**
   - Live Days, Hours, Minutes, Seconds countdown in `Asia/Kolkata` time.
   - Romantic animated moon, twinkling starfield, floating rose petals, and locked gift box.
2. **Section B: Grand Birthday Reveal**
   - Dramatic cinematic opening: darkened screen, glowing heart, falling petals, luxury gift box.
   - Interactive multi-tier birthday cake with **animated candle flames**.
   - **Blow Out the Candle:** Support for either direct tap/button **OR microphone breath detection**!
   - Full confetti cannon and fireworks display.
3. **Section C: Our Little Love Story (Interactive Timeline)**
   - Milestones: 14 September 2026 Ganesh Chaturthi, 8 Hours in Class, 6-Hour Calls, Eating Together, 5 PM Curfew, Same Mentor.
   - Clickable milestones revealing Ayush's personal heart notes.
4. **Section D: Letters From Ayush**
   - 15 beautifully written letters in natural Hinglish.
   - Vintage envelopes with wax seals (rose, lavender, gold, wine).
   - Real-time typewriter letter reveal with sound effects.
5. **Section E: Private Photo Scrapbook & Public Image Storage**
   - Direct device upload from the Admin Dashboard (drag & drop, multiple images).
   - **Persistent Storage:** Photos are stored permanently with public URLs (`/uploads/...` locally or Supabase Storage bucket `birthday-scrapbook`).
   - Multiple layouts: Vintage Polaroid Scrapbook, Cinematic Grid, and Full-Screen Lightbox.
6. **Section F: 5 Fully Functional Romantic Games**
   - **Game 1: How Well Do You Know Us?** — 15 personalized questions about their real story with romantic scoring tiers.
   - **Game 2: Find My Heart** — Search through an enchanted chamber for 5 hidden glowing hearts.
   - **Game 3: Unlock My Love Letters** — Decrypt 3 relationship riddles to unseal secret confessions.
   - **Game 4: Dark Fantasy Love Quiz** — Branching dark fantasy choices across 4 Acts, awarding custom royal destiny titles.
   - **Game 5: Catch the Falling Hearts** — Full canvas arcade mini-game with basket controls, timers, difficulty levels, and celebratory confetti!
7. **Section G: The Memory Wall**
   - *"Little Things, Infinite Memories"* — Real college quotes with interactive heart counters.
8. **Section H: 30 Reasons I Love You**
   - 30 distinct heartfelt reasons organized into categories (Everyday, College, Hostel, Heart), with random shuffle spotlight.
9. **Section I: A Special Birthday Message**
   - *"One More Thing, My Princess..."* — A deep, emotional epistle with ambient typing reveal.
10. **Section J: The Final Surprise**
    - Locked treasure chest at the bottom of the world with magical key interaction, grand fanfare, and final fireworks.
11. **Ambient Procedural Music Player**
    - Gentle Web Audio harp/chime arpeggios in romantic Pentatonic scale, volume slider, mute, and visualizer.
12. **Admin Dashboard (`/admin`)**
    - Secure password-protected dashboard to upload photos, edit letters, customize countdown settings, and toggle testing mode.

---

## 🚀 Quick Start (Running Locally)

### 1. Prerequisites
- Node.js (v18 or higher)
- npm or pnpm

### 2. Installation
\`\`\`bash
npm install
# or
pnpm install
\`\`\`

### 3. Run Development Server
\`\`\`bash
npm run dev
# or
pnpm run dev
\`\`\`

The website will be live at: **[http://localhost:3000](http://localhost:3000)**

---

## 🔑 Default Credentials

| Item | Value |
|---|---|
| **Admin Dashboard URL** | `/admin` or [http://localhost:3000/admin](http://localhost:3000/admin) |
| **Admin Username** | `ayush` |
| **Admin Password** | `shreeforever2026` |
| **Secret 3-Click Preview Code** | `shree7nov` |
| **Birthday Target Date** | `2026-11-07T00:00:00+05:30` |

*(All credentials can be changed in `.env.local` or through the Admin Dashboard settings tab).*

---

## ☁️ Cloud Storage & Supabase Setup (Optional)

The application works 100% out of the box with zero external dependencies using built-in persistent storage. 

If you wish to link Supabase Cloud:
1. Open your Supabase project dashboard.
2. Go to the **SQL Editor** and execute the provided `SUPABASE_SETUP.sql` script.
3. Copy your project URL and keys to `.env.local`:
   \`\`\`env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   SUPABASE_BUCKET=birthday-scrapbook
   \`\`\`
4. Restart the server. Any new photo uploaded in the admin dashboard will automatically upload to Supabase Storage with public delivery!

---

## 🚢 Deployment to Vercel / Netlify

1. Push your repository to GitHub:
   \`\`\`bash
   git add .
   git commit -m "A World Made for Shree - Complete Production Release"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   \`\`\`
2. Import the repository into [Vercel](https://vercel.com).
3. Add the environment variables from `.env.example`.
4. Click **Deploy**. Your live surprise website is ready for Princess Shree!

---

*Made with infinite love by Ayush for Shree. ❤️*
