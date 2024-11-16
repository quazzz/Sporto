"use client";
import React from "react";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
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
          <h1 className="text-4xl font-bold">Create your account</h1>
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
              required
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
              required
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
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
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              title="Sign in"
              onClick={handleSubmit}
              className="transition w-full py-2 hover:bg-gray-950 bg-black text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
            >
              Register
            </button>
          </div>
          <h2 className="text-sm text-gray-600 text-center mt-4 ">
            or you can register with
          </h2>
          <div
            className="mx-auto text-center cursor-pointer w-max mt-2 border rounded-full"
            onClick={async () =>
              signIn("google", {
                callbackUrl: "https://loovtoo.onrender/dashboard",
              })
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="30"
              height="30"
              viewBox="0 0 48 48"
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
