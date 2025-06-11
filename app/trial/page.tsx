'use client';
import React from 'react'
import { useSession } from "next-auth/react"
import Link from 'next/link';
import Navbar from "../components/Navbar";
export default function TrialPage() {
  const { data: session } = useSession();
  if (session?.user) {
      return (
        <main className="min-h-screen bg-gray-50">
          {/* Navigation Bar */}
          <Navbar/>
    
          {/* Hero Section */}
          <section className="bg-gradient-to-b from-blue-600 to-blue-800 text-white py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-5xl font-bold mb-6">
                  Start Your 14-Day Free Trial
                </h1>
                <p className="text-xl mb-8">
                  Experience the power of our remote company management platform. No credit card required.
                </p>
                <div className="flex justify-center space-x-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="text-3xl font-bold">14</div>
                    <div className="text-sm">Days Free</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="text-3xl font-bold">24/7</div>
                    <div className="text-sm">Support</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="text-3xl font-bold">100%</div>
                    <div className="text-sm">Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
    
          {/* Signup Section */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h2 className="text-3xl font-bold text-center mb-8 text-black">Create Your Account</h2>
                  <form className="space-y-6">
                    <div>
                      <label className="block text-gray-700 mb-2">Company Name</label>
                      <input 
                        type="text" 
                        className="text-black w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your company name"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Work Email</label>
                      <input 
                        type="email" 
                        className="text-black w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="you@company.com"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Password</label>
                      <input 
                        type="password" 
                        className="text-black w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Create a password"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Role in Company</label>
                      <select className=" text-black w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">                    <option>CEO/Founder</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Company Size</label>
                      <select className="text-black w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        <option>1-10 employees</option>
                        <option>11-50 employees</option>
                        <option>51-200 employees</option>
                        <option>201+ employees</option>
                      </select>
                    </div>
                    <button className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold flex items-center justify-center space-x-2">
                      <span>Start Free Trial</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </button>
                    <p className="text-center text-gray-600 text-sm">
                      By signing up, you agree to our Terms of Service and Privacy Policy
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </main>
      );
  }
    return (
      <main className="min-h-screen bg-gray-50">
          {/* Navigation Bar */}
          <Navbar/>
      <div className="bg-blue-700 h-full">
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
    </main>
    )
} 