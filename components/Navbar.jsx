"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import clsx from "clsx";

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
    <nav className="bg-gradient-to-r from-black via-gray-900 to-black  py-4 z-10 fixed w-full">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="text-2xl font-semibold text-white">
          <Link href={pageConfig.home} className="hover:text-indigo-400 transition-colors">
            Sporto
          </Link>
        </div>
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-white focus:outline-none" aria-label="Toggle Menu">
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
        <div className="hidden md:flex items-center space-x-8">
          {session ? (
            <>
              <span className="font-semibold text-white ">{`Hello, ${session.user.name}!`}</span>
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
                className="text-white hover:text-indigo-400 transition-colors duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {[
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
              ))}
            </>
          )}
        </div>
      </div>
      <div className={clsx("md:hidden", { block: isMenuOpen, hidden: !isMenuOpen })}>
        <div className="flex flex-col items-center space-y-4 py-4 bg-gradient-to-r from-black via-gray-900 to-black ">
          {session ? (
            <>
              <span className="font-semibold text-white">{`Hello, ${session.user.name}`}</span>
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
                className="text-white hover:text-indigo-400 transition-colors duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {[
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
              ))}
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
