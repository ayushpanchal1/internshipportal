import { Col, Row, Container, Button, Form, InputGroup } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { delMyAnnouncementsTeacher } from "../../../services/TeacherServices";
import { getAnnouncements } from "../../../services/Services";

function Announcementsication() {
  const [Announcements, setAnnouncements] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAnnouncements, setFilteredAnnouncements] = useState([]);

  useEffect(() => {
    getAnnouncements(setAnnouncements);
  }, []);

  const handleDelete = async (id) => {
    try {
      await delMyAnnouncementsTeacher(setAnnouncements, id);
      await getAnnouncements(setAnnouncements);
    } catch (error) {
      alert(`Error deleting Announcementsication: ${error}`);
    }
  };

  const handleSearch = () => {
    const newFilteredAnnouncements = Announcements.filter(Announcements => {
      return (
        Announcements.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        Announcements.lastname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        Announcements.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        Announcements.info.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
    setFilteredAnnouncements(newFilteredAnnouncements);
  };

  const handleClear = () => {
    setSearchQuery('');
    setFilteredAnnouncements([]);
  };

  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

  return (
    <Container style={{ marginTop: '100px' }}>
      <Row className="d-flex">
        <Col md={8} lg={12} xs={12}>
          <InputGroup className="d-flex mb-3 justify-content-end">
            <Form.Control
              type="text"
              placeholder="Search..."
              className="form-control shadow"
              style={{ maxWidth: "300px" }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button variant="primary" className="shadow" style={{height:"40px"}} onClick={handleSearch}>Search</Button>
            <Button variant="primary" className="shadow" style={{height:"40px"}} onClick={handleClear}>Clear</Button>
          </InputGroup>
          <div>
            {(filteredAnnouncements.length > 0 ? filteredAnnouncements : Announcements).map(Announcements => (
              <div key={Announcements._id} className="card shadow mb-3">
                <div className="border border-2 border-primary"></div>
                <div className="card-header">
                  Post by {Announcements.firstname} {Announcements.lastname}
                </div>
                <div className="card-body">
                  <h3 className="card-title"><b>{Announcements.title}</b></h3>
                  <p className="card-text">{Announcements.info}</p>
                  <a href={Announcements.link} className="btn btn-primary">Learn More</a>
                  {localStorage.getItem('SessionEmail') === Announcements.email && (
                    <Button  className="ms-2 btn btn-primary" onClick={() => handleDelete(Announcements._id)}>Delete</Button>
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

export default Announcementsication;



// import { Col, Row, Container, Button, Form } from "react-bootstrap";
// import { useState, useEffect } from 'react';
// import { delMyAnnouncementsTeacher } from "../../../services/TeacherServices";
// import { getAnnouncements } from "../../../services/Services";

// function Announcementsication() {
//   const [Announcements, setAnnouncements] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filteredAnnouncements, setFilteredAnnouncements] = useState([]);

//   useEffect(() => {
//     getAnnouncements(setAnnouncements);
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       await delMyAnnouncementsTeacher(setAnnouncements, id);
//     } catch (error) {
//       alert(`Error deleting Announcementsication: ${error}`);
//     }
//   };

//   const handleSearch = () => {
//     const newFilteredAnnouncements = Announcements.filter(Announcements => {
//       return (
//         Announcements.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         Announcements.lastname.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         Announcements.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         Announcements.info.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     });
//     setFilteredAnnouncements(newFilteredAnnouncements);
//   };

//   const handleClear = () => {
//     setSearchQuery('');
//     setFilteredAnnouncements([]);
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
//             {(filteredAnnouncements.length > 0 ? filteredAnnouncements : Announcements).map(Announcements => (
//               <div key={Announcements._id} className="card shadow mb-3">
//                 <div className="border border-2 border-primary"></div>
//                 <div className="card-header">
//                   Post by {Announcements.firstname} {Announcements.lastname}
//                 </div>
//                 <div className="card-body">
//                   <h3 className="card-title"><b>{Announcements.title}</b></h3>
//                   <p className="card-text">{Announcements.info}</p>
//                   <a href={Announcements.link} className="btn btn-primary">Learn More</a>
//                   {localStorage.getItem('SessionEmail') === Announcements.email && (
//                     <Button variant="danger" className="ms-2" onClick={() => handleDelete(Announcements._id)}>Delete</Button>
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

// export default Announcementsication;
