'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from "next-auth/react";
import { useState } from 'react';

export default function MobileMenu() {
  const pathname = usePathname();
  const { data: session }: any = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Hamburger Button - Mobile Only */}
      <button
        onClick={toggleMenu}
        className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden" onClick={closeMenu}></div>
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed left-0 top-16 right-0 bg-white shadow-lg transform transition-all duration-300 z-50 md:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="px-4 py-4 space-y-2">
          <Link
            href="/"
            className={`block px-4 py-2 rounded-md transition-colors ${
              pathname === '/' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={closeMenu}
          >
            Home
          </Link>
          <Link
            href="/features"
            className={`block px-4 py-2 rounded-md transition-colors ${
              pathname === '/features' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={closeMenu}
          >
            Features
          </Link>
          <Link
            href="/pricing"
            className={`block px-4 py-2 rounded-md transition-colors ${
              pathname === '/pricing' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={closeMenu}
          >
            Pricing
          </Link>
          <Link
            href="/about"
            className={`block px-4 py-2 rounded-md transition-colors ${
              pathname === '/about' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={closeMenu}
          >
            About
          </Link>
          <Link
            href="/contact"
            className={`block px-4 py-2 rounded-md transition-colors ${
              pathname === '/contact' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={closeMenu}
          >
            Contact
          </Link>
          <Link
            href="/trial"
            className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
            onClick={closeMenu}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span className='text-sm'>App Trial</span>
          </Link>
          {session && (
            <button
              onClick={() => {
                signOut();
                closeMenu();
              }}
              className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
            >
              Sign Out
            </button>
          )}
        </div>
      </div>
    </>
  );
}
