import React , { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import { API } from '../../rest-api-service';
import { Form } from 'react-bootstrap';
import { useCookies } from 'react-cookie';


export default function ModeButton(props){

  const [token] = useCookies(['user-token']);

  var droneName = "";

  props.name? droneName = props.name: droneName=null;


  const setModeCommand = props => evt => {

        API.sendToDrone(droneName, value, 0, token['user-token'])
      
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
                className='mr-1'
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
                
              <Button  variant="success" onClick={setModeCommand()} >SEND</Button>{' '}
            </Form.Row>
      </Form>
      </div>
    );

}