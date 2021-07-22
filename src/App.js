import React, { useState, useEffect } from 'react';
import './App.css';
import DroneList from './components/drone-list';
import DroneDetails from './components/drone-data';
import MyMap from './components/my-map';
import ControlOptions from './components/control-options';
import icon from './static/drone.jpg'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useCookies } from 'react-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AppInfo from './components/app-info';
import { API } from './rest-api-service';
import styled from 'styled-components';

const AppBack =styled.div`
  padding: 20px;
  min-height: 100vh;
  background-color:#7a94ff;  
  color: whitesmoke;
`;

const AppHeader = styled.header`
  text-align: center;
  font-size: calc(10px + 2vmin);
  font-style: italic;
  text-shadow: 0 0 3px #FF0000, 0 0 5px #0000FF;
  margin: 0px auto;
  text-decoration:underline;
  font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI',
  Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
    'Helvetica Neue', sans-serif;
`

const RowTable = styled.div`
  margin: auto;
  padding: 20px;
  height: 95vh;
  background-color:#7a94ff;  
  color: whitesmoke;
`

const LeftSide = styled.div`
  float: left;
  width: 8%;
  height: 90vh;
  padding: 10px;
  background-color: rgba(46, 38, 38, 0.76);
  border: none;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
`
const Middle= styled.div`
  float:left;
  width: 63%;
  min-height: 90vh;
  padding: 10px;
  background-color: rgba(46, 38, 38, 0.76);
`

const RightSide = styled.div`
  float: left;
  width: 29%;
  height: 90vh;
  background-color: rgba(46, 38, 38, 0.76);
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
`

export default function App() {

  const [drones, setDrone] = useState([]);

  const [selectedDrone, setSelectedDrone] = useState(null);

  const [token, setToken, deleteToken] = useCookies(['user-token']);

  const droneClicked = drone => {
    setSelectedDrone(drone);
  }


  useEffect(() => {

      const intervalId = setInterval(() => {  //assign interval to a variable to clear it.
          
        API.getUpdateAllDrones(setDrone, token['user-token'])

                            
        }, 100)
      
        return () => clearInterval(intervalId); //This is important
    
  }, [token, useState])
  

  useEffect(()=>{
    if(!token['user-token']) window.location.href = '/';
  }, [token])

  
  const logOutUser = () => {
    deleteToken(['user-token']);
  }


  return (
    <AppBack>

      <AppHeader>
          <h1 ><img src={icon}  alt="drone" height={75} width={75} ></img>Multi-Drone</h1>
          <FontAwesomeIcon icon={faSignOutAlt} onClick={logOutUser}/>
          <AppInfo/>
      </AppHeader>

      <RowTable>
          <LeftSide>
              <DroneList drones={drones} droneClicked={droneClicked}/>
          </LeftSide>

          <Middle >
            <MyMap drones={drones} drone={selectedDrone} />
          </Middle>

          <RightSide>
            <br/>
              <DroneDetails drone={selectedDrone}/>
            <br/>
            <br/>
              <ControlOptions  drone={selectedDrone}/>
          </RightSide>

      </RowTable>

    </AppBack>
    
  );
}