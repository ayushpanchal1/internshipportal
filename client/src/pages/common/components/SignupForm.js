import { Col, Button, Row, Container, Card, Form, Modal } from "react-bootstrap";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerStudent } from "../../../services/StudentServices";
import { generateOTP } from "../../../services/Services";

function SignupForm() {
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [gender, setgender] = useState("");
  const [seatno, setseatno] = useState("");
  const [academic, setacademic] = useState("");
  const [department, setdepartment] = useState("");
  const [semester, setsemester] = useState("");
  const [division, setdivision] = useState("");
  const [classteacher, setclassteacher] = useState("");
  const [hod, sethod] = useState("");
  const [address, setaddress] = useState("");
  const [mothername, setmothername] = useState("");
  const [fathername, setfathername] = useState("");
  const [mobileno, setmobileno] = useState("");
  const [dateofbirth, setdateofbirth] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const navigate = useNavigate();

  const [showOTPModal, setShowOTPModal] = useState(false);
  const [otp, setOtp] = useState(""); // State to hold OTP input

  async function handleSubmit(event) {
    event.preventDefault();
    const requestBody = {
      email,
    }
    generateOTP(requestBody)
    setShowOTPModal(true)
  }


  async function handleModalSubmit(event) {
    event.preventDefault();
    const requestBody = {
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
      otp
    };

    registerStudent(requestBody, navigate);
  }

  return (
    <div>
      <Container style={{ marginTop: "100px" }}>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-2 border-primary"></div>
            <Card className="shadow px-4">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-center text-uppercase ">
                    Sign Up
                  </h2>
                  <div className="mb-3">
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3" controlId="fname">
                        <Form.Label className="text-center">
                          First Name
                        </Form.Label>
                        <Form.Control
                          value={fname}
                          onChange={(e) => setfname(e.target.value)}
                          type="text"
                          placeholder="Enter First Name"
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="lname">
                        <Form.Label className="text-center">
                          Last Name
                        </Form.Label>
                        <Form.Control
                          value={lname}
                          onChange={(e) => setlname(e.target.value)}
                          type="text"
                          placeholder="Enter Last Name"
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="gender">
                        <Form.Label className="text-center">Gender</Form.Label>
                        <Form.Select value={gender} type="text"
                        onChange={(e) => setgender(e.target.value)}
                        >
                          <option
                            value="invalid"
                           
                          >
                            Select your gender
                          </option>
                          <option
                            value="male"
                           
                          >
                            Male
                          </option>
                          <option
                            value="female"
                           
                          >
                            Female
                          </option>
                          <option
                            value="other"
                           
                          >
                            Other
                          </option>
                        </Form.Select>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="seatno">
                        <Form.Label className="text-center">Seat No</Form.Label>
                        <Form.Control
                          value={seatno}
                          onChange={(e) => setseatno(e.target.value)}
                          type="number"
                          placeholder="Enter Seat No"
                          style={{
                            WebkitAppearance: "none", // Remove arrow buttons in Firefox
                            MozAppearance: "textfield",
                          }}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="academic">
                        <Form.Label className="text-center">
                          Academic Year
                        </Form.Label>
                        <Form.Select
                          value={academic}
                          onChange={(e) => setacademic(e.target.value)}
                        >
                          <option value="invalid">
                            Pick Your Current Academic Year
                          </option>
                          <option value="1">First Year</option>
                          <option value="2">Second Year</option>
                          <option value="3">Third Year</option>
                          <option value="4">Fourth Year</option>
                        </Form.Select>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="semester">
                        <Form.Label className="text-center">
                          Semester
                        </Form.Label>
                        <Form.Select
                          value={semester}
                          onChange={(e) => setsemester(e.target.value)}
                        >
                          <option value="invalid">Pick Your Semester</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                        </Form.Select>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="department">
                        <Form.Label className="text-center">
                          Department
                        </Form.Label>
                        <Form.Select value={department} type="text"
                        onChange={(e) => setdepartment(e.target.value)}
                        >
                          <option
                            value="invalid"

                          >
                            Pick Your Department
                          </option>
                          <option
                            value="Computer Science"
                          >
                            Computer Science
                          </option>
                          <option
                            value="Information Technology"

                          >
                            Information Technology
                          </option>
                          <option
                            value="Artificial Intelligence and Data Science"

                          >
                            Artificial Intelligence and Data Science
                          </option>
                          <option
                            value="Electronics And Telecommunications"

                          >
                            Electronics And Telecommunications
                          </option>
                        </Form.Select>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="division">
                        <Form.Label className="text-center">
                          Division
                        </Form.Label>
                        <Form.Select value={division} type="text"
                        onChange={(e) => setdivision(e.target.value)}
                        >
                          <option
                            value="invalid"
                            onClick={(e) => setdivision("")}
                          >
                            Pick Your Division
                          </option>
                          <option
                            value="A"
                          >
                            A
                          </option>
                          <option
                            value="B"
                          >
                            B
                          </option>
                        </Form.Select>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="classteacher">
                        <Form.Label className="text-center">
                          Class Teacher
                        </Form.Label>
                        <Form.Control
                          value={classteacher}
                          onChange={(e) => setclassteacher(e.target.value)}
                          type="text"
                          placeholder="Enter Class Teacher Name"
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="hod">
                        <Form.Label className="text-center">
                          Head Of Department
                        </Form.Label>
                        <Form.Control
                          value={hod}
                          onChange={(e) => sethod(e.target.value)}
                          type="text"
                          placeholder="Enter Head of Department Name"
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="address">
                        <Form.Label className="text-center">Address</Form.Label>
                        <Form.Control
                          value={address}
                          onChange={(e) => setaddress(e.target.value)}
                          type="text"
                          placeholder="Enter Address"
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="mothername">
                        <Form.Label className="text-center">
                          Mother's Name
                        </Form.Label>
                        <Form.Control
                          value={mothername}
                          onChange={(e) => setmothername(e.target.value)}
                          type="text"
                          placeholder="Enter Your Mother's Name"
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="fathername">
                        <Form.Label className="text-center">
                          Father's Name
                        </Form.Label>
                        <Form.Control
                          value={fathername}
                          onChange={(e) => setfathername(e.target.value)}
                          type="text"
                          placeholder="Enter Your Father's Name"
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="mobileno">
                        <Form.Label className="text-center">
                          Phone Number
                        </Form.Label>
                        <Form.Control
                          value={mobileno}
                          onChange={(e) => setmobileno(e.target.value)}
                          type="tel"
                          pattern="[0-9]{10}"
                          placeholder="Enter Your Phone Number"
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="dateofbirth">
                        <Form.Label className="text-center">
                          Date of Birth
                        </Form.Label>
                        <Form.Control
                          value={dateofbirth}
                          onChange={(e) => setdateofbirth(e.target.value)}
                          type="date"
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="email">
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <Form.Control
                          value={email}
                          onChange={(e) => setemail(e.target.value)}
                          type="email"
                          placeholder="Enter email"
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicpassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          value={password}
                          onChange={(e) => setpassword(e.target.value)}
                          type="password"
                          placeholder="password"
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      ></Form.Group>
                      <div className="d-grid">
                        <Button
                          variant="primary"
                          value="CreateAccount"
                          type="submit"
                        >
                          Create Account
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Already have an account?{" "}
                        <Link to={"/student/StudentLogin"} className="text-primary fw-bold">
                          Log In
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>{" "}
            <br />
            <br />
          </Col>
        </Row>
      </Container>
      <Modal centered show={showOTPModal} onHide={() => setShowOTPModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Enter OTP</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowOTPModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleModalSubmit}>
            Submit OTP
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default SignupForm;
