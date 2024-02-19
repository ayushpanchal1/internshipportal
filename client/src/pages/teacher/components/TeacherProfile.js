import { Col, Container, Card } from "react-bootstrap";
import { useState, useEffect } from 'react';
import IMAGE from '../../../media/user.png'

function AdminProfile() {
    const Email = localStorage.getItem('SessionEmail');
    const [AdminData, setAdminData] = useState('');

    useEffect(() => {
        //Runs on every render
        getadmindata()
    }, []);

    async function getadmindata() {
        const response = await fetch('http://localhost:1337/api/current-user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })

        const data = await response.json()
        console.log(data)
        setAdminData(data)
    }

    return (
        <Container style={{ marginTop: '100px' }}>
            <Col md={8} lg={12} xs={12}>
                <h1><b>Admin User</b></h1>
                <Card className='shadow'>
                    <div className="d-flex">
                        <div className="border border-2 border-primary"></div>
                        <div className='col-md-3'>
                            <br />
                            <img class="media-object mw150" width="256" src={IMAGE} />
                        </div>

                        <div className='col-md-9'>
                            <br />
                            <h1>{AdminData.firstname} {AdminData.lastname}</h1>
                            <br />
                            <div className='d-flex'>
                                <div className='col md-3'>
                                    <h4>First Name: {AdminData.firstname}</h4>
                                    <h4>Department: {AdminData.department}</h4>
                                </div>
                                <div className='col md-3'>
                                    <h4>Last Name: {AdminData.lastname}</h4>
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

export default AdminProfile;