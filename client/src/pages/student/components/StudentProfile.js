import { useState, useEffect } from 'react';
import { Col, Container, Card } from "react-bootstrap";
import IMAGE from '../../../media/user.png'
import { getUserData } from "../../../services/Services"

function UserProfile() {
  const [UserData, setUserData] = useState('');

  useEffect(() => {
    //Runs on every render
    getUserData(setUserData)
  }, []);

  return (
    <Container style={{ marginTop: '100px' }} >
      <Col md={8} lg={12} xs={12}>
        <h1><b>User</b></h1>
        <Card className='shadow'>
          <div className="d-flex">
            <div className="border border-2 border-primary"></div>
            <div className='col-md-3'>
              <br />
              <img class="media-object mw150" width="256" src={IMAGE} />
            </div>

            <div className='col-md-9'>
              <br />
              <h1>{UserData.firstname} {UserData.lastname}</h1>
              <br />
              <div className='d-flex'>
                <div className='col md-3'>
                  <h4>First Name: {UserData.firstname}</h4>
                  <h4>Father's Name: {UserData.fathername}</h4>
                  <h4>Mobile Number: {UserData.mobileno}</h4>
                  <h4>Academic Year: {UserData.academicyear}</h4>
                </div>
                <div className='col md-3'>
                  <h4>Last Name: {UserData.lastname}</h4>
                  <h4>Mother's Name: {UserData.mothername}</h4>
                  <h4>Email: {UserData.email}</h4>
                  <h4>Department: {UserData.department}</h4>
                </div>
              </div>
            </div>
          </div>
        </Card>


      </Col>
    </Container>
  )
}

export default UserProfile;