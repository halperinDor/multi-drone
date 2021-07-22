import L from 'leaflet';
import './my.jpg';

const iconDrone = new L.Icon({
    iconUrl: require('../static/d-marker.jpg'),
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    className: 'leaflet-div-icon'
});

export { iconDrone };