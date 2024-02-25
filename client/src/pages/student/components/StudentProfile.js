import { useState, useEffect } from 'react';
import { Col, Container, Card, Row } from "react-bootstrap";
import IMAGE from '../../../media/user.png'
import { getUserData } from "../../../services/Services"

function UserProfile() {
  const [UserData, setUserData] = useState('');

  useEffect(() => {
    //Runs on every render
    getUserData(setUserData)
  }, []);

  return (
    <Container style={{ marginTop: '100px' }}>
      <Row>
        <Col>
          <Card className='shadow'>
            <Row style={{ marginTop: '18px', marginBottom: '18px' }}>
              <Col md={3} className='d-flex justify-content-center'>
                <br />
                <img class="media-object mw150" width="256" src={IMAGE} />
              </Col>
              <Col md={9} style={{ paddingLeft: '26px'}}>
                <br />
                <h1><b>{UserData.firstname} {UserData.lastname}</b></h1>
                <br />
                <Row>
                  <Col md={6}>
                    <h4>First Name: {UserData.firstname}</h4>
                    <h4>Father's Name: {UserData.fathername}</h4>
                    <h4>Mobile Number: {UserData.mobileno}</h4>
                    <h4>Academic Year: {UserData.academicyear}</h4>
                  </Col>
                  <Col md={6}>
                    <h4>Last Name: {UserData.lastname}</h4>
                    <h4>Mother's Name: {UserData.mothername}</h4>
                    <h4>Email: {UserData.email}</h4>
                    <h4>Department: {UserData.department}</h4>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default UserProfile;