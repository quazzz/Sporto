"use client";
import React from "react";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
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
    const response = await fetch("/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    // if response isnt okay then throw error
    if (!response.ok) {
      const error = await response.json();
      toast(error.message);
      return;
    }
    if (response.ok) {
      router.push("/login");
      return;
    }
  };

  return (
    <div className="min-h-screen  text-gray-900 flex items-center justify-center py-12 bg-custom-lines font-[family-name:var(--font-geist-sans)]">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Create your account</h1>
        </div>
        <form className="bg-white shadow sm:rounded-lg px-8 py-10">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">
              Your Name
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="transition w-full px-4 py-3 mt-1 rounded-lg font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-black focus:bg-white"
              placeholder="Name"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 ">
              Your email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="transition w-full px-4 py-3 mt-1 rounded-lg font-medium bg-gray-100 border border-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-black focus:bg-white"
              placeholder="Email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">
              Your New Password
            </label>
            <input
              minLength={8}
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
              Sign In
            </button>
          </div>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Dont have an account?{" "}
            <Link href="/login">
              <span className="underline text-black hover:text-black">
                Login here
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
