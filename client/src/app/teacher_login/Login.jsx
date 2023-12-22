import React from "react";
import Image from "next/image";
import Link from "next/link";
import signUpBanner from "../../assets/login.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
const Login = () => {
  return (
    <div className="grid place-items-center h-screen bg-gradient-to-br">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <h1 className="text-3xl text-center py-6 bg-red-900 text-white font-bold">
          Login
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
              htmlFor="text"
              className="block text-sm font-medium mb-2"
            >
              Secret Key
            </label>
            <input
              type="text"
              id=""
              className="w-11/12 px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter here"
            />
          </div>
          <div className="mb-4 ml-10">
            <label
              htmlFor="email"
              className="block text-sm font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
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

          <button
            type="submit"
            className="w-11/12 py-3 ml-7 bg-blue-300 text-white rounded-lg transition duration-300 hover:opacity-90 text-xl mt-5"
          >
                     {/* {<FontAwesomeIcon icon={faGoogle} style={{color: "#511f1f",}} height={10} />} */}
            Login With Google
          </button>
        
        </form>
      </div>
    </div>
  );
};

export default Login;
