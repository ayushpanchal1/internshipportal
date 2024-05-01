import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { useSignOut } from "react-auth-kit";
import { Container, Button, Modal, Form, FormLabel } from "react-bootstrap";
import { generateOTP, resetPassword } from "../../../services/Services";

function ResetPassword() {
    const signOut = useSignOut();
    const navigate = useNavigate();
    const location = useLocation();
    
    const Session = localStorage.getItem("SessionInfo");
    const SessionEmail = localStorage.getItem("SessionEmail");
    const [show, setShow] = useState(false);
    const [stage, setStage] = useState("");
    const [role , setUserRole] = useState("") // teacher or student
    const handleClose = () => {
        setShow(false);
        setPassword(null);
        setOtp(null);
        if (!Session) {
            setStage(1)
        } else {
            setStage(2)
        }
    }
    const handleShow = () => setShow(true);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    useEffect(() => {
        // -a
        // 1 to ask email, 2 to ask new pass, 3 to ask otp
        // stage 1 will skip if you can get email from login session
        // otp email req will be sent on stage 2 after email is obtained from stage 1
        // reset pass req will be sent after stage 3 
        if (!Session) {
            setStage(1)
            if (location.pathname === "/student/StudentLogin") {
                setUserRole("student")
              } else {
                setUserRole("teacher")
              }
        } else {
            setStage(2)
            if (Session === 'user') {
                setUserRole("student")
            } else {
                setUserRole("teacher")
            }
            setEmail(SessionEmail)
            // console.log("email in useEffect", email)
            handleStage()
        }
        // console.log(SessionEmail)
    }, [SessionEmail]);
    
    const handleStage = () => {
        if (stage === 1) {
            setStage(2)
        }  else if (stage === 2) {
            // console.log("email in handlestage func", email)
            var requestBody = {
                email,
              }
            generateOTP(requestBody)
            setStage(3)
        } else if (stage === 3) {
            var requestBody = {
                email,
                password,
                role,
                otp,
            }
            resetPassword(requestBody, navigate, signOut)
            handleClose()

        }
    }

    return (
        <Container>
            {
                !Session ? (
                    <div className="mt-3">
                        <p className="mb-0  text-center">
                            Forgot your password?{" "}
                            <span 
                            className="text-primary fw-bold" 
                            style={{ cursor: 'pointer', textDecoration: 'underline' }} 
                            onClick={() => handleShow()}
                            >
                                Reset password
                            </span>
                        </p>
                    </div>
                ) : (
                    <Button onClick={() => handleShow()} variant="info">
                        Reset Your Password
                    </Button>
                )
            }
            <Modal centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title style={{ color: "#802121" }}>Reset Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {stage === 1 && (
                        <>
                            <FormLabel>Email Address</FormLabel>
                            <Form.Control
                                type="text"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </>
                    )}
                    {stage === 2 && (
                        <>
                            <FormLabel>Password</FormLabel>
                            <Form.Control
                                type="password"
                                placeholder="Enter your new password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </>
                    )}
                    {stage === 3 && (
                        <>
                        <FormLabel>OTP</FormLabel>
                        <Form.Control
                            type="text"
                            placeholder="Enter the otp sent to your email"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleStage()}>
                        Submit
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default ResetPassword;