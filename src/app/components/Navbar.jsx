"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/90 backdrop-blur-lg shadow-lg h-20 flex items-center">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 w-full">
        {/* Logo */}
        <div className="text-4xl font-extrabold text-purple-400 tracking-widest drop-shadow-lg">
          Drone
        </div>

        {/* Menu Button */}
        <button
          className="lg:hidden text-purple-400 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="w-10 h-10 transition-transform duration-300" />
          ) : (
            <Menu className="w-10 h-10 transition-transform duration-300" />
          )}
        </button>

        {/* Nav Links */}
        <div
          className={`absolute lg:static top-20 left-0 w-full lg:w-auto bg-black/95 lg:bg-transparent transition-all duration-300 ease-in-out backdrop-blur-lg rounded-lg shadow-xl lg:shadow-none lg:flex lg:items-center lg:space-x-12 text-lg font-semibold ${
            isMenuOpen ? "opacity-100 visible scale-100" : "opacity-0 invisible scale-95"
          } lg:opacity-100 lg:visible lg:scale-100`}
        >
          <ul className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 py-6 lg:py-0">
            {[{ href: "/", label: "Home" }, { href: "/log", label: "Post Logs" }, { href: "/logs", label: "About Logs" }].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-white relative px-6 py-3 rounded-lg text-xl transition duration-300 
                             before:absolute before:bottom-0 before:left-1/2 before:w-0 before:h-1 before:bg-purple-400 before:transition-all before:duration-300 before:ease-in-out 
                             hover:text-purple-400 hover:before:w-full hover:before:left-0 hover:scale-105"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
