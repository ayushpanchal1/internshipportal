import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { useState } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSignIn } from 'react-auth-kit';

function LoginForm() {
    const signIn = useSignIn();
    const navigate = useNavigate();
    const location = useLocation();

    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')

    async function loginAdmin(event) {
        event.preventDefault()

        const response = await fetch('http://localhost:1337/api/adminlogin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Email,
                Password,
            }),
        })

        const data = await response.json()

        console.log(data)

        if (data.token !== false) {
            signIn({
                token: data.token,
                expiresIn: 3600,
                tokenType: "Bearer",
                authState: { email: Email, session: "admin" },
            });
            localStorage.setItem('SessionInfo', 'admin');
            localStorage.setItem('SessionEmail', Email);
            alert("Admin Log in successful")
            navigate("/admindashboard")
        } else {
            alert("Log in credentials are incorrect! Sign up if you do not have an account")
        }


    }

    async function loginUser(event) {
        event.preventDefault()

        const response = await fetch('http://localhost:1337/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Email,
                Password,
            }),
        })

        const data = await response.json()

        console.log(data)

        if (data.token !== false) {
            signIn({
                token: data.token,
                expiresIn: 3600,
                tokenType: "Bearer",
                authState: { email: Email, session: "user" },
            });
            localStorage.setItem('SessionInfo', 'user');
            localStorage.setItem('SessionEmail', Email);
            // alert("Log in successful")
            navigate("/dashboard")
        } else {
            alert("Log in credentials are incorrect! Sign up if you do not have an account")
        }


    }

    return (
        <div>
            <Container>
                <Row className="vh-100 d-flex justify-content-center align-items-center">
                    <Col md={8} lg={6} xs={12}>
                        <div className="border border-2 border-primary"></div>
                        <Card className="shadow px-4">
                            <Card.Body>
                                <div className="mb-3 mt-md-4">
                                    <h2 className="fw-bold mb-2 text-center text-uppercase ">
                                        {
                                            location.pathname === '/Login' ? (<div>Log in</div>) : (<div>Admin Log in</div>)
                                        }
                                    </h2>
                                    <div className="mb-3">
                                        <Form onSubmit={location.pathname === '/Login' ? loginUser : loginAdmin}>

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
                                                <Button variant="primary" value="Log in" type="submit">
                                                    Log In
                                                </Button>
                                            </div>
                                        </Form>
                                        {location.pathname === '/Login' ? (<div className="mt-3">
                                            <p className="mb-0  text-center">
                                                Don't have an account?{" "}
                                                <Link to={"/Signup"} className="text-primary fw-bold">
                                                    Sign Up
                                                </Link>
                                            </p>
                                        </div>) : (<div></div>)}
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default LoginForm;