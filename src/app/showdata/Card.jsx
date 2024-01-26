import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { AiOutlineDownload, AiOutlineDelete } from 'react-icons/ai';
import { removerequest } from '@/src/services/taskService'; 
import { downloadRequest } from '@/src/services/taskService'; // Import the downloadRequest function
const Card = ({ request, index, onDelete }) => {
  const [expanded, setExpanded] = useState(false);
  const cardRef = useRef(null);

  const handleCardClick = () => {
    setExpanded(!expanded);
  };

  const handleDelete = async () => {
    try {
      await removerequest(request._id);
      // Instead of removing the card immediately, perform a hard reload
      window.location.reload(true);
    } catch (error) {
      console.error('Error deleting request:', error.message);
    }
  };
  const handleDownload = async () => {
    try {
      const result = await downloadRequest(request._id);

      // Check if the download request was successful
      if (result.status === 'ok') {
        // The download has been initiated, and the file will be opened
        console.log('Download initiated successfully');
      } else {
        console.error('Failed to initiate download');
      }
    } catch (error) {
      console.error('Error downloading request:', error.message);
    }
  };
  useEffect(() => {
    if (cardRef.current) {
      const tl = gsap.timeline();

      tl.to(cardRef.current, {
        width: expanded ? '700px' : '300px',
        height: expanded ? '250px' : '100px',
        backgroundColor: expanded ? '#f0f0f0' : '#ffffff',
        duration: 0.3,
      });
    }
  }, [expanded]);

  const isFirstRow = Math.floor(index / 2) === 0;

  return (
    <div
      className={`card ml-10 border border-gray-300 rounded-lg shadow-md overflow-hidden cursor-pointer 
        ${isFirstRow ? 'float-left' : 'clear-both'} 
        ${expanded ? 'bg-gray-100' : 'bg-white'}`}
      style={{ margin: '30px', width: 'calc(50% - 20px)' }} // Set width for two cards per row
      onClick={handleCardClick}
      ref={cardRef}
    >
      <div className="flex justify-between items-center p-4">
        <h1>{expanded ? `${request.firstname} ${request.lastname}` : request.whatfor}</h1>
        
         {expanded && (
           <div className="flex">
             <button
               onClick={handleDelete}
               className="mr-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
               style={{ transition: 'none' }} // Remove any transition effect
             >
               <AiOutlineDelete className="inline-block mr-2" />
               Delete
             </button>
             <button
              onClick={handleDownload} // Call the handleDownload function
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              <AiOutlineDownload className="inline-block mr-2" />
              Download
            </button>
           </div>
        )}
      </div>
      {expanded && (
        <div className="p-4">
           <p>Student Id: {request.studentid}</p>
           
           <p>Student name: {request.academicyear}</p>

          <p>Technology: {request.whatfor}</p>
          <p>Domain: {request.domain}</p>
          <p>Email: {request.studentemail}</p>
          <p>Start At: {request.fromduration}</p>
          <p>End At: {request.toduration}</p>
          {/* Render HTML content */}
          <div dangerouslySetInnerHTML={{ __html: request.htmlContent }} />
          {/* Display other relevant data */}
        </div>
      )}
    </div>
  );
};

export default Card;
