"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import clsx from "clsx";
import { motion } from "framer-motion";

class PageConfig {
  home = "/";
  dashboard = "/dashboard";
  catalog = "/dashboard/catalog";
  login = "/login";
  register = "/register";
  records = "/dashboard/records";
}
export const pageConfig = new PageConfig();

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Get session
  const { data: session } = useSession();

  // Logout handler
  const handleClick = async () => {
    await signOut({ redirect: false });
    window.location.reload();
  };

  const isActive = (href) => pathname === href;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-950 via-black to-gray-950 py-4 fixed w-full z-20 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-white tracking-wide"
        >
          <Link href={pageConfig.home} className="hover:text-blue-300 transition-colors bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-white">
            Sporto
          </Link>
        </motion.div>

      
        <div className="hidden md:flex items-center space-x-6">
          {session ? (
            <>
              <span className="font-medium text-white">{`Hello, ${session.user.name}!`}</span>
              {[
                { href: pageConfig.dashboard, label: "Dashboard" },
                { href: pageConfig.catalog, label: "Catalog" },
                { href: pageConfig.records, label: "Achievements" },
              ].map(({ href, label }) => (
                <Link
                  key={label}
                  href={href}
                  className={clsx(
                    "text-white hover:text-indigo-400 transition-colors duration-300",
                    { "font-semibold": isActive(href) }
                  )}
                >
                  {label}
                </Link>
              ))}
              <button
                onClick={handleClick}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            [
              { href: pageConfig.login, label: "Login" },
              { href: pageConfig.register, label: "Register" },
            ].map(({ href, label }) => (
              <Link
                key={label}
                href={href}
                className={clsx(
                  "text-white hover:text-indigo-400 transition-colors duration-300",
                  { "font-semibold": isActive(href) }
                )}
              >
                {label}
              </Link>
            ))
          )}
        </div>


        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
            aria-label="Toggle Menu"
          >
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
      </div>

      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-gradient-to-r from-gray-900 via-black to-gray-900 py-4"
        >
          <div className="flex flex-col items-center space-y-4">
            {session ? (
              <>
                <span className="font-medium text-white">{`Hello, ${session.user.name}`}</span>
                {[
                  { href: pageConfig.dashboard, label: "Dashboard" },
                  { href: pageConfig.catalog, label: "Catalog" },
                  { href: pageConfig.records, label: "Achievements" },
                ].map(({ href, label }) => (
                  <Link
                    key={label}
                    href={href}
                    className={clsx(
                      "text-white hover:text-indigo-400 transition-colors duration-300",
                      { "font-semibold": isActive(href) }
                    )}
                  >
                    {label}
                  </Link>
                ))}
                <button
                  onClick={handleClick}
                  className="px-4 py-2 bg-gradient-to-b from-indigo-500 to-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              [
                { href: pageConfig.login, label: "Login" },
                { href: pageConfig.register, label: "Register" },
              ].map(({ href, label }) => (
                <Link
                  key={label}
                  href={href}
                  className={clsx(
                    "text-white hover:text-indigo-400 transition-colors duration-300",
                    { "font-semibold": isActive(href) }
                  )}
                >
                  {label}
                </Link>
              ))
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
}