import React from 'react';
import './App.css';
import Map from './components/main_map'
import Authentication from './components/authentication'
import Sidebar from "./components/sidebar";
import BalanceModal from "./components/balanceModal";
import ProfileModal from './components/profileModal'
import ReactNotification, {store} from "react-notifications-component";
import Connections from "./components/connections";
import Axios from "axios";
import moment from "moment";
require('dotenv').config()



function App() {

    const [currentConnections, getCurrentConnections] = React.useState()
    const [loggedIn, setLoggedIn] = React.useState(false)
    const [balanceModalStatus,setBalanceModalStatus] = React.useState(false);
    const [profileModalStatus, setProfileModalStatus] = React.useState(false);
    const [historyModalStatus, setHistoryModalStatus] = React.useState(false);
    const [loggedInUser, setLoggedInUser] = React.useState('')
    const [selectedStation, setSelectedStation] = React.useState(null)
    const [usedStation, setUsedStation] = React.useState(null)

    React.useEffect(() => {
        document.title = "Go Electrical"
    }, []);

    const getConnections = () => {
        Axios.post('https://go-electrical-server.herokuapp.com/connections_data', {
            userId: loggedInUser.id
        }).then((response) => {
            getCurrentConnections(response.data)
        })
    }

    const stopCharging = (active_con, bill) => {
        console.log(bill)
        Axios.post('https://go-electrical-server.herokuapp.com/user/{props.loggedInUser.id}/station/{props.selectedStation.station_id}/stop_charging', {
            userId: loggedInUser.id,
            userEmail: loggedInUser.email,
            activeCon: active_con,
            finishedAt: moment().toDate(),
            bill: bill
        }).then(
            (response) => {
                setLoggedInUser(response.data[0])
            }
        )
        setUsedStation(null)
        handleNotificationsSuccess('Charging has been stopped')
    }

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
            width: 700
        })
    }

    const handleNotificationsDanger = (message) => {
        store.addNotification({
            title: "ERROR!",
            message: message,
            type: "danger",
            container: 'top-right',
            insert: 'top',
            dismiss: {
                duration: 5000,
                showIcon: true
            },
            width: 700
        })
    }
  return (

    <div className='main__page'>
        <ReactNotification />
        <Connections
            stopCharging={stopCharging}
            currentConnections={currentConnections}
            getCurrentConnections={getCurrentConnections}
            loggedInUser={loggedInUser}
            setHistoryModalStatus={setHistoryModalStatus}
            historyModalStatus={historyModalStatus}
        />
        <ProfileModal
            setLoggedInUser={setLoggedInUser}
            handleNotificationsDanger={handleNotificationsDanger}
            handleNotificationsSuccess={handleNotificationsSuccess}
            loggedInUser={loggedInUser}
            setProfileModalStatus={setProfileModalStatus}
            profileModalStatus={profileModalStatus}
            />
        <BalanceModal
            handleNotificationsSuccess={handleNotificationsSuccess}
            loggedInUser={loggedInUser}
            setLoggedInUser={setLoggedInUser}
            balanceModalStatus={balanceModalStatus}
            setBalanceModalStatus={setBalanceModalStatus}
        />
        {loggedIn
        ? <Sidebar
                setLoggedInUser={setLoggedInUser}
                stopCharging={stopCharging}
                getConnections={getConnections}
                currentConnections={currentConnections}
                getCurrentConnections={getCurrentConnections}
                historyModalStatus={historyModalStatus}
                setHistoryModalStatus={setHistoryModalStatus}
                handleNotificationsSuccess={handleNotificationsSuccess}
                handleNotificationsDanger={handleNotificationsDanger}
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
