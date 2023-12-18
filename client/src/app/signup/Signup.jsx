import React from "react";

const Signup = () => {
  return (
    <div className="grid place-items-center h-screen bg-gradient-to-br ">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <h1 className="text-3xl text-center py-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold">
          Signup Here
        </h1>
        <form className="p-6">
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium mb-2">Username</label>
            <input
              type="text"
              id="username"
              className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter here"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
            <input
              type="text"
              id="email"
              className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter here"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter here"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="about" className="block text-sm font-medium mb-2">About</label>
            <textarea
              id="about"
              className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows={5}
              placeholder="Tell us about yourself..."
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg transition duration-300 hover:opacity-90"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
