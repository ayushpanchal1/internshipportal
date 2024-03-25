import { Col, Row, Container, Button, Modal, Form } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { getMyRequestsTeacher, approveRequestTeacher, declineRequestTeacher } from "../../../services/TeacherServices";

function Requests() {
    const [requests, setRequests] = useState('');
    const [approveReqId, setApproveReqId] = useState('');
    const [declineReqId, setDeclineReqId] = useState('');
    const [show, setShow] = useState(false);
    const [declineMsg, setDeclineMsg] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredRequests, setFilteredRequests] = useState([]);

    const handleClose = () => {
        setApproveReqId(null);
        setDeclineReqId(null);
        setShow(false);
    }
    const handleShow = () => setShow(true);

    useEffect(() => {
        getMyRequestsTeacher(setRequests);
    }, []);

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredRequests(requests);
        } else {
            setFilteredRequests(requests.filter(request =>
                request.companyname.toLowerCase().includes(searchQuery.toLowerCase()) ||
                request.whatfor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                request.domain.toLowerCase().includes(searchQuery.toLowerCase())
            ));
        }
    }, [searchQuery, requests]);

    function handleApprove() {
        approveRequestTeacher(setRequests, approveReqId);
        setApproveReqId('');
        handleClose();
    }

    function handleDecline() {
        declineRequestTeacher(setRequests, declineReqId, declineMsg);
        setDeclineReqId('');
        handleClose();
    }

    function handleSearch() {
        setFilteredRequests(requests.filter(request =>
            request.companyname.toLowerCase().includes(searchQuery.toLowerCase()) ||
            request.whatfor.toLowerCase().includes(searchQuery.toLowerCase()) ||
            request.domain.toLowerCase().includes(searchQuery.toLowerCase())
        ));
    }

    function handleClear() {
        setSearchQuery('');
        setFilteredRequests(requests);
    }

    return (
        <Container style={{ marginTop: '100px' }}>
            <div className="d-flex mb-3">
                <input
                    type="text"
                    placeholder="Search..."
                    className="form-control me-2"
                    style={{marginLeft:"700px"}}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button variant="primary" className="me-2" onClick={handleSearch}>Search</Button>
                <Button variant="info" onClick={handleClear}>Clear</Button>
            </div>
            {filteredRequests.length > 0 && (
                <ul className='list-unstyled'>
                    {filteredRequests.map((request, index) => (
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
                                                {/* <p className="card-text">Approval Status: {request.approvalstatus}</p> */}
                                                <Button className="btn btn-primary" onClick={() => { handleShow(); setApproveReqId(request._id); }}>Approve</Button> &nbsp;
                                                <Button className="btn btn-primary" onClick={() => { handleShow(); setDeclineReqId(request._id); }}>Decline</Button>
                                            </div>
                                        </div>
                                    </li>
                                </Col>
                                {filteredRequests[index + 1] &&
                                    <Col md={6} lg={6} xs={12}>
                                        <li style={{ marginTop: '25px' }}>
                                            <div className="card shadow">
                                                <div className="border border-2 border-primary"></div>
                                                <div className="card-header">
                                                    For {filteredRequests[index + 1].companyname}
                                                </div>
                                                <div className="card-body">
                                                    <h3 className="card-title"><b>{filteredRequests[index + 1].whatfor}</b></h3>
                                                    <p className="card-text">{filteredRequests[index + 1].domain}</p>
                                                    {/* <p className="card-text">Approval Status: {filteredRequests[index + 1].approvalstatus}</p> */}
                                                    <Button className="btn btn-primary" onClick={() => { handleShow(); setApproveReqId(filteredRequests[index + 1]._id); }}>Approve</Button> &nbsp;
                                                    <Button className="btn btn-primary" onClick={() => { handleShow(); setDeclineReqId(filteredRequests[index + 1]._id); }}>Decline</Button>
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
                    {approveReqId && <Modal.Title style={{ color: "#802121" }}>Approve Internship Request</Modal.Title> }
                    {declineReqId && <Modal.Title style={{ color: "#802121" }}>Decline Internship Request</Modal.Title> }
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to {declineReqId ? 'decline' : 'approve'} this request? 
                    {declineReqId && (
                        <Form.Group controlId="declineMsg"
                        style={{marginTop:"30px"}}>
                            <Form.Label>Decline Message</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={declineMsg}
                                onChange={(e) => setDeclineMsg(e.target.value)}
                            />
                        </Form.Group>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={declineReqId ? handleDecline : handleApprove}>
                        {declineReqId ? 'Yes, Decline' : 'Yes, Approve'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>

    )
}

export default Requests;
