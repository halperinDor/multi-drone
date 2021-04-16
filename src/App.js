import React, { useState, useEffect } from 'react';
import './App.css';
import DroneList from './components/drone-list';
import DroneDetails from './components/drone-details';
import LocationMarker from './components/leaf-map';
import OptionsMenu from './components/options-menu';
import { API } from './api-service'


function CallData(setDrone) {

  return useEffect(() => {

    API.updateDrone()
      .then(resp => resp.json())
      .then(resp => setDrone(resp))
      .catch(error => console.log(error));

  }, );

}

export default function App() {
  
  const [drones, setDrone] = useState([]);

  const [selectedDrone, setSelectedDrone] = useState(null);

 
  const droneClicked = drone => {
    setSelectedDrone(drone);
  }

  
  CallData(setDrone);


  return (
    <div className="App">

      <header className="App-header">
        <h1>Multi Drone Interface</h1>
      </header>


      <div className="row">

        <div className="list_of_drones" >
          <h2>Drones</h2>
          <DroneList drones={drones} droneClicked={droneClicked}/>
        </div>

        <div className="map" >
          <LocationMarker drones={drones} drone={selectedDrone} />
        </div>

        <div className="details" >
          <h2>Details</h2>
          <DroneDetails drones={drones} drone={selectedDrone}/>
          <h2 >_______________________________________</h2>
          <OptionsMenu drones={drones} drone={selectedDrone}/>
        </div>

      </div>


    </div>

   
  );
}


