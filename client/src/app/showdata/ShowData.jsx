// ShowData.jsx
"use client";
import React, { useEffect, useState, useContext } from 'react';
import { getAllRequestsForStudent, removerequest } from '@/src/services/taskService';
// import UserContext from '../../context/userContext';
// import { useRouter } from "next/navigation";

import Card from './Card';

const ShowData = () => {
  const [requests, setRequests] = useState([]);
  // const context = useContext(UserContext);
  // const router = useRouter();

  const fetchData = async () => {
    try {
      const userEmail = localStorage.getItem('userEmail');
      const response = await getAllRequestsForStudent(userEmail);

      if (response.status === 'ok') {
        const parsedRequests = response.requests || [];
        setRequests(parsedRequests);
      } else {
        console.log('Error fetching requests');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    //shitty middleware hack fix
    // if (!context.user) router.push("/")
    fetchData();
    
  }, []);

  const handleDelete = async (index) => {
    try {
      await removerequest(requests[index]._id);
    
      // Update state immutably by filtering out the deleted request
      setRequests((prevRequests) => prevRequests.filter((_, i) => i !== index));
    } catch (error) {
      console.error('Error deleting request:', error.message);
    }
  };
  
    return (
    <div>
      {/* <h1>All Requests</h1> */}
      <div className="card-container">
        {requests.map((request, index) => (
          <Card
            key={index}
            request={request}
            index={index}
            totalCards={requests.length}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default ShowData;