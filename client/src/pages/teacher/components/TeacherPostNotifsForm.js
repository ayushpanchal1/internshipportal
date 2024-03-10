import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { postNotifTeacher } from "../../../services/TeacherServices";

function TeacherPostNotifsForm() {
  const [Title, setTitle] = useState('')
  const [Info, setInfo] = useState('')
  const [iLink, setiLink] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const requestBody = {
      Title,
      Info,
      iLink,
    };
    postNotifTeacher(requestBody)
  }

  return (
    <Container style={{ marginTop: '48px' }}>
      <Row className="vh-100 d-flex justify-content-center align-items-center">
        <Col md={8} lg={10} xs={12}>
          <div className="border border-2 border-primary"></div>
          <Card className="shadow px-4">
            <Card.Body>
              <div className="mb-3 mt-md-4">
                <h2 className="fw-bold mb-2 text-center text-uppercase ">Enter details about your post</h2>
                <div className="mb-3">
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="Title">
                      <Form.Label className="text-center">
                        Title
                      </Form.Label>
                      <Form.Control value={Title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Enter Title" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="Info">
                      <Form.Label className="text-center">
                        Information
                      </Form.Label>
                      <Form.Control as="textarea" rows={5} value={Info} onChange={(e) => setInfo(e.target.value)} type="text" placeholder="Enter Information body" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="lLink">
                      <Form.Label className="text-center">
                        Link
                      </Form.Label>
                      <Form.Control value={iLink} onChange={(e) => setiLink(e.target.value)} type="url" placeholder="Enter Link to learn more" />
                    </Form.Group>

                    <div className="d-grid">
                      <Button variant="primary" value="submitnotif" type="submit">
                        Post
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
  )
}

export default TeacherPostNotifsForm;
