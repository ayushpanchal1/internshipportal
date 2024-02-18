import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

function SignupForm() {
    const [FirstName, setFirstName] = useState('')
    const [LastName, setLastName] = useState('')
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [AcademicYear, setAcademicYear] = useState('')
    const [MotherName, setMotherName] = useState('')
    const [FatherName, setFatherName] = useState('')
    const [MobileNo, setMobileNo] = useState('')

    const navigate = useNavigate();


    async function registerUser(event) {
        event.preventDefault()
        const stuname = `${FirstName} ${LastName}`

        const response = await fetch('http://localhost:1337/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                stuname,
                FirstName,
                LastName,
                AcademicYear,
                MotherName,
                FatherName,
                MobileNo,
                Email,
                Password,
            }),
        })

        const data = await response.json()

        if (data.error) {
            alert("Error Signing up!")
        } else {
            alert("Sign up complete! Please log in")
            navigate("/login")
        }

        console.log(data)
    }

    return (
        <div>
            <Container style={{marginTop: '100px'}}>
                <Row className="vh-100 d-flex justify-content-center align-items-center">
                    <Col md={8} lg={6} xs={12}>
                        <div className="border border-2 border-primary"></div>
                        <Card className="shadow px-4">
                            <Card.Body>
                                <div className="mb-3 mt-md-4">
                                    <h2 className="fw-bold mb-2 text-center text-uppercase ">Sign Up</h2>
                                    <div className="mb-3">
                                        <Form onSubmit={registerUser}>
                                            <Form.Group className="mb-3" controlId="FirstName">
                                                <Form.Label className="text-center">
                                                    First Name
                                                </Form.Label>
                                                <Form.Control value={FirstName} onChange={(e) => setFirstName(e.target.value)} type="text" placeholder="Enter First Name" />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="LastName">
                                                <Form.Label className="text-center">
                                                    Last Name
                                                </Form.Label>
                                                <Form.Control value={LastName} onChange={(e) => setLastName(e.target.value)} type="text" placeholder="Enter Last Name" />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="AcademicYear">
                                                <Form.Label className="text-center">
                                                    Academic Year
                                                </Form.Label>
                                                <Form.Select value={AcademicYear} type="text">
                                                    <option value="invalid" onClick={(e) => setAcademicYear("")}>Pick Your Current Academic Year</option>
                                                    <option value="First Year" onClick={(e) => setAcademicYear(e.target.value)}>First Year</option>
                                                    <option value="Second Year" onClick={(e) => setAcademicYear(e.target.value)}>Second Year</option>
                                                    <option value="Third Year" onClick={(e) => setAcademicYear(e.target.value)}>Third Year</option>
                                                    <option value="Fourth Year" onClick={(e) => setAcademicYear(e.target.value)}>Fourth Year</option>
                                                </Form.Select>
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="MotherName">
                                                <Form.Label className="text-center">
                                                    Mother's Name
                                                </Form.Label>
                                                <Form.Control value={MotherName} onChange={(e) => setMotherName(e.target.value)} type="text" placeholder="Enter Your Mother's Name" />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="FatherName">
                                                <Form.Label className="text-center">
                                                    Father's Name
                                                </Form.Label>
                                                <Form.Control value={FatherName} onChange={(e) => setFatherName(e.target.value)} type="text" placeholder="Enter Your Father's Name" />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="MobileNo">
                                                <Form.Label className="text-center">
                                                    Phone Number
                                                </Form.Label>
                                                <Form.Control value={MobileNo} onChange={(e) => setMobileNo(e.target.value)} type="tel" placeholder="Enter Your Phone Number" />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="Email">
                                                <Form.Label className="text-center">
                                                    Email address
                                                </Form.Label>
                                                <Form.Control value={Email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" />
                                            </Form.Group>

                                            <Form.Group
                                                className="mb-3"
                                                controlId="formBasicPassword"
                                            >
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control value={Password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
                                            </Form.Group>
                                            <Form.Group
                                                className="mb-3"
                                                controlId="formBasicCheckbox"
                                            >
                                            </Form.Group>
                                            <div className="d-grid">
                                                <Button variant="primary" value="CreateAccount" type="submit">
                                                    Create Account
                                                </Button>
                                            </div>
                                        </Form>
                                        <div className="mt-3">
                                            <p className="mb-0  text-center">
                                                Already have an account?{" "}
                                                <Link to={"/Login"} className="text-primary fw-bold">
                                                    Log In
                                                </Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card> <br /><br />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default SignupForm;