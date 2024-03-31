import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getAStudentforTeacher } from '../../../services/TeacherServices';

function StudentInfo() {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [interns, setInterns] = useState(null);

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

  return (
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
                      {/* Add more fields as needed */}
                    </Col>
                    <Col md={6}>
                      {/* Display additional user information */}
                    </Col>
                  </Row>
                  <br />
                  {/* Add any additional components for profile picture upload/delete if needed */}
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      )}

      {interns && (
        <Row>
          <Col>
            <h2>Completed Internships</h2>
            {/* Display completed internships data */}
            <ul>
              {interns.completedInterns.map((intern) => (
                <li key={intern._id}>{intern.companyname}</li>
              ))}
            </ul>
          </Col>
        </Row>
      )}

      {interns && (
        <Row>
          <Col>
            <h2>Requested Internships</h2>
            {/* Display requested internships data */}
            <ul>
              {interns.requestedInterns.map((request) => (
                <li key={request._id}>{request.companyname}</li>
              ))}
            </ul>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default StudentInfo;
