import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

function SignupForm() {
    const [fname, setfname] = useState('')
    const [lname, setlname] = useState('')
    const [gender, setgender] = useState('')
    const [seatno, setseatno] = useState('')
    const [academic, setacademic] = useState('')
    const [department, setdepartment] = useState('')
    const [semester, setsemester] = useState('')
    const [division, setdivision] = useState('')
    const [classteacher, setclassteacher] = useState('')
    const [hod, sethod] = useState('')
    const [address, setaddress] = useState('')
    const [mothername, setmothername] = useState('')
    const [fathername, setfathername] = useState('')
    const [mobileno, setmobileno] = useState('')
    const [dateofbirth, setdateofbirth]  = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')

    const navigate = useNavigate();


    async function registerUser(event) {
        event.preventDefault()
        const stuname = `${fname} ${lname}`

        const response = await fetch('http://localhost:1337/api/studentsignup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fname,
                lname,
                gender,
                seatno,
                academic,
                department,
                semester,
                division,
                classteacher,
                hod,
                address,
                mothername,
                fathername,
                mobileno,
                dateofbirth,
                email,
                password,
            }),
        })

        const data = await response.json()

        if (data.error) {
            alert(`Error Signing up! ${data.error}`)
        } else {
            alert(`Sign up complete! Please log in`)
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
                                            <Form.Group className="mb-3" controlId="fname">
                                                <Form.Label className="text-center">
                                                    First Name
                                                </Form.Label>
                                                <Form.Control value={fname} onChange={(e) => setfname(e.target.value)} type="text" placeholder="Enter First Name" />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="lname">
                                                <Form.Label className="text-center">
                                                    Last Name
                                                </Form.Label>
                                                <Form.Control value={lname} onChange={(e) => setlname(e.target.value)} type="text" placeholder="Enter Last Name" />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="gender">
                                                <Form.Label className="text-center">
                                                    Gender
                                                </Form.Label>
                                                <Form.Select value={gender} type="text">
                                                    <option value="invalid" onClick={(e) => setgender("")}>Select your gender</option>
                                                    <option value="male" onClick={(e) => setgender(e.target.value)}>Male</option>
                                                    <option value="female" onClick={(e) => setgender(e.target.value)}>Female</option>
                                                    <option value="other" onClick={(e) => setgender(e.target.value)}>Other</option>
                                                </Form.Select>
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="seatno">
                                                <Form.Label className="text-center">
                                                    Seat No
                                                </Form.Label>
                                                <Form.Control value={seatno} onChange={(e) => setseatno(e.target.value)} type="number" placeholder="Enter Seat No" />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="academic">
                                                <Form.Label className="text-center">
                                                    Academic Year
                                                </Form.Label>
                                                <Form.Select value={academic} type="text">
                                                    <option value="invalid" onClick={(e) => setacademic("")}>Pick Your Current Academic Year</option>
                                                    <option value="1" onClick={(e) => setacademic(e.target.value)}>First Year</option>
                                                    <option value="2" onClick={(e) => setacademic(e.target.value)}>Second Year</option>
                                                    <option value="3" onClick={(e) => setacademic(e.target.value)}>Third Year</option>
                                                    <option value="4" onClick={(e) => setacademic(e.target.value)}>Fourth Year</option>
                                                </Form.Select>
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="semester">
                                                <Form.Label className="text-center">
                                                    Semester
                                                </Form.Label>
                                                <Form.Select value={semester} type="number">
                                                    <option value="invalid" onClick={(e) => setsemester("")}>Pick Your Semester</option>
                                                    <option value="1" onClick={(e) => setsemester(e.target.value)}>1</option>
                                                    <option value="2" onClick={(e) => setsemester(e.target.value)}>2</option>
                                                    <option value="3" onClick={(e) => setsemester(e.target.value)}>3</option>
                                                    <option value="4" onClick={(e) => setsemester(e.target.value)}>4</option>
                                                    <option value="5" onClick={(e) => setsemester(e.target.value)}>5</option>
                                                    <option value="4" onClick={(e) => setsemester(e.target.value)}>6</option>
                                                    <option value="4" onClick={(e) => setsemester(e.target.value)}>7</option>
                                                    <option value="4" onClick={(e) => setsemester(e.target.value)}>8</option>
                                                </Form.Select>
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="department">
                                                <Form.Label className="text-center">
                                                    Department
                                                </Form.Label>
                                                <Form.Select value={department} type="text">
                                                    <option value="invalid" onClick={(e) => setdepartment("")}>Pick Your Department</option>
                                                    <option value="Computer Science" onClick={(e) => setdepartment(e.target.value)}>Computer Science</option>
                                                    <option value="Information Technology" onClick={(e) => setdepartment(e.target.value)}>Information Technology</option>
                                                    <option value="Artificial Intelligence and Data Science" onClick={(e) => setdepartment(e.target.value)}>Artificial Intelligence and Data Science</option>
                                                    <option value="Electronics And Telecommunications" onClick={(e) => setdepartment(e.target.value)}>Electronics And Telecommunications</option>
                                                </Form.Select>
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="division">
                                                <Form.Label className="text-center">
                                                    Division
                                                </Form.Label>
                                                <Form.Select value={division} type="text">
                                                    <option value="invalid" onClick={(e) => setdivision("")}>Pick Your Division</option>
                                                    <option value="A" onClick={(e) => setdivision(e.target.value)}>A</option>
                                                    <option value="B" onClick={(e) => setdivision(e.target.value)}>B</option>
                                                </Form.Select>
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="classteacher">
                                                <Form.Label className="text-center">
                                                    Class Teacher
                                                </Form.Label>
                                                <Form.Control value={classteacher} onChange={(e) => setclassteacher(e.target.value)} type="text" placeholder="Enter Class Teacher Name" />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="hod">
                                                <Form.Label className="text-center">
                                                    Head Of Department
                                                </Form.Label>
                                                <Form.Control value={hod} onChange={(e) => sethod(e.target.value)} type="text" placeholder="Enter Head of Department Name" />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="address">
                                                <Form.Label className="text-center">
                                                    Address
                                                </Form.Label>
                                                <Form.Control value={address} onChange={(e) => setaddress(e.target.value)} type="text" placeholder="Enter Address" />
                                            </Form.Group>
                                            
                                            <Form.Group className="mb-3" controlId="mothername">
                                                <Form.Label className="text-center">
                                                    Mother's Name
                                                </Form.Label>
                                                <Form.Control value={mothername} onChange={(e) => setmothername(e.target.value)} type="text" placeholder="Enter Your Mother's Name" />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="fathername">
                                                <Form.Label className="text-center">
                                                    Father's Name
                                                </Form.Label>
                                                <Form.Control value={fathername} onChange={(e) => setfathername(e.target.value)} type="text" placeholder="Enter Your Father's Name" />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="mobileno">
                                                <Form.Label className="text-center">
                                                    Phone Number
                                                </Form.Label>
                                                <Form.Control value={mobileno} onChange={(e) => setmobileno(e.target.value)} type="tel" placeholder="Enter Your Phone Number" />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="dateofbirth">
                                                <Form.Label className="text-center">
                                                    Date of Birth
                                                </Form.Label>
                                                <Form.Control value={dateofbirth} onChange={(e) => setdateofbirth(e.target.value)} type="date" />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="email">
                                                <Form.Label className="text-center">
                                                    Email address
                                                </Form.Label>
                                                <Form.Control value={email} onChange={(e) => setemail(e.target.value)} type="email" placeholder="Enter email" />
                                            </Form.Group>

                                            <Form.Group
                                                className="mb-3"
                                                controlId="formBasicpassword"
                                            >
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control value={password} onChange={(e) => setpassword(e.target.value)} type="password" placeholder="password" />
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