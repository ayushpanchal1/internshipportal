import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSignIn } from "react-auth-kit";
import {
  googleLoginStudent,
  loginStudent,
} from "../../../services/StudentServices";
import {
  googleLoginTeacher,
  loginTeacher,
} from "../../../services/TeacherServices";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ResetPassword from "./ResetPassword";
import { GoogleLogin } from "@react-oauth/google";

function LoginForm() {
  const signIn = useSignIn();
  const navigate = useNavigate();
  const location = useLocation();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const requestBody = {
    email: Email,
    password: Password,
  };

  function handleSubmit(event) {
    event.preventDefault();
    if (location.pathname === "/student/StudentLogin") {
      loginStudent(requestBody, navigate, signIn, handleLoginError);
    } else {
      loginTeacher(requestBody, navigate, signIn, handleLoginError);
    }
  }

  function handleLoginError(error) {
    toast.error(error.message || "Login failed");
  }
  //   if (!Email.trim() || !Password.trim()) {
  //     toast.error("Email and password are required");
  //     return;
  //   }

  function responseMessage(response) {
    const googleToken = response.credential;
    // console.log(googleToken);
    const requestBody = { googleToken };
    // httpAxios.post("/api/studentlogin", { googleToken });

    if (location.pathname === "/student/StudentLogin") {
      googleLoginStudent(requestBody, navigate, signIn);
    } else {
      googleLoginTeacher(requestBody, navigate, signIn);
    }
  }

  function errorMessage(error) {
    console.log(error);
  }

  return (
    <div>
      <Container>
        <ToastContainer />
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-2 border-primary"></div>
            <Card className="shadow px-4">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-center text-uppercase ">
                    {location.pathname === "/student/StudentLogin" ? (
                      <div>Student Log in</div>
                    ) : (
                      <div>Teacher Log in</div>
                    )}
                  </h2>
                  <div className="mb-3">
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3" controlId="Email">
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <Form.Control
                          value={Email}
                          onChange={(e) => setEmail(e.target.value)}
                          type="email"
                          placeholder="Enter email"
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          value={Password}
                          onChange={(e) => setPassword(e.target.value)}
                          type="password"
                          placeholder="Password"
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      ></Form.Group>
                      <div className="d-grid">
                        <Button variant="primary" value="Log in" type="submit">
                          Log In
                        </Button>
                        <div className="mt-2 google-login-container">
                          <GoogleLogin
                            onSuccess={responseMessage}
                            onError={errorMessage}
                            width={250}
                          />
                        </div>
                      </div>
                    </Form>
                    <ResetPassword />
                    {location.pathname === "/student/StudentLogin" ? (
                      <div className="mt-3">
                        <p className="mb-0  text-center">
                          Don't have an account?{" "}
                          <Link to={"/Signup"} className="text-primary fw-bold">
                            Sign Up
                          </Link>
                        </p>
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default LoginForm;
