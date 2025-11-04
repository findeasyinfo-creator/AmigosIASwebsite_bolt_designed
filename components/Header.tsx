'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-white shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <Link href="/" className="flex items-center space-x-3 group flex-shrink-0">
            <div className="relative w-24 h-24 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/Main logo Amigos.png"
                alt="Amigos IAS Academy"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-2xl font-bold text-primary-navy hidden xl:block whitespace-nowrap">
              AMIGOS IAS
            </span>
          </Link>

          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 flex-1 justify-center max-w-4xl">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-2 xl:px-3 py-2 text-xs xl:text-sm font-medium rounded-md transition-colors duration-200 whitespace-nowrap ${
                  link.name === 'Current Affairs'
                    ? 'text-primary-orange hover:bg-primary-orange/10'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center space-x-2 xl:space-x-3 flex-shrink-0">
            <Link href="/admissions" className="btn-primary text-xs xl:text-sm px-4 xl:px-6 py-2 xl:py-3 whitespace-nowrap">
              Join Now
            </Link>
            <Link href="/contact" className="btn-secondary text-xs xl:text-sm px-4 xl:px-6 py-2 xl:py-3 whitespace-nowrap">
              Enquire Now
            </Link>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
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
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <nav className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
