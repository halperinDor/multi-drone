import React , { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import { API } from '../../rest-api-service';
import { Form } from 'react-bootstrap';


export default function ModeButton(props){

  var droneName = "";
  var token = "";

  props.name? droneName = props.name: droneName=null;
  props.token? token =props.token: props.token=null;


  const modes = ["AUTO","GUIDED","POSHOLD", "LOITER", "STABILIZE" ];
  
  const setModeCommand = props => evt => {

        API.sendToDrone(droneName, value, 0, token)
      
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
                  {modes.map(mode => {
                    return(
                      <Dropdown.Item eventKey={mode}>{mode}</Dropdown.Item>)
                  })}
                </DropdownButton>
                
              <Button  variant="success" onClick={setModeCommand()} >SEND</Button>{' '}
            </Form.Row>
      </Form>
      </div>
    );

}