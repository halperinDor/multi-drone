import React, { useState } from 'react';
import { Button, Modal} from 'react-bootstrap';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Example() {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <FontAwesomeIcon icon={faInfoCircle} onClick={handleShow}></FontAwesomeIcon> 
  
        <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header>
          <Modal.Title>Multi-Drone App Information</Modal.Title>
        </Modal.Header>
            <Modal.Body>
            The purpose of the app is to enable control of several drones at the same time.
            On the left side of the screen should appear a list of drones in your possession that are currently active.
            By clicking on the name of a drone, on the right side of the screen,
            the information given to it at any moment and options for controlling it will appear on the left side.
            On the map, you can see where each drone is at any given moment -
            Clicking on an icon will display the name of the drone.
            On the left side of the map is an icon "drow a poligone" 
            that allows you to draw on the map a mission for the last drone you clicked on.
             Once you have finished drawing the task, it can be sent to the drone. 
            </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      </>
    );
  }
  
  export default Example;