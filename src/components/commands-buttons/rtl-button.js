import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'
import { COMMANDSAPI } from './commands-service'


export default function RTLButton(arm, props){

    const rtlCommand = arm => evt => {
        COMMANDSAPI.sendToDrone(props.drone.name, "RTL", -1)
    }

    if(!COMMANDSAPI.IsOn(arm)){

        return (
            <div>
                <Button variant="success" style={{cursor: "not-allowed"}} disabled>
                 RTL
                </Button>    
            </div>
             
        );
    }
    return (
        <div>
            <Button variant="success" onClick={rtlCommand()} style={{cursor: "pointer"}}>
            RTL
            </Button>
        </div>
    );

}