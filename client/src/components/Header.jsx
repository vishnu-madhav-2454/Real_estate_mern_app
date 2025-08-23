import React from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const Header = () => {
  return (
    <header className="bg-red-600 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-4">
        <Link to="/">
          <h1 className="font-bold text-xl sm:text-large flex flext-wrap">
            <span className="text-black">Buy </span>
            <span className="text-white">Land</span>
          </h1>
        </Link>
        <form className="bg-white p-4 rounded-md flex items-center">
          <input
            type="text"
            placeholder="Search.."
            className="bg-transparent text-black focus:outline-none w-24 sm:w-50"
          />
          <FaSearch className="text-red-400" />
        </form>
        <ul className="flex gap-4">
          <Link to ='/'>
            <li className="text-white hover:text-black  transition-all duration-400 cursor-pointer hidden sm:inline">
              Home
            </li>
          </Link>
          <Link to = '/about'>
            <li className="text-white hover:text-black transition-all duration-400 cursor-pointer hidden sm:inline">
              About
            </li>
          </Link>
          <Link to = '/signin'>
            <li className="text-white hover:text-black transition-all duration-400 cursor-pointer">
              Sign in
            </li>
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
