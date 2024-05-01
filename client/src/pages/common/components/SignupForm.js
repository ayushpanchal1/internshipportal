import { Col, Button, Row, Container, Card, Form, Modal } from "react-bootstrap";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerStudent } from "../../../services/StudentServices";
import { generateOTP } from "../../../services/Services";
import { toast } from "react-toastify";

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
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const [showOTPModal, setShowOTPModal] = useState(false);
  const [otp, setOtp] = useState(""); // State to hold OTP input

  const currentYear = new Date().getFullYear();
  const minYear = currentYear - 23; 
  const maxYear = currentYear - 17; 

  async function handleSubmit(event) {
    event.preventDefault();
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    const newErrors = {};
    if (!fname.trim()) {
      newErrors.fname = 'First Name is required.';
    }
  
    if (!lname.trim()) {
      newErrors.lname = 'Last Name is required.';
    }
  
    if (!gender.trim() || gender === 'invalid') {
      newErrors.gender = 'Gender is required.';
    }
  
    if (!academic.trim() || academic === 'invalid') {
      newErrors.academic = 'Academic Year is required.';
    }
  
    if (!department.trim() || department === 'invalid') {
      newErrors.department = 'Department is required.';
    }
  
    if (!semester.trim() || semester === 'invalid') {
      newErrors.semester = 'Semester is required.';
    }
  
    if (!classteacher.trim() || classteacher === 'invalid') {
      newErrors.classteacher = 'Class Teacher is required.';
    }
  
    if (!hod.trim() || hod === 'invalid') {
      newErrors.hod = 'Head of Department is required.';
    }
  
    if (!address.trim()) {
      newErrors.address = 'Address is required.';
    }
  
    if (!mothername.trim()) {
      newErrors.mothername = "Mother's First Name is required.";
    }
  
    if (!fathername.trim()) {
      newErrors.fathername = "Father's First Name is required.";
    }
  
    if (!mobileno.trim() || mobileno.length !== 10) {
      newErrors.mobileno = 'Phone number must be 10 digits long.';
    }
  
    if (!dateofbirth.trim() || dateofbirth > `${maxYear}-12-31` || dateofbirth < `${minYear}-01-01`) {
      newErrors.dateofbirth = 'Date of Birth is required and should be between 17 and 23 years.';
    }
  
    setErrors(newErrors);
  
    if (Object.keys(newErrors).length === 0) {
      const requestBody = { email };
      generateOTP(requestBody);
      setShowOTPModal(true);
    }
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
                         {errors.fname && <p className="text-danger">{errors.fname}</p>}
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
                         {errors.lname && <p className="text-danger">{errors.lname}</p>}
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
                        {errors.gender && <p className="text-danger">{errors.gender}</p>}
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="seatno">
                        <Form.Label className="text-center">College ID</Form.Label>
                        <Form.Control
                          value={seatno}
                          onChange={(e) => setseatno(e.target.value)}
                          type="number"
                          placeholder="Enter College ID (same as seen on SIMS)"
                          style={{
                            WebkitAppearance: "none", // Remove arrow buttons in Firefox
                            MozAppearance: "textfield",
                          }}
                        />
                           {errors.seatno && <p className="text-danger">{errors.seatno}</p>}
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
                        {errors.academic && <p className="text-danger">{errors.academic}</p>}
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
                        {errors.semester && <p className="text-danger">{errors.semester}</p>}
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
                        {errors.department && <p className="text-danger">{errors.department}</p>}
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
                        {errors.division && <p className="text-danger">{errors.division}</p>}
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="classteacher">
                        <Form.Label className="text-center">
                          Class Teacher
                        </Form.Label>
                        {/* <Form.Control
                          value={classteacher}
                          onChange={(e) => setclassteacher(e.target.value)}
                          type="text"
                          placeholder="Enter Class Teacher Name"
                        /> */}
                        <Form.Select value={classteacher} type="text"
                        onChange={(e) => setclassteacher(e.target.value)}
                        >
                          <option
                            value="invalid"
                            onClick={(e) => setclassteacher("")}
                          >
                            Select Your Class Teacher
                          </option>
                          <option
                            value="Vijaya Pinjarkar"
                          >
                            Vijaya Pinjarkar
                          </option>
                        </Form.Select>
                        {errors.classteacher && <p className="text-danger">{errors.classteacher}</p>}
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="hod">
                        <Form.Label className="text-center">
                          Head Of Department
                        </Form.Label>
                        {/* <Form.Control
                          value={hod}
                          onChange={(e) => sethod(e.target.value)}
                          type="text"
                          placeholder="Enter Head of Department Name"
                        /> */}
                        <Form.Select value={hod} type="text"
                        onChange={(e) => sethod(e.target.value)}
                        >
                          <option
                            value="invalid"
                            onClick={(e) => sethod("")}
                          >
                            Select Your Head Of Department
                          </option>
                          <option
                            value="Radhika Kotecha"
                          >
                            Radhika Kotecha
                          </option>
                        </Form.Select>
                        {errors.hod && <p className="text-danger">{errors.hod}</p>}
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="address">
                        <Form.Label className="text-center">Address</Form.Label>
                        <Form.Control
                          value={address}
                          onChange={(e) => setaddress(e.target.value)}
                          type="text"
                          placeholder="Enter Address"
                        />
                         {errors.address && <p className="text-danger">{errors.address}</p>}
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="mothername">
                        <Form.Label className="text-center">
                          Mother's First Name
                        </Form.Label>
                        <Form.Control
                          value={mothername}
                          onChange={(e) => setmothername(e.target.value)}
                          type="text"
                          placeholder="Enter only the First Name of your Mother"
                        />
                         {errors.mothername && <p className="text-danger">{errors.mothername}</p>}
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="fathername">
                        <Form.Label className="text-center">
                          Father's First Name
                        </Form.Label>
                        <Form.Control
                          value={fathername}
                          onChange={(e) => setfathername(e.target.value)}
                          type="text"
                          placeholder="Enter only the First Name of your Father"
                        />
                         {errors.fathername && <p className="text-danger">{errors.fathername}</p>}
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
                             {errors.mobile && <p className="text-danger">{errors.mobileno}</p>}
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="dateofbirth">
                        <Form.Label className="text-center">
                          Date of Birth
                        </Form.Label>
                        <Form.Control
                          value={dateofbirth}
                          onChange={(e) => setdateofbirth(e.target.value)}
                          type="date"
                          max={`${maxYear}-12-31`}
                          min={`${minYear}-01-01`}
                        />
                           {errors.dateofbirth && <p className="text-danger">{errors.dateofbirth}</p>}
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="email">
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <Form.Control
                          value={email}
                          onChange={(e) => setemail(e.target.value)}
                          type="email"
                          placeholder=" Email should have @somaiya.edu"
                        />
                           {errors.email && <p className="text-danger">{errors.email}</p>}
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
                          placeholder="Passord must have special-Char,upper,lower and 8 characters"
                        />
                           {errors.password && <p className="text-danger">{errors.password}</p>}
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
