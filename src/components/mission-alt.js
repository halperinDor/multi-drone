import React , {useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import { API } from '../rest-api-service';


export default function MissionSetAlt(props){

    var droneName = "";
    var token = "";
    var coordinates = "";

    props.name? droneName = props.name: droneName=null;
    props.token? token = props.token: token=null;
    props.coordinates? coordinates = props.coordinates : coordinates=null;

    
    const setMission = props => evt => {
        API.sendMissonToDrone(droneName, coordinates, altitud, token)

        if(coordinates.length !== 0 && altitud !== ('')){
            var mission_id = JSON.stringify(coordinates, 
                ['id']).replace(/[{}]/g, '').replace(/[[]/g, '').replace(/[\]']+/g, '').replace(/["]/g, '');
                console.log("enpty!!", coordinates);
            alert("Mission "+ mission_id+ " was successfully sent to "+ droneName+ " drone!"); 
        }else{
            alert("Can't send a mission. A mission consists of a coordinates and a altitude. You are missing some of them."); 

        }

    }

    const [altitud,setAltitud]=useState('')
    //console.log("tol", altitud );

    const handleInputChange=(event)=>{
      setAltitud(event.target.value);
    }

    return (
        <div>
            <Form>
                Enter a mission altitud before send it:
                <Form.Row>
                    <Col xs={4}>
                        <input 
                            className="form-control"
                            placeholder="altitude"
                            type="text"
                            onChange={handleInputChange}
                        ></input>
                    </Col>
                    <Button variant="primary" onClick={setMission()}>SEND MISSION</Button>    
                </Form.Row> 
            </Form>
        </div>
    )
    
}