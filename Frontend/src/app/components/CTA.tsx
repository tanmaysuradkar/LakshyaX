'use client';
import React from 'react'
import { useSession } from "next-auth/react"
import Link from 'next/link';
const Ready = () => {
  const { data: session } = useSession();
  if (session?.user) {
    return (
    <div className="bg-blue-700">
      <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          <span className="block">Ready to get started?</span>
          <span className="block">Start your free trial today.</span>
        </h2>
        <p className="mt-4 text-lg leading-6 text-blue-200">
          Join thousands of companies that trust our platform to manage their remote teams.
        </p>
        <Link
          href="/trial"
          className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 sm:w-auto"
        >
          Start Your 14-Day for free
        </Link>
      </div>
    </div>)
  }
  return (
    <div className="bg-blue-700">
      <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          <span className="block">Ready to get started?</span>
          <span className="block">Start your free trial today.</span>
        </h2>
        <p className="mt-4 text-lg leading-6 text-blue-200">
          Join thousands of companies that trust our platform to manage their remote teams.
        </p>
        <Link
          href="/signup"
          className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 sm:w-auto"
        >
          Sign up for free
        </Link>
      </div>
    </div>
  )
}

export default Ready
