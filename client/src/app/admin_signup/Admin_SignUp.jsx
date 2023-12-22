"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import Link from "next/link";
import signUpBanner from "../../assets/signup.svg";

const AdminSignup = () => {
  const [data, setData] = useState({
    FirstName: "",
    LastName: "",
    Gender: "",
    Department: "",
    Domain: "",
    Role: "",
    Address: "",
    MotherName: "",
    FatherName: "",
    MobileNo: "",
    DateofBirth: "",
    Email: "",
    Password: "",
  });

  const [errors, setErrors] = useState({});

  const doSignup = async (event) => {
    event.preventDefault();

    const validateForm = () => {
      let valid = true;
      const newErrors = {};

      if (data.FirstName.trim() === "" || data.FirstName === null) {
        newErrors.FirstName = "First Name is required!";
        valid = false;
      }

      if (data.LastName.trim() === "" || data.LastName === null) {
        newErrors.LastName = "Last Name is required!";
        valid = false;
      }

      if (data.Email.trim() === "" || data.Email === null) {
        newErrors.Email = "Email is required!";
        valid = false;
      } else if (!/\S+@\S+\.\S+/.test(data.Email)) {
        newErrors.Email = "Please enter a valid email address!";
        valid = false;
      }

      if (data.Password.trim() === "" || data.Password === null) {
        newErrors.Password = "Password is required!";
        valid = false;
      } else if (data.Password.length < 6) {
        newErrors.Password = "Password should be at least 6 characters long!";
        valid = false;
      }

      if (data.Gender.trim() === "") {
        newErrors.Gender = "Please select a gender!";
        valid = false;
      }

      if (data.DateofBirth.trim() === "") {
        newErrors.DateofBirth = "Please provide your date of birth!";
        valid = false;
      }

      if (data.Department.trim() === "") {
        newErrors.Department = "Department is required!";
        valid = false;
      }

      if (data.Domain.trim() === "") {
        newErrors.Domain = "Domain is required!";
        valid = false;
      }

      if (data.Role.trim() === "") {
        newErrors.Role = "Role is required!";
        valid = false;
      }

      if (data.Address.trim() === "") {
        newErrors.Address = "Address is required!";
        valid = false;
      }

      if (data.MotherName.trim() === "") {
        newErrors.MotherName = "Mother's Name is required!";
        valid = false;
      }

      if (data.FatherName.trim() === "") {
        newErrors.FatherName = "Father's Name is required!";
        valid = false;
      }

      if (data.MobileNo.trim() === "") {
        newErrors.MobileNo = "Mobile Number is required!";
        valid = false;
      } else if (!/^\d{10}$/.test(data.MobileNo)) {
        newErrors.MobileNo = "Please enter a valid 10-digit mobile number!";
        valid = false;
      }

      // Add any additional validations for other fields similarly

      setErrors(newErrors);
      return valid;
    };

    const isValid = validateForm();

    if (isValid) {
      try {
        // Make an API call to your server to sign up the admin user
        const response = await fetch("/api/admin/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data), // Sending form data to the server
        });

        if (response.ok) {
          // Handle successful signup
          toast.success("Admin signup successful!");
        } else {
          // Handle signup failure
          toast.error("Admin signup failed. Please try again.");
        }
      } catch (error) {
        // Handle error cases
        console.error("Error:", error);
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="mt-10">
      <div className="grid place-items-center bg-gradient-to-br">
        <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg overflow-hidden ">
          <h1 className="text-3xl text-center py-6 bg-red-900 text-white font-bold">
            Admin Signup
          </h1>
          <div className="flex justify-center m-5">
            <Image
              src={signUpBanner}
              alt="signup banner"
              width={300} // Replace with image width
              height={300} // Replace with image height
            />
          </div>
          <form className="p-6 space-y-4 max-w-xl mx-auto" onSubmit={doSignup}>
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full  px-4 py-3 mr-20 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your first name"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                />
                {errors.name && (
                  <p className="error-message" style={{ color: "red" }}>
                    {errors.name}
                  </p>
                )}
              </div>
              <div className="mb-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your first name"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                />
                {errors.name && (
                  <p className="error-message" style={{ color: "red" }}>
                    {errors.name}
                  </p>
                )}


              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                  <label
                    htmlFor="department"
                    className="block text-sm font-medium mb-2"
                  >
                    Department
                  </label>
                  <input
                    type="text"
                    id="department"
                    className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter department"
                    name="department"
                    value={data.department}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium mb-2"
                  >
                    Gender
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={data.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                  <label
                    htmlFor="domain"
                    className="block text-sm font-medium mb-2"
                  >
                    Domain
                  </label>
                  <input
                    type="text"
                    id="domain"
                    className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter domain"
                    name="domain"
                    value={data.domain}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="role"
                    className="block text-sm font-medium mb-2"
                  >
                    Role
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={data.role}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Select role</option>
                    <option value="HOD">Head Of Department</option>
                    <option value="Class Teacher">Class Teacher</option>
                    <option value="Proctor">Proctor</option>
                    <option value="other">Other</option>
                  </select>
                </div>
</div>
<div className="grid grid-cols-2 gap-4">
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Enter your email"
                      name="email"
                      value={data.email}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <p className="error-message">{errors.email}</p>
                    )}
                  </div>

                  {/* Password Field */}
                  <div className="mb-4">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium mb-2"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Enter your password"
                      name="password"
                      value={data.password}
                      onChange={handleChange}
                    />
                    {errors.password && (
                      <p className="error-message">{errors.password}</p>
                    )}
                  </div>
                </div>
                <button
              type="submit"
              className="w-full py-3 bg-blue-300 text-white rounded-lg transition duration-300 hover:opacity-90 text-xl mt-1"
            >
              Sign Up
            </button>
            <div className="flex justify-between mt-4">
              <Link href="/signup" className="text-center">
                <span>
                  <p className="text-center">Are You a Student? Register here</p>
                </span>
              </Link>
              <Link href="/login">
              <span>
                <p>Already a User</p>
              </span>
              </Link>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminSignup;
