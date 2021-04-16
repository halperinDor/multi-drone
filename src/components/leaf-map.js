import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
import React from 'react';


export default function LocationMarker(props){

    

    return(<MapContainer 
        center={[32.0734999, 34.7838999]} 
        zoom={5} 
        scrollWheelZoom={false}>
    
        <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {props.drones && props.drones.map(drone => (
            <Marker
            key = {drone.name}
            position = {[drone.lat, drone.lng]}>
            <Popup>{drone.name}</Popup>
            
            </Marker>
        ))}


    </MapContainer>)

}



