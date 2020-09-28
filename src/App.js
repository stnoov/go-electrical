import React from 'react';
import './App.css';
import Map from './components/main_map'
import Authentication from './components/authentication'
import Sidebar from "./components/sidebar";

function App() {

    const[loggedIn, setLoggedIn] = React.useState(false)

    const [selectedStation, setSelectedStation] = React.useState(null)

  return (
    <div>
        {loggedIn
        ? <Sidebar
                selectedStation={selectedStation}
                logout={() => setLoggedIn(false)}/>
        : <Authentication
                login={() => setLoggedIn(true)}/>}

        <Map selectedStation={selectedStation} setSelectedStation={setSelectedStation}/>
    </div>
  );
}

export default App;
