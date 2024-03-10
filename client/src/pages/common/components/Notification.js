import { Col, Row, Container, Button, Form } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { delMyNotifsTeacher } from "../../../services/TeacherServices";
import { getNotifs } from "../../../services/Services";

function Notification() {
  const [Notifs, setNotifs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredNotifs, setFilteredNotifs] = useState([]);

  useEffect(() => {
    getNotifs(setNotifs);
  }, []);

  const handleDelete = async (id) => {
    try {
      await delMyNotifsTeacher(setNotifs, id);
    } catch (error) {
      alert(`Error deleting notification: ${error}`);
    }
  };

  const handleSearch = () => {
    const newFilteredNotifs = Notifs.filter(notif => {
      return (
        notif.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notif.lastname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notif.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notif.info.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
    setFilteredNotifs(newFilteredNotifs);
  };

  const handleClear = () => {
    setSearchQuery('');
    setFilteredNotifs([]);
  };

  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

  return (
    <Container style={{ marginTop: '100px' }}>
      <Row className="d-flex">
        <Col md={8} lg={12} xs={12}>
          <div className="d-flex justify-content-end">
            <Form.Control
              type="text"
              placeholder="Search..."
              className="mb-3 me-2"
              style={{ width: "300px" }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button variant="primary" className="me-1" style={{height:"40px"}} onClick={handleSearch}>Search</Button>
            <Button variant="primary" className="me-1" style={{height:"40px"}} onClick={handleClear}>Clear</Button>
          </div>
          <div>
            {(filteredNotifs.length > 0 ? filteredNotifs : Notifs).map(notif => (
              <div key={notif._id} className="card shadow mb-3">
                <div className="border border-2 border-primary"></div>
                <div className="card-header">
                  Post by {notif.firstname} {notif.lastname}
                </div>
                <div className="card-body">
                  <h3 className="card-title"><b>{notif.title}</b></h3>
                  <p className="card-text">{notif.info}</p>
                  <a href={notif.link} className="btn btn-primary">Learn More</a>
                  {localStorage.getItem('SessionEmail') === notif.email && (
                    <Button variant="danger" className="ms-2" onClick={() => handleDelete(notif._id)}>Delete</Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Notification;



// import { Col, Row, Container, Button, Form } from "react-bootstrap";
// import { useState, useEffect } from 'react';
// import { delMyNotifsTeacher } from "../../../services/TeacherServices";
// import { getNotifs } from "../../../services/Services";

// function Notification() {
//   const [Notifs, setNotifs] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filteredNotifs, setFilteredNotifs] = useState([]);

//   useEffect(() => {
//     getNotifs(setNotifs);
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       await delMyNotifsTeacher(setNotifs, id);
//     } catch (error) {
//       alert(`Error deleting notification: ${error}`);
//     }
//   };

//   const handleSearch = () => {
//     const newFilteredNotifs = Notifs.filter(notif => {
//       return (
//         notif.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         notif.lastname.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         notif.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         notif.info.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     });
//     setFilteredNotifs(newFilteredNotifs);
//   };

//   const handleClear = () => {
//     setSearchQuery('');
//     setFilteredNotifs([]);
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
//             {(filteredNotifs.length > 0 ? filteredNotifs : Notifs).map(notif => (
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
