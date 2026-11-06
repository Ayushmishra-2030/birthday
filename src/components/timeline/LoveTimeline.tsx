'use client';

import React, { useState } from 'react';
import { TimelineEvent } from '@/types';
import { Sparkles, Heart, Clock, Coffee, Moon, BookOpen, Flame, Calendar, X, ChevronRight } from 'lucide-react';
import { sound } from '@/lib/sound';

interface LoveTimelineProps {
  events: TimelineEvent[];
}

export default function LoveTimeline({ events }: LoveTimelineProps) {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-amber-300" />;
      case 'BookOpen':
        return <BookOpen className="w-5 h-5 text-rose-300" />;
      case 'Coffee':
        return <Coffee className="w-5 h-5 text-amber-200" />;
      case 'Clock':
        return <Clock className="w-5 h-5 text-purple-300" />;
      case 'Moon':
        return <Moon className="w-5 h-5 text-indigo-300" />;
      case 'Flame':
        return <Flame className="w-5 h-5 text-orange-400" />;
      case 'Calendar':
        return <Calendar className="w-5 h-5 text-rose-400" />;
      default:
        return <Heart className="w-5 h-5 text-rose-400" />;
    }
  };

  const handleCardClick = (event: TimelineEvent) => {
    sound.playChime(660, 0.5);
    setSelectedEvent(event);
  };

  return (
    <section id="our-story" className="relative py-20 px-4 max-w-6xl mx-auto z-20">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/80 border border-purple-500/30 text-rose-300 text-xs md:text-sm">
          <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
          <span>Our Little Love Story</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-amber-100 to-purple-200">
          From 14 September to Eternity
        </h2>
        <p className="text-sm md:text-base text-purple-200/80 font-sans">
          Ganesh Chaturthi ke pavitra aashirwad se shuru hui hamari pyari si dastaan. Click any milestone to reveal Ayush&apos;s personal note.
        </p>
      </div>

      {/* Timeline Tree */}
      <div className="relative">
        {/* Central glowing vertical line */}
        <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 bg-gradient-to-b from-rose-500/20 via-purple-500 to-amber-400/20 shadow-[0_0_15px_rgba(168,85,247,0.5)]" />

        <div className="space-y-12">
          {events.map((event, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={event.id}
                className={`relative flex flex-col md:flex-row items-start md:items-center ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Milestone Node on Center Line */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-purple-900 to-rose-900 border-2 border-rose-400 shadow-[0_0_20px_rgba(255,77,136,0.6)]">
                  {getIcon(event.iconName)}
                </div>

                {/* Event Card */}
                <div
                  onClick={() => handleCardClick(event)}
                  className={`ml-12 md:ml-0 md:w-5/12 p-6 rounded-2xl bg-gradient-to-b from-[#180f29]/90 to-[#0e081a]/95 border border-purple-500/30 hover:border-rose-400/60 shadow-[0_8px_30px_rgba(0,0,0,0.4)] backdrop-blur-md cursor-pointer transition-all duration-300 hover:scale-[1.02] group ${
                    isEven ? 'md:mr-auto md:text-right' : 'md:ml-auto md:text-left'
                  }`}
                >
                  <div
                    className={`flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-wider text-amber-300 ${
                      isEven ? 'md:justify-end' : 'md:justify-start'
                    }`}
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{event.date}</span>
                  </div>

                  <h3 className="text-xl font-serif font-bold text-white group-hover:text-rose-300 transition-colors mb-2">
                    {event.title}
                  </h3>

                  <p className="text-sm text-purple-200/80 leading-relaxed mb-4">
                    {event.description}
                  </p>

                  <div
                    className={`inline-flex items-center gap-1.5 text-xs text-rose-300 font-medium group-hover:underline ${
                      isEven ? 'md:justify-end' : 'md:justify-start'
                    }`}
                  >
                    <span>Read Ayush&apos;s Heart Note</span>
                    <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Romantic Milestone Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg p-7 rounded-2xl bg-gradient-to-b from-[#1d1230] to-[#0d0717] border border-rose-500/40 shadow-[0_0_50px_rgba(255,77,136,0.3)] text-white">
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-full bg-rose-600/20 border border-rose-400/40">
                {getIcon(selectedEvent.iconName)}
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-amber-300 font-semibold">
                  {selectedEvent.date}
                </span>
                <h4 className="text-xl font-serif font-bold text-white">
                  {selectedEvent.title}
                </h4>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-500/20 mb-4">
              <p className="text-xs md:text-sm text-purple-200/90 leading-relaxed">
                {selectedEvent.description}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-rose-400 text-xs font-serif font-semibold uppercase tracking-wider">
                <Heart className="w-3.5 h-3.5 fill-rose-500" />
                <span>Ayush&apos;s Personal Note for Shree:</span>
              </div>
              <p className="text-sm md:text-base text-rose-100/95 font-serif italic leading-relaxed bg-black/40 p-4 rounded-xl border border-rose-500/20">
                &ldquo;{selectedEvent.romanticNote}&rdquo;
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
