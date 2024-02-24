import { Col, Row, Container, Button, Modal } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { getMyRequestsTeacher, approveRequestTeacher } from "../../../services/TeacherServices";

function Requests() {
    const [Requests, setRequests] = useState('')
    const [ApproveReqId, setApproveReqId] = useState('')

    const [show, setShow] = useState(false);
    const handleClose = () => {
        setApproveReqId('')
        setShow(false);
    }
    const handleShow = () => setShow(true);

    useEffect(() => {
        getMyRequestsTeacher(setRequests)
    }, []);

    function handleApprove() {
        approveRequestTeacher(setRequests, ApproveReqId)
        setApproveReqId('')
        handleClose()
    }

    return (
        <Container style={{ marginTop: '100px' }}>
            {Requests.length > 0 && (
                <ul className='list-unstyled'>
                    {Requests.map((request, index) => (
                        (index % 2 === 0) ?
                            <Row className="d-flex">
                                <Col md={6} lg={6} xs={12}>
                                    <li style={{ marginTop: '25px' }}>
                                        <div className="card shadow">
                                            <div className="border border-2 border-primary"></div>
                                            <div className="card-header">
                                                For {request.companyname}
                                            </div>
                                            <div className="card-body">
                                                <h3 className="card-title"><b>{request.whatfor}</b></h3>
                                                <p className="card-text">{request.domain}</p>
                                                <p className="card-text">Approval Status: {request.approvalstatus}</p>
                                                <Button className="btn btn-primary" onClick={() => { handleShow(); setApproveReqId(request._id); }}>Approve</Button> &nbsp;
                                            </div>
                                        </div>
                                    </li>
                                </Col>
                                {Requests[index + 1] &&
                                    <Col md={6} lg={6} xs={12}>
                                        <li style={{ marginTop: '25px' }}>
                                            <div className="card shadow">
                                                <div className="border border-2 border-primary"></div>
                                                <div className="card-header">
                                                    For {Requests[index + 1].companyname}
                                                </div>
                                                <div className="card-body">
                                                    <h3 className="card-title"><b>{Requests[index + 1].whatfor}</b></h3>
                                                    <p className="card-text">{Requests[index + 1].domain}</p>
                                                    <p className="card-text">Approval Status: {Requests[index + 1].approvalstatus}</p>
                                                    <Button className="btn btn-primary" onClick={() => { handleShow(); setApproveReqId(Requests[index + 1]._id); }}>Approve</Button> &nbsp;  
                                                </div>
                                            </div>
                                        </li>
                                    </Col>
                                }
                            </Row>
                            :
                            null
                    ))}
                </ul>
            )}
            
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title style={{ color: "#802121" }}>Approve Internship Request</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to approve this request?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleApprove}>
                        Yes, Proceed
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>

    )
}

export default Requests;