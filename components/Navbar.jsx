'use client'

import React from 'react';
import Link from 'next/link';
import { signOut } from "next-auth/react"
export default function Navbar() {
  return (
    <nav className="bg-slate-50 shadow-md py-4 z-10 font-[family-name:var(--font-geist-sans)]">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
        <div className="text-xl font-semibold text-gray-800">
          <Link href="/">Sporto</Link>
        </div>
        <div className="space-x-4">
          <Link href="/dashboard">
            <span className="text-gray-700 hover:text-indigo-600 transition-colors duration-300">Dashboard</span>
          </Link>
          <Link href="/login">
            <span className="text-gray-700 hover:text-indigo-600 transition-colors duration-300">Login</span>
          </Link>
          <Link href="/register">
            <span className="text-gray-700 hover:text-indigo-600 transition-colors duration-300">Register</span>
          </Link>
          <button className='text-gray-700 hover:text-indigo-600 transition-colors duration-300' onClick={signOut}>Logout</button>
        </div>
      </div>
    </nav>
  );
}
