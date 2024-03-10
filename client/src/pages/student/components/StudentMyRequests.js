import { Col, Row, Container, Button, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import {
  getMyRequestsStudent,
  removeRequestStudent,
} from "../../../services/StudentServices";
import { downloadRequest } from "../../../services/Services";

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

  return (
    <Container style={{ marginTop: "100px" }}>
      {Requests.length > 0 && (
        <ul className="list-unstyled">
          {Requests.map((request, index) =>
            index % 2 === 0 ? (
              <Row className="d-flex" key={request._id}>
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
                          onClick={() => handleShow(request)}
                        >
                          View
                        </Button>{" "}
                        &nbsp;
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
                            onClick={() => handleShow(Requests[index + 1])}
                          >
                            View
                          </Button>{" "}
                          &nbsp;
                          <Button
                            className="btn btn-primary mr-2"
                            onClick={() =>
                              setRemoveReqId(Requests[index + 1]._id)
                            }
                          >
                            Remove
                          </Button>
                          {request.approvalstatus === 2 && (
                            <Button
                              className="btn btn-primary"
                              style={{ marginLeft: "20px" }}
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
                )}
              </Row>
            ) : null
          )}
        </ul>
      )}

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
