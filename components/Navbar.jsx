"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

class PageConfig {
  home = "/";
  dashboard = "/dashboard";
  catalog = "/dashboard/catalog";
  login = "/login";
  register = "/register";
  records = "/dashboard/records";
}
export const pageConfig = new PageConfig();

export default function ModernNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  const handleClick = async () => {
    await signOut({ redirect: false });
    window.location.reload();
  };

  const isActive = (href) => pathname === href;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const NavLinks = ({ mobile = false }) => {
    const linkStyle = mobile 
      ? "text-xl py-3 hover:text-indigo-300 transition-colors" 
      : "text-sm hover:text-indigo-300 transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-indigo-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform";

    const linkContainer = mobile 
      ? "flex flex-col items-center space-y-4 w-full" 
      : "flex items-center space-x-6";

    return (
      <div className={linkContainer}>
        {session ? (
          <>
            <span className={`text-white ${mobile ? 'text-xl' : 'text-sm'} font-medium`}>
              {`Hello, ${session.user.name}`}
            </span>
            {[
              { href: pageConfig.dashboard, label: "Dashboard" },
              { href: pageConfig.catalog, label: "Catalog" },
              { href: pageConfig.records, label: "Achievements" },
            ].map(({ href, label }) => (
              <Link
                key={label}
                href={href}
                className={`${linkStyle} ${isActive(href) ? 'text-indigo-400 font-semibold' : 'text-white'}`}
              >
                {label}
              </Link>
            ))}
            <button
              onClick={handleClick}
              className="px-5 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-500 transition-colors group flex items-center space-x-2"
            >
              <span>Logout</span>
              <motion.span
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                →
              </motion.span>
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
              className={`${linkStyle} ${isActive(href) ? 'text-indigo-400 font-semibold' : 'text-white'}`}
            >
              {label}
            </Link>
          ))
        )}
      </div>
    );
  };

  return (
    <nav className="fixed w-full z-50 bg-gradient-to-r from-blue-950 via-black to-gray-950 shadow-xl">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div
        
        >
          <Link 
            href={pageConfig.home} 
            className="text-3xl font-bold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-white hover:from-blue-300 hover:to-gray-100 transition-all"
          >
            Sporto
          </Link>
        </div>


        <div className="hidden md:block">
          <NavLinks />
        </div>


        <div className="md:hidden">
          <button 
            onClick={toggleMenu} 
            className="text-white focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

  
      <AnimatePresence>
        {isMenuOpen && (
          <div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-gradient-to-r from-blue-950  to-gray-950 overflow-hidden"
          >
            <div className="px-6 py-8">
              <NavLinks mobile={true} />
            </div>
          </div>
        )}
      </AnimatePresence>
    </nav>
  );
}