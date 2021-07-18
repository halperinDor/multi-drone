import React, { useState, useEffect } from 'react';
import './App.css';
import DroneList from './components/drone-list';
import DroneDetails from './components/drone-details';
import MyMap from './components/leaf-map';
import OptionsMenu from './components/options-menu';
import { API } from './api-service'
import icon from './drone.jpg';
import { faSignOutAlt, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { useCookies } from 'react-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Example from './modal';


// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       refetchOnWindowFocus: true,
//     },
//   },
// })


function CallData(setDrone ,token) {
  var baseUrl = `http://127.0.0.1:8000/api/drones/` ;

  return useEffect(() => {

   

    const intervalId = setInterval(() => {  //assign interval to a variable to clear it.
      
      fetch(`http://127.0.0.1:8000/api/drones/`, {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
    },)
    .then(resp => resp.json())
    .then(resp => setDrone(resp))
    .catch(error => console.log(error))
                         
    }, 100)
  
    return () => clearInterval(intervalId); //This is important
    
   
  }, [baseUrl, useState])

}

export default function App() {
  
  const [drones, setDrone] = useState([]);

  const [selectedDrone, setSelectedDrone] = useState(null);

  const [token, setToken, deleteToken] = useCookies(['mr-token']);



 
  const droneClicked = drone => {
    setSelectedDrone(drone);
  }

 


  CallData(setDrone, token['mr-token']);


  useEffect(()=>{
    if(!token['mr-token']) window.location.href = '/';
  }, [token])

  
  const logOutUser = () => {
    deleteToken(['mr-token']);
  }

  const displayInfo = ()=> {
    console.log("info ka ka");

  }
  
 

  return (
    <div className="App">
      
  

    <header className="App-header">
        
        <h1 ><img src={icon}  alt="drone image" height={75} width={75} ></img>Multi-Drone</h1>
        {/* <FontAwesomeIcon icon={faInfoCircle} onClick={displayInfo}/>  */}
        <FontAwesomeIcon icon={faSignOutAlt} onClick={logOutUser}/>
        <Example/>
      </header>
      {/* <header>hello</header> */}

 
      
      


      <div className="row">

        <div className="list_of_drones" >
         
          <DroneList drones={drones} droneClicked={droneClicked}/>
        </div>

        <div className="map" >
          <MyMap drones={drones} drone={selectedDrone} />
        </div>

        <div className="details" >
            {/* <QueryClientProvider client={queryClient}> */}
            <br/>
            <DroneDetails drone={selectedDrone}/>
            {/* </QueryClientProvider> */}
            <br/>
          <OptionsMenu  drone={selectedDrone}/>
        </div>

      </div>


    </div>
    
  

   
  );
}


