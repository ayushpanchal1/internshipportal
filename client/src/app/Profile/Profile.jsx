
import UserContext from '@/src/context/userContext';
import React ,{useContext}from 'react'

const Profile = () => {
  const context = useContext(UserContext)
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-semibold mb-4">Ten Input Boxes</h2>
        <div className="space-y-4">
          {/* Create 10 input boxes */}
          {/* {[...Array(10)].map((_, index) => (
            <input
              key={index}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              type="text"
              placeholder={`Input ${index + 1}`}
            />
          ))} */}

        </div>
      </div>
    </div>
  );
}

export default Profile
