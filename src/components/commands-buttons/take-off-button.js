import React , {useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import { API } from '../../rest-api-service';
import { useCookies } from 'react-cookie';


export default function TakeOffButton(props){

    const [token] = useCookies(['user-token']);

    var droneName = "";

    props.name? droneName = props.name: droneName=null;


    const setTakeOffCommand = props => evt => {
        API.sendToDrone(droneName, "Takeoff", value, token['user-token'])

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
                    <Button variant="success" onClick={setTakeOffCommand()}>SEND</Button>    
                </Form.Row> 
            </Form>
        </div>
    )
    
}