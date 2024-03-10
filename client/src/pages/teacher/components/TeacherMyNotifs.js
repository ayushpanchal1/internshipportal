import { Col, Button, Row, Container, Modal, Form } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { getMyNotifsTeacher, delMyNotifsTeacher } from "../../../services/TeacherServices";

function TeacherMyNotifs() {
    const [Notifs, setNotifs] = useState([]);
    const [delnotifid, setDelNotifId] = useState('');
    const [show, setShow] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredNotifs, setFilteredNotifs] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        getMyNotifsTeacher(setNotifs);
    }, []);

    const handleSubmit = () => {
        delMyNotifsTeacher(setNotifs, getMyNotifsTeacher, delnotifid);
        handleClose();
    };

    const handleSearch = () => {
        const newFilteredNotifs = Notifs.filter(notif => {
            return (
                notif.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                notif.info.toLowerCase().includes(searchQuery.toLowerCase())
            );
        });
        setFilteredNotifs(newFilteredNotifs);
    };

    const handleClear = () => {
        setSearchQuery('');
        setFilteredNotifs([]);
    };

    return (
        <Container style={{ marginTop: '48px' }}>
            <Col md={8} lg={12} xs={12}>
                <h1><b>Notifications posted by you</b></h1>
            </Col>
            <div className="border border-2 border-primary"></div>
            <br />
            <Row className="d-flex">
                <Col md={8} lg={12} xs={12}>
                    <div className="d-flex justify-content-end">
                        <Form.Control
                            type="text"
                            placeholder="Search..."
                            className="mb-3 me-2"
                            style={{ width: "300px" }}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Button variant="primary" className="me-1" style={{ height: "40px" }} onClick={handleSearch}>Search</Button>
                        <Button variant="primary" className="me-1" style={{ height: "40px" }} onClick={handleClear}>Clear</Button>
                    </div>
                    <div>
                        {(filteredNotifs.length > 0 ? filteredNotifs : Notifs).map(notif => (
                            <div key={notif._id} className="card shadow mb-3">
                                <div className="card-header">
                                    Post by You
                                </div>
                                <div className="card-body">
                                    <h3 className="card-title"><b>{notif.title}</b></h3>
                                    <p className="card-text">{notif.info}</p>
                                    <div className="btn btn-primary" onClick={() => { handleShow(); setDelNotifId(notif._id); }}>Delete</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Col>
            </Row>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title style={{ color: "#802121" }}>Delete Notification</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this notification?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Yes, Proceed
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default TeacherMyNotifs;
