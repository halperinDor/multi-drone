import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'
import { COMMANDSAPI } from './commands-service'
import { useCookies } from 'react-cookie';


export default function LandButton(props){

    const [token]= useCookies(['mr-token']);

    var name= "";


    if(props.name){
        var name = props.name
        //console.log("my name is: ",name);
      }
    
      //console.log("new name = ", name);

    const landCommand = props => evt => {
        COMMANDSAPI.sendToDrone(name, "LAND", -1, token['mr-token']);
    }

    if(!COMMANDSAPI.IsOn(props.arm)){

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