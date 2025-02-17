"use client";
import React from "react";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {CreateUser} from '@/app/actions/actions.ts'
export default function RegisterForm() {
  //declaring router
  const router = useRouter();
  //set states for fetching them in future
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  //handle button click
  const handleSubmit = async (e) => {
    // prevent page from reloading
    e.preventDefault();
    // check for fields
    if (!name || !email || !password) {
      toast("All fields must be filled");
      return;
    }
    // send POST request with data to API endpoint
    const response = await CreateUser(email, password, name);

    // if response isnt okay then throw error
    if (!response.ok) {
      const error = await response.json();
      toast(error.message);
      return;
    }
    if (response.ok) {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if(res.ok){
        router.push('/dashboard')
      }
      return;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 ">
  <div className="max-w-md w-full bg-gradient-to-b from-gray-900 to-black shadow-2xl rounded-2xl p-8 animate-fade-in">

    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-400 mb-4">Create an Account</h1>
      <p className="text-gray-400">Join us to elevate your workout journey!</p>
    </div>


    <form onSubmit={handleSubmit} className="space-y-6 ">
   
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Username
        </label>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 border border-gray-700 rounded-lg text-sm bg-gray-800 text-gray-300 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
          placeholder="Create your username"
          required
        />
      </div>

     
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Email Address
        </label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 border border-gray-700 rounded-lg text-sm bg-gray-800 text-gray-300 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
          placeholder="Enter your email"
          required
        />
      </div>

  
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Password
        </label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 border border-gray-700 rounded-lg text-sm bg-gray-800 text-gray-300 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
          placeholder="Create a password"
          required
        />
      </div>


      <button
        type="submit"
        className="w-full py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-500 transition focus:ring-2 focus:ring-indigo-400 focus:outline-none"
      >
        Sign Up
      </button>


      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 border-t border-gray-700"></div>
        <div className="relative bg-gray-900 px-4 text-sm text-gray-400">
          or register with
        </div>
      </div>


      <div
        className="flex items-center justify-center cursor-pointer bg-gray-800 rounded-lg px-4 py-3 shadow hover:bg-gray-750 transition"
        onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 48 48"
          className="mr-2"
        >
          <path
            fill="#FFC107"
            d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
          ></path>
          <path
            fill="#FF3D00"
            d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
          ></path>
          <path
            fill="#4CAF50"
            d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
          ></path>
          <path
            fill="#1976D2"
            d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
          ></path>
        </svg>
        <span className="font-medium text-gray-300">Continue with Google</span>
      </div>
    </form>


    <div className="text-center mt-6">
      <p className="text-sm text-gray-400">
        Already have an account?{" "}
        <Link href="/login">
          <span className="text-indigo-500 font-medium hover:underline">
            Log in here
          </span>
        </Link>
      </p>
    </div>
  </div>
</div>

  
  );
}
