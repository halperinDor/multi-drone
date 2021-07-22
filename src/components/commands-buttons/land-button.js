import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'
import { API } from '../../rest-api-service';
import { useCookies } from 'react-cookie';


export default function LandButton(props){

    const [token]= useCookies(['use-token']);


    var droneName = "";

    props.name? droneName = props.name: droneName=null;
    


    const setLandCommand = props => evt => {
        API.sendToDrone(droneName, "LAND", 0, token['user-token']);
    }

    if(!props.arm){

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
            <Button variant="success" onClick={setLandCommand()} style={{cursor: "pointer"}}>
            LAND
            </Button>
        </div>
    );

}