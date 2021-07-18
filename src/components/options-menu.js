import React, {useState, useEffect} from 'react';
import ArmButton from './commands-buttons/arm-button';
import ModeButton from './commands-buttons/mode-button'
import TakeOffButton from './commands-buttons/take-off-button'
import LandButton from './commands-buttons/land-button'
import RTLButton from './commands-buttons/rtl-button'
import StartMission from './commands-buttons/mission-buttons/start-mission';
import StopMission from './commands-buttons/mission-buttons/stop-mission';
import CleanMission from './commands-buttons/mission-buttons/clean-mission';
import { Button} from 'react-bootstrap';
import { useCookies } from 'react-cookie';


const messege = "On the left side of the screen, there is a list of drones names." +
                " Click on one of them to get its details and to send him commands." +
                " If no name appears - there is no connection of any drone to the application...";


//const TOKEN = "aad9d647bf86fff01778571c1e02fb6ff62fceaf";

function OptionsMenu(props){

    const [drone, setdrone] = useState([]);
    const [token] = useCookies('mr-token');

    var id = "";

    if (props.drone){
        // console.log("ghhhhfgf",props.drone.id);
        id = props.drone.id;

    }


    var url = `http://127.0.0.1:8000/api/drones/${id}/`;
    useEffect(() => {

        if(id !== ""){

        const intervalId = setInterval(() => {  //assign interval to a variable to clear it.
          
          fetch(url, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Token ${token['mr-token']}`
            }
        },)
        .then(resp => resp.json())
        .then(resp => setdrone(resp))
        .catch(error => console.log(error))
                             
        }, 100)
      
        return () => clearInterval(intervalId); //This is important
        }
       
    }, [url, useState])



    if(drone.length !== 0){
       // console.log("opetion!!!: ", drone.name)


  return (<div className="my-back"> {
    drone ? (<table > <h2 style={{ textDecoration: ' underline',  textShadow: '0 0 3px #FF0000, 0 0 5px #0000FF'}}>{drone.name} Control</h2>
       
                        <tbody>
                            <tr><td>Commands</td><td>Mission Commands</td></tr>
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


  </div>)

}else{

   return('')
}
    

            

}

export default OptionsMenu;