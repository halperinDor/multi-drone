import React, {useState, useEffect} from 'react';
import ModeButton from './commands-buttons/mode-button'
import TakeOffButton from './commands-buttons/take-off-button';
import { API } from '../rest-api-service';
import styled from 'styled-components';
import ArmOnButton from './commands-buttons/arm-on-button';
import ArmOffButton from './commands-buttons/arm-off-button';
import StartMissionButton from './commands-buttons/start-mission';
import { useCookies } from 'react-cookie';


const ControlBack = styled.div`
    padding:3%;
    margin-right: 2%;
    background-color: rgb(61, 10, 61);
   // background-color:rgb(9, 89, 114);
    //background-color: #191970;
    border-width: 40px;
    border: none;
    border-radius: 12px;
`

const ControlTitle = styled.h2`
    text-decoration:underline;
    text-shadow: 0 0 3px #FF0000, 0 0 5px #0000FF;
`
const SecTitle = styled.td`
    text-decoration:underline;
    text-shadow: 0 0 3px #331010, 0 0 5px #0000FF;
`

function ControlOptions(props){

    const [drone, setdrone] = useState([]);
    const [token] = useCookies('user-token');
 

    var id = "";

    if (props.drone){
        id = props.drone.id;

    }


    var url = `${id}/`;
    useEffect(() => {

        if(id !== ""){

        const intervalId = setInterval(() => {  //assign interval to a variable to clear it.
          
            API.getUpdateOneDrone(setdrone, url, props.token)
                             
        }, 100)
      
        return () => clearInterval(intervalId); //This is important
        }
       
    }, [url, id, props.token])



    if(drone.length !== 0 && props.token){



  return (  <ControlBack> {
                drone ? (<table > <ControlTitle>{drone.name} Control</ControlTitle>
                
                                    <tbody>
                                        <tr><SecTitle>Commands</SecTitle><SecTitle>Mission Commands</SecTitle></tr>
                                        <tr><td><ArmOffButton arm={drone.arm} command_name={"Arm"} button_name={"ARM"} drone_name={drone.name} token={token['user-token']} variant={"success"}/></td>
                                        <td><StartMissionButton arm={drone.arm} command_name={"mission: start"} button_name={"Start Mission"} drone_name={drone.name} token={token['user-token']} variant={"primary"}/></td></tr>
                                        <tr><td><ArmOnButton arm={drone.arm} command_name={"LAND"} button_name={"LAND"} drone_name={drone.name} token={token['user-token']} variant={"success"}/></td>
                                            <td><ArmOnButton arm={drone.arm} command_name={"mission: stop"} button_name={"Stop Mission"} drone_name={drone.name} token={token['user-token']} variant={"primary"}/></td></tr>
                                        <tr><td><ArmOnButton arm={drone.arm} command_name={"RTL"} button_name={"RTL"} drone_name={drone.name} token={token['user-token']} variant={"success"}/></td>
                                            <td><ArmOffButton arm={drone.arm} command_name={"mission: clean"} button_name={"Clean Mission"} drone_name={drone.name} token={token['user-token']} variant={"primary"}/></td></tr>
                                        <tr><TakeOffButton takeoff={drone.arm} name={drone.name} token={token['user-token']}/></tr>
                                        <tr><ModeButton mode={drone.alt} name={drone.name} token={token['user-token']}/></tr>
                                        
                                    </tbody>
                                </table>):null
             }

            </ControlBack>)

}else{

   return('')
}
    

            

}

export default ControlOptions;