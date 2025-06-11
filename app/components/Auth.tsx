'use client';
import Link from 'next/link';
import { redirect, usePathname } from 'next/navigation';
import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect } from 'react';

export default function Component() {
  const pathname = usePathname();
  const { data: session } = useSession()
 if(pathname === '/signup'){
  useEffect(() => {
    if (session?.user) {
      redirect("/");
    }
  }, [session, pathname]);
 }
  if (session?.user) {
    return (
      <div className=' text-black'>
        Signed in as {session.user.name} <br />
        <button onClick={() => signOut()}><Link
          href="/signup"
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">Sign out</Link></button>
      </div>
    )
  } return (
    // <div>
    //   Not signed in 
    //   <br/>
    //   <button onClick={() => signIn()}>Sign in</button>
    // </div>
    <div className="flex space-x-4">
      {/* <Link 
              href="/login" 
              className={`px-4 py-2 ${pathname === '/login' ? 'text-blue-700' : 'text-blue-600'} hover:text-blue-700 transition-colors`}
            >
              Login
            </Link> */}
      <Link
        href="/signup"
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Sign Up
      </Link>
    </div>
  )
}