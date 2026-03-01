'use client';
import { useEffect, useState } from 'react';
import Navbar from '@/app/components/Navbar';
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const [token, setToken] = useState('');
  const [verify, setVerify] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const verifyEmail = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/user/isVerfymail', { token });
      console.log("Verify response:", response);
      setVerify(true);
      router.push('/login');
      toast.success("Email verified successfully");
    } catch (error: any) {
      setLoading(false);
      console.error("Error during email verification:", error);
      setError(true);
      toast.error(error.message || "Something went wrong");
    }
  };
  useEffect(() => {
    setError(false);
    const url: any = window.location.search.split('=')[1];
    setToken(url || "");
  }, [])

  const verificationMessage = verify
    ? "Verification successful"
    : loading
      ? "Verifying..."
      : "Enter your token";

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-md mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h1 className=" text-black text-2xl font-bold text-center mb-8">Verify your Account</h1>
            <h1 className=" text-black text-2xl font-bold text-center mb-8">{verificationMessage}</h1>
            <div className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Token verify
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder='Token verify'
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  required
                  className=" text-black p-2 mt-1 block w-full rounded-sm border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <button
                  type="submit"
                  onClick={() => { verifyEmail() }}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {token ? "Verify for email to email" : "Verify for email"}
                </button>
              </div>
            </div>
            <p className="mt-8 text-center text-sm text-gray-600">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="font-medium text-blue-600 hover:text-blue-500">
                Sign in account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
} 