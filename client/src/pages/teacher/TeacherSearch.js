import React, { useState, useEffect } from 'react';
import { Col, Button, Row, Container, Form, InputGroup, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSignOut } from 'react-auth-kit';
import { useAuthUser } from 'react-auth-kit';
import CNavbar from '../common/components/CNavbar';
import { logout } from '../../services/Services';
import { getAllStudentsForTeacher, getAStudentforTeacher } from '../../services/TeacherServices';

function TeacherSearch() {
  const auth = useAuthUser();
  const Session = auth().session;
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [userData, setUserData] = useState(null);
  const [interns, setInterns] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [allUser, setAllUser] = useState(null);
  const [expandedCardIndex, setExpandedCardIndex] = useState(null);

  const signOut = useSignOut();
  const navigate = useNavigate();

  useEffect(() => {
    getAllStudentsForTeacher(setAllUser);
    if (Session === 'user') {
      logout(navigate, signOut);
    }
  }, []);

  const handleOnExpand = async (id) => {
    setSelectedStudentId(id);
    navigate(`/teacher/TeacherSearch/StudentInfo/${id}`);
  };

  useEffect(() => {
    if (selectedStudentId) {
      getAStudentforTeacher(setUserData, setInterns, selectedStudentId);
    }
  }, [selectedStudentId]);

  function handleClear() {
    setSearchQuery('');
    setUserData(null);
    setInterns(null);
    getAllStudentsForTeacher(setAllUser);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const lowercaseSearchQuery = searchQuery.toLowerCase();
    const filteredUsers = allUser.filter((user) => {
      const firstName = user.firstname ? user.firstname.toLowerCase() : '';
      const lastName = user.lastname ? user.lastname.toLowerCase() : '';
      const stuname = user.stuname ? user.stuname.toLowerCase() : '';
      return (
        firstName.includes(lowercaseSearchQuery) ||
        lastName.includes(lowercaseSearchQuery) ||
        stuname.includes(lowercaseSearchQuery)
      );
    });
    setAllUser(filteredUsers);
    if (filteredUsers.length === 1) {
      const index = allUser.findIndex((user) => user.id === filteredUsers[0].id);
      setExpandedCardIndex(index);
    } else {
      setExpandedCardIndex(null);
    }
  }

  return (
    <div>
      <CNavbar />

      <Container style={{ marginTop: '100px' }}>
        <Row className='d-flex justify-content-center align-items-center'>
          <Col md={8} lg={6} xs={12}>
            <Form onSubmit={handleSubmit}>
              <InputGroup className='mb-3 shadow'>
                <Form.Control
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  type='text'
                  placeholder='Search'
                  aria-label='Search'
                  aria-describedby='basic-addon2'
                />
                <Button
                  variant='primary'
                  id='button-addon2'
                  value='search'
                  type='submit'
                  style={{ marginRight: '2px' }}
                >
                  Search
                </Button>
                <Button
                  variant='info'
                  id='button-addon2'
                  onClick={handleClear}
                  value='clear'
                >
                  Clear
                </Button>
              </InputGroup>
            </Form>
          </Col>
        </Row>
      </Container>

      <Container style={{ marginTop: '48px' }}>
        {!userData && (
          <>
            <Col md={8} lg={12} xs={12}>
              <h1>
                <b>Students</b>
              </h1>
              <div className='border border-2 border-primary'></div>
              <br />
              <div className='row mx-md-n5 gy-4'>
                {allUser &&
                  allUser.length > 0 &&
                  allUser.map((filteredUser, index) => (
                    <Col
                      lg={expandedCardIndex === index ? 12 : 4}
                      key={filteredUser.id}
                    >
                      <div className='card shadow'>
                        {expandedCardIndex === index && (
                          <div className='card-body'>
                            <h4>
                              {filteredUser.firstname} {filteredUser.lastname}
                            </h4>
                            <dl>
                              <dt>Father's Name:</dt>
                              <dd>{filteredUser.fathername}</dd>
                              <dt>Mother's Name:</dt>
                              <dd>{filteredUser.mothername}</dd>
                              <dt>Email:</dt>
                              <dd>{filteredUser.email}</dd>
                              <dt>Mobile Number:</dt>
                              <dd>{filteredUser.mobileno}</dd>
                              <dt>Academic Year:</dt>
                              <dd>{filteredUser.academicyear}</dd>
                            </dl>
                            <div className='d-flex justify-content-end'>
                              <Button
                                className='btn btn-primary'
                                onClick={() => setExpandedCardIndex(null)}
                              >
                                Close
                              </Button>
                            </div>
                          </div>
                        )}
                        {expandedCardIndex !== index && (
                          <div className='card-body'>
                            <h4 className='card-title'>
                              <b>{filteredUser.stuname}</b>
                            </h4>
                            <div className='details'>
                              <div>
                                Gender: <span>{filteredUser.gender}</span>
                              </div>
                              <div>
                                Academic Year:{' '}
                                <span>{filteredUser.academicyear}</span>
                              </div>
                              <div>
                                Division: <span>{filteredUser.division}</span>
                              </div>
                              <div>
                                Class Teacher:{' '}
                                <span>{filteredUser.classteacher}</span>
                              </div>
                              <div>
                                HOD: <span>{filteredUser.hod}</span>
                              </div>
                            </div>
                            <div className='d-flex justify-content-end'>
                              <Button
                                variant='primary'
                                onClick={() => handleOnExpand(filteredUser._id)}
                              >
                                View
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </Col>
                  ))}
              </div>
            </Col>
          </>
        )}

        {userData && (
          <Col md={8} lg={12} xs={12}>
            <h1>
              <b>Student Profile</b>
            </h1>
            <Card className="shadow">
              <Row style={{ marginTop: '18px', marginBottom: '18px' }}>
                <Col md={3} className="d-flex justify-content-center">
                  <br />
                  <img className="media-object mw150" width="256" src={userData.profilePicUrl} alt="Profile" />
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
                      {/* Add other student profile fields here */}
                    </Col>
                    <Col md={6}>
                      {/* Display additional profile information */}
                    </Col>
                  </Row>
                  <br />
                </Col>
              </Row>
            </Card>
          </Col>
        )}
      </Container>
    </div>
  );
}

export default TeacherSearch;
