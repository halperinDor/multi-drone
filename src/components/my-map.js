import React, { useEffect, useState, useCallback} from 'react';
import { MapContainer, TileLayer, Marker, Popup, FeatureGroup, useMapEvents } from 'react-leaflet';
import './components.css';
import "leaflet-draw/dist/leaflet.draw.css";
// import "leaflet/dist/leaflet.css";
import { EditControl } from "react-leaflet-draw";
import { API } from '../rest-api-service'
import { useCookies } from 'react-cookie';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import MissionSetAlt from './mission-alt';


const MapBack = styled.div`
  float: left;
  width: 75%;
  padding: 10px;
  background-color: rgb(61, 10, 61);
  //background-color:rgb(9, 89, 114);
  //background-color: #191970;
  border: none;
  border-radius: 12px;
`
const MissionBack = styled.div`
  float:left;
  width: 25%;
  padding: 10px;  
  background-color: rgb(61, 10, 61);
 // background-color:rgb(9, 89, 114);
 // background-color: #191970;
  border: none;
  border-radius: 12px;
`

const MissionTitle = styled.h4`
  text-decoration:underline;
  text-shadow: 0 0 3px #FF0000, 0 0 5px #0000FF;
`

const MissionContainer = styled.td`
  color:black;
  background-color: rgb(17, 176, 197);
  border-style: solid;
  border-color: black;
  border: none;
  border-radius: 12px;
`
const MissionText = styled.pre`
  color:black;
  background-color: white;
  height: 600px;
  scroll-margin-left: auto;
  overflow-y: auto; 
  border-radius: 10%;
  border: none;
  border-radius: 12px;
`
const SecTitle = styled.span`
    text-shadow: 0 0 3px #331010, 0 0 5px #0000FF;
`


const zoom = 35

// const missionColor = { color: 'red' }

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
      <SecTitle>Map Center: [latitude: {position.lat.toFixed(8)}, longitude: {position.lng.toFixed(8)}]{' '}
      <Button onClick={onClick} variant="info" >Go to my location</Button>
      </SecTitle>
    </p>
  )
}


 
export default  function MyMap(props){

  const center = [32.0734999, 34.7838999]

  const [mapLayers, setMapLayers] = useState([]);

  const [map, setMap] = useState(null);

  const [token] = useCookies(['user-token']);

  const [drone, setdrone] = useState([]);

 // console.log("hello world!")


  //when create path: 
  const _onCreate = e => {
    //console.log("Create it: ",e);

    const { layerType, layer} = e;

    if( layerType === "polyline" ){

      const {_leaflet_id} = layer;

      setMapLayers((layers) => [
        ...layers, 
        {id: _leaflet_id, latlngs: layer.getLatLngs()},
      ]);

    }

  };

  //edit path
  const _onEdited = (e) => {
    //console.log("Edit: ",e);
 
    // const {
    //    layers: {_layers},
      
    // } = e; 

    //   Object.values(_layers).map( ({_leaflet_id, editing }) => {
    //      setMapLayers( (layers) => 
    //      layers.map( (l) => l.id === _leaflet_id )? 
    //       {...l, latlngs: {...editing.latLng[0]} }: l)
    // });

  };

  //delete path
  const _onDeleted= e => {
    //console.log("delete it: ",e);

    const { layers: {_layers} } =e;

    Object.values(_layers).map(({_leaflet_id})=> {
      return setMapLayers( (layers) => layers.filter((l) => l.id !== _leaflet_id));

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

              
              draw={{
                rectangle: false, 
                circle: false, 
                circlemarker:false,
                marker: false,
                polygon:false,
                // polygon: false,
                
                }}
                />
            </FeatureGroup>

          


            <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />



            <LocationMarker />
            {/* <SetToUserLoction/> */}

            {/* {props.path && props.path.map(paths => (
              <Polyline pathOptions={missionColor} positions={props.path} />
            ))} */}
        
            


            {props.drones && props.drones.map(drone => (
                <Marker
                key = {drone.name}
                position = {[drone.lat, drone.lng]} 
                >
                
                <Popup><h5>{drone.name}</h5></Popup>

                </Marker>

              

            ))}
        </MapContainer>
      )


    }
 
  
    if (props.drone){
      var url = `${props.drone.id}/`;
    }
    
    useEffect(() => {
  
        if(props.drone){
  
        const intervalId = setInterval(() => {  //assign interval to a variable to clear it.
          
          API.getUpdateOneDrone(setdrone, url, token['user-token'])
                             
        }, 100)
      
        return () => clearInterval(intervalId); //This is important
        }
       
    }, [url, token, props.drone])
  
  
  

  const MarkerPlace =(props, map) =>{

    var dronePlace = "";
  
    if(props.drone){

     //console.log("i know that: ", drone)
     dronePlace = [drone.lat, drone.lng]
      map.flyTo(dronePlace, map.getZoom())
     
    }
  }



  // var popup = L.popup();

  // function onMapClick(e) {
  //     popup
  //         .setLatLng(e.latlng)
  //         .setContent("You clicked the map at " + e.latlng.toString())
  //         .openOn(map);
  // }

  // if(map){
  //   map.on('click', onMapClick)
  // }
  
   
      return (<>
     

        <MapBack>
        
        {map &&  props.drone ? <table>
                <td><DisplayPosition map={map} /></td>
                <td><Button onClick={() =>{MarkerPlace(props, map)}} variant="info">Go to {props.drone.name} location</Button></td>
                {/* <td>Hello my friends!</td> */}
                </table> : null}
          {displayMap()}
        </MapBack>
 
        <div >
        {
            props.drone ? (
              <MissionBack>
                <table>
                  
                  <MissionTitle>
                    Path for drone: {props.drone.name}
                  </MissionTitle>
                  

                  <tr >
                    <MissionContainer>
                      The Mission created so far on the map
                      <MissionText>
                      {JSON.stringify(mapLayers,0,2)
                            .replace(/[{}]/g, '')
                            .replace(/[[]/g, '')
                            .replace(/[\]']+/g, '')
                            .replace(/["]/g, '')
                            .replace(/[,]/g, '    ')}
                      </MissionText>
                    </MissionContainer>
                    </tr>
                    <tr>
                 
                    <span>
                     
                        {/* // API.sendMissonToDrone(props.drone.name, mapLayers, token['user-token']); */}
                        {/* {MissionSetAlt(props.drone.name ,mapLayers, token['user-token'])} */}
                        <MissionSetAlt name={props.drone.name} coordinates={mapLayers} token={token['user-token']}/>
                        {/* Hello World! */}
                       
                             
                  <td/>
                  <Button variant="secondary"
                    onClick={(e)=>{
                      setMapLayers([]) 
                    }}>Clean Text
                  </Button>
                 
                      </span>
                 
          
                  
                  </tr>
                  
                </table>
              </MissionBack>
                
            ) : null
        }
        </div>
  
       </>);
}