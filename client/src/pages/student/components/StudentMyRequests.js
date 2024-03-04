import { Col, Row, Container, Button, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import {
  getMyRequestsStudent,
  removeRequestStudent,
} from "../../../services/StudentServices";
import { downloadRequest } from "../../../services/Services";

function Requests() {
  const [Requests, setRequests] = useState("");
  const [RemoveReqId, setRemoveReqId] = useState("");
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setRemoveReqId("");
    setShow(false);
  };
  const handleShow = () => setShow(true);

  useEffect(() => {
    getMyRequestsStudent(setRequests);
  }, []);

  const handleShowDetails = (request) => {
    setSelectedRequest(request);
    setShowDetailsModal(true);
  };

  const handleCloseDetails = () => {
    setShowDetailsModal(false);
  };

  function handleRemove() {
    removeRequestStudent(setRequests, selectedRequest._id);
    handleCloseDetails();
  }

  function handleDownload() {
    downloadRequest(selectedRequest._id);
  }

  return (
    <Container style={{ marginTop: "100px", fontFamily:"Poppins", fontSize:"18px" }}>
      {Requests.length > 0 && (
        <ul className="list-unstyled">
          {Requests.map((request, index) =>
            index % 2 === 0 ? (
              <Row className="d-flex">
                <Col md={6} lg={6} xs={12}>
                  <li style={{ marginTop: "25px" }}>
                    <div className="card shadow">
                      <div className="border border-2 border-primary"></div>
                      <div className="card-header">
                        For {request.companyname}
                      </div>
                      <div className="card-body">
                        <h3 className="card-title">
                          <b>{request.whatfor}</b>
                        </h3>
                        <p className="card-text">{request.domain}</p>
                        <p className="card-text">
                          Approval Status: {request.approvalstatus}
                        </p>
                        <Button
                          className="btn btn-primary"
                          onClick={() => {
                            handleShow();
                            setRemoveReqId(request._id);
                          }}
                        >
                          Remove
                        </Button>{" "}
                        &nbsp;
                        <Button
                          className="btn btn-primary"
                          onClick={() => handleShowDetails(request)}
                        >
                          View Details
                        </Button>{" "}
                        &nbsp; &nbsp;
                        {request.approvalstatus === 2 && (
                          <Button
                            className="btn btn-primary"
                            onClick={() => {
                              handleDownload(request._id);
                            }}
                          >
                            Download
                          </Button>
                        )}
                      </div>
                    </div>
                  </li>
                </Col>
                {Requests[index + 1] && (
                  <Col md={6} lg={6} xs={12}>
                    <li style={{ marginTop: "25px" }}>
                      <div className="card shadow">
                        <div className="border border-2 border-primary"></div>
                        <div className="card-header">
                          For {Requests[index + 1].companyname}
                        </div>
                        <div className="card-body">
                          <h3 className="card-title">
                            <b>{Requests[index + 1].whatfor}</b>
                          </h3>
                          <p className="card-text">
                            {Requests[index + 1].domain}
                          </p>
                          <p className="card-text">
                            Approval Status:{" "}
                            {Requests[index + 1].approvalstatus}
                          </p>
                          <Button
                            className="btn btn-primary"
                            onClick={() => {
                              handleShow();
                              setRemoveReqId(Requests[index + 1]._id);
                            }}
                          >
                            Remove
                          </Button>{" "}
                          &nbsp;
                          {Requests[index + 1].approvalstatus === 2 && (
                            <Button
                              className="btn btn-primary"
                              onClick={() => {
                                handleDownload(Requests[index + 1]._id);
                              }}
                            >
                              Download
                            </Button>
                          )}
                        </div>
                      </div>
                    </li>
                  </Col>
                )}
              </Row>
            ) : null
          )}
        </ul>
      )}
      <Modal show={showDetailsModal} onHide={handleCloseDetails} style={{fontFamily:'poppins', fontSize:"18px"}}>
        <Modal.Header closeButton>
          <Modal.Title>Request Details</Modal.Title>
        </Modal.Header>
        {selectedRequest && (
          <Modal.Body>
            <p>
              <strong>Student Email:</strong> {selectedRequest.studentemail}
            </p>
            <p>
              <strong>First Name:</strong> {selectedRequest.firstname}
            </p>
            <p>
              <strong>Last Name:</strong> {selectedRequest.lastname}
            </p>
            <p>
              <strong>Seat No:</strong> {selectedRequest.seatno}
            </p>
            <p>
              <strong>Academic Year:</strong> {selectedRequest.academicyear}
            </p>
            <p>
              <strong>Department:</strong> {selectedRequest.department}
            </p>
            <p>
              <strong>Semester:</strong> {selectedRequest.semester}
            </p>
            <p>
              <strong>Division:</strong> {selectedRequest.division}
            </p>
            <p>
              <strong>Class Teacher:</strong> {selectedRequest.classteacher}
            </p>
            <p>
              <strong>HOD:</strong> {selectedRequest.hod}
            </p>
            <p>
              <strong>Mother's Name:</strong> {selectedRequest.mothername}
            </p>
            <p>
              <strong>Father's Name:</strong> {selectedRequest.fathername}
            </p>
            <p>
              <strong>From Duration:</strong> {selectedRequest.fromduration}
            </p>
            <p>
              <strong>To Duration:</strong> {selectedRequest.toduration}
            </p>
            <p>
              <strong>Company Name:</strong> {selectedRequest.companyname}
            </p>
            <p>
              <strong>Company Address:</strong> {selectedRequest.companyaddress}
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
          <Button variant="secondary" onClick={handleCloseDetails}>
            Close
          </Button>
          <Button variant="primary" onClick={handleRemove}>
            Remove
          </Button>
          <Button className="btn btn-primary" onClick={handleDownload}>
            Download
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Requests;
