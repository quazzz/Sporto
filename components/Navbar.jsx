"use client";

import { useState } from "react";
import {  usePathname } from "next/navigation";
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
  records = '/dashboard/records'
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
    <nav className="bg-slate-50 shadow-md py-4 z-10 fixed w-full">
  <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
    {/* Logo */}
    <div className="text-2xl font-semibold text-black">
      <Link href={pageConfig.home} className="hover:text-gray-900 transition-colors">
        Sporto
      </Link>
    </div>

    {/* Mobile Menu Toggle */}
    <div className="md:hidden flex items-center">
      <button onClick={toggleMenu} className="text-black focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>
    </div>

    {/* Desktop Links */}
    <div className="hidden md:flex items-center space-x-8">
      {session ? (
        <>
          <div className="flex-1 text-center text-black">
            <span className="font-semibold text-xl">{`Hello, ${session.user.name}!`}</span>
          </div>
          {[
            { href: pageConfig.dashboard, label: "Dashboard", path: "/dashboard" },
            { href: pageConfig.catalog, label: "Catalog", path: "/dashboard/catalog" },
            { href: pageConfig.records, label: "Achievements", path: "/dashboard/records" }
          ].map(({ href, label, path }) => (
            <Link key={label} href={href} className={clsx("text-black hover:text-gray-900 transition-colors duration-300", { "font-semibold": isActive(path) })}>
              {label}
            </Link>
          ))}
          <button onClick={handleClick} className="text-black hover:text-gray-900 transition-colors duration-300">
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
              <Link key={label} href={href} className={clsx("text-black hover:text-gray-900 transition-colors duration-300", { "font-semibold": isActive(path) })}>
                {label}
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  </div>

  {/* Mobile Menu */}
  <div className={clsx("md:hidden", { "block": isMenuOpen, "hidden": !isMenuOpen })}>
    {session ? (
      <div className="flex flex-col items-center space-y-4 py-4 bg-teal-700">
        <span className="font-semibold text-black text-xl">{`Hello, ${session.user.name}`}</span>
        {[
          { href: pageConfig.dashboard, label: "Dashboard", path: "/dashboard" },
          { href: pageConfig.catalog, label: "Catalog", path: "/dashboard/catalog" },
          { href: pageConfig.records, label: "Achievements", path: "/dashboard/records" }
        ].map(({ href, label, path }) => (
          <Link key={label} href={href} className={clsx("text-black hover:text-gray-900 transition-colors duration-300", { "font-semibold": isActive(path) })}>
            {label}
          </Link>
        ))}
        <button onClick={handleClick} className="text-black hover:text-gray-900 transition-colors duration-300">
          Logout
        </button>
      </div>
    ) : (
      <div className="flex flex-col items-center space-y-4 py-4 bg-teal-700">
        {[
          { href: pageConfig.login, label: "Login", path: "/login" },
          { href: pageConfig.register, label: "Register", path: "/register" }
        ].map(({ href, label, path }) => (
          <Link key={label} href={href} className={clsx("text-black hover:text-gray-900 transition-colors duration-300", { "font-semibold": isActive(path) })}>
            {label}
          </Link>
        ))}
      </div>
    )}
  </div>
</nav>

  );
}
