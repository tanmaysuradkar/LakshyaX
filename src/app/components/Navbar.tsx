'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession,signOut} from "next-auth/react"
// import Auth from "./Auth";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session }:any = useSession()
  const validation = session == undefined ? "login":session.user.name;
  console.log(session);
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
              href="/trial" 
              className="cursor-pointer  px-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span className='text-sm'>App Trial</span>
            </Link>
          </div>

          {/* Auth Buttons */}
          {/* <Auth/> */}
          
        </div>
      </div>
    </nav>
  );
} 