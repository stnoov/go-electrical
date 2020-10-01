import React from 'react';
import './App.css';
import Map from './components/main_map'
import Authentication from './components/authentication'
import Sidebar from "./components/sidebar";
import BalanceModal from "./components/balanceModal";
import ProfileModal from './components/profileModal'



function App() {

    const [loggedIn, setLoggedIn] = React.useState(false)
    const [balanceModalStatus,setBalanceModalStatus] = React.useState(false);
    const [profileModalStatus, setProfileModalStatus] = React.useState(false)
    const [loggedInUser, setLoggedInUser] = React.useState('')
    const [selectedStation, setSelectedStation] = React.useState(null)
    const [usedStation, setUsedStation] = React.useState(null)

  return (
    <div>
        <ProfileModal
            loggedInUser={loggedInUser}
            setProfileModalStatus={setProfileModalStatus}
            profileModalStatus={profileModalStatus}
            />
        <BalanceModal
            loggedInUser={loggedInUser}
            setLoggedInUser={setLoggedInUser}
            balanceModalStatus={balanceModalStatus}
            setBalanceModalStatus={setBalanceModalStatus}
        />
        {loggedIn
        ? <Sidebar
                setProfileModalStatus={setProfileModalStatus}
                setLoggedIn={setLoggedIn}
                loggedInUser={loggedInUser}
                selectedStation={selectedStation}
                usedStation={usedStation}
                setUsedStation={setUsedStation}
                setBalanceModalStatus={setBalanceModalStatus}
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
