"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, X, Home, LayoutDashboard, BookOpen, 
  Award, LogIn, UserPlus, LogOut, User 
} from "lucide-react";

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
      ? "flex items-center gap-2 py-3 hover:text-indigo-300 transition-colors" 
      : "flex items-center gap-1 hover:text-indigo-300 transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-indigo-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform";

    const iconSize = mobile ? 20 : 16;
    
    const linkContainer = mobile 
      ? "flex flex-col items-start space-y-2 w-full px-2" 
      : "flex items-center space-x-6";

    return (
      <div className={linkContainer}>
        {session ? (
          <>
            <div className={`flex items-center gap-2 text-white ${mobile ? 'text-base mb-2' : 'text-sm'} font-medium`}>
              <User size={iconSize} className="text-indigo-400" />
              <span>{session.user.name}</span>
            </div>
            
            <Link
              href={pageConfig.dashboard}
              className={`${linkStyle} ${isActive(pageConfig.dashboard) ? 'text-indigo-400 font-semibold' : 'text-white'}`}
            >
              <LayoutDashboard size={iconSize} />
              <span className={mobile ? "" : "hidden lg:inline"}>Dashboard</span>
            </Link>
            
            <Link
              href={pageConfig.catalog}
              className={`${linkStyle} ${isActive(pageConfig.catalog) ? 'text-indigo-400 font-semibold' : 'text-white'}`}
            >
              <BookOpen size={iconSize} />
              <span className={mobile ? "" : "hidden lg:inline"}>Catalog</span>
            </Link>
            
            <Link
              href={pageConfig.records}
              className={`${linkStyle} ${isActive(pageConfig.records) ? 'text-indigo-400 font-semibold' : 'text-white'}`}
            >
              <Award size={iconSize} />
              <span className={mobile ? "" : "hidden lg:inline"}>Achievements</span>
            </Link>
            
            <button
              onClick={handleClick}
              className={`px-4 py-1.5 ${mobile ? 'mt-2 w-full' : ''} bg-indigo-600 text-white rounded-full hover:bg-indigo-500 transition-colors group flex items-center justify-center gap-2`}
            >
              <LogOut size={iconSize} />
              <span className={mobile ? "" : "hidden lg:inline"}>Logout</span>
              <motion.span
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="opacity-0 group-hover:opacity-100 transition-opacity hidden lg:inline"
              >
                →
              </motion.span>
            </button>
          </>
        ) : (
          <>
            <Link
              href={pageConfig.login}
              className={`${linkStyle} ${isActive(pageConfig.login) ? 'text-indigo-400 font-semibold' : 'text-white'}`}
            >
              <LogIn size={iconSize} />
              <span className={mobile ? "" : "hidden lg:inline"}>Login</span>
            </Link>
            
            <Link
              href={pageConfig.register}
              className={`${linkStyle} ${isActive(pageConfig.register) ? 'text-indigo-400 font-semibold' : 'text-white'}`}
            >
              <UserPlus size={iconSize} />
              <span className={mobile ? "" : "hidden lg:inline"}>Register</span>
            </Link>
          </>
        )}
      </div>
    );
  };

  return (
    <nav className="fixed w-full z-50 bg-gradient-to-r from-blue-950 via-black to-gray-950 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link 
            href={pageConfig.home} 
            className="flex items-center gap-2 text-2xl md:text-3xl font-bold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-white hover:from-blue-300 hover:to-gray-100 transition-all"
          >
            
            <span>Sporto</span>
          </Link>
        </div>

        <div className="hidden md:block">
          <NavLinks />
        </div>

        <div className="md:hidden">
          <button 
            onClick={toggleMenu} 
            className="text-white p-1 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-gradient-to-r from-blue-950 to-gray-950 overflow-hidden"
          >
            <div className="px-4 py-4">
              <NavLinks mobile={true} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}