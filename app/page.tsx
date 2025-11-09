'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="w-full">
      <HeroSection />
      <WhyChooseSection />
      <CoursesSection />
      <FacultySection />
      <TestimonialsSection />
      <AnnouncementsSection />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white pt-16 pb-16 lg:pt-20 lg:pb-20 overflow-hidden">
      {/* Ambient sparkle + warm glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[120%] h-[120%] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(251,191,36,0.07),transparent_55%)]" />
      </div>

      {/* Background decorative elements - Books and IAS symbols */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
        {/* Floating books - left side */}
        <div className="absolute left-[5%] top-[15%] w-20 h-28 bg-gradient-to-br from-amber-400/30 to-amber-600/20 transform -rotate-12 rounded-sm shadow-xl">
          <div className="absolute inset-x-0 top-0 h-1 bg-amber-300/50"></div>
          <div className="absolute inset-1 flex flex-col gap-0.5 p-1">
            <div className="h-0.5 bg-slate-700/40 w-3/4"></div>
            <div className="h-0.5 bg-slate-700/40 w-full"></div>
            <div className="h-0.5 bg-slate-700/40 w-2/3"></div>
          </div>
        </div>
        <div className="absolute left-[8%] top-[60%] w-16 h-24 bg-gradient-to-br from-blue-400/25 to-blue-600/15 transform rotate-6 rounded-sm shadow-lg">
          <div className="absolute inset-x-0 top-0 h-1 bg-blue-300/40"></div>
        </div>
        
        {/* Floating books - right side */}
        <div className="absolute right-[6%] top-[20%] w-24 h-32 bg-gradient-to-br from-amber-500/30 to-amber-700/20 transform rotate-15 rounded-sm shadow-xl">
          <div className="absolute inset-x-0 top-0 h-1 bg-amber-300/50"></div>
          <div className="absolute inset-1 flex flex-col gap-0.5 p-1">
            <div className="h-0.5 bg-slate-700/40 w-4/5"></div>
            <div className="h-0.5 bg-slate-700/40 w-full"></div>
          </div>
        </div>
        <div className="absolute right-[10%] top-[65%] w-18 h-26 bg-gradient-to-br from-blue-400/25 to-blue-600/15 transform -rotate-8 rounded-sm shadow-lg">
          <div className="absolute inset-x-0 top-0 h-1 bg-blue-300/40"></div>
        </div>

        {/* IAS emblem/badge style elements */}
        <div className="absolute left-[15%] top-[35%] w-16 h-16 border-2 border-amber-400/20 rounded-full flex items-center justify-center">
          <div className="w-12 h-12 border border-amber-400/15 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-amber-400/25" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        </div>
        <div className="absolute right-[18%] top-[40%] w-20 h-20 border-2 border-blue-400/15 rounded-full flex items-center justify-center transform rotate-12">
          <div className="w-16 h-16 border border-blue-400/10 rounded-full flex items-center justify-center text-blue-400/20 font-bold text-xs">
            IAS
          </div>
        </div>

        {/* Laurel wreaths */}
        <div className="absolute left-[25%] top-[8%] w-12 h-12 opacity-30">
          <svg className="w-full h-full text-amber-400/40" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
            <path d="M12 6l1.45 4.46h4.69L15.23 13l1.45 4.46L12 14.92 7.32 17.46 8.77 13 5.86 10.46h4.69z"/>
          </svg>
        </div>
        <div className="absolute right-[28%] top-[85%] w-14 h-14 opacity-25">
          <svg className="w-full h-full text-amber-400/35" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
          </svg>
        </div>

        {/* Study notes/documents scattered */}
        <div className="absolute left-[35%] top-[5%] w-24 h-16 bg-white/5 transform -rotate-6 rounded shadow-md">
          <div className="p-2 space-y-1">
            <div className="h-0.5 bg-slate-600/30 w-3/4"></div>
            <div className="h-0.5 bg-slate-600/30 w-full"></div>
            <div className="h-0.5 bg-slate-600/30 w-1/2"></div>
          </div>
        </div>
        <div className="absolute right-[32%] top-[8%] w-20 h-14 bg-white/5 transform rotate-8 rounded shadow-md">
          <div className="p-2 space-y-1">
            <div className="h-0.5 bg-slate-600/30 w-2/3"></div>
            <div className="h-0.5 bg-slate-600/30 w-full"></div>
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">

          {/* Characters cluster - fully blended with background */}
          <div className="relative w-full flex justify-center">
            {/* Glass crystal shards - left side */}
            <div className="absolute left-[5%] top-[20%] w-32 h-48 opacity-20 pointer-events-none z-5">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-300/40 via-blue-200/20 to-transparent rotate-12 blur-sm" 
                   style={{ clipPath: 'polygon(50% 0%, 100% 40%, 80% 100%, 20% 100%, 0% 40%)' }} />
              <div className="absolute inset-0 bg-gradient-to-tl from-white/30 via-transparent to-transparent rotate-12"
                   style={{ clipPath: 'polygon(50% 0%, 100% 40%, 80% 100%, 20% 100%, 0% 40%)' }} />
            </div>
            <div className="absolute left-[8%] top-[55%] w-24 h-36 opacity-15 pointer-events-none z-5">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-200/30 via-blue-100/15 to-transparent -rotate-6 blur-sm"
                   style={{ clipPath: 'polygon(50% 0%, 100% 35%, 85% 100%, 15% 100%, 0% 35%)' }} />
            </div>

            {/* Glass crystal shards - right side */}
            <div className="absolute right-[5%] top-[25%] w-28 h-44 opacity-20 pointer-events-none z-5">
              <div className="absolute inset-0 bg-gradient-to-bl from-blue-300/40 via-blue-200/20 to-transparent -rotate-12 blur-sm"
                   style={{ clipPath: 'polygon(50% 0%, 100% 40%, 80% 100%, 20% 100%, 0% 40%)' }} />
              <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-transparent to-transparent -rotate-12"
                   style={{ clipPath: 'polygon(50% 0%, 100% 40%, 80% 100%, 20% 100%, 0% 40%)' }} />
            </div>
            <div className="absolute right-[7%] top-[60%] w-20 h-32 opacity-15 pointer-events-none z-5">
              <div className="absolute inset-0 bg-gradient-to-bl from-blue-200/30 via-blue-100/15 to-transparent rotate-8 blur-sm"
                   style={{ clipPath: 'polygon(50% 0%, 100% 35%, 85% 100%, 15% 100%, 0% 35%)' }} />
            </div>

            {/* Smaller crystal fragments floating around */}
            <div className="absolute left-[15%] top-[15%] w-12 h-16 opacity-25 pointer-events-none z-5">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-200/40 via-transparent to-transparent rotate-45 blur-[2px]"
                   style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
            </div>
            <div className="absolute right-[12%] top-[18%] w-10 h-14 opacity-25 pointer-events-none z-5">
              <div className="absolute inset-0 bg-gradient-to-bl from-amber-200/40 via-transparent to-transparent -rotate-30 blur-[2px]"
                   style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
            </div>
            <div className="absolute left-[18%] top-[70%] w-14 h-18 opacity-20 pointer-events-none z-5">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-200/35 via-transparent to-transparent rotate-15 blur-[2px]"
                   style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
            </div>
            <div className="absolute right-[16%] top-[75%] w-12 h-16 opacity-20 pointer-events-none z-5">
              <div className="absolute inset-0 bg-gradient-to-bl from-blue-200/35 via-transparent to-transparent -rotate-20 blur-[2px]"
                   style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
            </div>

            {/* 3D AMIGOS text with semi-circle background */}
            <div className="absolute top-[5%] left-1/2 -translate-x-1/2 z-0 pointer-events-none">
              {/* Semi-circle glow backdrop */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] rounded-t-full bg-gradient-to-b from-amber-400/15 via-amber-400/8 to-transparent blur-2xl" />
              
              {/* Diamond/Faceted 3D AMIGOS IAS text in white */}
              <h1 
                className="text-7xl md:text-8xl font-black tracking-wider relative text-white"
                style={{
                  textShadow: `
                    2px 2px 0px rgba(200, 200, 200, 0.9),
                    4px 4px 0px rgba(160, 160, 160, 0.8),
                    6px 6px 0px rgba(120, 120, 120, 0.7),
                    8px 8px 0px rgba(80, 80, 80, 0.6),
                    10px 10px 0px rgba(50, 50, 50, 0.5),
                    12px 12px 0px rgba(30, 30, 30, 0.4),
                    14px 14px 0px rgba(20, 20, 20, 0.3),
                    0 0 40px rgba(255, 255, 255, 0.3),
                    0 0 80px rgba(255, 255, 255, 0.2)
                  `,
                  filter: `
                    drop-shadow(3px 3px 2px rgba(0,0,0,0.5))
                    drop-shadow(6px 6px 4px rgba(0,0,0,0.4))
                    drop-shadow(9px 9px 6px rgba(0,0,0,0.3))
                    drop-shadow(12px 12px 8px rgba(0,0,0,0.2))
                  `,
                  transform: 'perspective(1000px) rotateX(-8deg) rotateY(2deg)',
                  transformStyle: 'preserve-3d'
                }}
              >
                AMIGOS IAS
              </h1>
              
              {/* Bright highlight on top */}
              <h1 
                className="absolute top-0 left-0 text-7xl md:text-8xl font-black tracking-wider"
                style={{
                  background: 'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.7) 40%, transparent 70%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  transform: 'perspective(1000px) rotateX(-8deg) rotateY(2deg)',
                  mixBlendMode: 'overlay'
                }}
              >
                AMIGOS IAS
              </h1>
              
              {/* Deep shadow layers for 3D depth */}
              <div 
                className="absolute top-3 left-3 w-full text-7xl md:text-8xl font-black tracking-wider -z-10 opacity-40"
                style={{
                  color: '#1e293b',
                  filter: 'blur(6px)',
                  transform: 'perspective(1000px) rotateX(-8deg) rotateY(2deg) translateZ(-20px)'
                }}
              >
                AMIGOS IAS
              </div>
              <div 
                className="absolute top-6 left-6 w-full text-7xl md:text-8xl font-black tracking-wider -z-20 opacity-30"
                style={{
                  color: '#0f172a',
                  filter: 'blur(12px)',
                  transform: 'perspective(1000px) rotateX(-8deg) rotateY(2deg) translateZ(-40px)'
                }}
              >
                AMIGOS IAS
              </div>
            </div>

            {/* Tagline above image - Premium gold gradient style */}
            <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 z-20 pointer-events-none whitespace-nowrap">
              <p 
                className="text-2xl md:text-4xl lg:text-5xl font-black tracking-wide text-center"
                style={{
                  background: 'linear-gradient(135deg, #FDE68A 0%, #FCD34D 25%, #F59E0B 50%, #D97706 75%, #B45309 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: `drop-shadow(2px 2px 4px rgba(0,0,0,0.5)) drop-shadow(0 0 10px rgba(251, 191, 36, 0.4))`,
                  transform: 'perspective(800px) rotateX(-3deg)'
                }}
              >
                Start Your UPSC Journey From Here!
              </p>
              {/* Shadow layer for extra depth */}
              <p 
                className="absolute top-2 left-2 text-2xl md:text-4xl lg:text-5xl font-black tracking-wide text-center -z-10 opacity-60 whitespace-nowrap"
                style={{
                  color: '#000000',
                  filter: 'blur(6px)',
                  transform: 'perspective(800px) rotateX(-3deg)'
                }}
              >
                Start Your UPSC Journey From Here!
              </p>
            </div>

            {/* Floating crystals radiating outward from center */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                {/* Left upward */}
                <div className="absolute w-10 h-16 animate-float-out-left" style={{ animationDuration: '18s', animationDelay: '0s' }}>
                  <div className="w-full h-full bg-gradient-to-br from-blue-200/40 via-blue-300/30 to-transparent blur-[1px]" 
                       style={{ clipPath: 'polygon(50% 0%, 100% 40%, 80% 100%, 20% 100%, 0% 40%)' }} />
                </div>
                {/* Left downward */}
                <div className="absolute w-7 h-12 animate-float-out-left-down" style={{ animationDuration: '22s', animationDelay: '4s' }}>
                  <div className="w-full h-full bg-gradient-to-br from-amber-200/40 via-amber-300/30 to-transparent blur-[1px]" 
                       style={{ clipPath: 'polygon(50% 0%, 100% 40%, 80% 100%, 20% 100%, 0% 40%)' }} />
                </div>
                {/* Right upward */}
                <div className="absolute w-9 h-14 animate-float-out-right" style={{ animationDuration: '19s', animationDelay: '2s' }}>
                  <div className="w-full h-full bg-gradient-to-br from-blue-300/35 via-blue-200/25 to-transparent blur-[1px]" 
                       style={{ clipPath: 'polygon(50% 0%, 100% 40%, 80% 100%, 20% 100%, 0% 40%)' }} />
                </div>
                {/* Right downward */}
                <div className="absolute w-6 h-11 animate-float-out-right-down" style={{ animationDuration: '24s', animationDelay: '6s' }}>
                  <div className="w-full h-full bg-gradient-to-br from-white/30 via-blue-100/20 to-transparent blur-[1px]" 
                       style={{ clipPath: 'polygon(50% 0%, 100% 40%, 80% 100%, 20% 100%, 0% 40%)' }} />
                </div>
              </div>

        {/* Sparkles radiating from the image center to left and right corners */}
        <div className="absolute left-1/2 top-[50%] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
       {/* Left side (up + down) */}
       <div className="absolute w-2 h-2 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"
         style={{ animation: 'sparkle-out-left-up 9s linear infinite, twinkle 1.6s ease-in-out infinite', animationDelay: '0s' }} />
       <div className="absolute w-1.5 h-1.5 bg-amber-200 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.6)]"
         style={{ animation: 'sparkle-out-left-down 10s linear infinite, twinkle 2s ease-in-out infinite', animationDelay: '1s' }} />
       <div className="absolute w-2.5 h-2.5 bg-blue-200 rounded-full shadow-[0_0_12px_rgba(191,219,254,0.7)]"
         style={{ animation: 'sparkle-out-left-up 11s linear infinite, twinkle 1.8s ease-in-out infinite', animationDelay: '2s' }} />
       <div className="absolute w-1.5 h-1.5 bg-amber-300 rounded-full shadow-[0_0_10px_rgba(252,211,77,0.7)]"
         style={{ animation: 'sparkle-out-left-down 8.5s linear infinite, twinkle 1.7s ease-in-out infinite', animationDelay: '3s' }} />
       <div className="absolute w-2 h-2 bg-blue-100 rounded-full shadow-[0_0_10px_rgba(219,234,254,0.6)]"
         style={{ animation: 'sparkle-out-left-up 12s linear infinite, twinkle 2.2s ease-in-out infinite', animationDelay: '4s' }} />
       <div className="absolute w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.7)]"
         style={{ animation: 'sparkle-out-left-down 9.5s linear infinite, twinkle 1.9s ease-in-out infinite', animationDelay: '5s' }} />

       {/* Right side (up + down) */}
       <div className="absolute w-2 h-2 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"
         style={{ animation: 'sparkle-out-right-up 9.5s linear infinite, twinkle 1.6s ease-in-out infinite', animationDelay: '0.5s' }} />
       <div className="absolute w-1.5 h-1.5 bg-blue-300 rounded-full shadow-[0_0_8px_rgba(147,197,253,0.6)]"
         style={{ animation: 'sparkle-out-right-down 10.5s linear infinite, twinkle 2.3s ease-in-out infinite', animationDelay: '1.5s' }} />
       <div className="absolute w-2.5 h-2.5 bg-blue-100 rounded-full shadow-[0_0_12px_rgba(219,234,254,0.7)]"
         style={{ animation: 'sparkle-out-right-up 11.5s linear infinite, twinkle 1.9s ease-in-out infinite', animationDelay: '2.5s' }} />
       <div className="absolute w-2 h-2 bg-amber-200 rounded-full shadow-[0_0_10px_rgba(251,191,36,0.6)]"
         style={{ animation: 'sparkle-out-right-down 8s linear infinite, twinkle 2.1s ease-in-out infinite', animationDelay: '3.5s' }} />
       <div className="absolute w-1.5 h-1.5 bg-amber-400 rounded-full shadow-[0_0_8px_rgba(251,146,60,0.7)]"
         style={{ animation: 'sparkle-out-right-up 10s linear infinite, twinkle 2.4s ease-in-out infinite', animationDelay: '4.5s' }} />
       <div className="absolute w-2 h-2 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"
         style={{ animation: 'sparkle-out-right-down 12.5s linear infinite, twinkle 1.8s ease-in-out infinite', animationDelay: '5.5s' }} />
        </div>

              {/* Twinkling stars (static position) */}
              <div className="absolute top-[12%] right-[15%] w-2 h-2 bg-white rounded-full animate-twinkle" style={{ animationDuration: '3s' }} />
              <div className="absolute top-[28%] right-[25%] w-1.5 h-1.5 bg-amber-200 rounded-full animate-twinkle" style={{ animationDuration: '4s', animationDelay: '0.5s' }} />
              <div className="absolute top-[42%] right-[35%] w-2 h-2 bg-blue-200 rounded-full animate-twinkle" style={{ animationDuration: '3.5s', animationDelay: '1s' }} />
              <div className="absolute top-[58%] right-[20%] w-1.5 h-1.5 bg-white rounded-full animate-twinkle" style={{ animationDuration: '4.5s', animationDelay: '1.5s' }} />
              <div className="absolute top-[72%] right-[30%] w-2 h-2 bg-amber-300 rounded-full animate-twinkle" style={{ animationDuration: '3.8s', animationDelay: '2s' }} />
              <div className="absolute top-[18%] right-[45%] w-1.5 h-1.5 bg-blue-300 rounded-full animate-twinkle" style={{ animationDuration: '4.2s', animationDelay: '2.5s' }} />
              {/* Additional twinkling stars for more sparkle */}
              <div className="absolute top-[8%] left-[18%] w-2 h-2 bg-white rounded-full animate-twinkle" style={{ animationDuration: '3.2s', animationDelay: '0.8s' }} />
              <div className="absolute top-[35%] left-[8%] w-1.5 h-1.5 bg-blue-200 rounded-full animate-twinkle" style={{ animationDuration: '4.3s', animationDelay: '1.2s' }} />
              <div className="absolute top-[62%] left-[25%] w-2 h-2 bg-amber-300 rounded-full animate-twinkle" style={{ animationDuration: '3.9s', animationDelay: '1.8s' }} />
              <div className="absolute top-[22%] left-[35%] w-1.5 h-1.5 bg-white rounded-full animate-twinkle" style={{ animationDuration: '4.1s', animationDelay: '2.2s' }} />
              <div className="absolute top-[48%] left-[42%] w-2 h-2 bg-blue-100 rounded-full animate-twinkle" style={{ animationDuration: '3.6s', animationDelay: '2.8s' }} />
              <div className="absolute top-[78%] left-[15%] w-1.5 h-1.5 bg-amber-200 rounded-full animate-twinkle" style={{ animationDuration: '4.4s', animationDelay: '3.2s' }} />
            </div>

            {/* Crystal sparkle effects */}
            <div className="absolute inset-0 pointer-events-none z-10">
              {/* Floating crystal particles */}
              <div className="absolute top-[15%] left-[10%] w-3 h-3 bg-amber-300/40 rounded-full blur-sm animate-pulse" />
              <div className="absolute top-[25%] right-[15%] w-2 h-2 bg-blue-300/50 rounded-full blur-sm animate-pulse delay-300" />
              <div className="absolute top-[45%] left-[20%] w-2.5 h-2.5 bg-amber-200/30 rounded-full blur-sm animate-pulse delay-700" />
              <div className="absolute bottom-[30%] right-[25%] w-3 h-3 bg-blue-200/40 rounded-full blur-sm animate-pulse delay-500" />
              <div className="absolute top-[35%] right-[8%] w-2 h-2 bg-white/60 rounded-full blur-sm animate-pulse delay-1000" />
              <div className="absolute bottom-[40%] left-[12%] w-2 h-2 bg-amber-300/35 rounded-full blur-sm animate-pulse delay-200" />
              {/* Additional glass crystal sparkles */}
              <div className="absolute top-[8%] right-[35%] w-3 h-3 bg-blue-100/45 rounded-full blur-sm animate-pulse delay-1500" />
              <div className="absolute top-[52%] left-[5%] w-2.5 h-2.5 bg-white/50 rounded-full blur-sm animate-pulse delay-800" />
              <div className="absolute bottom-[15%] right-[12%] w-3 h-3 bg-amber-400/40 rounded-full blur-sm animate-pulse delay-2000" />
              <div className="absolute top-[68%] left-[32%] w-2 h-2 bg-blue-300/45 rounded-full blur-sm animate-pulse delay-1200" />
              <div className="absolute top-[20%] right-[42%] w-2.5 h-2.5 bg-amber-200/35 rounded-full blur-sm animate-pulse delay-2500" />
              <div className="absolute bottom-[25%] left-[28%] w-3 h-3 bg-white/55 rounded-full blur-sm animate-pulse delay-1800" />
            </div>

            {/* Main image - clear and solid */}
            <div
              className="relative w-[75vw] max-w-[700px] aspect-[16/10] bg-no-repeat transition-all duration-700 ease-out"
              style={{ 
                backgroundImage: "url('/amigos-3d-hero.png')",
                backgroundSize: '130%',
                backgroundPosition: 'center 45%',
                transform: 'translateZ(0)',
                filter: 'saturate(0.9) brightness(1) contrast(1.05)',
                opacity: '1'
              }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                e.currentTarget.style.transform = `rotateX(${-y * 3}deg) rotateY(${x * 3}deg) scale(1.01)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateZ(0) scale(1)';
              }}
              aria-label="Amigos IAS mentors"
              role="img"
            />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12">
            <StatCard number="500+" label="Selections" />
            <StatCard number="50+" label="Top 100 Ranks" />
            <StatCard number="15+" label="Years Experience" />
            <StatCard number="10,000+" label="Students Trained" />
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="bg-white/98 rounded-xl p-6 hover:bg-white transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 border border-gray-100">
      <div className="text-3xl font-bold text-primary-gold mb-2">{number}</div>
      <div className="text-sm text-primary-navy font-semibold">{label}</div>
    </div>
  );
}

function WhyChooseSection() {
  const features = [
    { 
      title: 'Expert Faculty', 
      description: 'Learn from experienced mentors with proven track records in UPSC coaching and comprehensive subject expertise.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
    { 
      title: 'Proven Results', 
      description: '500+ selections including 50+ top 100 ranks. Our structured methodology has consistently delivered success.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      )
    },
    { 
      title: 'Comprehensive Study Material', 
      description: 'Updated content aligned with latest UPSC patterns, covering all subjects with regular current affairs integration.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    { 
      title: 'Personalized Guidance', 
      description: 'Individual attention through mentorship programs, regular feedback, and customized study plans for each aspirant.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    { 
      title: 'Regular Test Series', 
      description: 'Comprehensive mock tests and answer writing practice sessions designed to build exam temperament and accuracy.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      )
    },
    { 
      title: 'Flexible Learning', 
      description: 'Both online and offline modes available with recorded lectures, allowing students to learn at their own pace.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-slate-950 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{
              background: 'linear-gradient(135deg, #FDE68A 0%, #FCD34D 25%, #F59E0B 50%, #D97706 75%, #B45309 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 2px 10px rgba(251, 191, 36, 0.3)'
            }}
          >
            Why Choose Amigos
          </h2>
          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-2 mx-auto max-w-md">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-400/60"></div>
            <svg className="w-4 h-4 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L9.5 9.5L2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5z" />
            </svg>
            <div className="w-2 h-2 rounded-full bg-amber-400"></div>
            <svg className="w-4 h-4 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L9.5 9.5L2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5z" />
            </svg>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-400/60"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, index) => (
            <div 
              key={index} 
              className="group relative p-7 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-amber-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-2"
            >
              {/* Icon with glow effect */}
              <div className="mb-5 inline-flex p-4 rounded-xl bg-gradient-to-br from-amber-400/20 to-amber-600/10 text-amber-400 group-hover:from-amber-400/30 group-hover:to-amber-600/20 transition-all duration-500 group-hover:scale-110">
                {f.icon}
              </div>
              
              {/* Title */}
              <h3 className="font-bold text-xl text-white mb-3 group-hover:text-amber-300 transition-colors">
                {f.title}
              </h3>
              
              {/* Divider */}
              <div className="h-px w-12 bg-gradient-to-r from-amber-400 to-transparent mb-4 group-hover:w-20 transition-all duration-500"></div>
              
              {/* Description */}
              <p className="text-sm text-slate-300 leading-relaxed">
                {f.description}
              </p>

              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-10 transition-opacity">
                <svg viewBox="0 0 100 100" className="text-amber-500">
                  <circle cx="80" cy="20" r="30" fill="currentColor" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-slate-300 text-lg mb-6">
            Join thousands of successful aspirants who chose excellence
          </p>
          <Link 
            href="/about" 
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 font-semibold shadow-xl hover:shadow-2xl hover:from-amber-600 hover:to-amber-700 transition-all hover:-translate-y-1"
          >
            Learn More About Us
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

function CoursesSection() {
  const courses = [
    {
      title: 'UPSC Prep+ Foundation',
      description: 'Comprehensive foundation course for UPSC aspirants',
      duration: '12 Months',
      startDate: 'January 2026',
      fees: '₹80,000',
    },
    {
      title: 'Prelims Intensive',
      description: 'Focused preparation for UPSC Prelims examination',
      duration: '6 Months',
      startDate: 'December 2025',
      fees: '₹45,000',
    },
    {
      title: 'Mains Answer Writing',
      description: 'Master the art of answer writing for Mains',
      duration: '4 Months',
      startDate: 'February 2026',
      fees: '₹35,000',
    },
    {
      title: 'Interview Guidance',
      description: 'Personality development and mock interviews',
      duration: '2 Months',
      startDate: 'March 2026',
      fees: '₹25,000',
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6"
              style={{
                background: 'linear-gradient(135deg, #FDE68A 0%, #F59E0B 40%, #D97706 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
            Our Courses
          </h2>
          <p className="text-sm text-slate-300 mb-4">
            Choose the right program for your UPSC journey
          </p>
          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-2 mx-auto max-w-md">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-400/60"></div>
            <svg className="w-4 h-4 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L9.5 9.5L2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5z" />
            </svg>
            <div className="w-2 h-2 rounded-full bg-amber-400"></div>
            <svg className="w-4 h-4 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L9.5 9.5L2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5z" />
            </svg>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-400/60"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course, index) => (
            <div key={index} className="premium-card p-6 flex flex-col text-white">
              <span className="premium-border-glow" />

              <div className="mb-5">
                <div className="premium-gold-chip mb-3">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2l2.39 4.84L18 7.27l-4 3.9.94 5.48L10 14.77l-4.94 1.88L6 11.17l-4-3.9 5.61-.43L10 2z"/></svg>
                  {course.duration}
                </div>
                <h3 className="text-xl font-semibold tracking-wide mb-1 text-white">{course.title}</h3>
                <div className="premium-divider mb-3" />
                <p className="text-slate-300 text-sm">{course.description}</p>
              </div>

              <div className="mt-auto space-y-3">
                <div className="flex items-center text-xs text-slate-300">
                  <svg
                    className="w-4 h-4 mr-2 text-amber-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  Starts: {course.startDate}
                </div>
                <div className="text-2xl font-extrabold premium-price">{course.fees}</div>
                <Link
                  href={`/courses/${index + 1}`}
                  className="block text-center w-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 font-semibold rounded-lg py-2 hover:from-amber-600 hover:to-amber-700 transition-all duration-300"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Link href="/courses" className="btn-outline">
            View All Courses
          </Link>
        </div>
      </div>
    </section>
  );
}

function FacultySection() {
  const faculty = [
    {
      name: 'Dr. Rajesh Kumar',
      subject: 'History & Culture',
      experience: '15+ Years',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&q=80',
    },
    {
      name: 'Prof. Anjali Sharma',
      subject: 'Geography & Environment',
      experience: '12+ Years',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&q=80',
    },
    {
      name: 'Dr. Amit Verma',
      subject: 'Polity & Governance',
      experience: '18+ Years',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&q=80',
    },
    {
      name: 'Ms. Priya Singh',
      subject: 'Economy & Development',
      experience: '10+ Years',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&q=80',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 tracking-wide text-amber-400" style={{
            fontFamily: 'Georgia, serif'
          }}>Our Faculty</h2>
          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-2 mx-auto max-w-md">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-400/60"></div>
            <svg className="w-4 h-4 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L9.5 9.5L2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5z" />
            </svg>
            <div className="w-2 h-2 rounded-full bg-amber-400"></div>
            <svg className="w-4 h-4 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L9.5 9.5L2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5z" />
            </svg>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-400/60"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {faculty.map((m, i) => (
            <div 
              key={i} 
              className="group bg-gradient-to-b from-amber-50 to-stone-100 rounded-2xl p-6 flex flex-col items-center shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-stone-200/50"
            >
              {/* Circular photo with thin gold ring */}
              <div className="relative mb-5">
                <div className="relative w-36 h-36 rounded-full overflow-hidden border-2 border-amber-400 shadow-lg group-hover:border-amber-500 transition-colors">
                  <Image 
                    src={m.image} 
                    alt={`${m.name} - ${m.subject}`} 
                    fill 
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Name */}
              <h3 className="text-lg font-bold text-slate-900 mb-1 text-center tracking-wide" style={{ fontFamily: 'system-ui, sans-serif' }}>
                {m.name}
              </h3>

              {/* Subject */}
              <p className="text-sm text-slate-700 font-medium text-center mb-1">
                {m.subject}
              </p>

              {/* Experience badge */}
              <div className="mt-2 px-3 py-1 bg-slate-700 text-amber-300 text-xs font-semibold rounded-full">
                {m.experience}
              </div>

              {/* Optional hover detail */}
              <p className="text-xs text-slate-600 text-center mt-4 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Expert mentor guiding aspirants with proven strategies.
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-14">
          <Link 
            href="/about" 
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 font-semibold shadow-lg hover:shadow-xl hover:from-amber-600 hover:to-amber-700 transition-all hover:-translate-y-0.5"
          >
            Meet All Faculty
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev'>('next');
  const [nextPageContent, setNextPageContent] = useState(0);
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [hasOpenedOnce, setHasOpenedOnce] = useState(false);
  const [autoFlipEnabled, setAutoFlipEnabled] = useState(false); // user-controlled auto-flip
  const [flippedPages, setFlippedPages] = useState<number[]>([]); // Track which pages have been flipped to left
  const sectionRef = useRef<HTMLElement>(null);

  // Deterministic star positions to avoid hydration mismatch (no Math.random at render)
  const starDots = useMemo(() => {
    // Linear Congruential Generator (deterministic)
    let seed = 123456789;
    const rand = () => {
      seed = (1103515245 * seed + 12345) % 0x80000000;
      return seed / 0x80000000;
    };
    const toPct = (n: number) => `${Math.round(n * 10000) / 100}%`;
    return Array.from({ length: 15 }).map(() => ({
      top: toPct(rand()),
      left: toPct(rand()),
    }));
  }, []);

  const testimonials = [
    {
      name: 'Rahul Mehta',
      rank: 'AIR 24',
      year: '2024',
      quote:
        'The guidance and support from Amigos IAS faculty was instrumental in my success. The structured approach and regular feedback helped me improve consistently.',
    },
    {
      name: 'Sneha Patel',
      rank: 'AIR 156',
      year: '2024',
      quote:
        'The test series and answer writing practice at Amigos IAS gave me the edge I needed. The current affairs module was particularly helpful.',
    },
    {
      name: 'Arjun Singh',
      rank: 'AIR 89',
      year: '2023',
      quote:
        'Excellent faculty, comprehensive study material, and a motivating environment. Amigos IAS truly delivers on its promise of excellence.',
    },
    {
      name: 'Meera Joshi',
      rank: 'AIR 42',
      year: '2022',
      quote:
        'Amigos IAS refined my preparation with disciplined schedules and precise guidance. Their mentorship kept me focused and confident throughout the journey.',
    },
    {
      name: 'Vikram Rao',
      rank: 'AIR 11',
      year: '2021',
      quote:
        'Structured classes and continuous feedback helped me bridge gaps quickly. The answer writing sessions were the game-changer for my mains performance.',
    },
    {
      name: 'Nidhi Kapoor',
      rank: 'AIR 97',
      year: '2020',
      quote:
        'From fundamentals to final revision, the support system at Amigos IAS is exceptional. I especially benefitted from their current affairs integration.',
    },
  ];

  const flipToPage = (targetPage: number) => {
    if (targetPage === currentPage || isFlipping) return;
    
    const direction = targetPage > currentPage ? 'next' : 'prev';
    setFlipDirection(direction);
    setNextPageContent(targetPage);
    setIsFlipping(true);
    
    // Update current page at midpoint of realistic fold animation with natural resistance (2.2s total, update at 1100ms)
    setTimeout(() => {
      setCurrentPage(targetPage);
      
      // Update flipped pages array
      if (direction === 'next') {
        // Add current page to flipped pages (it moves to left)
        setFlippedPages(prev => [...prev, currentPage]);
      } else {
        // Remove the last page from flipped pages (it returns to right)
        setFlippedPages(prev => prev.slice(0, -1));
      }
    }, 1100);
    
    // Complete the flip after full animation with slight settle time
    setTimeout(() => {
      setIsFlipping(false);
    }, 2200);
  };

  const nextPage = () => {
    if (currentPage < testimonials.length - 1) {
      flipToPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      flipToPage(currentPage - 1);
    }
  };

  // Intersection Observer to open book when section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasOpenedOnce) {
            // Delay book opening slightly for smooth effect
            setTimeout(() => {
              setIsBookOpen(true);
              setHasOpenedOnce(true);
            }, 300);
          }
        });
      },
      { threshold: 0.3 } // Trigger when 30% of section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasOpenedOnce]);

  // Auto-flip effect (only when book is open AND user enabled it)
  useEffect(() => {
    if (!isBookOpen || !autoFlipEnabled) return;

    const autoFlip = setInterval(() => {
      if (!isFlipping) {
        if (currentPage < testimonials.length - 1) {
          flipToPage(currentPage + 1);
        } else {
          flipToPage(0);
        }
      }
    }, 6000);

    return () => clearInterval(autoFlip);
  }, [currentPage, isFlipping, isBookOpen, autoFlipEnabled]);

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-amber-400 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 border-2 border-blue-400 rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-amber-600" style={{
            fontFamily: "'Playfair Display', 'Georgia', serif",
            letterSpacing: '0.01em',
          }}>
            Success Stories
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-4">
            Discover inspiring journeys of our UPSC toppers
          </p>
          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-2 mx-auto max-w-md">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-400/60"></div>
            <svg className="w-4 h-4 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L9.5 9.5L2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5z" />
            </svg>
            <div className="w-2 h-2 rounded-full bg-amber-400"></div>
            <svg className="w-4 h-4 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L9.5 9.5L2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5z" />
            </svg>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-400/60"></div>
          </div>
        </div>

        {/* Compact 3D Book Design with Flip Animation */}
        <div className="flex justify-center" style={{ perspective: '1500px' }}>
          <div className="relative w-full max-w-3xl">
            {/* Realistic Book Shadow */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 to-slate-900/10 blur-2xl transform translate-y-6 scale-95 rounded-xl"></div>
            
            {/* Navigation Buttons - Styled as book page corners */}
            <button
              onClick={(e) => {
                e.preventDefault();
                prevPage();
              }}
              disabled={currentPage === 0 || isFlipping}
              className="absolute -left-14 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed rounded-lg shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-110 disabled:scale-100 disabled:opacity-50 border-2 border-amber-300/50 active:scale-95"
              aria-label="Previous page"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={(e) => {
                e.preventDefault();
                nextPage();
              }}
              disabled={currentPage === testimonials.length - 1 || isFlipping}
              className="absolute -right-14 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed rounded-lg shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-110 disabled:scale-100 disabled:opacity-50 border-2 border-amber-300/50 active:scale-95"
              aria-label="Next page"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Page Indicator Dots */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.preventDefault();
                    flipToPage(index);
                  }}
                  disabled={isFlipping}
                  className={`h-2 rounded-full transition-all duration-300 disabled:cursor-wait ${
                    index === currentPage 
                      ? 'w-6 bg-amber-500 shadow-md' 
                      : 'w-2 bg-gray-300 hover:bg-amber-300 hover:w-4'
                  }`}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>
            
            {/* Realistic 3D Book Container with Enhanced Perspective */}
            <div 
              className="relative mx-auto transition-all duration-1000 book-wrapper" 
              style={{ 
                transformStyle: 'preserve-3d',
                perspective: '2500px',
                perspectiveOrigin: 'center center',
                width: '580px',
                height: '420px'
              }}
            >
              
              {/* Left Page (Navy Cover - Opens from Closed State) */}
              <div 
                className="absolute left-0 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 overflow-hidden transition-transform duration-900 ease-out book-page-smooth"
                style={{ 
                  width: '290px',
                  height: '420px',
                  transformOrigin: 'right center',
                  transform: isBookOpen ? 'rotateY(-4deg)' : 'rotateY(0deg)',
                  borderTopLeftRadius: '10px',
                  borderBottomLeftRadius: '10px',
                  boxShadow: '-8px 0 28px rgba(5,10,25,0.45), inset -4px 0 14px rgba(0,0,0,0.4)',
                  zIndex: isBookOpen ? 6 : 16
                }}
              >
                {/* Star constellation pattern (deterministic for SSR/CSR match) */}
                <div className="absolute inset-0 opacity-20">
                  {starDots.map((pos, i) => (
                    <div
                      key={`star-${i}`}
                      className="absolute w-0.5 h-0.5 bg-amber-300 rounded-full"
                      style={{
                        top: pos.top,
                        left: pos.left,
                        boxShadow: '0 0 2px rgba(251, 191, 36, 0.5)'
                      }}
                    />
                  ))}
                </div>

                {/* Ornate Corner Decorations */}
                <div className="absolute top-3 right-3 w-16 h-16">
                  <svg viewBox="0 0 100 100" className="w-full h-full text-amber-500/60">
                    <path d="M0,0 L100,0 L100,10 L10,10 L10,100 L0,100 Z" fill="currentColor" opacity="0.3"/>
                    <path d="M5,5 L95,5 L95,8 L8,8 L8,95 L5,95 Z" fill="currentColor" opacity="0.5"/>
                    <circle cx="85" cy="15" r="3" fill="currentColor"/>
                    <circle cx="15" cy="85" r="3" fill="currentColor"/>
                  </svg>
                </div>
                
                <div className="absolute bottom-3 right-3 w-16 h-16 rotate-180">
                  <svg viewBox="0 0 100 100" className="w-full h-full text-amber-500/60">
                    <path d="M0,0 L100,0 L100,10 L10,10 L10,100 L0,100 Z" fill="currentColor" opacity="0.3"/>
                    <path d="M5,5 L95,5 L95,8 L8,8 L8,95 L5,95 Z" fill="currentColor" opacity="0.5"/>
                    <circle cx="85" cy="15" r="3" fill="currentColor"/>
                  </svg>
                </div>

                {/* Book spine texture on left edge */}
                <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-r from-black/60 to-transparent"></div>

                {/* Main Content */}
                <div className="relative h-full flex flex-col items-center justify-center px-8 py-8">
                  
                  {/* Title */}
                  <div className="text-center mb-4">
                    <h3 className="text-4xl font-bold mb-1 bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent tracking-wide drop-shadow-lg" style={{ fontFamily: 'serif' }}>
                      AMIGOS IAS
                    </h3>
                    <div className="h-0.5 w-32 mx-auto bg-gradient-to-r from-transparent via-amber-500 to-transparent mb-2 opacity-60"></div>
                    <p className="text-sm text-amber-400/80 tracking-[0.25em] font-light">IAS</p>
                    <p className="text-amber-300 text-lg font-semibold tracking-[0.2em] mt-1" style={{ fontFamily: 'serif' }}>Success Story</p>
                  </div>

                  {/* Logo (favicon) */}
                  <div className="my-4">
                    <div className="w-24 h-24 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-[0_8px_24px_rgba(0,0,0,0.4)] relative overflow-hidden border border-amber-400/40 ring-1 ring-amber-300/30">
                      <Image
                        src="/fav icon.png"
                        alt="Amigos IAS favicon logo"
                        width={86}
                        height={86}
                        className="object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
                        priority={false}
                      />
                      {/* subtle radial glow */}
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.35),transparent_70%)] pointer-events-none" />
                    </div>
                  </div>

                  {/* Bottom Illustration - Cityscape with Graduation Cap */}
                  <div className="mt-auto pt-4 flex flex-col items-center gap-2">
                    {/* Graduation Cap */}
                    <svg className="w-8 h-8 text-amber-500/50" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" />
                    </svg>
                    
                    {/* Cityscape Buildings */}
                    <div className="flex items-end justify-center gap-0.5 h-10 w-32">
                      <div className="w-3 h-6 bg-amber-500/20 border border-amber-500/30 relative">
                        <div className="absolute top-1 left-0.5 w-1 h-1 bg-amber-400/40"></div>
                      </div>
                      <div className="w-4 h-10 bg-amber-500/25 border border-amber-500/30 relative">
                        <div className="absolute top-1 left-0.5 w-1 h-1 bg-amber-400/40"></div>
                        <div className="absolute top-3 left-0.5 w-1 h-1 bg-amber-400/40"></div>
                      </div>
                      <div className="w-3 h-7 bg-amber-500/20 border border-amber-500/30"></div>
                      <div className="w-5 h-8 bg-amber-500/25 border border-amber-500/30 relative">
                        <div className="absolute top-1 left-1 w-1 h-1 bg-amber-400/40"></div>
                      </div>
                      <div className="w-3 h-9 bg-amber-500/22 border border-amber-500/30"></div>
                      <div className="w-4 h-6 bg-amber-500/20 border border-amber-500/30"></div>
                    </div>
                  </div>
                </div>

                {/* Gold border accent on right edge */}
                <div className="absolute right-0 top-4 bottom-4 w-0.5 bg-gradient-to-b from-amber-500/0 via-amber-400/60 to-amber-500/0"></div>
                
                {/* Leather texture overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none"></div>
                <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,rgba(255,255,255,0.05)_2px,rgba(255,255,255,0.05)_4px)]"></div>
              </div>

              {/* Book Spine (Center Binding) */}
              {/* Book Spine (Center) */}
              <div 
                className="absolute left-1/2 -translate-x-1/2 bg-gradient-to-r from-slate-950 via-slate-800 to-slate-950 shadow-inner overflow-hidden"
                style={{ 
                  width: '16px',
                  height: '400px',
                  boxShadow: 'inset 0 0 15px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5)',
                  zIndex: 25
                }}
              >
                <div className="absolute inset-y-0 left-0 w-px bg-amber-500/10"></div>
                <div className="absolute inset-y-0 right-0 w-px bg-amber-500/10"></div>
                <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-20 border-y border-amber-500/5"></div>
                {/* Stitching effect */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-1 h-1 bg-amber-600/20 rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-1 h-1 bg-amber-600/20 rounded-full"></div>
                <div className="absolute top-3/4 left-1/2 -translate-x-1/2 w-1 h-1 bg-amber-600/20 rounded-full"></div>
              </div>

              {/* Right Cover (Closed State - Navy Cover matching left side) */}
              {!isBookOpen && (
                <div 
                  className="absolute right-0 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 shadow-2xl overflow-hidden transition-opacity duration-500"
                  style={{ 
                    width: '275px',
                    height: '400px',
                    transformOrigin: 'left center',
                    borderTopRightRadius: '8px',
                    borderBottomRightRadius: '8px',
                    boxShadow: '8px 0 20px rgba(0,0,0,0.5), inset 3px 0 10px rgba(0,0,0,0.5)',
                    zIndex: 16
                  }}
                >
                  {/* Leather texture overlay */}
                  <div className="absolute inset-0">
                    <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]"></div>
                    <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,rgba(139,92,46,0.15)_2px,rgba(139,92,46,0.15)_4px)]"></div>
                  </div>

                  {/* Back Cover Content */}
                  <div className="relative h-full flex flex-col items-center justify-center px-8 py-8">
                    <div className="text-center">
                      <h3 className="text-3xl font-bold mb-2 bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent tracking-wide" style={{ fontFamily: 'serif' }}>
                        AMIGOS IAS
                      </h3>
                      <div className="h-0.5 w-24 mx-auto bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-60"></div>
                      <p className="text-amber-400/80 text-xs tracking-[0.3em] mt-3">EXCELLENCE</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Read Pages Stack on Left (Pages that have been read and folded) */}
              {Array.from({ length: currentPage }).map((_, index) => (
                <div
                  key={`read-page-${index}`}
                  className="absolute left-0 bg-gradient-to-br from-amber-50 via-white to-amber-50/80 transition-all duration-700 book-page-smooth"
                  style={{
                    width: '290px',
                    height: '420px',
                    transformOrigin: 'right center',
                    // gentler fan and spacing for neater stack
                    transform: `perspective(2500px) rotateY(${-150 - index * 0.8}deg) skewY(${index * 0.25}deg) translateX(-${120 - index * 6}px) translateZ(${6 + index * 3}px)`,
                    borderTopLeftRadius: '8px',
                    borderBottomLeftRadius: '8px',
                    borderTopRightRadius: '3px',
                    borderBottomRightRadius: '3px',
                    boxShadow: `-8px 6px ${18 + index * 6}px rgba(0, 0, 0, ${0.20 + index * 0.04})`,
                    zIndex: 6 + index,
                    filter: `brightness(${0.94 - index * 0.02}) saturate(${1 - index * 0.015})`,
                    opacity: 0.98 - index * 0.05,
                  }}
                >
                  {/* Paper texture */}
                  <div className="absolute inset-0 opacity-30 bg-[repeating-linear-gradient(0deg,transparent,transparent_1px,rgba(139,92,46,0.05)_1px,rgba(139,92,46,0.05)_2px)]"></div>
                  
                  {/* Page edge gradient */}
                  <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-slate-900/20 via-slate-800/10 to-transparent"></div>
                  
                  {/* Folded edge highlight */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-300/40 via-amber-100/25 to-amber-300/40"></div>
                  {/* Slight inner shadow to accentuate separation */}
                  <div className="absolute left-1 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-black/10 to-transparent"></div>
                </div>
              ))}

              {/* Flipping Page - Ultra-Realistic Thick Paper with Natural Physics */}
              {isFlipping && isBookOpen && (
                <div 
                  className="absolute overflow-visible book-page-smooth fold-shine"
                  style={{ 
                    right: 0,
                    width: '290px',
                    height: '420px',
                    transformOrigin: 'left center',
                    animation: flipDirection === 'next' 
                      ? 'pageFlipToLeft 2.2s cubic-bezier(0.22, 0.05, 0.18, 1) forwards'
                      : 'pageFlipFromLeft 2.2s cubic-bezier(0.22, 0.05, 0.18, 1) forwards',
                    borderTopRightRadius: '8px',
                    borderBottomRightRadius: '8px',
                    borderTopLeftRadius: '3px',
                    borderBottomLeftRadius: '3px',
                    transformStyle: 'preserve-3d',
                    zIndex: 40,
                  }}
                >
                  {/* Page thickness/edge effect */}
                  <div 
                    className="absolute left-0 top-0 bottom-0 page-thickness"
                    style={{ 
                      transformStyle: 'preserve-3d',
                      transform: 'translateZ(-3px)'
                    }}
                  ></div>

                  {/* Front side of flipping page - Thick Paper with Off-White Texture */}
                  <div 
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(135deg, #FAF9F6 0%, #F5F3EE 30%, #FAF8F3 60%, #F8F6F1 100%)',
                      backfaceVisibility: 'hidden',
                      transformStyle: 'preserve-3d',
                      borderTopRightRadius: '8px',
                      borderBottomRightRadius: '8px',
                      animation: 'pageCurve 2.2s ease-in-out',
                      boxShadow: 'inset 0 0 0 0.5px rgba(160,130,100,0.12)'
                    }}
                  >
                    {/* Natural paper grain texture - subtle & realistic */}
                    <div className="absolute inset-0 opacity-40" style={{
                      backgroundImage: `
                        repeating-linear-gradient(0deg, transparent, transparent 1.2px, rgba(100,80,60,0.015) 1.2px, rgba(100,80,60,0.015) 2.4px),
                        repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(80,60,40,0.01) 1px, rgba(80,60,40,0.01) 2px),
                        radial-gradient(ellipse at 20% 30%, rgba(220,200,180,0.08) 0%, transparent 50%),
                        radial-gradient(ellipse at 80% 70%, rgba(200,180,160,0.06) 0%, transparent 50%)
                      `,
                      mixBlendMode: 'multiply'
                    }}></div>

                    {/* Slight paper thickness hint at edge */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-r from-stone-200/40 to-transparent"></div>
                    
                    {/* Dynamic page curl shadow - synced with 2.2s flip & enhanced blur */}
                    <div 
                      className="absolute inset-0 bg-gradient-to-l from-slate-900/60 via-slate-800/30 to-transparent pointer-events-none"
                      style={{ animation: 'pageCurlShadow 2.2s ease-in-out' }}
                    ></div>

                    {/* Page curl highlight effect on right edge */}
                    <div 
                      className="absolute right-0 top-0 bottom-0 w-14 bg-gradient-to-l from-white/60 via-white/30 to-transparent pointer-events-none"
                      style={{ animation: 'pageCurlShadow 2.2s ease-in-out reverse' }}
                    ></div>

                    {/* Glossy subtle shine reflection */}
                    <div 
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: 'linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.5) 45%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.5) 55%, transparent 100%)',
                        animation: 'foldShine 2200ms cubic-bezier(0.25, 0.1, 0.25, 1) forwards',
                        mixBlendMode: 'overlay',
                        opacity: 0.6
                      }}
                    />

                    {/* Dynamic fold line effect */}
                    <div 
                      className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-slate-400/40 to-transparent pointer-events-none"
                      style={{ animation: 'pageCurlShadow 1.8s ease-in-out' }}
                    ></div>

                    {/* Success story content on flipping page */}
                    <div className="absolute inset-0 p-6 flex flex-col">
                      <div className="text-center mb-3">
                        <h4 className="text-amber-600 font-bold text-sm tracking-wider" style={{ fontFamily: 'Georgia, serif' }}>
                          SUCCESS STORY
                        </h4>
                        <div className="h-px w-16 bg-amber-400 mx-auto mt-1"></div>
                      </div>
                      
                      {/* Student info preview */}
                      <div className="flex items-center gap-3 mb-3">
                        <div className="relative">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center text-white font-bold text-xl shadow-lg border-2 border-white">
                            {testimonials[nextPageContent].name.charAt(0)}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-slate-900 text-sm">{testimonials[nextPageContent].name}</div>
                          <div className="text-amber-600 font-semibold text-xs">{testimonials[nextPageContent].rank}</div>
                        </div>
                      </div>

                      <div className="flex-1 flex items-center justify-center">
                        <p className="text-slate-600 text-xs text-center italic opacity-60" style={{ fontFamily: 'Georgia, serif' }}>
                          {testimonials[nextPageContent].quote.substring(0, 100)}...
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Back side of flipping page (visible when page flips) */}
                  <div 
                    className="absolute inset-0"
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                      transformStyle: 'preserve-3d',
                      borderTopRightRadius: '8px',
                      borderBottomRightRadius: '8px',
                      animation: 'pageCurve 1.8s ease-in-out'
                    }}
                  >
                    {/* Show an ornate white folded page when turning right->left (next) */}
                    {flipDirection === 'next' ? (
                      <div className="absolute inset-0 bg-white overflow-hidden" style={{ borderRadius: '6px' }}>
                        {/* Outer ornate border */}
                        <div className="absolute inset-3 rounded-md pointer-events-none" style={{
                          border: '2px solid rgba(250, 204, 21, 0.12)',
                          boxShadow: 'inset 0 0 0 1px rgba(249, 115, 22, 0.02), 0 6px 18px rgba(16,24,40,0.06)'
                        }} />

                        {/* Decorative corner filigree (SVG) */}
                        <svg className="absolute top-4 left-4 w-12 h-12 text-amber-300/60" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4 24 C12 8, 36 8, 44 24" stroke="currentColor" strokeWidth="1.6" opacity="0.8" strokeLinecap="round" strokeLinejoin="round" />
                          <circle cx="8" cy="8" r="1.8" fill="currentColor" opacity="0.9" />
                        </svg>
                        <svg className="absolute bottom-4 right-4 w-12 h-12 text-amber-300/60 rotate-180" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4 24 C12 8, 36 8, 44 24" stroke="currentColor" strokeWidth="1.6" opacity="0.8" strokeLinecap="round" strokeLinejoin="round" />
                          <circle cx="8" cy="8" r="1.8" fill="currentColor" opacity="0.9" />
                        </svg>

                        {/* Subtle paper texture lines */}
                        <div className="absolute inset-0 opacity-25 bg-[repeating-linear-gradient(90deg,transparent,transparent_6px,rgba(0,0,0,0.02)_6px,rgba(0,0,0,0.02)_8px)]"></div>

                        {/* Fold highlight on inner left when folded */}
                        <div className="absolute left-0 top-0 bottom-0 w-10 pointer-events-none"
                          style={{
                            background: 'linear-gradient(to right, rgba(255,255,255,0.0), rgba(250,250,250,0.9) 40%, rgba(240,240,240,0.98) 60%)',
                            transform: 'skewY(-2deg)'
                          }}
                        />

                        {/* Thin border motif along inner margins */}
                        <div className="absolute left-6 right-6 top-6 bottom-6 pointer-events-none rounded-sm"
                          style={{
                            border: '1px dashed rgba(249, 115, 22, 0.12)'
                          }}
                        />

                        {/* Small decorative band near fold */}
                        <div className="absolute left-10 top-8 bottom-8 w-1 rounded-sm pointer-events-none"
                          style={{
                            background: 'linear-gradient(to bottom, rgba(249,115,22,0.08), rgba(249,115,22,0.18) 50%, rgba(249,115,22,0.08))',
                            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.06)'
                          }}
                        />

                        {/* Very faint watermark text centered vertically */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-6 pointer-events-none">
                          <p className="text-slate-700 text-xs tracking-widest" style={{ transform: 'rotate(0deg)', fontFamily: 'Georgia, serif' }}>
                            AMIGOS IAS
                          </p>
                        </div>
                      </div>
                    ) : (
                      // keep original subtle reverse content for prev flips
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-amber-50/80">
                        {/* Paper texture on back */}
                        <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(0deg,transparent,transparent_1px,rgba(139,92,46,0.04)_1px,rgba(139,92,46,0.04)_2px)]"></div>
                        {/* Subtle back content */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-10">
                          <p className="text-slate-600 text-xs transform scale-x-[-1]" style={{ fontFamily: 'Georgia, serif' }}>
                            AMIGOS IAS
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Right Page (Cream Paper with Success Story & Photo - Opens from Closed State) */}
              <div 
                className="absolute right-0 bg-gradient-to-br from-amber-50 via-white to-amber-50/80 overflow-hidden transition-transform duration-900 ease-out book-page-smooth"
                style={{ 
                  width: '290px',
                  height: '420px',
                  transformOrigin: 'left center',
                  transform: isBookOpen ? 'rotateY(4deg)' : 'rotateY(0deg)',
                  borderTopRightRadius: '10px',
                  borderBottomRightRadius: '10px',
                  boxShadow: '10px 30px 60px rgba(8,12,28,0.18), inset 3px 0 12px rgba(0,0,0,0.08)',
                  zIndex: 10,
                  opacity: isBookOpen ? 1 : 0,
                  transitionDelay: isBookOpen ? '0.4s' : '0s'
                }}
              >
                {/* Paper texture overlay */}
                <div className="absolute inset-0 opacity-25 bg-[repeating-linear-gradient(0deg,transparent,transparent_1px,rgba(139,92,46,0.04)_1px,rgba(139,92,46,0.04)_2px)]"></div>
                
                {/* Binding shadow on left */}
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-slate-900/18 to-transparent page-edge-accent"></div>

                {/* Content with smooth fade transition */}
                <div 
                  key={currentPage}
                  className="relative h-full flex flex-col px-6 py-8"
                  style={{
                    animation: isFlipping 
                      ? 'contentFadeOut 0.4s ease-out forwards' 
                      : 'pageReveal 1.0s ease-out forwards'
                  }}
                >
                  {/* Success Story Title */}
                  <div className="text-center mb-4">
                    <h3 className="text-amber-600 font-bold text-sm tracking-wider" style={{ fontFamily: 'serif' }}>
                      SUCCESS STORY
                    </h3>
                    <div className="h-px w-20 mx-auto bg-gradient-to-r from-transparent via-amber-400 to-transparent mt-1"></div>
                  </div>

                  {/* Student Photo & Details */}
                  <div className="flex flex-col items-center mb-4">
                    {/* Photo Frame with ornate border */}
                    <div className="relative mb-3">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 p-1 shadow-lg">
                        <div className="w-full h-full rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white font-bold text-2xl overflow-hidden">
                          {/* Student Initial/Photo Placeholder */}
                          <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-amber-400 text-3xl font-serif">
                            {testimonials[currentPage].name.charAt(0)}
                          </div>
                        </div>
                      </div>
                      {/* Rank Badge */}
                      <div className="absolute -bottom-1 -right-1 bg-gradient-to-br from-amber-500 to-amber-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md border-2 border-white">
                        {testimonials[currentPage].rank}
                      </div>
                    </div>
                    
                    {/* Name & Details */}
                    <h4 className="font-bold text-slate-900 text-base text-center mb-1" style={{ fontFamily: 'serif' }}>
                      {testimonials[currentPage].name}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <span className="font-semibold text-amber-600">{testimonials[currentPage].rank}</span>
                      <span>•</span>
                      <span>{testimonials[currentPage].year}</span>
                    </div>
                  </div>

                  {/* Quote Section */}
                  <div className="flex-1 flex flex-col justify-center">
                    <svg className="w-6 h-6 text-amber-500/40 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                    
                    <p className="text-slate-700 text-xs leading-relaxed italic text-center px-2" style={{ fontFamily: 'Georgia, serif' }}>
                      {testimonials[currentPage].quote}
                    </p>
                  </div>

                  {/* Decorative footer */}
                  <div className="flex items-center justify-center mt-3 mb-2">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-400/30"></div>
                    <div className="mx-3 text-amber-500/50 text-[10px] tracking-widest">★ ★ ★</div>
                    <div className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-400/30"></div>
                  </div>

                  {/* Page number */}
                  <div className="text-center text-amber-600/50 text-[10px] font-serif">
                    Page {String(currentPage + 1).padStart(2, '0')}
                  </div>
                </div>

                {/* Page corner curl effect */}
                <div className="absolute bottom-0 right-0 w-8 h-8">
                  <div className="absolute inset-0 bg-gradient-to-tl from-slate-200 to-transparent opacity-30"></div>
                </div>

                {/* Gold edge accent */}
                <div className="absolute left-0 top-8 bottom-8 w-1 page-edge-accent"></div>
              </div>
            </div>

            {/* Flip Instructions */}
            <div className="text-center mt-6 text-slate-500 text-xs flex flex-col items-center gap-2">
              <div className="flex items-center gap-3">
                <p className="m-0">Click arrows or dots to turn pages • Page {currentPage + 1} of {testimonials.length}</p>
                <button
                  onClick={(e) => { e.preventDefault(); setAutoFlipEnabled(prev => !prev); }}
                  aria-pressed={autoFlipEnabled}
                  className={`ml-2 px-3 py-1 rounded-full text-[11px] font-semibold transition-colors duration-200 ${autoFlipEnabled ? 'bg-amber-500 text-white shadow-md' : 'bg-white/80 text-slate-700 border border-slate-200'}`}
                >
                  Auto-flip: {autoFlipEnabled ? 'On' : 'Off'}
                </button>
              </div>
              <p className="m-0 opacity-70">(Pages will only auto-turn when Auto-flip is set to On)</p>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link href="/results" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:from-amber-600 hover:to-amber-700 transition-all duration-300 transform hover:-translate-y-1">
            View All Success Stories
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

function AnnouncementsSection() {
  const announcements = [
    {
      title: 'New Batch Starting',
      description: 'UPSC Prep+ Foundation Course - January 2026',
      date: 'December 15, 2025',
      type: 'Batch',
    },
    {
      title: 'Free Demo Class',
      description: 'Register for a free demo class this weekend',
      date: 'Every Saturday',
      type: 'Demo',
    },
    {
      title: 'Interview Workshop',
      description: 'Personality development and mock interview sessions',
      date: 'January 10, 2026',
      type: 'Workshop',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-amber-50/30 relative overflow-hidden">
      {/* Subtle decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03]">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-amber-400 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 rounded-full bg-blue-400 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 bg-clip-text text-transparent" style={{
            fontFamily: "'Playfair Display', 'Georgia', serif",
            letterSpacing: '0.02em',
            textShadow: '0 2px 8px rgba(217, 119, 6, 0.15)'
          }}>
            Latest Announcements
          </h2>
          <p className="text-base text-slate-600 max-w-2xl mx-auto mb-4">
            Stay updated with our latest batches, events, and opportunities
          </p>
          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-2 mx-auto max-w-md">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-400/60"></div>
            <svg className="w-4 h-4 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L9.5 9.5L2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5z" />
            </svg>
            <div className="w-2 h-2 rounded-full bg-amber-400"></div>
            <svg className="w-4 h-4 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L9.5 9.5L2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5z" />
            </svg>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-400/60"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {announcements.map((announcement, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-7 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-slate-200/60 overflow-hidden"
            >
              {/* Gradient accent on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-50/0 via-amber-50/0 to-amber-100/0 group-hover:from-amber-50/50 group-hover:via-amber-50/30 group-hover:to-transparent transition-all duration-500 pointer-events-none"></div>
              
              {/* Premium left border */}
              <div className="absolute left-0 top-6 bottom-6 w-1 bg-gradient-to-b from-amber-400 via-amber-500 to-amber-600 rounded-r-full shadow-lg shadow-amber-400/30"></div>
              
              <div className="relative">
                {/* Type badge */}
                <div className="inline-flex items-center gap-1.5 px-4 py-1.5 mb-4 rounded-full text-xs font-bold tracking-wide shadow-md"
                     style={{
                       background: 'linear-gradient(135deg, #FDE68A 0%, #FBBF24 50%, #F59E0B 100%)',
                       color: '#1e293b'
                     }}>
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  {announcement.type}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-3 text-slate-900 group-hover:text-slate-950 transition-colors">
                  {announcement.title}
                </h3>

                {/* Divider */}
                <div className="h-px w-16 bg-gradient-to-r from-amber-400 to-transparent mb-3"></div>

                {/* Description */}
                <p className="text-slate-600 text-sm leading-relaxed mb-5">
                  {announcement.description}
                </p>

                {/* Date with icon */}
                <div className="flex items-center gap-2 text-sm font-medium text-slate-700 bg-slate-50 rounded-lg px-3 py-2 w-fit">
                  <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{announcement.date}</span>
                </div>
              </div>

              {/* Corner decoration */}
              <div className="absolute bottom-0 right-0 w-20 h-20 opacity-5 group-hover:opacity-10 transition-opacity">
                <svg viewBox="0 0 100 100" className="text-amber-500">
                  <circle cx="50" cy="50" r="40" fill="currentColor" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            style={{
              background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 50%, #B45309 100%)'
            }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            Register Now
          </Link>
        </div>
      </div>
    </section>
  );
}
