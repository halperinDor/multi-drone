import React , {useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import { COMMANDSAPI } from './commands-service'


export default function TakeOffButton(takeoff, props){

    const takeOffCommand = takeoff => evt => {
        COMMANDSAPI.sendToDrone(props.drone.name, "Takeoff", value)

    }

    const [value,setValue]=useState('')

    const handleInputChange=(event)=>{
      setValue(event.target.value);
    }

    return (
        <div>
            <Form>
                Enter take-off:
                <Form.Row>
                    <Col xs={4}>
                        <input 
                            className="form-control"
                            placeholder="take-off"
                            type="text"
                            onChange={handleInputChange}
                        ></input>
                    </Col>
                    <Button variant="success" onClick={takeOffCommand()}>SEND</Button>    
                </Form.Row> 
            </Form>
        </div>
    )
    
}