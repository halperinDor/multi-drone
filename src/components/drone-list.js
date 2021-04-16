import React from 'react'
import styled from 'styled-components';

const HoverText = styled.p`
color: #FFFFFF;
font-size: 30px;
:hover {
    color: 	#FFA500;
    cursor: pointer;
}
`

function DroneList(props){

 
    const droneClicked = drone => evt => {
        props.droneClicked(drone)
    }


    return ( <div>
        {
            props.drones && props.drones.map( drone =>{
                return (
                 <div key={drone.id}>
                <HoverText onClick={droneClicked(drone)} >{drone.name}</HoverText>
                </div>
                )
            })
        }
    </div>)
}

export default DroneList;