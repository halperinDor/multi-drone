import React, { Component, useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Tooltip, FeatureGroup, useMapEvents, Pane, Circle } from 'react-leaflet';
import './components.css';
import L, { circle, circleMarker, imageOverlay, latLng, LatLngUtil, Map, map } from "leaflet";
import "leaflet-draw/dist/leaflet.draw.css";
import { EditControl } from "react-leaflet-draw";
// import { 
//   toLatLon, toLatitudeLongitude, headingDistanceTo, moveTo, insidePolygon 
// } from 'geolocation-utils'
import { MISSIONAPI } from './mission-send'
// import ReactJson from 'react-json-view';
import { useCookies } from 'react-cookie';
import Button from 'react-bootstrap/Button';
import { icon } from '@fortawesome/fontawesome-svg-core';
// import Card from 'react-bootstrap/Card';
// import { polyline, tooltip } from 'leaflet';
// import "./my.png";
// import {Icon} from 'leaflet';

const TOKEN = "aad9d647bf86fff01778571c1e02fb6ff62fceaf";
const center = [32.0734999, 34.7838999]
const zoom = 35


// var myIcon = L.icon({
//   iconUrl: './my.png',
//   iconSize: [40, 40],
//   iconAnchor: [22, 94],
//   popupAnchor: [-3, -76],
//   shadowSize: [68, 95],
//   shadowAnchor: [22, 94]
// });



// function GetSyncInfo(id,setdrone, token){
 

//   var url = `http://127.0.0.1:8000/api/drones/${id}/`;
//   useEffect(() => {

//       if(id !== ""){

//       const intervalId = setInterval(() => {  //assign interval to a variable to clear it.
        
//         fetch(url, {
//           method: 'GET',
//           headers:{
//               'Content-Type': 'application/json',
//               'Authorization': `Token ${token}`
//           }
//       },)
//       .then(resp => resp.json())
//       .then(resp => setdrone(resp))
//       .catch(error => console.log(error))
                           
//       }, 100)
    
//       return () => clearInterval(intervalId); //This is important
//       }
     
//   }, [url, useState])



// }




function LocationMarker() {
  const [_position, setMyPosition] = useState(null)
  
  
    const _map = useMapEvents({
      clickMarkerEvent() {
        _map.locate()
      },
      locationfound(e) {
        setMyPosition(e.latlng)
        _map.flyTo(e.latlng, _map.getZoom())
      },
    })
 

  return _position === null ? null : (
    <circleMarker position={_position}>
      
    </circleMarker>
  )
}




function DisplayPosition({ map }) {
  const [position, setPosition] = useState(map.getCenter())
 


  const onClick = useCallback(() => {
   
    map.locate()
    
    
    
  }, [map])

  const onMove = useCallback(() => {
    setPosition(map.getCenter())
  }, [map])

  useEffect(() => {
    map.on('move', onMove)
    return () => {
      map.off('move', onMove)
    }
  }, [map, onMove])

  return (
    <p >
      MAP CENTER: latitude: {position.lat.toFixed(6)}, longitude: {position.lng.toFixed(6)}{' '}
      <Button onClick={onClick} variant="info" >Reset to my location</Button>
    </p>
  )
}

 
export default  function MyMap(props){


 const [mapLayers, setMapLayers] = useState([]);
 const [OutOfBounds, setOutOfBounds] = useState([]);
 //const [data, setData] = useState([]);
 const [map, setMap] = useState(null);










  
  //when create p: 
  const _onCreate = e => {

   // console.log(e);
    const { layerType, layer} = e;

    if( layerType === "polyline" ){

      const {_leaflet_id} = layer;

      setMapLayers((layers) => [
        ...layers, 
        {id: _leaflet_id, latlngs: layer.getLatLngs()},
      ]);

    }

  };

  const _onEdited = e => {
  // console.log(e);

    const {
       layers: {_layers},
      
    } = e; 

      Object.values(_layers).map( ({_leaflet_id, editing }) => {
        setMapLayers( (layers) => 
         layers.map( (l) => l.id --- _leaflet_id
            ? { ...l, latlngs: {...editing.latLng} }
            : l
          )
        );
    });

  };

  const _onDeleted= e => {
   // console.log(e.latLng);

    const { layers: {_layers} } =e;

    Object.values(_layers).map(({_leaflet_id})=> {
      setMapLayers( (layers) => layers.filter((l) => l.id !== _leaflet_id));

    })

  }

  



   


    function displayMap(){

      return(
        <MapContainer

        center={center} 
        zoom={zoom} 
        scrollWheelZoom={false}
        whenCreated={setMap}> 
    
    
          


        <FeatureGroup>
          <EditControl 
          position="topright" 
          onCreated={_onCreate} 
          onEdited= {_onEdited}
          onDeleted = {_onDeleted}

         title = {'ggg'}
          
          draw={{
            rectangle: false, 
            circle: false, 
            circlemarker:false,
            marker: false,
            
            }}
            />
        </FeatureGroup>

      


    <TileLayer
    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />



<LocationMarker />
    



    {props.drones && props.drones.map(drone => (
        <Marker
        key = {drone.name}
        position = {[drone.lat, drone.lng]} 
        >
        
        <Popup>{drone.name}</Popup>

        </Marker>

      

    ))}
  </MapContainer>
      )


    }
 

   // GetSyncInfo(setData)

   // console.log("i want to see:", data);




   const [drone, setdrone] = useState([]);
   const [token] = useCookies(['mr-token']);

 
    if (props.drone){
      var url = `http://127.0.0.1:8000/api/drones/${props.drone.id}/`;
    }
    
    useEffect(() => {
  
        if(props.drone){
  
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
  
  
  

   const MarkerPlace =(props, map) =>{

   
   
    var dronePlace = "";
  
    //console.log("sahar");
    if(props.drone){

      //console.log("dor: ", props.drone.id)

      // GetSyncInfo(props.drone.id, setdrone, token['mr-token']);
     //dronePlace = [drone.lat, drone.lng]

     console.log("i know that: ", drone)
     dronePlace = [drone.lat, drone.lng]
      //dronePlace = [props.drone.lat, props.drone.lng]
      map.flyTo(dronePlace, map.getZoom())
     
    }
  }

  
      

   
      return (<>
     

     

        <div className="my-map">
        
        {map,  props.drone ? <table>
                <td><DisplayPosition map={map} /></td>
                <td><Button onClick={() =>{MarkerPlace(props, map)}} variant="info">Reset to {props.drone.name} location</Button></td>
                </table> : null}
          {displayMap()}

         


        </div>

        
  <div >
        {
            props.drone ? (
              <div className="my-mission">
                <table>
                  
                  <tr 
                     >Path for drone: {props.drone.name}
                  </tr>
                  

                  <tr >
                    <td className="text-left">
                    The Mission created so far on the map:
                   
                    <pre className="mission-text">
                     {JSON.stringify(mapLayers,0,2)
                      .replace(/[{}]/g, '')
                      .replace(/[[]/g, '')
                      .replace(/[\]']+/g, '')
                      .replace(/["]/g, '')
                      .replace(/[,]/g, '    ')}
                    </pre>
                    </td>
                    <td>
                    {/* <StyledDropzone /> */}
                    </td>
                    </tr>
                    <tr>
                  
                    <Button 
                      onClick={(e) => {
                        MISSIONAPI.sendMissonToDrone(props.drone.name, mapLayers);
                      }}>
                        Send Mission
                    </Button>
                  
                  </tr>
                  
                </table>
              </div>
                
            ) : null
        }
       
    </div>
  

  
  </>);



}