import React from 'react';
import './App.css';
import Map from './components/main_map'
import Authentication from './components/authentication'
import Sidebar from "./components/sidebar";



function App() {

    const [loggedIn, setLoggedIn] = React.useState(false)
    const [loggedInUser, setLoggedInUser] = React.useState('')
    const [selectedStation, setSelectedStation] = React.useState(null)
    const [usedStation, setUsedStation] = React.useState(null)

  return (
    <div>
        {loggedIn
        ? <Sidebar
                setLoggedIn={setLoggedIn}
                loggedInUser={loggedInUser}
                selectedStation={selectedStation}
                usedStation={usedStation}
                setUsedStation={setUsedStation}
                logout={() => setLoggedIn(false)}
            />
        : <Authentication
                setLoggedIn={setLoggedIn}
                setLoggedInUser={setLoggedInUser}
            />}

        <Map
            selectedStation={selectedStation}
            setSelectedStation={setSelectedStation}
        />
    </div>
  );
}

export default App;
