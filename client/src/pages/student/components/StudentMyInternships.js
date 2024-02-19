import { Col, Button, Container, Card, Modal } from "react-bootstrap";
import { useState, useEffect } from 'react';

function MyInternships() {
    const Email = localStorage.getItem('SessionEmail');
    const [interns, setinterns] = useState('')
    const [wfordelintern, setwfordelintern] = useState('')

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        getmyinterns()
    }, []);

    async function getmyinterns() {
        //const stuname = `${FirstName} ${LastName}`
        const response = await fetch('http://localhost:1337/api/studentgetmyinterns', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })

        const data = await response.json()

        if (Array.isArray(data)) {
            // `data` is an array, you can safely call reverse on it
            data.reverse();
          }
        setinterns(data)
    }

    async function deletemyinterns(wfor) {
        console.log(wfor)
        //const stuname = `${FirstName} ${LastName}`
        const response = await fetch('http://localhost:1337/api/deletemyinterns', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Email,
                wfor,
            }),
        })
        const data = await response.json()
        getmyinterns()
        handleClose()
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
                            <li>
                                <Card className="shadow">

                                <div className="card-header">
                                    From {intern.provider}
                                </div>
                                <div className="card-body">
                                    <h3 className="card-title"><b>{intern.whatfor}</b></h3>
                                    <h4 className="card-title">{intern.domain}</h4>
                                    <div className='d-flex'>
                                        <div className='col-md-3'>
                                            <h4>From: {intern.fromduration}</h4>
                                        </div>
                                        <div className='col-md-3'>
                                            <h4>To: {intern.toduration}</h4>
                                        </div>
                                    </div>
                                    <div className="btn btn-primary" onClick={() => { handleShow(); setwfordelintern(intern.whatfor); }}>delete</div>
                                    <Modal show={show} onHide={handleClose}>
                                        <Modal.Header closeButton>
                                            <Modal.Title style={{ color: "#802121" }}>Delete Internship report</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>Are you sure you want to delete this?</Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={handleClose}>
                                                Cancel
                                            </Button>
                                            <Button variant="primary" onClick={() => { deletemyinterns(wfordelintern) }}>
                                                Yes, Proceed
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                </div>
                            </Card>
                                <br />
                                </li>
                        ))}
                    </ul>
                )}
            </div>
        </Container>
    )
}

export default MyInternships;