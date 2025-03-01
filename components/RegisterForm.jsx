"use client";
import React from "react";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { CreateUser } from "@/app/actions/actions.ts";
export default function RegisterForm() {
  //declaring router
  const router = useRouter();
  //set states for fetching them in future
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailReg, setIsEmailReg] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
      if (res.ok) {
        router.push("/dashboard");
      }
      return;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 ">
      <div className="max-w-md w-full bg-gradient-to-b from-gray-900 to-black shadow-2xl rounded-2xl p-8 animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-400 mb-4">
            Create an Account
          </h1>
          <p className="text-gray-400">
            Join us to elevate your workout journey!
          </p>
        </div>
        {!isEmailReg? (
          <div className="space-y-6">
          <button
            onClick={() => setIsEmailReg(true)}
            className="w-full py-3 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-700 transition focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          >
            Register with e-mail
          </button>

          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 border-t border-gray-700"></div>
            <div className="relative bg-gray-900 px-4 text-sm text-gray-400">
              or register with Google
            </div>
          </div>

          <button
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="w-full py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-500 transition focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          >
            Log In with Google
          </button>
        </div>
        ) : (
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

      

          
        </form>
        )}

        

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
