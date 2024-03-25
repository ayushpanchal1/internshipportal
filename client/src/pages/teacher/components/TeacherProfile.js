import { Col, Container, Card, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import IMAGE from "../../../media/user.png";
import { getUserData } from "../../../services/Services";
import UploadProfilePicture from "../../common/components/UploadProfilePic";
import DeleteProfilePicture from "../../common/components/DeleteProfilePicture";
import UploadSignImage from "./TeacherSign";

function TeacherProfile() {
  const [UserData, setUserData] = useState("");

  useEffect(() => {
    //Runs on every render
    getUserData(setUserData);
  }, []);

  return (
    <Container style={{ marginTop: "100px" }}>
      <Row>
        <Col>
          <Card className="shadow">
            <Row style={{ marginTop: "18px", marginBottom: "18px" }}>
              <Col md={3} className="d-flex justify-content-center">
                <br />
                <img
                  className="media-object mw150"
                  width="256"
                  src={`${process.env.REACT_APP_BACKEND_ADDRESS}/api/fetchprofilepicture/${UserData._id}`}
                />
              </Col>
              <Col md={9} style={{ paddingLeft: "26px" }}>
                <br />
                <h1>
                  <b>
                    {UserData.firstname} {UserData.lastname}
                  </b>
                </h1>
                <br />
                <Row>
                  <Col md={6}>
                    <h4>First Name: {UserData.firstname}</h4>
                    <h4>Department: {UserData.department}</h4>
                  </Col>
                  <Col md={6}>
                    <h4>Last Name: {UserData.lastname}</h4>
                    <h4>Email: {UserData.email}</h4>
                  </Col>
                </Row>
                <br />
                <div className="d-flex">
                  <div> <UploadProfilePicture /></div>
                  <div><DeleteProfilePicture /></div>
                  <div><UploadSignImage /></div>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default TeacherProfile;
