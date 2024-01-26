"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import Link from "next/link";
import signUpBanner from "../../assets/signup.svg";
import { teacherSignup } from "@/src/services/userService";
import { useRouter } from "next/navigation";

const AdminSignup = () => {
  const router = useRouter();
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    gender: "",
    department: "",
    domain: "",
    dateofbirth:"",
    role: "",
    dateofjoining: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const doSignup = async (event) => {
    event.preventDefault();

    const validateForm = () => {
      let valid = true;
      const newErrors = {};

      if (data.firstname.trim() === "" || data.firstname === null) {
        newErrors.firstname = "First Name is required!";
        valid = false;
      }

      if (data.lastname.trim() === "" || data.lastname === null) {
        newErrors.lastname = "Last Name is required!";
        valid = false;
      }

      if (data.email.trim() === "" || data.email === null) {
        newErrors.email = "Email is required!";
        valid = false;
      } else if (!/\S+@\S+\.\S+/.test(data.email)) {
        newErrors.email = "Please enter a valid email address!";
        valid = false;
      }

      if (data.password.trim() === "" || data.password === null) {
        newErrors.password = "Password is required!";
        valid = false;
      } else if (data.password.length < 6) {
        newErrors.password = "Password should be at least 6 characters long!";
        valid = false;
      }

      if (data.gender.trim() === "") {
        newErrors.gender = "Please select a gender!";
        valid = false;
      }

      if (data.dateofbirth.trim() === "") {
        newErrors.dateofbirth = "Please provide your date of birth!";
        valid = false;
      }
      if (data.dateofjoining.trim() === "") {
        newErrors.dateofjoining = "Please provide your date of birth!";
        valid = false;
      }

      if (data.department.trim() === "") {
        newErrors.department = "Department is required!";
        valid = false;
      }

      if (data.domain.trim() === "") {
        newErrors.domain = "Domain is required!";
        valid = false;
      }

      if (!data.role || data.role.trim() === "") {
        newErrors.role = "Role is required!";
        valid = false;
      }


      // Add any additional validations for other fields similarly

      setErrors(newErrors);
      return valid;
    };

    const isValid = validateForm();

    if (isValid) {
      try {
        const response = await teacherSignup(data);

        if (response.status === 'ok') {
          toast.success("Admin signup successful!");
          router.push('/teacher_login'); // Redirect to login page upon successful signup
        } else {
          toast.error("Admin signup failed. Please try again.");
        }
      } catch (error) {
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
                  htmlFor="firstname"
                  className="block text-sm font-medium mb-2"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstname"
                  className="w-full  px-4 py-3 mr-20 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your first name"
                  name="firstname"
                  value={data.firstname}
                  onChange={handleChange}
                />
                {errors.firstname && (
                  <p className="error-message" style={{ color: "red" }}>
                    {errors.firstname}
                  </p>
                )}
              </div>
              <div className="mb-2">
                <label
                  htmlFor="lastname"
                  className="block text-sm font-medium mb-2"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastname"
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your Last Name"
                  name="lastname"
                  value={data.lastname}
                  onChange={handleChange}
                />
                {errors.lastname && (
                  <p className="error-message" style={{ color: "red" }}>
                    {errors.lastname}
                  </p>
                )}


              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-2">
                <label
                  htmlFor="dateofbirth"
                  className="block text-sm font-medium mb-2"
                >
                  Date Of Birth
                </label>
                <input
                  type="number"
                  id="dateofbirth"
                  className="w-full  px-4 py-3 mr-20 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your DateofBirth"
                  name="dateofbirth"
                  value={data.dateofbirth}
                  onChange={handleChange}
                />
                {errors.dateofbirth && (
                  <p className="error-message" style={{ color: "red" }}>
                    {errors.dateofbirth}
                  </p>
                )}
              </div>
              <div className="mb-2">
                <label
                  htmlFor="dateofjoining"
                  className="block text-sm font-medium mb-2"
                >
                  Date of Joining
                </label>
                <input
                  type="number"
                  id="dateofjoining"
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your Date of Joining"
                  name="dateofjoining"
                  value={data.dateofjoining}
                  onChange={handleChange}
                />
                {errors.dateofjoining && (
                  <p className="error-message" style={{ color: "red" }}>
                    {errors.dateofjoining}
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
                  <select
                    id="department"
                    name="department"
                    value={data.department}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    
                    <option value="">Select Department</option>
                    <option value="Computer Science">CS</option>
                    <option value="Information Technology">IT</option>
                    <option value="Airtificial Intelligience and Data Science">AI-DS</option>
                    <option value="Electronics And Telecommunications">EXTC</option>
                  </select>
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
                    <option value="hod">Head Of Department</option>
                    <option value="classteacher">Class Teacher</option>
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
                      type="text"
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
