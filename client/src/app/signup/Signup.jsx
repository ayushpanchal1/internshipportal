"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import Link from "next/link";
import signUpBanner from "../../assets/signup.svg";

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_pass: "",
    gender: "",
    seatno: "",
    academicyear: "",
    department: "",
    semester: "",
    division: "",
    classteacher: "",
    hod: "",
    address: "",
    mothername: "",
    fathername: "",
    mobileno: "",
    dateofbirth: "",
  });

  const [errors, setErrors] = useState({});
  const doSignup = async (event) => {
    event.preventDefault();

    const validateForm = () => {
      let valid = true;
      const newErrors = {};

      if (data.name.trim() === "" || data.name === null) {
        newErrors.name = "Name is required!";
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

      if (data.department.trim() === "") {
        newErrors.department = "Department is required!";
        valid = false;
      }

      if (data.division.trim() === "") {
        newErrors.division = "Division is required!";
        valid = false;
      }

      if (data.semester.trim() === "") {
        newErrors.semester = "Semester is required!";
        valid = false;
      }

      if (data.classteacher.trim() === "") {
        newErrors.classteacher = "Class Teacher is required!";
        valid = false;
      }

      if (data.hod.trim() === "") {
        newErrors.hod = "HOD is required!";
        valid = false;
      }

      if (data.address.trim() === "") {
        newErrors.address = "Address is required!";
        valid = false;
      }

      if (data.mothername.trim() === "") {
        newErrors.mothername = "Mother's Name is required!";
        valid = false;
      }

      if (data.fathername.trim() === "") {
        newErrors.fathername = "Father's Name is required!";
        valid = false;
      }

      if (data.mobileno.trim() === "") {
        newErrors.mobileno = "Mobile Number is required!";
        valid = false;
      } else if (!/^\d{10}$/.test(data.mobileno)) {
        newErrors.mobileno = "Please enter a valid 10-digit mobile number!";
        valid = false;
      }

      if (data.academicyear.trim() === "") {
        newErrors.academicyear = "Academic Year is required!";
        valid = false;
      }

      // Add validations for other fields similarly

      setErrors(newErrors);
      return valid;
    };

    const isValid = validateForm();

    if (isValid) {
      try {
        // Make an API call to your server to sign up the user
        const response = await fetch("/api/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data), // Sending form data to the server
        });

        if (response.ok) {
          // Handle successful signup
          toast.success("Signup successful!");
        } else {
          // Handle signup failure
          toast.error("Signup failed. Please try again.");
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
            Signup Here
          </h1>
          <div className="flex justify-center m-5">
            <Image
              src={signUpBanner}
              alt="signup banner"
              width={300}
              height={300}
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

            <div className="mb-4">
              <label
                htmlFor="dateofbirth"
                className="block text-sm font-medium mb-2"
              >
                Date of Birth
              </label>
              <input
                type="date"
                id="dateofbirth"
                className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                name="dateofbirth"
                value={data.dateofbirth}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              {/* Fields with two inputs in one row */}
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
                    htmlFor="division"
                    className="block text-sm font-medium mb-2"
                  >
                    Division
                  </label>
                  <input
                    type="text"
                    id="division"
                    className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter division"
                    name="division"
                    value={data.division}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="semester"
                    className="block text-sm font-medium mb-2"
                  >
                    Semester
                  </label>
                  <select
                    id="semeste"
                    name="semester"
                    value={data.semester}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Select Semester</option>
                    <option value="Semester I">Semester I</option>
                    <option value="Semester II">Semester II</option>
                    <option value="Semester III">Semester III</option>
                    <option value="Semester IV">Semester IV</option>
                    <option value="Semester V">Semester V</option>
                    <option value="Semester VI">Semester VI</option>
                    <option value="Semester VII">Semester VII</option>
                    <option value="Semester VIII">Semester VIII</option>
                  </select>
                </div>                <div className="mb-4">
                  <label
                    htmlFor="semester"
                    className="block text-sm font-medium mb-2"
                  >
                    Gender
                  </label>
                  <select
                    id="semester"
                    name="semester"
                    value={data.semester}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {/* Field in another row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                  <label
                    htmlFor="classteacher"
                    className="block text-sm font-medium mb-2"
                  >
                    Class Teacher
                  </label>
                  <input
                    type="text"
                    id="classteacher"
                    className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter class teacher"
                    name="classteacher"
                    value={data.classteacher}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="hod"
                    className="block text-sm font-medium mb-2"
                  >
                    HOD (Head of Department)
                  </label>
                  <input
                    type="text"
                    id="hod"
                    className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter HOD"
                    name="hod"
                    value={data.hod}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Remaining fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium mb-2"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter address"
                    name="address"
                    value={data.address}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="mothername"
                    className="block text-sm font-medium mb-2"
                  >
                    Mother's Name
                  </label>
                  <input
                    type="text"
                    id="mothername"
                    className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter mother's name"
                    name="mothername"
                    value={data.mothername}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                  <label
                    htmlFor="fathername"
                    className="block text-sm font-medium mb-2"
                  >
                    Father's Name
                  </label>
                  <input
                    type="text"
                    id="fathername"
                    className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter father's name"
                    name="fathername"
                    value={data.fathername}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="mobileno"
                    className="block text-sm font-medium mb-2"
                  >
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    id="mobileno"
                    className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter mobile number"
                    name="mobileno"
                    value={data.mobileno}
                    onChange={handleChange}
                  />
                </div>
                {/* ...other fields... */}
                {/* Email Field */}
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
                </div>{" "}
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-300 text-white rounded-lg transition duration-300 hover:opacity-90 text-xl mt-1"
            >
              Sign Up
            </button>
            <div className="flex justify-between mt-4">
              <Link href="/admin_login" className="text-center">
                <span>
                  <p className="text-center">Not a Student? Register here</p>
                </span>
              </Link>
              <Link href="/Login">
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

export default Signup;
