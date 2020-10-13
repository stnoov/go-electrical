import mapStyles from "../mapStyles";
import React, {useEffect, useState} from "react";
import {GoogleMap, InfoWindow, Marker, useLoadScript} from "@react-google-maps/api";
import chargingStationPicture from "../img/charging_station.png";
import Axios from "axios";
import SearchBar from "./searchBar";


const mapContainerStyle = {
    width: '100vw',
    height: '100vh'
}


const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true
}

 const Map = (props) => {
    const [stations, setStations] = useState([]);
    useEffect(() => {
        Axios.get('https://go-electrical-server.herokuapp.com/stations_data').then((response) => {
            setStations(response.data);
        })
    })
     const [center,setCenter] = React.useState({
         lat: 65.0121,
         lng: 25.4651
     })
    const [zoom, setZoom] = React.useState(13)
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: 'AIzaSyAcGZ0vhjGlVA0UZdmIUH76b_JacMm4A-c'
    });
    if(loadError) return "Error loading maps";
    if(!isLoaded) return "Loading maps"
    return (
        <div>
            <SearchBar
                setCenter={setCenter}
                setZoom={setZoom}
            />
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={zoom}
                center={center}
                options={options}
            >
                {stations.length > 0 &&
                    stations.map((station, index) => <Marker
                            key={index}
                            onClick={() => {props.setSelectedStation(station)}}
                            position={{lat: station.lat, lng: station.lng}}
                            icon={{
                                url: chargingStationPicture,
                                scaledSize: new window.google.maps.Size(25, 25)
                            }}
                        />
                    )
                    }
                }

                {props.selectedStation ? (<InfoWindow position={{lat: props.selectedStation.lat, lng: props.selectedStation.lng}} onCloseClick={() => {
                    props.setSelectedStation(null)
                }}>
                    <div>
                        <span style={{fontSize: '18px', fontWeight: '600'}}>{props.selectedStation.station_name}</span><br/>
                        <span style={{fontSize: '14px', fontWeight: '400'}}>{props.selectedStation.station_address}</span>
                        <table>
                            <thead/>
                            <tbody>
                            <tr>
                                <td>Price:</td>
                                <td>{props.selectedStation.price}€/minute</td>
                            </tr>
                            <tr>
                                <td>
                                    Power:
                                </td>
                                <td>
                                    {props.selectedStation.power}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Type:
                                </td>
                                <td>
                                    {props.selectedStation.station_type}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Free:
                                </td>
                                <td>
                                    {props.selectedStation.is_taken === 0 ? 'Yes' : 'No'}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </InfoWindow>) : null}
            </GoogleMap>
        </div>
    );
}

export default Map;