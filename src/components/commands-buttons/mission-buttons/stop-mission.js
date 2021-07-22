import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'
import { API } from '../../../rest-api-service';
import { useCookies } from 'react-cookie';


export default function StopMission(props){

    const [token] = useCookies(['user-token']);
    var droneName = "";

    props.name? droneName = props.name: droneName=null;

    
  

    const setStopMissionCommand = props => evt => {
        API.sendToDrone(droneName, "mission: stop", 0, token['user-token'])
    }

    if(!props.arm){

        return (
            <div>
                <Button style={{cursor: "not-allowed"}} disabled>
                 Stop Mission
                </Button>    
            </div>
             
        );
    }
    return (
        <div>
            <Button onClick={setStopMissionCommand()} style={{cursor: "pointer"}}>
            Stop Mission
            </Button>
        </div>
    );

}