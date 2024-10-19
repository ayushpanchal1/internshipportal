import React, { useState } from 'react';
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import { addRequestStudent } from '../../../services/StudentServices';

function AddRequestForm() {
  const [whatfor, setWhatfor] = useState('');
  const [companyname, setCompanyname] = useState('');
  const [companyaddress, setCompanyaddress] = useState('');
  const [fromduration, setFromduration] = useState('');
  const [toduration, setToduration] = useState('');
  const [domain, setDomain] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const requestBody = {
      whatfor,
      companyname,
      companyaddress,
      fromduration,
      toduration,
      domain,
    };
    addRequestStudent(requestBody);
  }

  return (
    <Container style={{ marginTop: '50px' }}>
      <Row className="vh-100 d-flex justify-content-center align-items-center">
        <Col md={8} lg={10} xs={12}>
          <div className="border border-2 border-primary"></div>
          <Card className="shadow px-4">
            <Card.Body>
              <div className="mb-3 mt-md-4">
                <h2 className="fw-bold mb-2 text-center text-uppercase ">
                  Enter details to request approval for an internship
                </h2>
                <div className="mb-3">
                  <Form onSubmit={handleSubmit}>
                    <br />

                    <Form.Group className="mb-3" controlId="companyname">
                      <Form.Label className="text-center">Who is providing the internship?</Form.Label>
                      <Form.Control
                        value={companyname}
                        onChange={(e) => setCompanyname(e.target.value)}
                        type="text"
                        placeholder="i.e. Name of Company, Person, University, Institution etc."
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="companyaddress">
                      <Form.Label className="text-center">Address</Form.Label>
                      <Form.Control
                        value={companyaddress}
                        onChange={(e) => setCompanyaddress(e.target.value)}
                        type="text"
                        placeholder="Enter the address of said Company, Person, University, Institution etc."
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="fromduration">
                      <Row>
                        <Col>
                          <Form.Label className="text-center">From</Form.Label>
                          <Form.Control
                            value={fromduration}
                            onChange={(e) => setFromduration(e.target.value)}
                            type="date"
                            placeholder="Enter From Duration"
                          />
                        </Col>
                        <Col>
                          <Form.Label className="text-center">To</Form.Label>
                          <Form.Control
                            value={toduration}
                            onChange={(e) => setToduration(e.target.value)}
                            type="date"
                            placeholder="Enter To Duration"
                          />
                        </Col>
                      </Row>
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="whatfor">
                      <Form.Label className="text-center">What is the internship about?</Form.Label>
                      <Form.Control
                        value={whatfor}
                        onChange={(e) => setWhatfor(e.target.value)}
                        type="text"
                        placeholder="ex. Creating an internship portal"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="domain">
                      <Form.Label className="text-center">What is the domain of the internship?</Form.Label>
                      <Form.Control
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        type="text"
                        placeholder="ex. Web Development, IOT, etc."
                      />
                    </Form.Group>

                    <div className="d-grid">
                      <Button variant="primary" value="submitapproval" type="submit">
                        Submit Approval Request
                      </Button>
                    </div>
                  </Form>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AddRequestForm;
