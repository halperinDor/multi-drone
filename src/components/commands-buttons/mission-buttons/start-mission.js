import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'
import { API } from '../../../rest-api-service';
import { useCookies } from 'react-cookie';


export default function StartMission(props){

    const [token] = useCookies(['user-token']);

    var droneName = "";

    props.name? droneName = props.name: droneName=null;

    


    const setStartMissionCommand = props => evt => {
        API.sendToDrone(droneName, "mission: start", 0, token['user-token'])
    }

    if(props.arm){

        return (
            <div>
                <Button style={{cursor: "not-allowed"}} disabled>
                 Start Mission
                </Button>    
            </div>
             
        );
    }
    return (
        <div>
            <Button onClick={setStartMissionCommand()} style={{cursor: "pointer"}}>
            Start Mission
            </Button>
        </div>
    );

}