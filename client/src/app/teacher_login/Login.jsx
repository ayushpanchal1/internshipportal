"use client";
import React, { useState, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import signUpBanner from "../../assets/login.svg";
// Import your httpAxios function
import { useRouter } from "next/navigation";
import { teacherLogin } from "@/src/services/userService";
import UserContext from "@/src/context/userContext";
import { toast } from "react-toastify";

const Login = () => {
  const router = useRouter();
  const context = useContext(UserContext);
  const [formData, setFormData] = useState({
    secretKey: "1234", // Fixed secret key
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call your teacherLogin function using httpAxios
      const result = await teacherLogin(formData);
      console.log(result); // Optional: Check the result in the console
      // Update user context after successful login
      //result.user will have "student" or "teacher" - ayu
      context.setUser(result.user);      
      toast.success("Logged In");
      router.push("/studentdata"); // Redirect to /studentdata upon successful login
    } catch (error) {
      console.error("Login error:", error);
      // Handle login error if needed
    }
  };

  const handleChange = (e) => {
    if (e.target.id === 'secretKey' && e.target.value !== '1234') {
      // If the input is not '1234', prevent updating the state
      return;
    }
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
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
        <form className="p-6" onSubmit={handleSubmit}>
          <div className="mb-4 ml-10">
            <label
              htmlFor="secretKey"
              className="block text-sm font-medium mb-2"
            >
              Secret Key
            </label>
            <input
              type="text"
              id="secretKey"
              className="w-11/12 px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter here"
              value={formData.secretKey} // Set the value to the formData.secretKey
              onChange={handleChange}
            />
          </div>
          <div className="mb-4 ml-10">
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-11/12 px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter here"
              value={formData.email}
              onChange={handleChange}
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
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-11/12 py-3 ml-7 bg-blue-300 text-white rounded-lg transition duration-300 hover:opacity-90 text-xl mt-2"
          >
            Login In
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
