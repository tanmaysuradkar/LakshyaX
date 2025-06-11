'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Auth from "./Auth";

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-blue-600">
            LakshyaX
          </Link>
          
          {/* Navigation Buttons */}
          <div className="hidden md:flex space-x-4">
            <Link 
              href="/" 
              className={`cursor-pointer px-4 py-2 ${pathname === '/' ? 'text-blue-600' : 'text-gray-600'} hover:text-blue-600 transition-colors`}
            >
              Home
            </Link>
            <Link 
              href="/features" 
              className={`cursor-pointer px-4 py-2 ${pathname === '/features' ? 'text-blue-600' : 'text-gray-600'} hover:text-blue-600 transition-colors`}
            >
              Features
            </Link>
            <Link 
              href="/pricing" 
              className={`cursor-pointer px-4 py-2 ${pathname === '/pricing' ? 'text-blue-600' : 'text-gray-600'} hover:text-blue-600 transition-colors`}
            >
              Pricing
            </Link>
            <Link 
              href="/about" 
              className={`cursor-pointer px-4 py-2 ${pathname === '/about' ? 'text-blue-600' : 'text-gray-600'} hover:text-blue-600 transition-colors`}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className={`cursor-pointer px-4 py-2 ${pathname === '/contact' ? 'text-blue-600' : 'text-gray-600'} hover:text-blue-600 transition-colors`}
            >
              Contact
            </Link>
            <Link 
              href="/signup-campany" 
              className={`cursor-pointer px-4 py-2 ${pathname === '/signup-campany' ? 'text-blue-600' : 'text-gray-600'} hover:text-blue-600 transition-colors`}
            >
              Company Signup
            </Link>
            <Link 
              href="/trial" 
              className="cursor-pointer px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>App Trial</span>
            </Link>
          </div>

          {/* Auth Buttons */}
          <Auth/>
          {/* <div className="flex space-x-4">
            <Link 
              href="/login" 
              className={`px-4 py-2 ${pathname === '/login' ? 'text-blue-700' : 'text-blue-600'} hover:text-blue-700 transition-colors`}
            >
              Login
            </Link>
            <Link 
              href="/signup" 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Sign Up
            </Link>
          </div> */}
        </div>
      </div>
    </nav>
  );
} 