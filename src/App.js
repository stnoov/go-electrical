import React from 'react';
import './App.css';
import Map from './components/main_map'
import Authentication from './components/authentication'
import Sidebar from "./components/sidebar";
import BalanceModal from "./components/balanceModal";
import ProfileModal from './components/profileModal'
import ReactNotification, {store} from "react-notifications-component";



function App() {

    const [loggedIn, setLoggedIn] = React.useState(false)
    const [balanceModalStatus,setBalanceModalStatus] = React.useState(false);
    const [profileModalStatus, setProfileModalStatus] = React.useState(false)
    const [loggedInUser, setLoggedInUser] = React.useState('')
    const [selectedStation, setSelectedStation] = React.useState(null)
    const [usedStation, setUsedStation] = React.useState(null)

    const handleNotificationsSuccess = (message) => {
        store.addNotification({
            title: "Success!",
            message: message,
            type: "success",
            container: 'top-right',
            insert: 'top',
            dismiss: {
                duration: 5000,
                showIcon: true
            },
            width: 550
        })
    }

    const handleNotificationsDanger = () => {
        store.addNotification({
            title: "ERROR!",
            message: "Ooops! Something went wrong!",
            type: "danger",
            container: 'top-right',
            insert: 'top',
            dismiss: {
                duration: 5000,
                showIcon: true
            },
            width: 550
        })
    }

  return (
    <div>
        <ReactNotification />
        <ProfileModal
            setLoggedInUser={setLoggedInUser}
            handleNotificationsDanger={handleNotificationsDanger}
            handleNotificationsSuccess={handleNotificationsSuccess}
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
                handleNotificationsDanger={handleNotificationsDanger}
                handleNotificationsSuccess={handleNotificationsSuccess}
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
