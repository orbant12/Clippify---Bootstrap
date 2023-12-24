import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import BasicSpeedDial from "../../assets/FileAdd/addBtn"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

function Example() {
  
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
            <div className='d-flex col justify-content-center'> 
                <div className='d-flex row justify-content-evenly'>
                    <div className='card' style={{padding:50}}>
                        Link
                    </div>
        
                    <div className='card' style={{padding:50}}>
                        Link
                    </div>
                </div>
          
                <Button style={{width:50,marginTop:50}} />
                </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Example;