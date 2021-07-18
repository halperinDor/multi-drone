import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'
import { COMMANDSAPI } from '../commands-service'
import { useCookies } from 'react-cookie';


export default function StopMission(props){

    const [token] = useCookies(['mr-token']);

    var name= "";


    if(props.name){
        var name = props.name
        // console.log("my name is: ",name);
      }
    
    //   console.log("new name = ", name);

    const stopMissionCommand = props => evt => {
        COMMANDSAPI.sendToDrone(name, "mission: stop", -1, token['mr-token'])
    }

    if(!COMMANDSAPI.IsOn(props.arm)){

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
            <Button onClick={stopMissionCommand()} style={{cursor: "pointer"}}>
            Stop Mission
            </Button>
        </div>
    );

}