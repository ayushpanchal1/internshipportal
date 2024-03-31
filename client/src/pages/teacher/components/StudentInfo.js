import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Tab, Nav, Modal, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getAStudentforTeacher } from '../../../services/TeacherServices';
import CNavbar from '../../common/components/CNavbar';

function StudentInfo() {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [interns, setInterns] = useState(null);
  const [show, setShow] = useState(false);
  const [selectedIntern, setSelectedIntern] = useState(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const { student, completedInterns, requestedInterns } = await getAStudentforTeacher(id, setUserData, setInterns);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchStudentData();
  }, [id]);

  const handleClose = () => {
    setShow(false);
    setSelectedIntern(null)
  }
  const handleShow = () => setShow(true);

  const handleView = (intern) => {
    setSelectedIntern(intern);
    handleShow();
  }

  return (
    <>
      <CNavbar />
      <Container style={{ marginTop: '100px' }}>
        {userData && (
          <Row>
            <Col>
              <Card className="shadow">
                <Row style={{ marginTop: '18px', marginBottom: '18px' }}>
                  <Col md={3} className="d-flex justify-content-center">
                    <br />
                    <img className="media-object mw150" width="256" src={`${process.env.REACT_APP_BACKEND_ADDRESS}/api/fetchprofilepicture/${id}`} alt="Profile" />
                  </Col>
                  <Col md={9} style={{ paddingLeft: '26px' }}>
                    <br />
                    <h1><b>{userData.firstname} {userData.lastname}</b></h1>
                    <br />
                    <Row>
                      <Col md={6}>
                        <h4>First Name: {userData.firstname}</h4>
                        <h4>Last Name: {userData.lastname}</h4>
                        <h4>Email: {userData.email}</h4>
                        <h4>Gender: {userData. gender}</h4>
                        <h4>Academic Year: {userData. academicyear}</h4>
                    
                      </Col>
                      <Col md={6}>
                      <h4>Department: {userData.department}</h4>
                      <h4>Division: {userData.division}</h4>
                      <h4>Semester: {userData.semester}</h4>
                      <h4>Class Teacher: {userData.classteacher}</h4>
                      <h4>Hod: {userData.hod}</h4>
                      </Col>
                    </Row>
                    <br />
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        )}

        <Row style={{ marginTop: "50px" }}>
          <Col>
            <h2>Internships</h2>
            {interns && (
              <Tab.Container id="internship-tabs" defaultActiveKey="completed" >
                <Row>
                  <Col>
                    <Nav variant="tabs" style={{ marginLeft: "500px" }}>
                      <Nav.Item>
                        <Nav.Link eventKey="completed">Completed Internships</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="requested">Requested Internships</Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Tab.Content>
                      <Tab.Pane eventKey="completed">
                        <h3>Completed Internships</h3>
                        <Row>
                          {interns.completedInterns.map((intern) => (
                            <Col key={intern._id} md={4} style={{ marginBottom: '20px' }}>
                              <Card>
                                <Card.Body>
                                  <Card.Title>{intern.companyname}</Card.Title>
                                  <Card.Text>
                                    {intern.stuname}
                                  </Card.Text>
                                  <Card.Text>
                                    {intern.whatfor}
                                  </Card.Text>
                                  <Card.Text>
                                    {intern.provider}
                                  </Card.Text>
                                  <Button variant="primary" onClick={() => handleView(intern)}>View Details</Button>
                                </Card.Body>
                              </Card>
                            </Col>
                          ))}
                        </Row>
                      </Tab.Pane>
                      <Tab.Pane eventKey="requested">
                        <h3>Requested Internships</h3>
                        <Row>
                          {interns.requestedInterns.map((intern) => (
                            <Col key={intern._id} md={4} style={{ marginBottom: '20px' }}>
                              <Card>
                                <Card.Body>
                                  <Card.Title>{intern.companyname}</Card.Title>
                                  <Card.Text>
                                    {intern.whatfor}
                                  </Card.Text>
                                  <Button variant="primary" onClick={() => handleView(intern)}>View Details</Button>
                                </Card.Body>
                              </Card>
                            </Col>
                          ))}
                        </Row>
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>
            )}
          </Col>
        </Row>
      </Container>

      {/* Modal for viewing internship details */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Internship Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedIntern && (
            <>
              <p><strong>Company Name:</strong> {selectedIntern.companyname}</p>
              <p><strong>Technology:</strong> {selectedIntern.whatfor}</p>
              <p><strong>Domain:</strong> {selectedIntern.domain}</p>
              <p><strong>From Duration:</strong> {selectedIntern.fromduration}</p>
              <p><strong>To Duration:</strong> {selectedIntern.toduration}</p>
              {selectedIntern.approvalstatus !== undefined && (
                <p><strong>Approval Status:</strong> {selectedIntern.approvalstatus === 0 ? 'None' : selectedIntern.approvalstatus === 1 ? 'Class Teacher' : selectedIntern.approvalstatus === 2 ? 'HOD' : 'Declined'}</p>
              )}
              {selectedIntern.declinemsg && (
                <p><strong>Decline Message:</strong> {selectedIntern.declinemsg}</p>
              )}
              {/* Add more details as needed */}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default StudentInfo;
