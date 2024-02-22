import { Col, Button, Row, Container, Modal } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { getMyNotifsTeacher, delMyNotifsTeacher } from "../../../services/TeacherServices";

function TeacherMyNotifs() {
    const [Notifs, setNotifs] = useState('')
    const [delnotifid, setdelnotifid] = useState('')

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        //Runs on every render
        getMyNotifsTeacher(setNotifs)
    }, []);

    function handleSubmit() {
        delMyNotifsTeacher(setNotifs, getMyNotifsTeacher, delnotifid)
        handleClose()
    }

    return (
        <Container style={{ marginTop: '48px' }}>
            <Col md={8} lg={12} xs={12}>
                <h1><b>Notifications posted by you</b></h1>
            </Col>
            <div className="border border-2 border-primary"></div>
            <br />
            <Row className="d-flex">
                <Col md={8} lg={12} xs={12}>

                    <div>
                        {Notifs.length > 0 && (
                            <ul className='list-unstyled'>
                                {Notifs.map(notif => (
                                    <li><div className="card shadow">
                                        {/*<div className="border border-2 border-primary"></div>*/}
                                        <div className="card-header">
                                            Post by You
                                        </div>
                                        <div className="card-body">
                                            <h3 className="card-title"><b>{notif.title}</b></h3>
                                            <p className="card-text">{notif.info}</p>
                                            <div className="btn btn-primary" onClick={() => { handleShow(); setdelnotifid(notif._id); }}>delete</div>
                                        </div>
                                        <Modal show={show} onHide={handleClose}>
                                            <Modal.Header closeButton>
                                                <Modal.Title style={{ color: "#802121" }}>Delete Internship report</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>Are you sure you want to delete this?</Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={handleClose}>
                                                    Cancel
                                                </Button>
                                                <Button variant="primary" onClick={handleSubmit}>
                                                    Yes, Proceed
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>
                                    </div>
                                        <br /></li>
                                ))}
                            </ul>
                        )}
                    </div>

                </Col>

            </Row>
        </Container>
    )
}

export default TeacherMyNotifs;