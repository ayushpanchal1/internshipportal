"use client";
import React, { useState } from "react";
import loginSvg from "../../assets/login.svg";
import Image from "next/image";
import { toast } from "react-toastify";
import Task from "../showdata/Task";
import { addRequest } from "../../services/taskService";
import SideNavbar from "../../components/SideNavbar";

const AddData = () => {
  
  const [activeSection, setActiveSection] = useState(1);

  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    lastName: "",
    seatNo: "",
    email: "",
    mobileNo: "",
    dob: "",
  });

  const [workDetails, setWorkDetails] = useState({
    technology: "",
    workplace: "",
    companyName: "",
  });

  const [uploadedDocs, setUploadedDocs] = useState({
    cv: null,
    photo: null,
  });

  const handleNext = () => {
    setActiveSection((prevSection) => prevSection + 1);
  };

  const handlePrevious = () => {
    setActiveSection((prevSection) => prevSection - 1);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData ={
      personalInfo,workDetails,uploadedDocs
     }
    try {
      // const result = await addTask(task);
      // console.log(result);
      const data = await addRequest(formData)
      console.log("Form submitted:", data);
      toast.success("Your Information is added !!", {
        position: "top-center",
      });

      setPersonalInfo({   
      firstname: "",
      lastName: "",
      seatNo: "",
      academicyear: "",
      deparment:"",
      semester:"",
      division:"",
      classteacher:"",
      hod:"",
      mothername:"",
      fathername:"",
      mobileNo: "",
      dob: "",
      });
      setWorkDetails({
        technology: "",
        workplace: "",
        companyname: "",
        acompanyaddress:"",
        fromduration:"",
        toduration:"",
      })
    } catch (error) {
      console.log(error);
      toast.error("Information not added !!", {
        position: "top-center",
      });
    }
     // Logic to handle form submission
    // Reset form or perform any other necessary actions
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
          name: event.target.value,
        });
      }}
      value={personalInfo.firstname}
    />
  </div>
  <div>
  {/* ... */}
  <div className="mt-4">
    <label htmlFor="lastName" className="block text-sm font-medium mb-2">
      Last Name
    </label>
    <input
      type="text"
      className="w-full p-3 rounded-3xl bg-gray-100 focus:ring-gray-400-100 border border-gray-200"
      id="lastName"
      name="lastName"
      onChange={(event) => {
        setPersonalInfo({
          ...personalInfo,
          lastName: event.target.value,
        });
      }}
      value={personalInfo.lastName}
    />
  </div>
  <div className="mt-4">
    <label htmlFor="seatNo" className="block text-sm font-medium mb-2">
      Seat No
    </label>
    <input
      type="number"
      className="w-full p-3 rounded-3xl bg-gray-100 focus:ring-gray-400-100 border border-gray-200"
      id="seatNo"
      name="seatNo"
      onChange={(event) => {
        setPersonalInfo({
          ...personalInfo,
          seatNo: event.target.value,
        });
      }}
      value={personalInfo.seatNo}
    />
  </div>
  <div className="mt-4">
    <label htmlFor="academicyear" className="block text-sm font-medium mb-2">
      Seat No
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
      value={personalInfo.academicyear}
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
      value={personalInfo.department}
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
      value={personalInfo.division}
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
      value={personalInfo.classteacher}
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
      value={personalInfo.hod}
    />
  </div>
  <div className="mt-4">
    <label htmlFor="mothername" className="block text-sm font-medium mb-2">
      Mother's Name
    </label>
    <input
      type="text"
      className="w-full p-3 rounded-3xl bg-gray-100 focus:ring-gray-400-100 border border-gray-200"
      id="mothername"
      name="mothername"
      onChange={(event) => {
        setPersonalInfo({
          ...personalInfo,
          mothername: event.target.value,
        });
      }}
      value={personalInfo.department}
    />
  </div>
  <div className="mt-4">
    <label htmlFor="fathername" className="block text-sm font-medium mb-2">
      Fathername
    </label>
    <input
      type="text"
      className="w-full p-3 rounded-3xl bg-gray-100 focus:ring-gray-400-100 border border-gray-200"
      id="fathername"
      name="fathername"
      onChange={(event) => {
        setPersonalInfo({
          ...personalInfo,
          fathername: event.target.value,
        });
      }}
      value={personalInfo.fathername}
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
      name="semester"
      onChange={(event) => {
        setPersonalInfo({
          ...personalInfo,
          semester: event.target.value,
        });
      }}
      value={personalInfo.semester}
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
            <div>
  <h2 className="text-2xl mb-4">Work Details</h2>
  <div className="mt-4">
    <label htmlFor="technology" className="block text-sm font-medium mb-2">
      Technology
    </label>
    <input
      type="text"
      className="w-full p-3 rounded-3xl bg-gray-100 focus:ring-gray-400-100 border border-gray-200"
      id="technology"
      name="technology"
      onChange={(event) => {
        setWorkDetails({
          ...workDetails,
          technology: event.target.value,
        });
      }}
      value={workDetails.technology}
    />
  </div>
  <div className="mt-4">
    <label htmlFor="workplace" className="block text-sm font-medium mb-2">
      Workplace
    </label>
    <input
      type="text"
      className="w-full p-3 rounded-3xl bg-gray-100 focus:ring-gray-400-100 border border-gray-200"
      id="workplace"
      name="workplace"
      onChange={(event) => {
        setWorkDetails({
          ...workDetails,
          workplace: event.target.value,
        });
      }}
      value={workDetails.workplace}
    />
  </div>
  <div className="mt-4">
    <label htmlFor="companyName" className="block text-sm font-medium mb-2">
      Company Name
    </label>
    <input
      type="text"
      className="w-full p-3 rounded-3xl bg-gray-100 focus:ring-gray-400-100 border border-gray-200"
      id="companyName"
      name="companyName"
      onChange={(event) => {
        setWorkDetails({
          ...workDetails,
          companyName: event.target.value,
        });
      }}
      value={workDetails.companyName}
    />
  </div>
  <div className="mt-4">
    <label htmlFor="address1" className="block text-sm font-medium mb-2">
      Address 1
    </label>
    <input
      type="text"
      className="w-full p-3 rounded-3xl bg-gray-100 focus:ring-gray-400-100 border border-gray-200"
      id="address1"
      name="address1"
      onChange={(event) => {
        setWorkDetails({
          ...workDetails,
          address1: event.target.value,
        });
      }}
      value={workDetails.address1}
    />
  </div>
  <div className="mt-4">
    <label htmlFor="address2" className="block text-sm font-medium mb-2">
      Address 2
    </label>
    <input
      type="text"
      className="w-full p-3 rounded-3xl bg-gray-100 focus:ring-gray-400-100 border border-gray-200"
      id="address2"
      name="address2"
      onChange={(event) => {
        setWorkDetails({
          ...workDetails,
          address2: event.target.value,
        });
      }}
      value={workDetails.address2}
    />
  </div>
  <div className="mt-4">
    <label htmlFor="startDate" className="block text-sm font-medium mb-2">
      Start Date
    </label>
    <input
      type="date"
      className="w-full p-3 rounded-3xl bg-gray-100 focus:ring-gray-400-100 border border-gray-200"
      id="startDate"
      name="startDate"
      onChange={(event) => {
        setWorkDetails({
          ...workDetails,
          startDate: event.target.value,
        });
      }}
      value={workDetails.startDate}
    />
  </div>
  <div className="mt-4">
    <label htmlFor="endDate" className="block text-sm font-medium mb-2">
      End Date
    </label>
    <input
      type="date"
      className="w-full p-3 rounded-3xl bg-gray-100 focus:ring-gray-400-100 border border-gray-200"
      id="endDate"
      name="endDate"
      onChange={(event) => {
        setWorkDetails({
          ...workDetails,
          endDate: event.target.value,
        });
      }}
      value={workDetails.endDate}
    />
  </div>
</div>

          </div>
        );
      case 3:
        return (
          <div>
         <div>
  <h2 className="text-2xl mb-4">Upload Documents</h2>
  <div className="mt-4">
    <label htmlFor="cv" className="block text-sm font-medium mb-2">
      CV
    </label>
    <input
      type="file"
      accept=".pdf,.doc,.docx"
      className="p-3 bg-gray-100 focus:ring-gray-400-100 border border-gray-200"
      id="cv"
      name="cv"
      onChange={(event) => {
        setUploadedDocs({
          ...uploadedDocs,
          cv: event.target.files[0],
        });
      }}
    />
  </div>
  <div className="mt-4">
    <label htmlFor="photo" className="block text-sm font-medium mb-2">
      Photo
    </label>
    <input
      type="file"
      accept="image/*"
      className="p-3 bg-gray-100 focus:ring-gray-400-100 border border-gray-200"
      id="photo"
      name="photo"
      onChange={(event) => {
        setUploadedDocs({
          ...uploadedDocs,
          photo: event.target.files[0],
        });
      }}
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
          {activeSection !== 3 ? (
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
