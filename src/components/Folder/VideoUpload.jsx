import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import BasicSpeedDial from "../../assets/FileAdd/addBtn"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

function Example() {
  const values = [true, 'sm-down', 'md-down', 'lg-down', 'xl-down', 'xxl-down'];
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);

  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }

  return (
    <>
    <BasicSpeedDial togglePopup={() => handleShow("lg-down")} />
      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Media</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Container fluid>
                <Row>
                    <Col>
                        <Card>
                            Link
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            Link
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Example;