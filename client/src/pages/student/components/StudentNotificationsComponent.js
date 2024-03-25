import { Col, Row, Container, Button } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { getMyNotificationsStudent } from "../../../services/StudentServices";
import { Link } from 'react-router-dom';

function StudentNotificationComponent() {
  const [Notifications, setNotifications] = useState([]);

  useEffect(() => {
    getMyNotificationsStudent(setNotifications);
  }, []);

  return (
    <Container style={{ marginTop: '100px' }}>
      <Row className="d-flex">
        <Col md={8} lg={12} xs={12}>
          <div>
            {(Notifications).map(notif => (
              <div key={notif._id} className="card shadow mb-3">
                <div className="border border-2 border-primary"></div>
                <div className="card-body">
                  <h3 className="card-title"><b>{notif.message}</b></h3>
                  <p className="card-text">Go to <b>"View Requests"</b> to check the updated status of your internship request</p>
                  <Link to="/student/StudentViewRequests">
                  <Button> Take me there</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default StudentNotificationComponent;



// import { Col, Row, Container, Button, Form } from "react-bootstrap";
// import { useState, useEffect } from 'react';
// import { delMyNotificationsTeacher } from "../../../services/TeacherServices";
// import { getNotifications } from "../../../services/Services";

// function Notification() {
//   const [Notifications, setNotifications] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filteredNotifications, setFilteredNotifications] = useState([]);

//   useEffect(() => {
//     getNotifications(setNotifications);
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       await delMyNotificationsTeacher(setNotifications, id);
//     } catch (error) {
//       alert(`Error deleting notification: ${error}`);
//     }
//   };

//   const handleSearch = () => {
//     const newFilteredNotifications = Notifications.filter(notif => {
//       return (
//         notif.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         notif.lastname.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         notif.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         notif.info.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     });
//     setFilteredNotifications(newFilteredNotifications);
//   };

//   const handleClear = () => {
//     setSearchQuery('');
//     setFilteredNotifications([]);
//   };

//   return (
//     <Container style={{ marginTop: '100px' }}>
//       <Row className="d-flex">
//         <Col md={8} lg={12} xs={12}>
//           <div className="d-flex justify-content-end">
//             <Form.Control
//               type="text"
//               placeholder="Search..."
//               className="mb-3"
//               style={{ width: "300px" }}
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//             <Button variant="primary" className="me-2" onClick={handleSearch}>Search</Button>
//             <Button variant="secondary" onClick={handleClear}>Clear</Button>
//           </div>
//           <div>
//             {(filteredNotifications.length > 0 ? filteredNotifications : Notifications).map(notif => (
//               <div key={notif._id} className="card shadow mb-3">
//                 <div className="border border-2 border-primary"></div>
//                 <div className="card-header">
//                   Post by {notif.firstname} {notif.lastname}
//                 </div>
//                 <div className="card-body">
//                   <h3 className="card-title"><b>{notif.title}</b></h3>
//                   <p className="card-text">{notif.info}</p>
//                   <a href={notif.link} className="btn btn-primary">Learn More</a>
//                   {localStorage.getItem('SessionEmail') === notif.email && (
//                     <Button variant="danger" className="ms-2" onClick={() => handleDelete(notif._id)}>Delete</Button>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </Col>
//       </Row>
//     </Container>
//   )
// }

// export default Notification;
