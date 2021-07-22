import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCheckCircle, faTimesCircle} from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react'
import "./components.css";
import { useCookies } from 'react-cookie';
import { API } from '../rest-api-service';
import styled from 'styled-components';

const DroneDataBack = styled.div`
    padding:3%;
    margin-right: 2%;
    background-color: rgb(61, 10, 61);
    //background-color: rgb(9, 89, 114);
    //background-color: #191970;
    border-width: 40px;
    /* padding-top: 15%; */
    border: none;
    border-radius: 12px;
`

const DataTitle = styled.h2`
    text-decoration:underline;
    text-shadow: 0 0 3px #FF0000, 0 0 5px #0000FF;
`
const SecTitle = styled.td`
    text-decoration:underline;
    text-shadow: 0 0 3px #331010, 0 0 5px #0000FF;
`

const Messege = styled.div`
    padding:3%;
    margin-right: 2%;
    overflow: auto;
    background-color: rgb(61, 10, 61);
    //background-color: #191970;
    border-width: 40px;
    border: none;
    border-radius: 12px;
`

const DataRow = styled.tr`
    background-color: #504c4c;
    border: 1px solid black;
    overflow: hidden;
`
const DataCol = styled.td`
    overflow: hidden;
`
const DataTable = styled.table`
table-layout: auto;
width: 100%;  
`

function DroneDetails(props){

    const [drone, setdrone] = useState([]);
    const [token] = useCookies(['user-token']);

    var id = "";

    if (props.drone){
        id = props.drone.id;

    }

    const getBoolIcon = (state)=>{
        if(state === true){
            return (<FontAwesomeIcon icon={faCheckCircle} />);
        }
        return(<FontAwesomeIcon icon={faTimesCircle} />);
    }

    var url = `${id}/`;
    useEffect(() => {

        if(id !== ""){

          

         const intervalId = setInterval(() => {  //assign interval to a variable to clear it.
          
            API.getUpdateOneDrone(setdrone, url, token['user-token'])
       
                             
         }, 100)

         return () => clearInterval(intervalId); 

        }
       
    }, [url,id,token,useState])



    if(drone.length !== 0){
    
        return (
        
            <DroneDataBack>
                {
                    drone ? (
                        <DataTable>
                            <DataTitle>{drone.name}</DataTitle>
                            <DataRow>
                                <SecTitle>Connect:</SecTitle>
                                <DataCol> {getBoolIcon(drone.connect)}  </DataCol>
                                <SecTitle>Battery:</SecTitle>
                                <DataCol>{drone.bat}{"V"}</DataCol>
                                <DataCol></DataCol>
                                <DataCol></DataCol>
                            </DataRow>
                            <DataRow>
                                <SecTitle>Armable:</SecTitle>
                                <DataCol>{getBoolIcon(drone.armable)}</DataCol>
                                <SecTitle>EKF:</SecTitle>
                                <DataCol>{getBoolIcon(drone.ekf)}</DataCol>
                                <SecTitle>Arm:</SecTitle>
                                <DataCol>{getBoolIcon(drone.arm)}</DataCol>
                                
                            </DataRow>
                            <DataRow>
                                <SecTitle>Mission:</SecTitle>
                                <DataCol>{drone.mission}</DataCol>
                                <SecTitle>ZSpeed: </SecTitle>
                                <DataCol>{drone.zspeed}</DataCol>
                                <SecTitle>GSpeed:</SecTitle>
                                <DataCol>{drone.gspeed}</DataCol>
                            </DataRow>
                            <DataRow>
                                <SecTitle>Fix:</SecTitle>
                                <DataCol>{drone.fix}</DataCol>
                                <SecTitle>Num_of_sat:</SecTitle>
                                <DataCol>{drone.num_sat}</DataCol>
                                <SecTitle>Altitud:</SecTitle>
                                <DataCol>{drone.alt}</DataCol>
                            </DataRow>
                            <DataRow>
                                <SecTitle>Latitiud:</SecTitle>
                                <DataCol>{drone.lat}</DataCol>
                                <DataCol></DataCol>
                                <DataCol></DataCol>
                                <SecTitle>Mode:</SecTitle>
                                <DataCol>{drone.mode}</DataCol>
                            </DataRow>
                            <DataRow>
                                <SecTitle>Longitud:</SecTitle>
                                <DataCol>{drone.lng}</DataCol>
                                <DataCol></DataCol>
                                <DataCol></DataCol>
                                <DataCol></DataCol>
                                <DataCol></DataCol>
                            </DataRow>
                        
                            <DataRow>
                                <SecTitle>Heading:</SecTitle>
                                <DataCol>{drone.heading}</DataCol>
                                <DataCol></DataCol>
                                <DataCol></DataCol>
                                <DataCol></DataCol>
                                <DataCol></DataCol>
                                
                            </DataRow>
                            <DataRow>
                                <SecTitle>Pitch:</SecTitle>
                                <DataCol>{drone.pitch}</DataCol>
                                <DataCol></DataCol>
                                <DataCol></DataCol>
                                <DataCol></DataCol>
                                <DataCol></DataCol>
                            </DataRow>
                            <DataRow>
                                <SecTitle>Roll:</SecTitle>
                                <DataCol>{drone.roll}</DataCol>
                                <DataCol></DataCol>
                                <DataCol></DataCol>
                                <DataCol></DataCol>
                                <DataCol></DataCol>

                            </DataRow>
                        </DataTable>
                        
                    ) : null

                
            }
        
        </DroneDataBack>
    )
    }else{

        return(<Messege>
                    <h2>
                        Click on drone name to see it details and set commands.
                    </h2>
                    <br/>
                    <h3>
                        On the left side of the screen,
                        There should be a list of drones names.
                        Click on one of them to get its details and to send him commands. 
                        If no name appears - there is no connection of any drone to the application...
                    </h3>
                </Messege>)
    }
 
}

export default DroneDetails;