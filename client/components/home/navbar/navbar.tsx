"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoggedIn = false;

  return (
    <nav className="bg-[#ff6700] text-white shadow-lg my-0 rounded-b-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="book-text md:text-2xl text-lg font-bold">
            BookHub
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {isLoggedIn ? (
              <>
                <Link href="/profile" className="book-text hover:text-gray-200">
                  Profile
                </Link>
                <button className="book-text hover:text-gray-200">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="book-text hover:text-gray-200">
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="book-text bg-white text-[#ff6700] px-4 py-2 rounded-md hover:bg-gray-100"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-3 pb-3">
            {isLoggedIn ? (
              <>
                <Link
                  href="/profile"
                  className="block book-text hover:text-gray-200"
                >
                  Profile
                </Link>
                <button className="block book-text hover:text-gray-200">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="block book-text hover:text-gray-200"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="block book-text bg-white text-[#ff6700] px-4 py-2 rounded-md hover:bg-gray-100 text-center"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
