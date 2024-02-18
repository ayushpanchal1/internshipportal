import { Col, Row, Container, Card, Form } from "react-bootstrap";
import { useState, useEffect } from 'react';

function Notification() {
    var [notifs, setnotifs] = useState('')

    useEffect(() => {
        fetchnotif()
    }, []);

    const fetchnotif = () => {
        fetch("http://localhost:1337/api/getnotifs", { credentials: 'include' })
            .then(response => {
                return response.json()
            })
            .then(data => {
              
                data.reverse()
                setnotifs(data)
            })
    }

    return (
        <Container style={{ marginTop: '100px' }}>
        <Row className="d-flex">
          <Col md={8} lg={12} xs={12}>
          <div>
            {notifs.length > 0 && (
              <ul className='list-unstyled'>
                {notifs.map(notif => (
                  <li><div className="card shadow">
                    <div className="border border-2 border-primary"></div>
                  <div className="card-header">
                    Post by {notif.firstname} {notif.lastname}
                  </div>
                  <div className="card-body">
                    <h3 className="card-title"><b>{notif.title}</b></h3>
                    <p className="card-text">{notif.info}</p>
                    <a href={notif.link} className="btn btn-primary">Learn More</a>
                  </div>
                </div>
                <br/></li>
                ))}
                </ul>
            )}
          </div>
          
          </Col>
          
        </Row>
      </Container>
    )
}

export default Notification;