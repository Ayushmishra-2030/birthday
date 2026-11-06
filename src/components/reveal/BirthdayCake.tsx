'use client';

import React, { useState } from 'react';
import { Flame, Sparkles, Heart } from 'lucide-react';
import { sound } from '@/lib/sound';

interface BirthdayCakeProps {
  isCandleBlown: boolean;
  onBlowCandle: () => void;
  showAge20?: boolean;
}

export default function BirthdayCake({
  isCandleBlown,
  onBlowCandle,
  showAge20 = false,
}: BirthdayCakeProps) {
  const [isCakeCut, setIsCakeCut] = useState(false);
  const [knifeCutting, setKnifeCutting] = useState(false);
  const [sliceEaten, setSliceEaten] = useState(false);

  const handleCutCake = () => {
    if (isCakeCut || knifeCutting) return;
    setKnifeCutting(true);
    sound.playChime(880, 0.4);

    setTimeout(() => {
      sound.playChime(1174.66, 0.6);
      setIsCakeCut(true);
      setKnifeCutting(false);
      sound.playCakeCut();
    }, 700);
  };

  const handleEatSlice = () => {
    setSliceEaten(true);
    sound.playHeartCatch();
  };

  return (
    <div className="relative w-full max-w-[340px] xs:max-w-[380px] sm:max-w-[430px] md:max-w-[480px] mx-auto select-none flex flex-col items-center">
      {/* SVG Birthday Cake */}
      <div className="relative w-full">
        <svg
          viewBox="0 0 500 450"
          className="w-full h-auto drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)] overflow-visible"
          style={{ willChange: 'transform' }}
        >
          <defs>
            {/* Ambient Shadow & Glow Filters */}
            <filter id="soft-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            <filter id="flame-blur" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3.5" />
            </filter>

            <filter id="plate-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="18" stdDeviation="14" floodColor="#040208" floodOpacity="0.9" />
            </filter>

            {/* Pedestal Metallic Gold Gradients */}
            <linearGradient id="pedestal-gold" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7a5814" />
              <stop offset="25%" stopColor="#d4af37" />
              <stop offset="50%" stopColor="#fff3b0" />
              <stop offset="75%" stopColor="#d4af37" />
              <stop offset="100%" stopColor="#5c3f0b" />
            </linearGradient>

            <linearGradient id="pedestal-lip" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fff7d6" />
              <stop offset="50%" stopColor="#d4af37" />
              <stop offset="100%" stopColor="#7a5814" />
            </linearGradient>

            {/* Bottom Tier (Deep Velvet Wine & Dark Chocolate Ganache) */}
            <linearGradient id="bottom-tier-body" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#220513" />
              <stop offset="20%" stopColor="#430a24" />
              <stop offset="55%" stopColor="#5f1337" />
              <stop offset="85%" stopColor="#37071d" />
              <stop offset="100%" stopColor="#18030d" />
            </linearGradient>

            <linearGradient id="bottom-tier-top" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6b153e" />
              <stop offset="50%" stopColor="#872152" />
              <stop offset="100%" stopColor="#4c0c2a" />
            </linearGradient>

            <linearGradient id="chocolate-drips" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4a081a" />
              <stop offset="60%" stopColor="#28030c" />
              <stop offset="100%" stopColor="#130105" />
            </linearGradient>

            {/* Middle Tier (Strawberry Blossom & Rose Silk Cream) */}
            <linearGradient id="mid-tier-body" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4d112b" />
              <stop offset="25%" stopColor="#96295a" />
              <stop offset="55%" stopColor="#c24479" />
              <stop offset="85%" stopColor="#7a1c45" />
              <stop offset="100%" stopColor="#3e0a21" />
            </linearGradient>

            <linearGradient id="mid-tier-top" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d1578c" />
              <stop offset="50%" stopColor="#e37ca9" />
              <stop offset="100%" stopColor="#9b2f61" />
            </linearGradient>

            {/* Top Tier (French Vanilla & Champagne Ivory Cream) */}
            <linearGradient id="top-tier-body" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7c6066" />
              <stop offset="25%" stopColor="#e2c8cb" />
              <stop offset="55%" stopColor="#fff2f3" />
              <stop offset="85%" stopColor="#dfbec3" />
              <stop offset="100%" stopColor="#684a51" />
            </linearGradient>

            <linearGradient id="top-tier-top" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fff9fa" />
              <stop offset="50%" stopColor="#ffeaed" />
              <stop offset="100%" stopColor="#eed0d5" />
            </linearGradient>

            {/* Royal Gold Candles */}
            <linearGradient id="candle-body" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#966d18" />
              <stop offset="35%" stopColor="#ffd86b" />
              <stop offset="60%" stopColor="#fff7d6" />
              <stop offset="100%" stopColor="#966d18" />
            </linearGradient>

            {/* Realistic Candle Flame Gradients */}
            <radialGradient id="flame-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffb703" stopOpacity="0.8" />
              <stop offset="45%" stopColor="#fb8500" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#fb8500" stopOpacity="0" />
            </radialGradient>

            <linearGradient id="flame-outer" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#219ebc" />
              <stop offset="15%" stopColor="#fb8500" />
              <stop offset="65%" stopColor="#ffb703" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>

            {/* Sponge Slice Inside Texture */}
            <linearGradient id="cake-sponge-interior" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d48c46" />
              <stop offset="30%" stopColor="#fbe0b5" />
              <stop offset="50%" stopColor="#931338" />
              <stop offset="70%" stopColor="#fbe0b5" />
              <stop offset="100%" stopColor="#3d1b10" />
            </linearGradient>
          </defs>

          {/* Table Surface Cast Shadow */}
          <ellipse cx="250" cy="415" rx="210" ry="24" fill="#040209" opacity="0.9" />
          <ellipse cx="250" cy="412" rx="170" ry="16" fill="#0c0617" opacity="0.75" />

          {/* ======================================================== */}
          {/* ROYAL GOLD CAKE PEDESTAL STAND                          */}
          {/* ======================================================== */}
          <g id="cake-pedestal">
            {/* Stand Base */}
            <ellipse cx="250" cy="405" rx="140" ry="20" fill="url(#pedestal-gold)" filter="url(#plate-shadow)" />
            <path d="M 110 405 C 110 415, 390 415, 390 405 L 375 414 C 375 422, 125 422, 125 414 Z" fill="#69480a" />
            <ellipse cx="250" cy="402" rx="125" ry="14" fill="#2d1c02" />

            {/* Pedestal Central Fluted Column */}
            <path
              d="M 230 402 C 228 350, 218 310, 215 295 L 285 295 C 282 310, 272 350, 270 402 Z"
              fill="url(#pedestal-gold)"
            />
            {/* Column specular ribbing */}
            <line x1="250" y1="295" x2="250" y2="402" stroke="#fff7d6" strokeWidth="2.5" opacity="0.6" />

            {/* Stand Main Platter Under-bevel */}
            <ellipse cx="250" cy="298" rx="198" ry="34" fill="#4d3408" />
            <path d="M 52 298 C 52 310, 448 310, 448 298 L 448 304 C 448 316, 52 316, 52 304 Z" fill="url(#pedestal-lip)" />

            {/* Stand Top Plate (Reflective Mirror Surface) */}
            <ellipse cx="250" cy="296" rx="196" ry="33" fill="url(#pedestal-gold)" />
            <ellipse cx="250" cy="294" rx="192" ry="31" fill="#fff9e0" opacity="0.3" />
            <ellipse cx="250" cy="294" rx="188" ry="29" fill="#150818" />

            {/* Plate Rim Pearl Dots */}
            {Array.from({ length: 30 }).map((_, i) => {
              const angle = (i / 30) * Math.PI;
              const px = 250 + 192 * Math.cos(angle);
              const py = 296 + 31 * Math.sin(angle);
              return (
                <circle key={i} cx={px} cy={py} r="2" fill="#fff7d6" opacity="0.8" />
              );
            })}
          </g>

          {/* ======================================================== */}
          {/* TIER 1: BOTTOM TIER (Dark Wine Velvet & Belgian Chocolate)*/}
          {/* ======================================================== */}
          <g id="bottom-tier">
            {/* Cylinder Body */}
            <path
              d="M 75 220 C 75 258, 425 258, 425 220 L 425 285 C 425 323, 75 323, 75 285 Z"
              fill="url(#bottom-tier-body)"
            />

            {/* Base Sugar Pearls Trim */}
            {Array.from({ length: 26 }).map((_, i) => {
              const angle = (i / 26) * Math.PI;
              const px = 250 + 172 * Math.cos(angle);
              const py = 286 + 28 * Math.sin(angle);
              return (
                <g key={i}>
                  <circle cx={px} cy={py} r="3.5" fill="#fdf2f4" />
                  <circle cx={px - 1} cy={py - 1} r="1.2" fill="#ffffff" />
                </g>
              );
            })}

            {/* Bottom Tier Top Ellipse */}
            <ellipse cx="250" cy="220" rx="175" ry="36" fill="url(#bottom-tier-top)" />

            {/* Dripping Chocolate Ganache Glaze */}
            <path
              d="M 75 220 
                 C 85 240, 100 248, 110 236
                 C 120 224, 130 252, 142 250
                 C 155 248, 165 232, 180 238
                 C 195 244, 210 260, 222 258
                 C 235 256, 245 234, 255 240
                 C 265 246, 275 264, 290 262
                 C 305 260, 315 238, 330 242
                 C 345 246, 355 258, 370 252
                 C 385 246, 400 232, 425 220
                 C 425 220, 425 220, 425 220
                 C 425 258, 75 258, 75 220 Z"
              fill="url(#chocolate-drips)"
              opacity="0.95"
            />

            {/* Gold Filigree Ribbon along tier */}
            <path
              d="M 77 272 C 160 304, 340 304, 423 272"
              fill="none"
              stroke="#ffd86b"
              strokeWidth="2"
              strokeDasharray="4 6"
              opacity="0.65"
            />
          </g>

          {/* ======================================================== */}
          {/* TIER 2: MIDDLE TIER (Strawberry Blossom & Rose Silk)     */}
          {/* ======================================================== */}
          <g id="middle-tier">
            {/* Cylinder Body */}
            <path
              d="M 120 155 C 120 188, 380 188, 380 155 L 380 216 C 380 249, 120 249, 120 216 Z"
              fill="url(#mid-tier-body)"
            />

            {/* Base Frosting Piping */}
            {Array.from({ length: 22 }).map((_, i) => {
              const angle = (i / 22) * Math.PI;
              const px = 250 + 128 * Math.cos(angle);
              const py = 217 + 22 * Math.sin(angle);
              return (
                <ellipse key={i} cx={px} cy={py} rx="4" ry="3" fill="#ffb4cf" opacity="0.9" />
              );
            })}

            {/* Middle Tier Top Ellipse */}
            <ellipse cx="250" cy="155" rx="130" ry="28" fill="url(#mid-tier-top)" />

            {/* Delicate White Buttercream Rosettes along top edge */}
            {Array.from({ length: 18 }).map((_, i) => {
              const angle = (i / 18) * Math.PI;
              const px = 250 + 128 * Math.cos(angle);
              const py = 156 + 26 * Math.sin(angle);
              return (
                <g key={i}>
                  <circle cx={px} cy={py} r="4.5" fill="#fff5f7" />
                  <circle cx={px - 0.8} cy={py - 0.8} r="2.2" fill="#ffd1de" />
                </g>
              );
            })}
          </g>

          {/* ======================================================== */}
          {/* TIER 3: TOP TIER (French Vanilla & Champagne Cream)     */}
          {/* ======================================================== */}
          <g id="top-tier">
            {/* Cylinder Body */}
            <path
              d="M 165 95 C 165 122, 335 122, 335 95 L 335 152 C 335 179, 165 179, 165 152 Z"
              fill="url(#top-tier-body)"
            />

            {/* Top Tier Top Ellipse */}
            <ellipse cx="250" cy="95" rx="85" ry="19" fill="url(#top-tier-top)" />

            {/* Scalloped Sugar Piping */}
            <path
              d="M 166 102 C 200 120, 300 120, 334 102"
              fill="none"
              stroke="#ffccd5"
              strokeWidth="2.5"
            />

            {/* Royal Gold Cartouche Sugar Plaque with "Princess Shree" */}
            <g id="cake-plaque">
              <rect
                x="195"
                y="114"
                width="110"
                height="24"
                rx="12"
                fill="#2c0a18"
                stroke="#ffd86b"
                strokeWidth="1.5"
                filter="url(#plate-shadow)"
              />
              <text
                x="250"
                y="130"
                textAnchor="middle"
                fontFamily="'Cinzel', 'Playfair Display', serif"
                fontSize="10"
                fontWeight="bold"
                letterSpacing="1.5"
                fill="#ffea9f"
              >
                SHREE
              </text>
            </g>

            {/* Glazed Fresh Berries on Cake Top */}
            {/* Strawberries & Blueberries */}
            <g id="cake-topper-berries">
              <circle cx="190" cy="95" r="5" fill="#800e26" />
              <circle cx="189" cy="94" r="1.5" fill="#ff758f" />

              <circle cx="215" cy="102" r="6" fill="#b91c1c" />
              <circle cx="213" cy="100" r="1.8" fill="#fca5a5" />

              <circle cx="285" cy="102" r="6" fill="#b91c1c" />
              <circle cx="283" cy="100" r="1.8" fill="#fca5a5" />

              <circle cx="310" cy="95" r="5" fill="#800e26" />
              <circle cx="309" cy="94" r="1.5" fill="#ff758f" />

              {/* Gold Sugar Leaves */}
              <path d="M 200 98 Q 206 93, 208 100 Q 202 105, 200 98 Z" fill="#ffd700" opacity="0.9" />
              <path d="M 295 98 Q 289 93, 287 100 Q 293 105, 295 98 Z" fill="#ffd700" opacity="0.9" />
            </g>
          </g>

          {/* ======================================================== */}
          {/* CANDLES & REALISTIC DYNAMIC FLAMES                       */}
          {/* ======================================================== */}
          <g id="candles-system">
            {/* Optional Gilded Age "20" Topper (Shown only if confirmed by admin) */}
            {showAge20 && (
              <g id="age-20-candle-topper" className="animate-fadeIn">
                <ellipse cx="250" cy="80" rx="26" ry="6" fill="#100516" opacity="0.6" />
                <rect
                  x="232"
                  y="48"
                  width="36"
                  height="24"
                  rx="6"
                  fill="#1f0918"
                  stroke="#ffd86b"
                  strokeWidth="1.5"
                  filter="url(#plate-shadow)"
                />
                <text
                  x="250"
                  y="66"
                  textAnchor="middle"
                  fontFamily="'Cinzel', 'Playfair Display', serif"
                  fontSize="15"
                  fontWeight="900"
                  fill="#ffea9f"
                  filter="url(#soft-glow)"
                >
                  20
                </text>
                {/* Topper Sparkle */}
                <circle cx="236" cy="52" r="1.5" fill="#ffffff" />
              </g>
            )}

            {/* 5 Elegant Royal Tapered Candles */}
            {[
              { id: 1, x: 200, y: 92, height: 28, tilt: -2 },
              { id: 2, x: 225, y: 88, height: 32, tilt: -1 },
              { id: 3, x: 250, y: 85, height: 36, tilt: 0 }, // Center
              { id: 4, x: 275, y: 88, height: 32, tilt: 1 },
              { id: 5, x: 300, y: 92, height: 28, tilt: 2 },
            ].map((candle) => {
              const candleTopY = candle.y - candle.height;
              const wickTopY = candleTopY - 6;

              return (
                <g
                  key={candle.id}
                  transform={`rotate(${candle.tilt} ${candle.x} ${candle.y})`}
                  className="transition-all duration-300"
                >
                  {/* Candle Shadow */}
                  <ellipse cx={candle.x} cy={candle.y} rx="4" ry="2" fill="#14061a" opacity="0.6" />

                  {/* Candle Cylinder */}
                  <rect
                    x={candle.x - 3}
                    y={candleTopY}
                    width="6"
                    height={candle.height}
                    rx="1.5"
                    fill="url(#candle-body)"
                    stroke="#b38728"
                    strokeWidth="0.5"
                  />

                  {/* Spiral Wax Ribbons */}
                  <line
                    x1={candle.x - 3}
                    y1={candleTopY + 8}
                    x2={candle.x + 3}
                    y2={candleTopY + 12}
                    stroke="#ffffff"
                    strokeWidth="0.8"
                    opacity="0.7"
                  />
                  <line
                    x1={candle.x - 3}
                    y1={candleTopY + 16}
                    x2={candle.x + 3}
                    y2={candleTopY + 20}
                    stroke="#ffffff"
                    strokeWidth="0.8"
                    opacity="0.7"
                  />

                  {/* Wick */}
                  <line
                    x1={candle.x}
                    y1={candleTopY}
                    x2={candle.x}
                    y2={wickTopY}
                    stroke="#2b1c10"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />

                  {/* ==================================== */}
                  {/* CANDLE FLAME (Unblown state)         */}
                  {/* ==================================== */}
                  {!isCandleBlown ? (
                    <g
                      className="cursor-pointer"
                      onClick={onBlowCandle}
                      style={{
                        transformOrigin: `${candle.x}px ${wickTopY}px`,
                        animation: `candleFlicker ${1.8 + (candle.id % 3) * 0.4}s ease-in-out infinite alternate`,
                      }}
                    >
                      {/* Ambient Halo Glow */}
                      <circle
                        cx={candle.x}
                        cy={wickTopY - 8}
                        r="18"
                        fill="url(#flame-glow)"
                        filter="url(#flame-blur)"
                        opacity="0.8"
                      />

                      {/* Main Teardrop Flame */}
                      <path
                        d={`M ${candle.x} ${wickTopY + 1}
                            C ${candle.x - 5} ${wickTopY - 6}, ${candle.x - 4} ${wickTopY - 14}, ${candle.x} ${wickTopY - 20}
                            C ${candle.x + 4} ${wickTopY - 14}, ${candle.x + 5} ${wickTopY - 6}, ${candle.x} ${wickTopY + 1} Z`}
                        fill="url(#flame-outer)"
                        filter="url(#soft-glow)"
                      />

                      {/* Inner Hot Golden Core */}
                      <path
                        d={`M ${candle.x} ${wickTopY}
                            C ${candle.x - 2.5} ${wickTopY - 4}, ${candle.x - 2} ${wickTopY - 10}, ${candle.x} ${wickTopY - 14}
                            C ${candle.x + 2} ${wickTopY - 10}, ${candle.x + 2.5} ${wickTopY - 4}, ${candle.x} ${wickTopY} Z`}
                        fill="#ffffff"
                        opacity="0.95"
                      />

                      {/* Base Blue Ignition Seed */}
                      <ellipse cx={candle.x} cy={wickTopY - 1} rx="2" ry="1.5" fill="#38bdf8" opacity="0.9" />
                    </g>
                  ) : (
                    /* ==================================== */
                    /* CANDLE EXTINGUISHED / SMOKE EFFECT   */
                    /* ==================================== */
                    <g>
                      {/* Glowing Ember on Wick */}
                      <circle cx={candle.x} cy={wickTopY} r="1.5" fill="#ff4500">
                        <animate
                          attributeName="opacity"
                          values="1;0.4;1"
                          dur="2s"
                          repeatCount="indefinite"
                        />
                      </circle>

                      {/* Rising Realistic Smoke Wisps */}
                      <path
                        d={`M ${candle.x} ${wickTopY} 
                            Q ${candle.x - 4} ${wickTopY - 12}, ${candle.x + 3} ${wickTopY - 24}
                            T ${candle.x - 2} ${wickTopY - 38}`}
                        fill="none"
                        stroke="#e2e8f0"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        opacity="0"
                      >
                        <animate
                          attributeName="stroke-dasharray"
                          values="0,50; 50,0"
                          dur="2.5s"
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="opacity"
                          values="0.75; 0.3; 0"
                          dur="2.5s"
                          repeatCount="indefinite"
                        />
                        <animateTransform
                          attributeName="transform"
                          type="translate"
                          values="0,0; 0,-15"
                          dur="2.5s"
                          repeatCount="indefinite"
                        />
                      </path>
                    </g>
                  )}
                </g>
              );
            })}
          </g>

          {/* ======================================================== */}
          {/* CAKE SLICE CUTTING ANIMATION                             */}
          {/* ======================================================== */}
          {isCakeCut && (
            <g
              id="cut-slice-wedge"
              transform="translate(32, 14)"
              className="transition-all duration-700 ease-out animate-fadeIn cursor-pointer"
              onClick={handleEatSlice}
            >
              {/* Internal delicious cross-section view */}
              <polygon
                points="250,220 285,250 285,290 250,260"
                fill="url(#cake-sponge-interior)"
                stroke="#ffd86b"
                strokeWidth="1"
              />
              {/* Sponge Layers */}
              <line x1="250" y1="230" x2="285" y2="260" stroke="#fbe0b5" strokeWidth="3" />
              <line x1="250" y1="236" x2="285" y2="266" stroke="#881337" strokeWidth="2.5" />
              <line x1="250" y1="244" x2="285" y2="274" stroke="#fbe0b5" strokeWidth="3" />
              <line x1="250" y1="252" x2="285" y2="282" stroke="#2a0610" strokeWidth="2" />

              {/* Delicious Heart Placed On Top of Slice */}
              <circle cx="270" cy="245" r="4" fill="#ff4d88" />
              <text x="270" y="248" fontSize="6" textAnchor="middle" fill="#ffffff">❤️</text>
            </g>
          )}

          {/* Knife cutting animation */}
          {knifeCutting && (
            <g id="ceremonial-knife" className="animate-bounce">
              <path
                d="M 260 50 L 250 230 L 254 230 L 264 50 Z"
                fill="url(#pedestal-gold)"
                stroke="#ffffff"
                strokeWidth="1"
              />
              <circle cx="262" cy="50" r="5" fill="#9f1239" />
            </g>
          )}
        </svg>

        {/* Ambient Candle Flicker Keyframe style */}
        <style jsx>{`
          @keyframes candleFlicker {
            0% {
              transform: scale(1) rotate(0deg);
              opacity: 0.95;
            }
            25% {
              transform: scale(1.04, 0.96) rotate(-1.5deg);
              opacity: 1;
            }
            50% {
              transform: scale(0.97, 1.05) rotate(1deg);
              opacity: 0.92;
            }
            75% {
              transform: scale(1.02, 0.98) rotate(-0.5deg);
              opacity: 0.98;
            }
            100% {
              transform: scale(1) rotate(0deg);
              opacity: 0.95;
            }
          }
        `}</style>
      </div>

      {/* ======================================================== */}
      {/* CAKE INTERACTIVE CONTROLS                                */}
      {/* ======================================================== */}
      <div className="mt-4 w-full flex flex-col items-center gap-3">
        {!isCandleBlown ? (
          <button
            onClick={onBlowCandle}
            className="group px-6 py-2.5 rounded-full bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 text-white font-serif font-bold text-xs sm:text-sm tracking-wider uppercase shadow-[0_0_25px_rgba(255,77,136,0.5)] hover:shadow-[0_0_35px_rgba(255,77,136,0.8)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 cursor-pointer border border-rose-300/40"
          >
            <Flame className="w-4 h-4 text-amber-300 group-hover:scale-125 transition-transform" />
            <span>Blow Out The Candles, Shree 🎂</span>
            <Sparkles className="w-4 h-4 text-amber-200" />
          </button>
        ) : !isCakeCut ? (
          <div className="flex flex-col items-center gap-2 animate-fadeIn">
            <p className="text-xs sm:text-sm text-amber-200 font-serif italic">
              ✨ Candles blown! Now cut your birthday cake, Princess.
            </p>
            <button
              onClick={handleCutCake}
              disabled={knifeCutting}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 hover:from-amber-400 hover:to-purple-500 text-white font-serif font-bold text-xs sm:text-sm tracking-wider uppercase shadow-[0_0_25px_rgba(251,191,36,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 cursor-pointer border border-amber-300/40"
            >
              <span>🍰 Cut The Cake (First Bite For Ayush & Shree)</span>
            </button>
          </div>
        ) : (
          <div className="p-3 sm:p-4 rounded-2xl bg-gradient-to-r from-rose-950/80 via-purple-950/80 to-rose-950/80 border border-rose-500/40 text-center max-w-sm mx-auto animate-fadeIn shadow-xl">
            <div className="flex items-center justify-center gap-1.5 text-rose-300 font-serif font-bold text-sm">
              <Heart className="w-4 h-4 fill-rose-500 text-rose-500 animate-pulse" />
              <span>Happy Birthday Shree! 🍰</span>
              <Heart className="w-4 h-4 fill-rose-500 text-rose-500 animate-pulse" />
            </div>
            <p className="text-xs text-rose-200/90 mt-1 font-sans">
              Pehela piece humesha mere hath se Shree ke liye... May every day be filled with sweetness! ❤️
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
