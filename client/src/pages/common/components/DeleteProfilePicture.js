import { Container, Button, Modal } from "react-bootstrap";
import { useState } from 'react';
import { deleteProfilePicture } from "../../../services/Services";

function DeleteProfilePicture(){

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false)
  };
  const handleShow = () => setShow(true);

  const handleDelete = () => {
    deleteProfilePicture()
    setShow(false)
  }

  return(
    <Container>
        <Button onClick={() => handleShow()} variant="info">
                  Delete Profile Picture
                </Button>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title style={{ color: "#802121" }}>Delete Profile Picture</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    Are you sure you want to delete your profile picture?
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleDelete()}>
                      Yes, Delete
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                      Cancel
                    </Button>
                  </Modal.Footer>
                </Modal>
    </Container>
  )
}

export default DeleteProfilePicture;