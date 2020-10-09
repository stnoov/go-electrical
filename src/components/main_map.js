import mapStyles from "../mapStyles";
import React, {useEffect} from "react";
import {GoogleMap, InfoWindow, Marker, useLoadScript} from "@react-google-maps/api";
import chargingStationPicture from "../img/charging_station.png";
import Axios from "axios";


let StationsData = {}

const mapContainerStyle = {
    width: '100vw',
    height: '100vh'
}
const OuluCoordinates = {
    lat: 65.0121,
    lng: 25.4651
}
const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true
}

function Map(props) {

    useEffect(() => {
        Axios.get('http://localhost:3001/stations_data').then((response) => {
            StationsData = response.data
        })
    })

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: 'AIzaSyAcGZ0vhjGlVA0UZdmIUH76b_JacMm4A-c'
    });
    if(loadError) return "Error loading maps";
    if(!isLoaded) return "Loading maps"
    return (
        <div>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={13}
                center={OuluCoordinates}
                options={options}
            >
                {StationsData.length > 0 &&
                    StationsData.map((station, index) => <Marker
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
                            </tbody>
                        </table>
                    </div>
                </InfoWindow>) : null}
            </GoogleMap>
        </div>
    );
}

export default Map;