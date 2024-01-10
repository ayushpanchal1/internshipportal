"use client";
import React, { useState,useContext,useEffect } from "react";
import loginSvg from "../../assets/login.svg";
import Image from "next/image";
import { toast } from "react-toastify";
import Task from "../showdata/Card";
import { addRequest } from "../../services/taskService";
import SideNavbar from "../../components/SideNavbar";
import {useRouter} from "next/navigation"

import UserContext from "@/src/context/userContext";

const AddData = () => {
  const context = useContext(UserContext);
  const router = useRouter();
  const [activeSection, setActiveSection] = useState(1);
  useEffect(() => {
    if (!context.user) {
      router.push('/login'); // Redirect to the login page if the user is not logged in
    }
  }, [context.user, router]);

  const [personalInfo, setPersonalInfo] = useState({
    firstname: "",
    lastname: "",
    seatno: "",
    academicyear: "",
    department:"",
    semester:"",
    division:"",
    classteacher:"",
    hod:"",
    mothername:"",
    fathername:"",
    mobileno: "",
    dob: "",
  });
  
  const [workDetails, setWorkDetails] = useState({
    whatfor: "",
    companyname: "",
    companyaddress:"",
    fromduration:"",
    toduration:"",
    domain:"",
  });

  
  const handleNext = () => {
    setActiveSection((prevSection) => prevSection + 1);
  };
  
  const handlePrevious = () => {
    setActiveSection((prevSection) => prevSection - 1);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      ...personalInfo,
      ...workDetails,
    };
    
    try {
      // Validation for work details
      if (
        !workDetails.whatfor ||
        !workDetails.companyname ||
        !workDetails.companyaddress ||
        !workDetails.fromduration ||
        !workDetails.toduration ||
        !workDetails.domain
      ) {
        toast.error("Please fill in all required fields in Work Details", {
          position: "top-center",
        });
        return; // Stop form submission
      }
  
      const data = await addRequest(formData);
      console.log("Form submitted:", data);
      toast.success("Your Information is added !!", {
        position: "top-center",
      });
  
      // Clear form fields after successful submission
      setPersonalInfo({
        firstname: "",
        lastname: "",
        seatno: "",
        academicyear: "",
        department: "",
        semester: "",
        division: "",
        classteacher: "",
        hod: "",
        mothername: "",
        fathername: "",
        mobileno: "",
        dob: "",
        email:"",
      });
      setWorkDetails({
        whatfor: "",
        companyname: "",
        companyaddress: "",
        fromduration: "",
        toduration: "",
        domain: "",
      });
    } catch (error) {
      console.log(error);
      toast.error("Information not added !!", {
        position: "top-center",
      });
    }
  };
  const renderSection = () => {
    switch (activeSection) {
      case 1:
        return (
          <div>
            <SideNavbar/>
       <div>
  <h2 className="text-2xl mb-4">Personal Information</h2>
  <div className="mt-4">
    <label htmlFor="firstname" className="block text-sm font-medium mb-2">
      Name
    </label>
    <input
  type="text"
  className="w-full p-3 rounded-3xl bg-gray-100 focus:ring-gray-400-100 border border-gray-200"
  id="firstname"
  name="firstname"
  onChange={(event) => {
    setPersonalInfo({
      ...personalInfo,
      firstname: event.target.value,
    });
  }}
  value={personalInfo.firstname || (context.user ? context.user.firstname : '')}
    readOnly // To make the field read-only
/>
  </div>
  <div>
  {/* ... */}
  <div className="mt-4">
    <label htmlFor="lastname" className="block text-sm font-medium mb-2">
      Last Name
    </label>
    <input
      type="text"
      className="w-full p-3 rounded-3xl bg-gray-100 focus:ring-gray-400-100 border border-gray-200"
      id="lastname"
      name="lastname"
      onChange={(event) => {
        setPersonalInfo({
          ...personalInfo,
          lastname: event.target.value,
        });
      }}
    value={personalInfo.lastname || (context.user ? context.user.lastname : '')}
    readOnly
    />
  </div>
  <div className="mt-4">
    <label htmlFor="seatno" className="block text-sm font-medium mb-2">
      Seat No
    </label>
    <input
      type="number"
      className="w-full p-3 rounded-3xl bg-gray-100 focus:ring-gray-400-100 border border-gray-200"
      id="seatno"
      name="seatno"
      onChange={(event) => {
        setPersonalInfo({
          ...personalInfo,
          seatno: event.target.value,
        });
      }}
      defaultValue={personalInfo.seatno || (context.user ? context.user.seatno : '')}
      readOnly
    />
  </div>
  <div className="mt-4">
    <label htmlFor="email" className="block text-sm font-medium mb-2">
      Email
    </label>
    <input
      type="text"
      className="w-full p-3 rounded-3xl bg-gray-100 focus:ring-gray-400-100 border border-gray-200"
      id="email"
      name="email"
      onChange={(event) => {
        setPersonalInfo({
          ...personalInfo,
          email: event.target.value,
        });
      }}
      defaultValue={personalInfo.email || (context.user ? context.user.email : '')}
    readOnly
    />
  </div>
  <div className="mt-4">
    <label htmlFor="academicyear" className="block text-sm font-medium mb-2">
      Academic Year
    </label>
    <input
      type="number"
      className="w-full p-3 rounded-3xl bg-gray-100 focus:ring-gray-400-100 border border-gray-200"
      id="academicyear"
      name="academicyear"
      onChange={(event) => {
        setPersonalInfo({
          ...personalInfo,
          academicyear: event.target.value,
        });
      }}
      defaultValue={personalInfo.academicyear || (context.user ? context.user.academicyear : '')}
      readOnly
    />
  </div>
  <div>
  {/* ... */}
  <div className="mt-4">
    <label htmlFor="department" className="block text-sm font-medium mb-2">
      Department
    </label>
    <input
      type="text"
      className="w-full p-3 rounded-3xl bg-gray-100 focus:ring-gray-400-100 border border-gray-200"
      id="department"
      name="department"
      onChange={(event) => {
        setPersonalInfo({
          ...personalInfo,
          department: event.target.value,
        });
      }}
      defaultValue={personalInfo.department || (context.user ? context.user.department : '')}
      readOnly
    />
  </div>
  <div className="mt-4">
    <label htmlFor="division" className="block text-sm font-medium mb-2">
       Division
    </label>
    <input
      type="text"
      className="w-full p-3 rounded-3xl bg-gray-100 focus:ring-gray-400-100 border border-gray-200"
      id="division"
      name="division"
      onChange={(event) => {
        setPersonalInfo({
          ...personalInfo,
          division: event.target.value,
        });
      }}
      defaultValue={personalInfo.division || (context.user ? context.user.division : '')}
      readOnly
    />
  </div>
  <div className="mt-4">
    <label htmlFor="classteacher" className="block text-sm font-medium mb-2">
    Classteacher
    </label>
    <input
      type="text"
      className="w-full p-3 rounded-3xl bg-gray-100 focus:ring-gray-400-100 border border-gray-200"
      id="classteacher"
      name="classteacher"
      onChange={(event) => {
        setPersonalInfo({
          ...personalInfo,
          classteacher: event.target.value,
        });
      }}
      defaultValue={personalInfo.classteacher || (context.user ? context.user.classteacher : '')}
      readOnly
    />
  </div>
  <div className="mt-4">
    <label htmlFor="hod" className="block text-sm font-medium mb-2">
      Hod
    </label>
    <input
      type="text"
      className="w-full p-3 rounded-3xl bg-gray-100 focus:ring-gray-400-100 border border-gray-200"
      id="hod"
      name="hod"
      onChange={(event) => {
        setPersonalInfo({
          ...personalInfo,
          hod: event.target.value,
        });
      }}
      defaultValue={personalInfo.hod || (context.user ? context.user.hod : '')}
      readOnly
    />
  </div>
  <div className="mt-4">
    <label htmlFor="mothername" className="block text-sm font-medium mb-2">
      Mother's Name
    </label>
    <input
      type="text"
      className="w-full p-3 rounded-3xl bg-gray-100 focus:ring-gray-400-100 border border-gray-200"
      name="mothername"
      id="mothername"
      onChange={(event) => {
        setPersonalInfo({
          ...personalInfo,
          mothername: event.target.value,
        });
      }}
      defaultValue={personalInfo.mothername || (context.user ? context.user.mothername : '')}
      readOnly
    />
  </div>
  <div className="mt-4">
    <label htmlFor="fathername" className="block text-sm font-medium mb-2">
      Fathername
    </label>
    <input
      type="text"
      id="fathername"
      name="fathername"
      className="w-full p-3 rounded-3xl bg-gray-100 focus:ring-gray-400-100 border border-gray-200"
      onChange={(event) => {
        setPersonalInfo({
          ...personalInfo,
          fathername: event.target.value,
        });
      }}
      defaultValue={personalInfo.fathername || (context.user ? context.user.fathername : '')}
      readOnly
    />
  </div>
  <div className="mt-4">
    <label htmlFor="semester" className="block text-sm font-medium mb-2">
      semester
    </label>
    <input
      type="number"
      className="w-full p-3 rounded-3xl bg-gray-100 focus:ring-gray-400-100 border border-gray-200"
      id="semester"
      name="semetser"
      onChange={(event) => {
        setPersonalInfo({
          ...personalInfo,
          semester: event.target.value,
        });
      }}
      defaultValue={personalInfo.semester || (context.user ? context.user.semester : '')}
      readOnly
    />
  </div>
  {/* <div className="mt-4">
    <label htmlFor="mobileNo" className="block text-sm font-medium mb-2">
      Mobile No
    </label>
    <input
      type="tel"
      className="w-full p-3 rounded-3xl bg-gray-100 focus:ring-gray-400-100 border border-gray-200"
      id="mobileNo"
      name="mobileNo"
      onChange={(event) => {
        setPersonalInfo({
          ...personalInfo,
          mobileNo: event.target.value,
        });
      }}
      value={personalInfo.mobileNo}
    />
  </div> */}
  {/* <div className="mt-4">
    <label htmlFor="dob" className="block text-sm font-medium mb-2">
      Date of Birth
    </label>
    <input
      type="date"
      className="w-full p-3 rounded-3xl bg-gray-100 focus:ring-gray-400-100 border border-gray-200"
      id="dob"
      name="dob"
      onChange={(event) => {
        setPersonalInfo({
          ...personalInfo,
          dob: event.target.value,
        });
      }}
      value={personalInfo.dob}
    />
  </div> */}
</div>

</div>

</div>

          </div>
        );
      case 2:
        return (
          <div>
            <SideNavbar/>
            <div>
  <h2 className="text-2xl mb-4">Work Details</h2>
  <div className="mt-4">
    <label htmlFor="whatfor" className="block text-sm font-medium mb-2">
      Technology
    </label>
    <input
      type="text"
      className="w-full p-3 rounded-3xl bg-gray-100 focus:ring-gray-400-100 border border-gray-200"
      id="whatfor"
      name="whatfor"
      onChange={(event) => {
        setWorkDetails({
          ...workDetails,
          whatfor: event.target.value,
        });
      }}
      value={workDetails.whatfor}
    />
  </div>
  <div className="mt-4">
    <label htmlFor="domain" className="block text-sm font-medium mb-2">
      Domain
    </label>
    <input
      type="text"
      className="w-full p-3 rounded-3xl bg-gray-100 focus:ring-gray-400-100 border border-gray-200"
      id="domain"
      name="domain"
      onChange={(event) => {
        setWorkDetails({
          ...workDetails,
          domain: event.target.value,
        });
      }}
      value={workDetails.domain}
    />
  </div>
  <div className="mt-4">
    <label htmlFor="companyname" className="block text-sm font-medium mb-2">
      Company Name
    </label>
    <input
      type="text"
      className="w-full p-3 rounded-3xl bg-gray-100 focus:ring-gray-400-100 border border-gray-200"
      id="companyname"
      name="companyname"
      onChange={(event) => {
        setWorkDetails({
          ...workDetails,
          companyname: event.target.value,
        });
      }}
      value={workDetails.companyname}
    />
  </div>
  <div className="mt-4">
  <label htmlFor="companyaddress" className="block text-sm font-medium mb-2">
    Address
  </label>
  <input
    type="text"
    className="w-full p-3 rounded-3xl bg-gray-100 focus:ring-gray-400-100 border border-gray-200"
    id="companyaddress"
    name="companyaddress"
    onChange={(event) => {
      setWorkDetails({
        ...workDetails,
        companyaddress: event.target.value
      });
    }}
    value={workDetails.companyaddress}
  />
</div>

  <div className="mt-4">
    <label htmlFor="fromduration" className="block text-sm font-medium mb-2">
      Start Date
    </label>
    <input
      type="number"
      className="w-full p-3 rounded-3xl bg-gray-100 focus:ring-gray-400-100 border border-gray-200"
      id="fromduration"
      name="fromduration"
      onChange={(event) => {
        setWorkDetails({
          ...workDetails,
          fromduration: event.target.value,
        });
      }}
      value={workDetails.fromduration}
    />
  </div>
  <div className="mt-4">
    <label htmlFor="toduration" className="block text-sm font-medium mb-2">
      End Date
    </label>
    <input
      type="number"
      className="w-full p-3 rounded-3xl bg-gray-100 focus:ring-gray-400-100 border border-gray-200"
      id="toduration"
      name="toduration" 
      onChange={(event) => {
        setWorkDetails({
          ...workDetails,
          toduration: event.target.value,
        });
      }}
      value={workDetails.toduration}
    />
  </div>
</div>

          </div>
        );
            default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-12 justify-center">
    <div className="col-span-4 col-start-5 p-5 shadow-md rounded-lg bg-white">
      <form onSubmit={handleSubmit}>
        {renderSection()}
        <div className="mt-4 flex justify-center">
          {activeSection !== 1 && (
            <button
              type="button"
              className="bg-gray-600 py-2 px-3 rounded-lg hover:bg-gray-800 text-white"
              onClick={handlePrevious}
            >
              Previous
            </button>
          )}
          {activeSection !== 2 ? (
            <button
              type="button"
              className="bg-blue-600 py-2 px-3 rounded-lg hover:bg-blue-800 text-white ms-3"
              onClick={handleNext}
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="bg-green-600 py-2 px-3 rounded-lg hover:bg-green-800 text-white ms-3"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  </div>
);
};

export default AddData;
