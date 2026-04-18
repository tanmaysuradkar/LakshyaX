'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from "next-auth/react";
import MobileMenu from './MobileMenu';
// import Auth from "./Auth";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session }: any = useSession()
  const validation = session == undefined ? "login" : session.user.name;
  console.log(session);
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="text-xl md:text-2xl font-bold text-blue-600 flex-shrink-0">
            LakshyaX
          </Link>

          {/* Navigation Buttons - Desktop Only */}
          <div className="hidden md:flex space-x-2 lg:space-x-4 flex-1 justify-center">
            <Link
              href="/"
              className={`cursor-pointer px-3 lg:px-4 py-2 text-sm lg:text-base ${pathname === '/' ? 'text-blue-600 font-semibold' : 'text-gray-600'} hover:text-blue-600 transition-colors`}
            >
              Home
            </Link>
            <Link
              href="/features"
              className={`cursor-pointer px-3 lg:px-4 py-2 text-sm lg:text-base ${pathname === '/features' ? 'text-blue-600 font-semibold' : 'text-gray-600'} hover:text-blue-600 transition-colors`}
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className={`cursor-pointer px-3 lg:px-4 py-2 text-sm lg:text-base ${pathname === '/pricing' ? 'text-blue-600 font-semibold' : 'text-gray-600'} hover:text-blue-600 transition-colors`}
            >
              Pricing
            </Link>
            <Link
              href="/about"
              className={`cursor-pointer px-3 lg:px-4 py-2 text-sm lg:text-base ${pathname === '/about' ? 'text-blue-600 font-semibold' : 'text-gray-600'} hover:text-blue-600 transition-colors`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`cursor-pointer px-3 lg:px-4 py-2 text-sm lg:text-base ${pathname === '/contact' ? 'text-blue-600 font-semibold' : 'text-gray-600'} hover:text-blue-600 transition-colors`}
            >
              Contact
            </Link>
            <Link
              href="/trial"
              className="cursor-pointer px-2 lg:px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-1 text-sm lg:text-base"
            >
              <svg className="w-3 h-3 lg:w-4 lg:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Trial</span>
            </Link>
          </div>

          {/* Auth & Mobile Menu */}
          <div className="flex items-center space-x-3 md:space-x-4 flex-shrink-0">
            {session ? (
              <div className="hidden sm:flex items-center space-x-2">
                <span className="text-sm text-gray-600 hidden sm:inline">{session.user?.name}</span>
                <button
                  onClick={() => signOut()}
                  className="px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center space-x-2">
                <Link href="/login" className="px-3 py-1 text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  Login
                </Link>
                <Link href="/signup" className="px-3 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors">
                  Sign Up
                </Link>
              </div>
            )}
            <MobileMenu />
          </div>
        </div>
      </div>
    </nav>
  );
} 