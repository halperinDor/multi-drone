import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCheckCircle, faTimesCircle} from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react'
import "./components.css"
import { API } from '../api-service'
import { Button} from 'react-bootstrap';
import { useCookies } from 'react-cookie';


const messege = "On the left side of the screen, there is a list of drones names." +
                " Click on one of them to get its details and to send him commands." +
                " If no name appears - there is no connection of any drone to the application...";

//const TOKEN = "aad9d647bf86fff01778571c1e02fb6ff62fceaf";    


function IconRet(props) {
    var str = JSON.stringify(props);
    var n= str.indexOf(":")
    var x = JSON.stringify(props)[n+1]

    if(x === 't'){
        return (<FontAwesomeIcon icon={faCheckCircle} className="green"/>);
    }
    return(<FontAwesomeIcon icon={faTimesCircle} className="red"/>);

};



function DroneDetails(props){

    const [drone, setdrone] = useState([]);
    const [token] = useCookies(['mr-token']);

    var id = "";

    if (props.drone){
        // console.log("ghhhhfgf",props.drone.id);
        id = props.drone.id;

    }

//   console.log("my data",id);

  

   

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
       // console.log("my drone!", drone)

   
 
    return ( <div className="my-back">
        {
            drone ? (
                <table>
                     <h2 style={{ textDecoration: ' underline',textShadow: '0 0 3px #FF0000, 0 0 5px #0000FF' }}>{drone.name}</h2>
                    <tr>
                        <td>Connect:</td>
                        <td><IconRet ico_armble = {drone.connect} /> </td>
                        <td>Battery:</td>
                        <td>{drone.bat}{"V"}</td>
                    </tr>
                    <tr>
                        <td>Armable:</td>
                        <td><IconRet ico_armble = {drone.armable} /></td>
                        <td>EKF:</td>
                        <td><IconRet ico_ekf = {drone.ekf}></IconRet></td>
                        <td>Arm:</td>
                        <td>< IconRet ico_arm ={drone.arm}/></td>
                        <td>Mode:</td>
                        <td>{drone.mode}</td>
                    </tr>
                    <tr>
                        <td>Mission:</td>
                        <td>{drone.mission}</td>
                        <td>ZSpeed: </td>
                        <td>{drone.zspeed}</td>
                        <td>GSpeed:</td>
                        <td>{drone.gspeed}</td>
                    </tr>
                    <tr>
                        <td>Fix:</td>
                        <td>{drone.fix}</td>
                        <td>Num_of_sat:</td>
                        <td>{drone.num_sat}</td>
                        <td>Altitud:</td>
                        <td>{drone.alt}</td>
                    </tr>
                    <tr>
                        <td>Latitiud:</td>
                        <td>{drone.lat}</td>
                    </tr>
                    <tr>
                        <td>Longitud:</td>
                        <td>{drone.lng}</td>
                    </tr>
                   
                    <tr>
                        <td>Heading:</td>
                        <td>{drone.heading}</td>
                        
                    </tr>
                    <tr>
                        <td>Pitch:</td>
                        <td>{drone.pitch}</td>
                    </tr>
                    <tr>
                        <td>Roll:</td>
                        <td>{drone.roll}</td>
                    </tr>
                </table>
                
            ) : null

            
        }
       
    </div>)
    }else{

        return(<div className="my-back-empty"><h2>Click on drone name to see it details and set commands.</h2><br/>
        <h3>On the left side of the screen, There should be a list of drones names.
                 Click on one of them to get its details and to send him commands. 
                 If no name appears - there is no connection of any drone to the application...</h3>
         </div>)
    }
 
}

export default DroneDetails;