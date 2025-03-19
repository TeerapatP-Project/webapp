"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/90 backdrop-blur-md shadow-lg h-18 flex items-center transition-all duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 w-full">

        <div className="text-3xl font-extrabold text-indigo-400 tracking-widest drop-shadow-md">
          Drone
        </div>

        <button
          className="lg:hidden text-indigo-400 focus:outline-none transition-all duration-300"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="w-8 h-8" />
          ) : (
            <Menu className="w-8 h-8" />
          )}
        </button>

        <div
          className={`absolute lg:static top-18 left-0 w-full lg:w-auto lg:flex lg:items-center text-lg font-medium transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? "opacity-100 visible scale-100"
              : "opacity-0 invisible scale-95"
          } lg:opacity-100 lg:visible lg:scale-100`}
        >
          <ul className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8 py-4 lg:py-0 bg-black/80 lg:bg-transparent">
            {[
              { href: "/", label: "Home", border: "border-blue-300" },
              { href: "/log", label: "Post Logs", border: "border-green-300" },
              {
                href: "/logs",
                label: "About Logs",
                border: "border-purple-300",
              },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="relative flex items-center justify-center w-32 h-10 text-base font-medium text-white 
    rounded-lg transition-all duration-300 ease-in-out 
    bg-transparent border-2 border-gray-700 hover:bg-gray-800 hover:text-white 
    hover:border-gray-700 hover:shadow-xl hover:scale-110 hover:ring-4 hover:ring-gray-500"
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
