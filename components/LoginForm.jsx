"use client";
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
export default function LoginForm() {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const router = useRouter()
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const res = await signIn('credentials',{
        email,
        password, 
        redirect: false
      })
      if(res.error){
        return
      }
      router.push('/dashboard')
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <div className="min-h-screen  text-gray-900 flex items-center justify-center py-12 bg-custom-lines font-[family-name:var(--font-geist-sans)]">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Welcome Back!</h1>
        </div>
        <form className="bg-white shadow sm:rounded-lg px-8 py-10">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Your Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="transition w-full px-4 py-3 mt-1 rounded-lg font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-black focus:bg-white"
              placeholder="Email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="transition w-full px-4 py-3 mt-1 rounded-lg font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-black focus:bg-white"
              placeholder="Password"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              onClick={handleSubmit}
              className="transition w-full py-3 bg-black text-white font-semibold rounded-lg hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
            >
              Log in
            </button>
          </div>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link href="/register">
              <span className="underline text-black hover:text-black">
                Sign up here
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
