import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'
import { useCookies } from 'react-cookie';
import { API } from '../../../rest-api-service';

export default function CleanMission(props){

    const [token] = useCookies(['user-token']);

    var droneName = "";

    props.name? droneName = props.name: droneName=null;


    const setCleanMissionCommand = props => evt => {
        API.sendToDrone(droneName, "mission: clean", 0, token['user-token'])
    }

    if(props.arm){

        return (
            <div>
                <Button style={{cursor: "not-allowed"}} disabled>
                 Clean Mission
                </Button>    
            </div>
             
        );
    }
    return (
        <div>
            <Button onClick={setCleanMissionCommand()} style={{cursor: "pointer"}}>
            Clean Mission
            </Button>
        </div>
    );

}