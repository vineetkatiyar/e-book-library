"use client";

import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-[#ff6700] text-white shadow-lg my-0 rounded-b-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="book-text md:text-2xl text-lg font-bold">
            BookHub
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
