import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'
import { COMMANDSAPI } from '../commands-service'
import { useCookies } from 'react-cookie';


export default function CleanMission(props){

    const [token] = useCookies(['mr-token']);

    var name= "";


    if(props.name){
        var name = props.name
        //console.log("my name is: ",name);
      }
    

    const cleanMissionCommand = props => evt => {
        COMMANDSAPI.sendToDrone(name, "mission: clean", -1, token['mr-token'])
    }

    if(COMMANDSAPI.IsOn(props.arm)){

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
            <Button onClick={cleanMissionCommand()} style={{cursor: "pointer"}}>
            Clean Mission
            </Button>
        </div>
    );

}