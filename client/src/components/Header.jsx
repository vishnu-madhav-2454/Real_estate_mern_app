import React from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user); // ✅ camelCase fix

  return (
    <header className="bg-red-600 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-4">
        {/* Logo */}
        <Link to="/">
          <h1 className="font-bold text-xl sm:text-lg flex flex-wrap">
            <span className="text-black">Buy </span>
            <span className="text-white">Land</span>
          </h1>
        </Link>

        {/* Search */}
        <form className="bg-white px-3 py-1 rounded-md flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-black focus:outline-none w-24 sm:w-48"
          />
          <FaSearch className="text-red-400 ml-2" />
        </form>

        {/* Menu */}
        <ul className="flex gap-4 items-center">
          <Link to="/">
            <li className="text-white hover:text-black transition-all duration-300 cursor-pointer hidden sm:inline">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="text-white hover:text-black transition-all duration-300 cursor-pointer hidden sm:inline">
              About
            </li>
          </Link>

          {currentUser ? (
            <Link to="/profile">
              <img
                className="rounded-full h-8 w-8 object-cover"
                src={
                  currentUser.photo ||
                  "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                }
                alt="profile"
              />
            </Link>
          ) : (
            <Link to="/sign-in">
              <li className="text-white hover:text-black transition-all duration-300 cursor-pointer">
                Sign in
              </li>
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
