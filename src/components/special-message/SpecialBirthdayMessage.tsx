'use client';

import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Feather } from 'lucide-react';

export default function SpecialBirthdayMessage() {
  const fullLetter = `Meri pyari Princess Shree,

Sach boloon toh words hamesha kam pad jaate hain jab baat tumhari aati hai. Aaj tumhara birthday hai, aur main chahta hoon ki tum is pal ko apni aankhein band karke mehsoos karo.

14 September 2026 ko Ganesh Chaturthi ke din jab Bappa ne hamara rishta banaya tha, mujhe andaza bhi nahi tha ki meri zindagi itni khoobsurat mod legi. Ek hi class mein padhna, subah aakar ek doosre ko dekh kar smile karna, aur lagbhag 8 ghante tak ek doosre ke bagal mein baithna — yeh sab meri aadat nahi, meri zindagi ki sabse badi zaroorat ban gaya hai.

Roz shaam ko 5 PM ka curfew jab hume alag karta hai, girls' hostel aur boys' hostel ke darwaze band ho jaate hain... tab dil kitna udas hota hai yeh bas hum dono jaante hain. Lekin phir shuru hoti hain hamari wo 6 ghante lambi midnight calls! Pata hai Shree, jab poori duniya so rahi hoti hai aur hum phone par ek doosre ki saansein sun rahe hote hain, mujhe lagta hai ki is duniya mein mere liye tumhare alawa kuch aur zaroori nahi hai.

Aur hamara wo lunch ka ritual — jab tak tum khana nahi khati, mera bhi gala sookh jaata hai. Hamara same mentor, hamari same thinking, hamara ek jaisa mindset... Bhagwan ne sach mein hume ek doosre ke liye hi design kiya hai.

Aaj ke din, meri sabse badi khwahish yeh hai ki tum hamesha muskuraati raho. Tumhe kabhi koi dukh chhoo bhi na sake. Main hamesha tumhare saath khada rahoonga — chahe college ke exams hon, hostel ki pabandiyan hon, ya zindagi ka koi bhi toofaan.

You are loved, you are valued, you are respected, and you are celebrated every single breath of my life.

Happy Birthday, My Princess. I love you beyond infinity. ❤️

Yours forever and always,
Ayush`;

  const [displayedText, setDisplayedText] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    // Start typing when section comes into view or automatically
    const timer = setTimeout(() => {
      setStarted(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!started) return;

    let index = 0;
    const interval = setInterval(() => {
      if (index < fullLetter.length) {
        setDisplayedText(fullLetter.slice(0, index + 1));
        index += 2;
      } else {
        setDisplayedText(fullLetter);
        clearInterval(interval);
      }
    }, 18);

    return () => clearInterval(interval);
  }, [started, fullLetter]);

  return (
    <section id="special-letter" className="relative py-24 px-4 max-w-4xl mx-auto z-20">
      {/* Header */}
      <div className="text-center mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-950/80 border border-rose-500/40 text-amber-300 text-xs md:text-sm font-semibold tracking-wider uppercase shadow-lg">
          <Feather className="w-4 h-4 text-rose-400" />
          <span>A Deep Heartfelt Birthday Epistle</span>
        </div>

        <h2 className="text-3xl md:text-5xl font-serif font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-amber-100 to-purple-200 drop-shadow">
          One More Thing, My Princess...
        </h2>

        <p className="text-sm md:text-base text-rose-200/80 font-sans italic">
          Ayush ke dil ki sabse gehri aawaz, khaas Shree ke 7 November birthday ke liye.
        </p>
      </div>

      {/* Ornate Parchment Letter */}
      <div className="relative p-7 md:p-12 rounded-3xl bg-gradient-to-b from-[#1e0e2e]/95 via-[#13071f]/95 to-[#0b0412]/95 border-2 border-rose-500/40 shadow-[0_0_80px_rgba(255,77,136,0.35)] backdrop-blur-xl">
        {/* Glow corners */}
        <div className="absolute top-0 right-0 w-44 h-44 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-44 h-44 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative font-serif text-slate-100 leading-relaxed text-sm md:text-base md:leading-loose whitespace-pre-line space-y-4">
          {displayedText}
        </div>

        <div className="mt-8 pt-6 border-t border-purple-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-purple-300/70 font-sans">
          <div className="flex items-center gap-2 text-rose-400">
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
            <span>Dedicated with eternal devotion</span>
          </div>
          <div className="text-amber-300 font-serif italic text-sm">
            Ayush loves Shree forever ❤️
          </div>
        </div>
      </div>
    </section>
  );
}
