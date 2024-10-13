'use client'

import React from 'react';
import Link from 'next/link';
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react"; 

export default function Navbar() {
  // get session 
  const { data: session, status } = useSession();
  // get loading status
  const loading = status === "loading";
  // logout handler
  const handleClick = async () => {
    // deleting session
    await signOut({ redirect: false });
    // refreshing the page
    window.location.reload(); 
  }

  return (
    <nav className="bg-slate-50 shadow-md py-4 z-10 font-[family-name:var(--font-geist-sans)]">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
        <div className="text-xl font-semibold text-gray-800">
          <Link href="/">Sporto</Link>
        </div>
        <div className="space-x-4">
          {session ?  // if session is true then return logout button
           <> 
            
             <Link href="/dashboard"><span className="text-gray-700 hover:text-indigo-600 transition-colors duration-300">Dashboard</span></Link>
             <Link href="/dashboard/catalog"><span className="text-gray-700 hover:text-indigo-600 transition-colors duration-300">Catalog</span></Link>
           <button className='text-gray-700 hover:text-indigo-600 transition-colors duration-300' onClick={handleClick}>Logout</button>
           </>
           
           : // and if its false -> session not registered then return login and register ubttons
            <>
              <Link href="/login"><span className="text-gray-700 hover:text-indigo-600 transition-colors duration-300">Login</span></Link>
              <Link href="/register"><span className="text-gray-700 hover:text-indigo-600 transition-colors duration-300">Register</span></Link>
            </>
          }
        
        </div>
      </div>
    </nav>
  );
}
