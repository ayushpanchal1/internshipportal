"use client";
import Link from 'next/link';
import React, { useState,useContext } from 'react';
import UserContext from '../context/userContext';

const CustomNavbar = () => {
  const context = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('');
  async function handleLogout() {
    try {
      const result = await logout();
      console.log(result);
      context.setUser(undefined);
      router.push("/");
    } catch (error) {
      console.log(error);
      toast.error("Logout Error");
    }
  }

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
  };
  const [showSignupOptions, setShowSignupOptions] = useState(false);
  const [showLoginOptions, setShowLoginOptions] = useState(false);

  const handleSignupDropdown = () => {
    setShowSignupOptions(!showSignupOptions);
    setShowLoginOptions(false); // Hide login dropdown when signup is clicked
  };

  const handleLoginDropdown = () => {
    setShowLoginOptions(!showLoginOptions);
    setShowSignupOptions(false); // Hide signup dropdown when login is clicked
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
        <ul className="md:flex items-center justify-between text-base pt-4 md:pt-0 space-x-4">
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
          <ul className='flex space-x-2'>
          {context.user && (
            <>
          <li>
            <Link href="/adddata" passHref>
              <span
                onClick={() => handleItemClick('Add Task')}
                className={`block md:inline-block text-white ${
                  activeItem === 'Add Task' ? 'bg-blue-500 hover:bg-blue-600' : 'hover:text-blue-200'
                } px-4 py-2 transition duration-300`}
              >
                Internship Form
              </span>
            </Link>
          </li>
          <li>
            <Link href="/showdata" passHref>
              <span
                onClick={() => handleItemClick('Show Task')}
                className={`block md:inline-block text-white ${
                  activeItem === 'Show Task' ? 'bg-blue-500 hover:bg-blue-600' : 'hover:text-blue-200'
                } px-4 py-2 transition duration-300`}
              >
                My Internships
              </span>
            </Link>
          </li>

          </>
          )}
          </ul>
          <ul className="flex space-x-3">
            {(context.user && 
            <>
          <li>
          <div className="relative inline-block">
      <span
        onClick={handleLoginDropdown}
        className={`block md:inline-block text-white hover:bg-blue-600 px-4 py-2 rounded transition duration-300 cursor-pointer`}
      >
        {user ? 'Logout' : 'Login'}
      </span>
      {showLoginOptions && (
        <div className="absolute bg-white rounded shadow-lg mt-2 py-1 text-gray-800">
          <Link href="/login" passHref>
            <span className="block px-4 py-2 hover:bg-gray-200">Student</span>
          </Link>
          <Link href="/teacher_login" passHref>
            <span className="block px-4 py-2 hover:bg-gray-200">Teacher</span>
          </Link>
          {/* Conditional rendering based on the user's role */}
          {user && user.role === 'student' && (
            <span onClick={handleLogout} className="block px-4 py-2 hover:bg-gray-200">Logout</span>
          )}
          {user && user.role === 'teacher' && (
            <span onClick={handleLogout} className="block px-4 py-2 hover:bg-gray-200">Logout</span>
          )}
        </div>
      )}
      </div>
      </li>
    </>
  )}
  {(!context.user && 
  <>
          <li>
          <div className="relative inline-block">
            <span
              onClick={handleLoginDropdown}
              className={`block md:inline-block text-white hover:bg-blue-600 px-4 py-2 rounded transition duration-300 cursor-pointer`}
            >
              Login
            </span>
            {showLoginOptions && (
              <div className="absolute bg-white rounded shadow-lg mt-2 py-1 text-gray-800">
                <Link href="/login" passHref>
                  <span className="block px-4 py-2 hover:bg-gray-200">Student</span>
                </Link>
                <Link href="/teacher_login" passHref>
                  <span className="block px-4 py-2 hover:bg-gray-200">Teacher</span>
                </Link>
              </div>
            )}
          </div>
        </li>
          <li>
          <div className="relative inline-block">
            <span
              onClick={handleSignupDropdown}
              className={`block md:inline-block text-white hover:bg-blue-600 px-4 py-2 rounded transition duration-300 cursor-pointer`}
            >
              Signup
            </span>
            {showSignupOptions && (
              <div className="absolute bg-white rounded shadow-lg mt-2 py-1 text-gray-800">
                <Link href="/signup" passHref>
                  <span className="block px-4 py-2 hover:bg-gray-200">Student</span>
                </Link>
                <Link href="/admin_signup" passHref>
                  <span className="block px-4 py-2 hover:bg-gray-200">Teacher</span>
                </Link>
              </div>
            )}
          </div>
        </li>
        </>
        )}
        </ul>
        </ul>
      </div>
    </nav>
  );
};

export default CustomNavbar;
