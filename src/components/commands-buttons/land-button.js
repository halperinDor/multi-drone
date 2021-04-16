import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'
import { COMMANDSAPI } from './commands-service'


export default function LandButton(arm, props){

    const landCommand = arm => evt => {
        COMMANDSAPI.sendToDrone(props.drone.name, "LAND", -1)
    }

    if(!COMMANDSAPI.IsOn(arm)){

        return (
            <div>
                <Button variant="success" style={{cursor: "not-allowed"}} disabled>
                 LAND
                </Button>    
            </div>
             
        );
    }
    return (
        <div>
            <Button variant="success" onClick={landCommand()} style={{cursor: "pointer"}}>
            LAND
            </Button>
        </div>
    );

}