import mapStyles from "../mapStyles";
import React from "react";
import {GoogleMap, InfoWindow, Marker, useLoadScript} from "@react-google-maps/api";
import * as StationsData from "../data/data.json";
import chargingStationPicture from "../img/charging_station.png";

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


    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: 'AIzaSyAcGZ0vhjGlVA0UZdmIUH76b_JacMm4A-c'
    });
    if(loadError) return "Error loading maps";
    if(!isLoaded) return "Loading maps"
    return (
        <div>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={14}
                center={OuluCoordinates}
                options={options}
            >
                {StationsData.stations.map((station) => <Marker
                        key={station.stationID}
                        onClick={() => {props.setSelectedStation(station)}}
                        position={{lat: station.lat, lng: station.lng}}
                        icon={{
                            url: chargingStationPicture,
                            scaledSize: new window.google.maps.Size(25, 25)
                        }}
                    />
                )
                }

                {props.selectedStation ? (<InfoWindow position={{lat: props.selectedStation.lat, lng: props.selectedStation.lng}} onCloseClick={() => {
                    props.setSelectedStation(null)
                }}>
                    <div>
                        <span style={{fontSize: '18px', fontWeight: '600'}}>{props.selectedStation.stationName}</span><br/>
                        <span style={{fontSize: '14px', fontWeight: '400'}}>{props.selectedStation.address}</span>
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
                                    {props.selectedStation.power} kWh
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Type:
                                </td>
                                <td>
                                    {props.selectedStation.type}
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