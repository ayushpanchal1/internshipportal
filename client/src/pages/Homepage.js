
import React from 'react'
import { Col, Row, Container, Card } from "react-bootstrap";
import CNavbar from './components/CNavbar';


function App() {
  return (
    <div>
      <CNavbar />
      <Container style={{marginTop: '100px'}}>
        <Row className="d-flex justify-content-center align-items-center">
          <Col md={8} lg={10} xs={12}>
          <div className="border border-2 border-primary"></div>
            <Card className="shadow px-4">
              <h1><br/><b>Internship Management Portal</b></h1>
              <h2>
                By Ayush Panchal
                <br/><br/><br/>
              </h2>
              <h2>
                "Shape Your Future Today: Discover Transformative Internship Experiences!"
                <br/><br/>
              </h2>
              <p>Welcome to our dynamic internship website, where limitless possibilities await you! Unleash your potential and embark on a transformative journey towards your dream career. Our platform is designed to empower aspiring professionals like you, providing access to a diverse range of internships across industries. Whether you're a budding entrepreneur, a tech enthusiast, or a creative mind, we have the perfect opportunity to fuel your passion and expand your horizons. Join us today and unlock a world of invaluable experiences, mentorship, 
                and networking connections. Don't just dream about success – take the first step towards achieving it with our internship website.<br/></p>
              
              <p> made with 🖤</p>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
