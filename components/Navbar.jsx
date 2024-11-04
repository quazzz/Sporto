"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import clsx from "clsx";

class PageConfig {
  home = '/';
  dashboard = '/dashboard';
  catalog = '/dashboard/catalog';
  login = '/login';
  register = '/register';
}
export const pageConfig = new PageConfig()
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  // get session
  const { data: session } = useSession();
  // get loading status
  
  // logout handler
  const handleClick = async () => {
    // deleting session
    await signOut({ redirect: false });
    // refreshing the page
    window.location.reload();
  };
  const isActive = (href) => pathname === href;
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  return (
    <nav className="bg-slate-50 shadow-md py-4 z-10 font-[family-name:var(--font-geist-sans)] fixed w-full">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
        <div className="text-xl font-semibold text-gray-800">
          <Link href={pageConfig.home}>Sporto</Link>
        </div>

        <div className="flex items-center md:hidden">
          {/* Hamburger Menu Icon */}
          <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          {session ? (
            <>
              <div className="flex-1 flex justify-center">
                <span className="font-bold text-xl text-gray-700">
                  Hello, {session.user.name}
                </span>
              </div>

              {[
                { href: pageConfig.dashboard, label: "Dashboard", path: "/dashboard" },
                { href: pageConfig.catalog, label: "Catalog", path: "/dashboard/catalog" }
              ].map(({ href, label, path }) => (
                <Link key={label} href={href}>
                  <span
                    className={clsx(
                      "text-gray-700 hover:text-indigo-600 transition-colors duration-300",
                      { "text-black font-semibold": isActive(path) }
                    )}
                  >
                    {label}
                  </span>
                </Link>
              ))}

              <button
                className="text-gray-700 hover:text-indigo-600 transition-colors duration-300"
                onClick={handleClick}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <div className="flex items-center space-x-4">
                {[
                  { href: pageConfig.login, label: "Login", path: "/login" },
                  { href: pageConfig.register, label: "Register", path: "/register" }
                ].map(({ href, label, path }) => (
                  <Link key={label} href={href}>
                    <span
                      className={clsx(
                        "text-gray-700 hover:text-indigo-600 transition-colors duration-300",
                        { "text-black font-semibold": isActive(path) }
                      )}
                    >
                      {label}
                    </span>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      
      <div className={clsx("md:hidden", { "block": isMenuOpen, "hidden": !isMenuOpen })}>
        {session ? (
          <>
            <div className="flex flex-col items-center space-y-2 py-4">
              <div className="flex-1">
                <span className="font-bold text-xl text-gray-700">
                  Hello, {session.user.name}
                </span>
              </div>

              {[
                { href: pageConfig.dashboard, label: "Dashboard", path: "/dashboard" },
                { href: pageConfig.catalog, label: "Catalog", path: "/dashboard/catalog" }
              ].map(({ href, label, path }) => (
                <Link key={label} href={href}>
                  <span
                    className={clsx(
                      "text-gray-700 hover:text-indigo-600 transition-colors duration-300",
                      { "text-black font-semibold": isActive(path) }
                    )}
                  >
                    {label}
                  </span>
                </Link>
              ))}

              <button
                className="text-gray-700 hover:text-indigo-600 transition-colors duration-300"
                onClick={handleClick}
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center space-y-2 py-4">
            {[
              { href: pageConfig.login, label: "Login", path: "/login" },
              { href: pageConfig.register, label: "Register", path: "/register" }
            ].map(({ href, label, path }) => (
              <Link key={label} href={href}>
                <span
                  className={clsx(
                    "text-gray-700 hover:text-indigo-600 transition-colors duration-300",
                    { "text-black font-semibold": isActive(path) }
                  )}
                >
                  {label}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>


  
  );
}
