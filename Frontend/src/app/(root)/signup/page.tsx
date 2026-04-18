'use client';
import Navbar from '@/app/components/Navbar';
import { useEffect, useState } from 'react';
import { useSession, signIn } from "next-auth/react"
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
export default function SignUp() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [buttondisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const onsignup = async () => {
    try {
      setLoading(true);
      setButtonDisabled(true);
      const response = await axios.post('/api/user/signup', user);
      console.log("Signup response:", response);
      router.push('/verifyemail');
      console.log("First name:", user.username);
    } catch (error: any) {
      console.error("Error during signup:", error);
      toast.error(error.message || "Something went wrong");
    }
  }
  useEffect(() => {
    if (user.email.length > 0 && user.username.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  const { data: session } = useSession();
  console.log("tanmsu",session)
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      <div className="w-full px-4 py-8 sm:py-12 lg:py-20">
        <div className="max-w-sm mx-auto">
          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
            <h1 className="text-2xl sm:text-3xl text-black font-bold text-center mb-8">{loading ? "Processing..." : "Create Your Account"}</h1>
            
            <div className="space-y-6 mb-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  required
                  className="text-black p-2 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={user.username}
                  onChange={(e) => setUser({ ...user, username: e.target.value })}
                  required
                  className="text-black p-2 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={user.password}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                  required
                  className="text-black p-2 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <button
                onClick={onsignup}
                disabled={buttondisabled}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                {loading ? "Signing up..." : "Create Account"}
              </button>
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or sign up with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-6">
              <button
                type="button"
                onClick={() => signIn("google")}
                className="w-full inline-flex justify-center py-2 px-3 sm:px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
              >
                <span className="sr-only">Sign up with Google</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => signIn("github")}
                className="w-full inline-flex justify-center py-2 px-3 sm:px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
              >
                <span className="sr-only">Sign up with GitHub</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
} 