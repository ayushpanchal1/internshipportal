// import { Col, Container, Card, Row, ButtonGroup, Image } from "react-bootstrap";
// import { useState, useEffect } from "react";
// import { getUserData } from "../../../services/Services";
// import UploadProfilePicture from "../../common/components/UploadProfilePic";
// import DeleteProfilePicture from "../../common/components/DeleteProfilePicture";
// import UploadSignImage from "./TeacherSign";
// import ResetPassword from '../../common/components/ResetPassword';

// function TeacherProfile() {
//   const [UserData, setUserData] = useState("");

//   useEffect(() => {
//     //Runs on every render
//     getUserData(setUserData);
//   }, []);

//   return (
//     <Container style={{ marginTop: "100px" }}>
//       <Row>
//         <Col>
//           <Card className="shadow">
//             <Row style={{ marginTop: "18px", marginBottom: "18px" }}>
//               <Col md={3} className="d-flex justify-content-center">
//                 <br />
//                 {/* <img
//                   className="media-object mw150"
//                   width="256"
//                   src={`${process.env.REACT_APP_BACKEND_ADDRESS}/api/fetchprofilepicture/${UserData._id}`}
//                 /> */}
//                 <Image width="256" src={`${process.env.REACT_APP_BACKEND_ADDRESS}/api/fetchprofilepicture/${UserData._id}`} rounded/>
//               </Col>
//               <Col md={9} style={{ paddingLeft: "26px" }}>
//                 <br />
//                 <h1>
//                   <b>
//                     {UserData.firstname} {UserData.lastname}
//                   </b>
//                 </h1>
//                 <br />
//                 <Row>
//                   <Col md={6}>
//                     <h4>First Name: {UserData.firstname}</h4>
//                     <h4>Gender: {UserData.gender} </h4>
//                     <h4>Department: {UserData.department}</h4>
                    
//                   </Col>
//                   <Col md={6}>
//                     <h4>Last Name: {UserData.lastname}</h4>
//                     <h4>Email: {UserData.email}</h4>
//                     <h4>Domain: {UserData.domain} </h4>
//                   </Col>
//                 </Row>
//                 <br />
//                 {/* <div className="d-flex">
//                   <div> <UploadProfilePicture /></div>
//                   <div><DeleteProfilePicture /></div>
//                   <div><UploadSignImage /></div>
//                   <div><ResetPassword /></div>
//                 </div> */}

//                 <Row>
//                   <Col xs={6}>
//                     <ButtonGroup className="d-flex flex-column gap-2">
//                       <UploadProfilePicture />
//                       <UploadSignImage />
//                     </ButtonGroup>
//                   </Col>
//                   <Col xs={6}>
//                     <ButtonGroup className="d-flex flex-column gap-2">
//                       <DeleteProfilePicture />
//                       <ResetPassword />
//                     </ButtonGroup>
//                   </Col>
//                 </Row>

//               </Col>
//             </Row>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// }

// export default TeacherProfile;


// TeacherProfile.js

import { Col, Container, Card, Row, ButtonGroup, Image, Spinner, Placeholder } from "react-bootstrap";
import { useState, useEffect } from "react";
import { getUserData } from "../../../services/Services";
import UploadProfilePicture from "../../common/components/UploadProfilePic";
import DeleteProfilePicture from "../../common/components/DeleteProfilePicture";
import UploadSignImage from "./TeacherSign";
import ResetPassword from '../../common/components/ResetPassword';

function TeacherProfile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserData(setUserData)
    .then(() => setLoading(false));
  }, []);

  return (
    <Container style={{ marginTop: "100px" }}>
      <Row>
        <Col>
          <Card className="shadow">
            <Row style={{ marginTop: "18px", marginBottom: "18px" }}>
              <Col md={3} className="d-flex justify-content-center">
                <br />
                {loading ? (
                  <Spinner animation="border" variant="primary" />
                ) : (
                  <Image width="256" src={`${process.env.REACT_APP_BACKEND_ADDRESS}/api/fetchprofilepicture/${userData._id}`} rounded/>
                )}
              </Col>
              <Col md={9} style={{ paddingLeft: "26px" }}>
                <br />
                {loading ? (
                        <Placeholder as="p" animation="glow">
                        <Placeholder md={6} />
                        <Placeholder md={8} />
                        <Placeholder md={10} />
                      </Placeholder>
                ) : (
                  <>
                    <h1>
                      <b>
                        {userData.firstname} {userData.lastname}
                      </b>
                    </h1>
                    <br />
                    <Row>
                      <Col md={6}>
                        <h4>First Name: {userData.firstname}</h4>
                        <h4>Gender: {userData.gender} </h4>
                        <h4>Department: {userData.department}</h4>
                      </Col>
                      <Col md={6}>
                        <h4>Last Name: {userData.lastname}</h4>
                        <h4>Email: {userData.email}</h4>
                        <h4>Domain: {userData.domain} </h4>
                      </Col>
                    </Row>
                    <br />
                    <Row>
                      <Col xs={6}>
                        <ButtonGroup className="d-flex flex-column gap-2">
                          <UploadProfilePicture />
                          <UploadSignImage />
                        </ButtonGroup>
                      </Col>
                      <Col xs={6}>
                        <ButtonGroup className="d-flex flex-column gap-2">
                          <DeleteProfilePicture />
                          <ResetPassword />
                        </ButtonGroup>
                      </Col>
                    </Row>
                  </>
                )}
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default TeacherProfile;
