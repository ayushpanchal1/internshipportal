import { Col, Row, Container, Button, Modal, Tab, Tabs } from "react-bootstrap";
import { FaCheck, FaTimes, FaCheckDouble, FaClock } from "react-icons/fa";


import { useState, useEffect } from "react";
import {
  getMyRequestsStudent,
  removeRequestStudent,
} from "../../../services/StudentServices";
import { downloadRequest } from "../../../services/Services";
import { declineRequestTeacher } from "../../../services/TeacherServices";

function Requests() {
  const [Requests, setRequests] = useState([]);
  const [RemoveReqId, setRemoveReqId] = useState("");
  const [show, setShow] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [confirmRemove, setConfirmRemove] = useState(false);

  const handleClose = () => {
    setRemoveReqId("");
    setShow(false);
    setSelectedRequest(null);
    setConfirmRemove(false);
  };

  const handleShow = (request) => {
    setSelectedRequest(request);
    setShow(true);
  };

  useEffect(() => {
    getMyRequestsStudent(setRequests);
  }, []);

  function handleRemove() {
    if (confirmRemove) {
      removeRequestStudent(setRequests, RemoveReqId);
      setRemoveReqId("");
      handleClose();
      window.location.reload();
    } else {
      setConfirmRemove(true);
    }
  }

  function handleDownload(DownloadReqId) {
    downloadRequest(DownloadReqId);
  }

  async function handleDecline(DeclineReqId, DeclineMsg) {
    await declineRequestTeacher(setRequests, DeclineReqId, DeclineMsg);
  }

  const completedRequests = Requests.filter(
    (request) => request.approvalstatus === 2
  );

  const incompleteRequests = Requests.filter(
    (request) => request.approvalstatus === 0 
  );

  const approvedByTeacherRequests = Requests.filter(
    (request) => request.approvalstatus === 1
  );

  const declinedRequests = Requests.filter(
    (request) => request.approvalstatus === 3
  );

  const renderRequestCards = (requests) => {
    return (
      <Row>
        {requests.map((request, index) => (
          <Col md={6} lg={6} xs={12} key={request._id}>
            <div className="card shadow" style={{ marginTop: "25px" }}>
              <div className="border border-2 border-primary"></div>
              <div className="card-header">For {request.companyname}</div>
              <div className="card-body">
                <h3 className="card-title">
                  <b>{request.whatfor}</b>
                </h3>
                <p className="card-text">{request.domain}</p>
                <p className="card-text">
                  Approval Status: {request.approvalstatus}
                </p>
                {request.approvalstatus !== 3 && (
                  <>
                    <Button
                      className="btn btn-primary"
                      onClick={() => handleShow(request)}
                    >
                      View
                    </Button>{" "}
                    &nbsp;
                    <Button
                      className="btn btn-primary"
                      onClick={
                      handleRemove
                    
                    }
                    >
                      Remove
                    </Button>{" "}
                    &nbsp;
                    {request.approvalstatus === 2 && (
                      <Button
                        className="btn btn-primary"
                        onClick={() => handleDownload(request._id)}
                      >
                        Download
                      </Button>
                    )}
                  </>
                )}
                {request.approvalstatus === 3 && (
                  <>
                    <strong>Decline Reason: {request.declinemsg}</strong>
                  </>
                )}
                 {request.approvalstatus === 1 && <FaCheck />} 
                 {request.approvalstatus === 0 && <FaClock/>} 
              {request.approvalstatus === 2 && <FaCheckDouble />} 
              {request.approvalstatus === 3 && <FaTimes />} 
              </div>
            </div>
          </Col>
        ))}
      </Row>
    );
  };

  return (
    <Container style={{ marginTop: "100px" }}>
      <Tabs defaultActiveKey="completed" id="requests-tabs" className="justify-content-center">
        <Tab eventKey="incomplete" title="UnApproved">
          {incompleteRequests.length > 0 && renderRequestCards(incompleteRequests)}
        </Tab>
        <Tab eventKey="approved" title="Approved by Teacher">
          {approvedByTeacherRequests.length > 0 && renderRequestCards(approvedByTeacherRequests)}
        </Tab>
        <Tab eventKey="completed" title="Approved By Hod">
          {completedRequests.length > 0 && renderRequestCards(completedRequests)}
        </Tab>
        <Tab eventKey="declined" title="Declined">
          {declinedRequests.length > 0 && renderRequestCards(declinedRequests)}
        </Tab>
      </Tabs>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#802121" }}>
            Internship Details
          </Modal.Title>
        </Modal.Header>
        {selectedRequest && (
          <Modal.Body>
            <p>
              <strong>Company Name:</strong> {selectedRequest.companyname}
            </p>
            <p>
              <strong>What For:</strong> {selectedRequest.whatfor}
            </p>
            <p>
              <strong>Domain:</strong> {selectedRequest.domain}
            </p>
            <p>
              <strong>Approval Status:</strong> {selectedRequest.approvalstatus}
            </p>
          </Modal.Body>
        )}
        <Modal.Footer>
          {!confirmRemove ? (
            <>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleRemove}>
                Remove
              </Button>
            </>
          ) : (
            <>
              <p>Are you sure you want to remove this request?</p>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleRemove}>
                Yes, Proceed
              </Button>
            </>
          )}
          {selectedRequest && selectedRequest.approvalstatus === 2 && (
            <Button
              className="btn btn-primary"
              style={{ ml: "20px" }}
              onClick={() => handleDownload(selectedRequest._id)}
            >
              Download
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Requests;
