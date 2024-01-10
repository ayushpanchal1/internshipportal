"use client"
import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { teacherApproveRequest, teacherGetMyRequests } from '@/src/services/taskService';

const Studentdata = () => {
  const [requests, setRequests] = useState([]);
  const [pendingApprovalId, setPendingApprovalId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const cardsRef = useRef([]);

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem('token');
      const userEmail = localStorage.getItem('userEmail');

      if (!token || !userEmail) {
        throw new Error('Token or email is missing');
      }

      const response = await teacherGetMyRequests(userEmail);
      const fetchedRequests = response.requests || [];
      setRequests(fetchedRequests);
      localStorage.setItem('fetchedRequests', JSON.stringify(fetchedRequests));

      gsap.from(cardsRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.6,
        ease: 'power3.easeOut',
        stagger: 0.2,
      });
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleApproval = async (id, approvalStatus) => {
    try {
      let newApprovalStatus = approvalStatus;

      if (approvalStatus === 0) {
        newApprovalStatus = 1;
      } else if (approvalStatus === 1) {
        newApprovalStatus = 2;
      }

      const response = await teacherApproveRequest(id, newApprovalStatus);

      if (response && response.status === 'ok') {
        const updatedRequests = requests.map(request =>
          request._id === id ? { ...request, approvalstatus: newApprovalStatus } : request
        );
        setRequests(updatedRequests);

        setShowModal(false);
      }
    } catch (error) {
      console.error('Error approving request:', error);
    }
  };

  const handleModalConfirmation = async (confirm) => {
    try {
      if (confirm && pendingApprovalId) {
        const response = await teacherApproveRequest(pendingApprovalId);

        if (response && response.status === 'ok') {
          setShowModal(false);
        }
      } else {
        setPendingApprovalId(null);
        setShowModal(false);
      }
    } catch (error) {
      console.error('Error confirming approval:', error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Student Data</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {requests.map((request, index) => (
          <div
            key={request._id}
            ref={(el) => (cardsRef.current[index] = el)}
            className="border rounded-md p-4 bg-violet-300"
          >
            <h2 className="text-xl font-semibold mb-2">
              {request.firstname} {request.lastname}
            </h2>
            <p className="mb-2">Email: {request.studentemail}</p>
            <p className="mb-2">Technology: {request.whatfor}</p>
            <p className="mb-2">Domain: {request.domain}</p>
            <p className="mb-2">Duration: {request.toduration}</p>

            {(request.approvalstatus === 0 || request.approvalstatus === 1) && (
              <button
                onClick={() => handleApproval(request._id, request.approvalstatus)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Approve
              </button>
            )}
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="modal-content bg-white p-6 rounded-lg">
            <p>Are you sure you want to approve this request?</p>
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => handleModalConfirmation(true)}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Yes
              </button>
              <button
                onClick={() => handleModalConfirmation(false)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Studentdata;