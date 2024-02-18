import { useState, useEffect } from 'react';
import { Col, Container, Card } from "react-bootstrap";
import IMAGE from '../../media/user.png'

function UserProfile(){
    const Email = localStorage.getItem('SessionEmail');
    const [UserData, setUserData] = useState('');

    useEffect(() => {
        //Runs on every render
        getuserdata()
    }, []);

    async function getuserdata() {
        const response = await fetch('http://localhost:1337/api/current-user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        })
    
        const data = await response.json()
        setUserData(data)
      }

    return(
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
                    <h4>Email: {Email}</h4>
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