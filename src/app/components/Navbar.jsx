"use client";

import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-400 p-4 rounded-lg mx-4 mt-4 shadow-lg">
      {/* เมนูสำหรับมือถือ: เมนูเป็นปุ่ม hamburger */}
      <div className="flex justify-between items-center">
        <div className="text-white text-3xl font-semibold tracking-wide">
          Drone App
        </div>
        <button
          className="lg:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      <div
        className={`lg:flex lg:justify-center lg:gap-12 mt-4 lg:mt-0 ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        <ul className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          <li>
            <Link
              href="/"
              className="text-white text-lg font-medium hover:bg-white hover:text-blue-600 px-6 py-2 rounded-lg transition-all duration-300"
            >
              Home Setup
            </Link>
          </li>
          <li>
            <Link
              href="/log"
              className="text-white text-lg font-medium hover:bg-white hover:text-blue-600 px-6 py-2 rounded-lg transition-all duration-300"
            >
              Post Logs
            </Link>
          </li>
          <li>
            <Link
              href="/logs"
              className="text-white text-lg font-medium hover:bg-white hover:text-blue-600 px-6 py-2 rounded-lg transition-all duration-300"
            >
              Get Logs
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
