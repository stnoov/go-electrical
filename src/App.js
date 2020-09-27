import React from 'react';
import './App.css';
import {GoogleMap, useLoadScript, Marker, InfoWindow} from "@react-google-maps/api";
import mapStyles from "./mapStyles";
import * as StationsData from './data/data.json'
import chargingStationPicture from './img/charging_station.png'
const mapContainerStyle = {
    width: '100vw',
    height: '100vh'
}
const OuluCoordinates = {
    lat: 65.0121,
    lng: 25.4651
}
const options ={
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true
}

function App() {
  const [selectedStation, setSelectedStation] = React.useState(null)

  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: 'AIzaSyAcGZ0vhjGlVA0UZdmIUH76b_JacMm4A-c'
  });
  if(loadError) return "Error loading maps";
  if(!isLoaded) return "Loading maps"
  return (
    <div>
      <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={8}
          center={OuluCoordinates}
          options={options}
      >
          {StationsData.stations.map((station) => <Marker
              onClick={() => {setSelectedStation(station)}}
              position={{lat: station.lat, lng: station.lng}}
              icon={{
                  url: chargingStationPicture,
                  scaledSize: new window.google.maps.Size(25, 25)
              }}
              />
              )
          }

          {selectedStation ? (<InfoWindow position={{lat: selectedStation.lat, lng: selectedStation.lng}} onCloseClick={() => {
              setSelectedStation(null)
          }}>
              <div>
                  <h2>{selectedStation.stationName}</h2>
                  <h4>{selectedStation.address}</h4>
                  <table>
                      <tr>
                          <td>Price:</td>
                          <td>{selectedStation.price}€/minute</td>
                      </tr>
                      <tr>
                          <td>
                              Power:
                          </td>
                          <td>
                              {selectedStation.power} kWh
                          </td>
                      </tr>
                      <tr>
                          <td>
                              Type:
                          </td>
                          <td>
                              {selectedStation.type}
                          </td>
                      </tr>
                  </table>
              </div>
          </InfoWindow>) : null}
      </GoogleMap>
    </div>
  );
}

export default App;
