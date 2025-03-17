"use client";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-700 to-blue-500 p-4 shadow-xl rounded-2xl mx-4 mt-4">
      <ul className="flex justify-center gap-8">
        <li>
          <Link
            href="/"
            className="text-white text-lg font-semibold hover:bg-white hover:text-blue-600 px-4 py-2 rounded-lg transition-all duration-300"
          >
            Home Setup
          </Link>
        </li>
        <li>
          <Link
            href="/log"
            className="text-white text-lg font-semibold hover:bg-white hover:text-blue-600 px-4 py-2 rounded-lg transition-all duration-300"
          >
            Post Logs
          </Link>
        </li>
        <li>
          <Link
            href="/logs"
            className="text-white text-lg font-semibold hover:bg-white hover:text-blue-600 px-4 py-2 rounded-lg transition-all duration-300"
          >
            Get Logs
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
