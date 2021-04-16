import React , { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import { COMMANDSAPI } from './commands-service'
import { Form } from 'react-bootstrap';


export default function ModeButton(mode, props){

    const modeCommand = mode => evt => {
        COMMANDSAPI.sendToDrone(props.drone.name, value, -1)
    }

    const [value,setValue]=useState('');

    const handleSelect=(e)=>{
      setValue(e)
    }

    
    return (
        <div>
          <Form>
            <Form.Row>
              
                <DropdownButton 
                type='text'
                title={"set mode: " + value}
                variant="success"
                onSelect={handleSelect}
                >
                        <Dropdown.Item eventKey="AUTO">AUTO</Dropdown.Item>
                        <Dropdown.Item eventKey="GUIDED">GUIDED</Dropdown.Item>
                        <Dropdown.Item eventKey="POSHOLD">POSHOLD</Dropdown.Item>
                        <Dropdown.Item eventKey="LOITER">LOITER</Dropdown.Item>
                        <Dropdown.Item eventKey="STABILIZE">STABILIZE</Dropdown.Item>
                </DropdownButton>
                
                <Button  variant="success" onClick={modeCommand()} >SEND</Button>{' '}
            </Form.Row>
      </Form>
      </div>
    );

}