import React, {useState, useEffect} from 'react';
import ArmButton from './commands-buttons/arm-button';
import ModeButton from './commands-buttons/mode-button'
import TakeOffButton from './commands-buttons/take-off-button'
import LandButton from './commands-buttons/land-button'
import RTLButton from './commands-buttons/rtl-button'
import StartMission from './commands-buttons/mission-buttons/start-mission';
import StopMission from './commands-buttons/mission-buttons/stop-mission';
import CleanMission from './commands-buttons/mission-buttons/clean-mission';
import { useCookies } from 'react-cookie';
import { API } from '../rest-api-service';
import styled from 'styled-components';


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
          
            API.getUpdateOneDrone(setdrone, url, token['user-token'])
                             
        }, 100)
      
        return () => clearInterval(intervalId); //This is important
        }
       
    }, [url, id, token, useState])



    if(drone.length !== 0){



  return (  <ControlBack> {
                drone ? (<table > <ControlTitle>{drone.name} Control</ControlTitle>
                
                                    <tbody>
                                        <tr><SecTitle>Commands</SecTitle><SecTitle>Mission Commands</SecTitle></tr>
                                        <tr><td><ArmButton arm={drone.arm} name={drone.name}/></td>
                                        <td><StartMission arm={drone.arm} name={drone.name}/></td></tr>
                                        <tr><td><LandButton arm={drone.arm} name={drone.name} /></td>
                                            <td><StopMission arm={drone.arm} name={drone.name} /></td></tr>
                                        <tr><td><RTLButton arm={drone.arm} name={drone.name}/></td>
                                            <td><CleanMission arm={drone.arm} name={drone.name}/></td></tr>
                                        <tr><TakeOffButton takeoff={drone.arm} name={drone.name}/></tr>
                                        <tr><ModeButton mode={drone.alt} name={drone.name}/></tr>
                                        
                                    </tbody>
                                </table>):null
             }


            </ControlBack>)

}else{

   return('')
}
    

            

}

export default ControlOptions;