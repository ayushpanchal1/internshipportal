"use client";
import Link from 'next/link';
import React, { useState } from 'react';

const CustomNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('');

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
  };

  return (
    <nav className="bg-gradient-to-r from-red-900 to-blue-300 h-16 flex justify-between items-center text-white font-semibold shadow-lg sticky top-0 z-50">
      <div className="pl-8">
        <h1 className="text-2xl font-semibold">
          <Link href="/" passHref>
            <span className="hover:text-blue-200">
              InternshipPortal
            </span>
          </Link>
        </h1>
      </div>
      <div className="pr-8 md:hidden">
        <button onClick={toggleNavbar} className="focus:outline-none transition duration-300">
          <svg
            className={`w-6 h-6 ${isOpen ? 'hidden' : 'block'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
          <svg
            className={`w-6 h-6 ${isOpen ? 'block' : 'hidden'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div
        className={`md:flex ${isOpen ? 'block' : 'hidden'} md:items-center md:w-auto w-full transition duration-300`}
        id="menu"
      >
        <ul className="md:flex items-center justify-between text-base pt-4 md:pt-0">
          <li>
            <Link href="/" passHref>
              <span
                onClick={() => handleItemClick('Home')}
                className={`block md:inline-block text-white ${
                  activeItem === 'Home' ? 'bg-red-500 hover:bg-red-600' : 'hover:text-blue-200'
                } px-4 py-2 transition duration-300`}
              >
                Home
              </span>
            </Link>
          </li>
          <li>
            <Link href="/add-task" passHref>
              <span
                onClick={() => handleItemClick('Add Task')}
                className={`block md:inline-block text-white ${
                  activeItem === 'Add Task' ? 'bg-blue-500 hover:bg-blue-600' : 'hover:text-blue-200'
                } px-4 py-2 transition duration-300`}
              >
                Add Task
              </span>
            </Link>
          </li>
          <li>
            <Link href="/show-task" passHref>
              <span
                onClick={() => handleItemClick('Show Task')}
                className={`block md:inline-block text-white ${
                  activeItem === 'Show Task' ? 'bg-blue-500 hover:bg-blue-600' : 'hover:text-blue-200'
                } px-4 py-2 transition duration-300`}
              >
                Show Task
              </span>
            </Link>
          </li>
          <li>
            <Link href="#!" passHref>
              <span
                onClick={() => handleItemClick('Login')}
                className={`block md:inline-block text-white ${
                  activeItem === 'Login' ? 'bg-blue-500 hover:bg-blue-600' : 'hover:text-blue-200'
                } px-4 py-2 transition duration-300`}
              >
                Login
              </span>
            </Link>
          </li>
          <li>
            <Link href="/signup" passHref>
              <span
                onClick={() => handleItemClick('Sign Up')}
                className={`block md:inline-block text-white  hover:bg-blue-600 px-4 py-2 rounded transition duration-300`}
              >
                Sign Up
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default CustomNavbar;
