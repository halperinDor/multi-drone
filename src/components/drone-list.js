import React from 'react'
import styled from 'styled-components';
import { Button } from 'react-bootstrap';

const HoverText = styled.p`
color: #FFFFFF;
font-size: 30px;
background-color: #808080;
text-align: center;
border-radius: 12px;
:hover {
    background-color: #696969;
    cursor: pointer;
}
`

function DroneList(props){

 
    const droneClicked = drone => evt => {
        props.droneClicked(drone)
    }

   
    return ( <div className="my-back">
                 <h2 style={{ textDecoration: ' underline',textShadow: '0 0 3px #FF0000, 0 0 5px #0000FF' }}>Drones</h2><br/>
        {
            props.drones && props.drones.map( drone =>{
                return (
                 <div  key={drone.id}>
                <HoverText onClick={droneClicked(drone)} >{drone.name}</HoverText>
                </div>
                )
            })
        }
    </div>)
}

export default DroneList;