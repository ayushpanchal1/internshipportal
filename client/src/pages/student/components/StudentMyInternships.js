import { Col, Button, Container, Card, Modal, ModalBody } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { getMyInternsStudent, delMyInternsStudent } from "../../../services/StudentServices";
import { FaCheckDouble } from "react-icons/fa";

function MyInternships() {
    const [interns, setInterns] = useState('');
    const [delinternid, setDelInternId] = useState('');
    const [show, setShow] = useState(false);
    const [selectedIntern, setSelectedIntern] = useState(null);

    const handleClose = () => {
        setShow(false);
        setSelectedIntern(null)
    }
    const handleShow = () => setShow(true);

    useEffect(() => {
        getMyInternsStudent(setInterns);
    }, []);

    function handleDelete() {
        delMyInternsStudent(setInterns, delinternid);
        handleClose();
    }

    function handleView(intern) {
        setSelectedIntern(intern);
        handleShow();
    }

    return (
        <Container style={{ marginTop: '48px' }}>
            <Col md={8} lg={12} xs={12}>
                <h1><b>Completed Internships</b></h1>
            </Col>
            <div className="border border-2 border-primary"></div>
            <br />
            <div>
                {interns.length > 0 && (
                    <ul className='list-unstyled'>
                        {interns.map(intern => (
                            <li key={intern._id}>
                                <Card className="shadow">
                                    <div className="card-header">
                                        From {intern.provider} {intern._id}
                                    </div>
                                    <div className="card-body">
                                        <h3 className="card-title"><b>{intern.whatfor}</b></h3>
                                        <h4 className="card-title">{intern.domain}</h4>
                                        <div className='d-flex'>
                                            <div className='col-md-3'>
                                                <h4>From: {intern.fromduration} &nbsp;</h4>
                                            </div>
                                            <div className='col-md-3'>
                                                <h4>To: {intern.toduration}</h4>
                                            </div>
                                        </div>
                                        <div>
                                            <Button className="btn btn-primary" style={{ mr: 2 }} onClick={() => { setDelInternId(intern._id); handleView(intern);}}>View</Button>&nbsp;
                                            <Button className="btn btn-primary" onClick={() => { setDelInternId(intern._id); handleShow(); }}>Delete</Button>
                                        </div>
                                    </div>
                                </Card>
                                <br />
                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                    { selectedIntern ? 
                                        <Modal.Title style={{ color: "#802121" }}>Internship Details</Modal.Title>
                                        :
                                        <Modal.Title style={{ color: "#802121" }}>Delete Internship Details</Modal.Title>
                                    }
                                    </Modal.Header>
                                    {selectedIntern ? (
                                        <Modal.Body>
                                            <p><strong>Student ID:</strong> {selectedIntern.stu_id}</p>
                                            <p><strong>Student Name:</strong> {selectedIntern.stuname}</p>
                                            <p><strong>Student Father's Name:</strong> {selectedIntern.stufname}</p>
                                            <p><strong>Student Last Name:</strong> {selectedIntern.stulname}</p>
                                            <p><strong>Email:</strong> {selectedIntern.email}</p>
                                            <p><strong>Provider:</strong> {selectedIntern.provider}</p>
                                            <p><strong>From Duration:</strong> {selectedIntern.fromduration}</p>
                                            <p><strong>To Duration:</strong> {selectedIntern.toduration}</p>
                                            <p><strong>What For:</strong> {selectedIntern.whatfor}</p>
                                            <p><strong>Domain:</strong> {selectedIntern.domain}</p>
                                        </Modal.Body>
                                    ) : <Modal.Body>are you sure?</Modal.Body>}
                                    <Modal.Footer>
                                        <Button variant="primary" onClick={handleClose}>Close</Button>
                                        {
                                            selectedIntern ? 
                                            <Button variant="primary" onClick={() => { handleClose(); handleShow(); }}>Delete</Button>
                                            : 
                                            <Button variant="primary" onClick={() => { handleDelete() }}>Delete</Button> 
                                        }
                                    </Modal.Footer>
                                </Modal>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

        </Container>
    );
}

export default MyInternships;