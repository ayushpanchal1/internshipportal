import React from "react";
import Image from "next/image";
import Link from "next/link";
import signUpBanner from "../../assets/login.svg";
import googleLogo from "../../assets/google-logo.png"; // Make sure to import the Google logo

const Login = () => {
  return (
    <div className="grid place-items-center h-screen bg-gradient-to-br">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <h1 className="text-3xl text-center py-6 bg-red-900 text-white font-bold">
         Student Login
        </h1>
        <div className="flex justify-center m-5">
          <Image
            src={signUpBanner}
            alt="signup banner"
            width={200}
            height={200}
          />
        </div>

        <form className="p-6">
          <div className="mb-4 ml-10">
            <label
              htmlFor="email"
              className="block text-sm font-medium mb-2"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              className="w-11/12 px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter here"
            />
          </div>
          <div className="mb-6 ml-10">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-11/12 px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter here"
            />
          </div>
          <button
            type="submit"
            className="w-11/12 py-3 ml-7 bg-blue-300 text-white rounded-lg transition duration-300 hover:opacity-90 text-xl mt-2"
          >
            Sign Up
          </button>
          <div className="flex justify-center mt-4">
            <img
 width={500}
 height={500}
              className="w-8 h-8 mr-2 cursor-pointer"
            />
            <button className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition duration-300">
              Login with Google
            </button>
          </div>
          <Link href="/signup">
            <span className="text-center mt-2 block">Not Registered? Signup</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
