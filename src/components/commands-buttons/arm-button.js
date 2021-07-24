import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'
import { API } from '../../rest-api-service';

export default function ArmButton(props){


    var droneName = "";

    props.name? droneName = props.name: droneName=null;

    const setArmCommand = props => evt => {
        API.sendToDrone(droneName, "Arm", 0,props.token);
        // API.myFunc(multiPolygon, token['user-token']);
    }

    if(props.arm){

        return (
            <div>
                <Button variant="success" style={{cursor: "not-allowed"}} disabled>
                 ARM
                </Button>    
            </div>
             
        );
    }
    return (
        <div>
            <Button variant="success" onClick={setArmCommand()} style={{cursor: "pointer"}}>
            ARM
            </Button>
        </div>
    );

}