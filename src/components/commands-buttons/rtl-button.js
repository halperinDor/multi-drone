import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'
import { COMMANDSAPI } from './commands-service'
import { useCookies } from 'react-cookie';


export default function RTLButton(props){

    const [token] = useCookies(['mr-token']);

    var name = "";

  
  if(props.name){
    var name = props.name
    //console.log("my name is: ",name);
  }


    const rtlCommand = props => evt => {
        COMMANDSAPI.sendToDrone(name, "RTL", -1, token['mr-token'])
    }

    if(!COMMANDSAPI.IsOn(props.arm)){

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