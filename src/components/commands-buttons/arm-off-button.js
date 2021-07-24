import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'
import { API } from '../../rest-api-service';

export default function ArmOffButton(props){

    var droneName = "";
    var command = "";
    var token = "";
    var buttonName = "";
    var colorVariant = "";

    props.drone_name? droneName = props.drone_name: droneName=null;
    props.command_name? command = props.command_name: command=null;
    props.token? token =props.token: token=null;
    props.button_name? buttonName = props.button_name: buttonName=null; 
    props.variant? colorVariant= props.variant: colorVariant=null;

    const setCommand = props => evt => {
        API.sendToDrone(droneName, command, 0, token);
    }

    if(props.arm){

        return (
            <div>
                <Button variant={colorVariant} style={{cursor: "not-allowed"}} disabled>
                {buttonName}
                </Button>    
            </div>
             
        );
    }
    return (
        <div>
            <Button variant={colorVariant} onClick={setCommand()} style={{cursor: "pointer"}}>
            {buttonName}
            </Button>
        </div>
    );

}