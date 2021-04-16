import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCheckCircle, faTimesCircle} from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import "./components.css"




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



    return ( <div>
        {
            props.drone ? (
                <table>
                    <h1 >{props.drone.name} </h1>
                    <tr>
                        <td>Connect:</td>
                        <td><IconRet ico_armble = {props.drone.connect} /> </td>
                        <td>Battery:</td>
                        <td>{props.drone.bat}{"V"}</td>
                    </tr>
                    <tr>
                        <td>Armable:</td>
                        <td><IconRet ico_armble = {props.drone.armable} /></td>
                        <td>EKF:</td>
                        <td><IconRet ico_ekf = {props.drone.ekf}></IconRet></td>
                        <td>Arm:</td>
                        <td>< IconRet ico_arm ={props.drone.arm}/></td>
                        <td>Mode:</td>
                        <td>{props.drone.mode}</td>
                    </tr>
                    <tr>
                        <td>Mission:</td>
                        <td>{props.drone.mission}</td>
                        <td>ZSpeed: </td>
                        <td>{props.drone.zspeed}</td>
                        <td>GSpeed:</td>
                        <td>{props.drone.gspeed}</td>
                    </tr>
                    <tr>
                        <td>Fix:</td>
                        <td>{props.drone.fix}</td>
                        <td>Num_of_sat:</td>
                        <td>{props.drone.num_sat}</td>
                        <td>Altitud:</td>
                        <td>{props.drone.alt}</td>
                    </tr>
                    <tr>
                        <td>Latitiud:</td>
                        <td>{props.drone.lat}</td>
                    </tr>
                    <tr>
                        <td>Longitud:</td>
                        <td>{props.drone.lng}</td>
                    </tr>
                   
                    <tr>
                        <td>Heading:</td>
                        <td>{props.drone.heading}</td>
                        
                    </tr>
                    <tr>
                        <td>Pitch:</td>
                        <td>{props.drone.pitch}</td>
                    </tr>
                    <tr>
                        <td>Roll:</td>
                        <td>{props.drone.roll}</td>
                    </tr>
                </table>
                
            ) : null

            
        }
       
    </div>)
}

export default DroneDetails;