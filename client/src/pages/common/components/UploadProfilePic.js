import { Container, Button, Modal } from "react-bootstrap";
import { useState } from 'react';
import { uploadProfilePicture } from "../../../services/Services";

function UploadProfilePicture(){
const [selectedImage, setSelectedImage] = useState(null);

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false)
    setSelectedImage(null)
  };
  const handleShow = () => setShow(true);

  // Function to handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);

    // Preview the selected image
    const reader = new FileReader();
    reader.onload = (e) => {
      document.getElementById('preview').src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  // Function to handle image upload
  const handleUpload = () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append('image', selectedImage);
      uploadProfilePicture(formData);
      handleClose()
    } else {
      alert("Please select an image");
    }
  };

  return(
    <Container>
        <Button onClick={() => handleShow()} variant="info">
                  Upload Profile Picture
                </Button>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title style={{ color: "#802121" }}>Upload Profile Picture</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <input style={{ color: "#802121" }} type="file" onChange={handleFileChange} />
                    <br />
                    <img id="preview" alt="" style={{ maxWidth: '100%', paddingTop: '10px' }} />
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleUpload()}>
                      Upload
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                      Cancel
                    </Button>
                  </Modal.Footer>
                </Modal>
    </Container>
  )
}

export default UploadProfilePicture;