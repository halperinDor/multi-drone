import React from 'react'
import styled from 'styled-components';

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
const DroneListBack = styled.div`
    padding:3%;
    margin-right: 2%;
    background-color: rgb(61, 10, 61);
    //background-color:rgb(9, 89, 114);
    //background-color: #191970;
    border-width: 40px;
    border: none;
    border-radius: 12px;
`
const ListTitle = styled.h2`
    text-decoration:underline;
    text-shadow: 0 0 3px #FF0000, 0 0 5px #0000FF;
`

function DroneList(props){

 
    const droneClicked = drone => evt => {
        props.droneClicked(drone)
    }

   
    return (<DroneListBack>
                 <ListTitle>Drones</ListTitle><br/>
                    {
                        props.drones && props.drones.map( drone =>{
                            return (
                            // <div  key={drone.id}>
                            <HoverText onClick={droneClicked(drone)} >{drone.name}</HoverText>
                           
                            )
                        })
                    }
            </DroneListBack>)
}

export default DroneList;