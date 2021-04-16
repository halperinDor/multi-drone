import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'
import { COMMANDSAPI } from './commands-service'


export default function ArmButton(arm, props){

    const armCommand = arm => evt => {
        COMMANDSAPI.sendToDrone(props.drone.name, "Arm", -1)
    }

    if(COMMANDSAPI.IsOn(arm)){

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
            <Button variant="success" onClick={armCommand()} style={{cursor: "pointer"}}>
            ARM
            </Button>
        </div>
    );

}