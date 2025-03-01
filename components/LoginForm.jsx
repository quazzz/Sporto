"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { signIn, getCsrfToken } from "next-auth/react";
import { toast } from "react-hot-toast";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [csrfToken, setCsrfToken] = useState("");
  const [isEmailLogin, setIsEmailLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // fetch csrf token
    const fetchCsrfToken = async () => {
      const token = await getCsrfToken();
      setCsrfToken(token);
    };

    fetchCsrfToken();
  }, []);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast("All fields must be filled");
      return;
    }

    try {
      const res = await signIn("credentials", {
        email,
        password,
        csrfToken,
        redirect: false,
      });

      if (!res.ok) {
        if (res.error) {
          toast(res.error);
        } else {
          toast("Failed to login, try again");
        }
      }

      if (res.ok) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      toast("An unexpected error occurred, please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <div className="max-w-md w-full bg-gradient-to-b from-gray-900 to-black shadow-2xl rounded-2xl p-8 animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-400">
            Welcome Back!
          </h1>
          <p className="text-gray-400">
            Log in to continue your workout journey
          </p>
        </div>

        {!isEmailLogin ? (
          <div className="space-y-6">
            <button
              onClick={() => setIsEmailLogin(true)}
              className="w-full py-3 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-700 transition focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            >
              Log In with e-mail
            </button>

            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 border-t border-gray-700"></div>
              <div className="relative bg-gray-900 px-4 text-sm text-gray-400">
                or log in with Google
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
          <form onSubmit={handleEmailSubmit} className="space-y-6">
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
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
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-700 rounded-lg text-sm bg-gray-800 text-gray-300 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      fill="none"
                    >
                      <path
                        fill="currentColor"
                        d="M12 6c-3.333 0-6 2.667-6 6s2.667 6 6 6 6-2.667 6-6-2.667-6-6-6zm0 10c-2.221 0-4-1.779-4-4s1.779-4 4-4 4 1.779 4 4-1.779 4-4 4zm6-10c0 1.104-.896 2-2 2s-2-.896-2-2 2-.896 2-2 2 .896 2 2zm-4 4c0 .552-.448 1-1 1s-1-.448-1-1 1-.448 1-1 1 .448 1 1zm4 4c0 1.104-.896 2-2 2s-2-.896-2-2 2-.896 2-2 2 .896 2 2z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      fill="none"
                    >
                      <path
                        fill="currentColor"
                        d="M12 6c-3.333 0-6 2.667-6 6s2.667 6 6 6 6-2.667 6-6-2.667-6-6-6zm0 10c-2.221 0-4-1.779-4-4s1.779-4 4-4 4 1.779 4 4-1.779 4-4 4zm6-10c0 1.104-.896 2-2 2s-2-.896-2-2 2-.896 2-2 2 .896 2 2zm-4 4c0 .552-.448 1-1 1s-1-.448-1-1 1-.448 1-1 1 .448 1 1zm4 4c0 1.104-.896 2-2 2s-2-.896-2-2 2-.896 2-2 2 .896 2 2z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-500 transition focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            >
              Log In
            </button>
          </form>
        )}

        <div className="text-center mt-6">
          <p className="text-sm text-gray-400">
            Dont have an account?{" "}
            <Link href="/register">
              <span className="text-indigo-500 font-medium hover:underline">
                Sign up here
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
