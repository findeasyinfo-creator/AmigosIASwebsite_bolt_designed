"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Courses', href: '/courses' },
    { name: 'Current Affairs', href: '/current-affairs' },
    { name: 'Resources & Blog', href: '/resources' },
    { name: 'Results', href: '/results' },
    { name: 'Admissions', href: '/admissions' },
    { name: 'Contact Us', href: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-slate-950 ${
        isScrolled
          ? 'shadow-lg shadow-black/40'
          : 'shadow-md shadow-black/30'
      }`}
    >
      <div className="w-full px-2 sm:px-3 lg:px-4">
        <div className="flex items-center justify-between h-20 xl:h-24">
          {/* Left: Logo / Brand */}
          <Link href="/" className="flex items-center group flex-shrink-0">
            <div className="relative w-16 h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/Main logo Amigos.png"
                alt="Amigos IAS Academy"
                fill
                className="object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]"
              />
            </div>
          </Link>

          {/* Mobile Menu Button - Right Side */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-slate-200 hover:bg-slate-800/60 transition ml-auto"
            aria-label="Toggle navigation menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Middle: Navigation starts immediately after logo */}
          <nav className="hidden lg:flex items-center flex-1 ml-5">
            <div className="flex items-center gap-5 xl:gap-7 2xl:gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-2.5 xl:px-3 py-2 text-sm xl:text-base font-medium tracking-wide rounded-md transition-all duration-300 group whitespace-nowrap ${
                    isActive
                      ? 'text-amber-300'
                      : 'text-slate-200 hover:text-amber-200'
                  }`}
                >
                  <span className="relative z-10">
                    {link.name}
                  </span>
                  {/* underline / indicator */}
                  <span
                    className={`absolute left-1/2 -bottom-1 h-[2px] -translate-x-1/2 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 rounded-full shadow-[0_0_6px_rgba(251,191,36,0.6)] transition-all duration-300 ${
                      isActive ? 'w-3/5' : 'w-0 group-hover:w-3/5'
                    }`}
                  />
                  {/* subtle hover glow */}
                  <span
                    className={`absolute inset-0 rounded-md opacity-0 group-hover:opacity-10 transition bg-amber-300`}
                  />
                </Link>
              );
            })}
            </div>
          </nav>

          {/* Right: CTAs */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-4 flex-shrink-0">
            <Link
              href="/admissions"
              className="relative overflow-hidden text-sm xl:text-base px-5 xl:px-6 py-2.5 xl:py-3 font-semibold rounded-md bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-[0_3px_10px_rgba(0,0,0,0.45)] hover:shadow-[0_5px_14px_rgba(0,0,0,0.55)] transition whitespace-nowrap"
            >
              <span className="relative z-10">Join Now</span>
            </Link>
            <Link
              href="/contact"
              className="relative overflow-hidden text-sm xl:text-base px-5 xl:px-6 py-2.5 xl:py-3 font-semibold rounded-md bg-slate-700 text-slate-200 shadow-[0_3px_10px_rgba(0,0,0,0.45)] hover:bg-slate-600 hover:text-white transition whitespace-nowrap"
            >
              <span className="relative z-10">Enquire Now</span>
            </Link>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/95 border-t border-slate-800 backdrop-blur-xl">
          <nav className="px-4 py-4 space-y-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-2 text-sm font-medium rounded-md transition-all ${
                    isActive
                      ? 'text-amber-300 bg-slate-800'
                      : 'text-slate-200 hover:text-amber-200 hover:bg-slate-800/60'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
