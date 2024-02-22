import React from 'react'
import { Col, Button, Row, Container, Form, InputGroup } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useSignOut } from 'react-auth-kit';
import { useAuthUser } from 'react-auth-kit';
import IMAGE from '../../media/user.png'
import CNavbar from '../common/components/CNavbar';
import { logout } from '../../services/Services';
import { getAllStudentsForTeacher, getAStudentforTeacher } from '../../services/TeacherServices';

function App() {
  const auth = useAuthUser()
  const Session = auth().session

  const [UserData, setUserData] = useState('')
  const [Interns, setInterns] = useState('')
  const [searchquery, setsearchquery] = useState('')
  const [AllUser, setAllUser] = useState('')
  //console.log(Email)

  const signOut = useSignOut();
  const navigate = useNavigate();

  useEffect(() => {
    //Runs on every render
    getAllStudentsForTeacher(setAllUser)
    if (Session === "user") {
      logout(navigate, signOut)
    }
  }, []);

  function handleSubmit(event) {
    event.preventDefault()
    getAStudentforTeacher(setUserData, setInterns, searchquery)
  }

  return (
    <div>
      <CNavbar />

      <Container style={{ marginTop: '100px' }}>
        <Row className="d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <Form onSubmit={handleSubmit}>
              <InputGroup className="mb-3 shadow">
                <Form.Control
                  value={searchquery}
                  onChange={(e) => setsearchquery(e.target.value)}
                  type="text"
                  placeholder="Search"
                  aria-label="Searchq"
                  aria-describedby="basic-addon2"
                />
                <Button variant="primary" id="button-addon2" value="searchq" type="submit">
                  Search
                </Button>
                <Button variant="info" id="button-addon2" onClick={() => { setsearchquery(""); setUserData(""); setInterns("") }} value="searchq">
                  Clear
                </Button>
              </InputGroup>
            </Form>
          </Col>
        </Row>

      </Container>


      <Container style={{ marginTop: '48px' }}>
        {!UserData && (
          <>
            <Col md={8} lg={12} xs={12} >
              <h1><b>Students</b></h1>
              <div className="border border-2 border-primary"></div>
              <br />
              <div>
                {AllUser && AllUser.length > 0 && (
                  <div className='row mx-md-n5 gy-4'>
                    {AllUser.map(auser => (
                      <Col lg={4}>
                        <div className='card shadow'>
                          <div className='card-body'>
                            <h4 className="card-title">
                              <b>{auser.stuname}</b>
                            </h4>
                            <div className="btn btn-primary" onClick={() => { setsearchquery(auser.stuname); }}>view</div>
                          </div>
                        </div>
                      </Col>
                    ))}
                  </div>
                )}
              </div>
            </Col>
          </>
        )}
      </Container>


      <Container>
        <Col md={8} lg={12} xs={12}>
          {UserData && (<h1><b>User</b></h1>)}
          {UserData && (
            <div className='card shadow'>
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
          }


        </Col>
      </Container>

      <br /><br /><br />

      <Container>

        <Col md={8} lg={12} xs={12}>
          {UserData && (<h1><b>Completed Internships</b></h1>)}
        </Col>
        {UserData && (<div className="border border-2 border-primary"></div>)}
        <br />
        <div>
          {Interns.length > 0 && (
            <ul className='list-unstyled'>
              {Interns.map(intern => (
                <li><div className="card shadow">

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
                  </div>
                </div>
                  <br /></li>
              ))}
            </ul>
          )}
        </div>
      </Container>

    </div>
  );
}

export default App;
