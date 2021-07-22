import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'
import { useCookies } from 'react-cookie';
import { API } from '../../rest-api-service';

export default function RTLButton(props){

    const [token] = useCookies(['user-token']);

    var droneName = "";

    props.name? droneName = props.name: droneName=null;

    const setRtlCommand = props => evt => {
        API.sendToDrone(droneName, "RTL", 0, token['user-token'])
    }

    if(!props.arm){

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
            <Button variant="success" onClick={setRtlCommand()} style={{cursor: "pointer"}}>
            RTL
            </Button>
        </div>
    );

}