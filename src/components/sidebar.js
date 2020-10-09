import React from "react";
import './sidebar.css'
import CropDinIcon from '@material-ui/icons/CropDin';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import SearchIcon from '@material-ui/icons/Search'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HistoryIcon from '@material-ui/icons/History';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Axios from "axios";
import moment from "moment";

export default function Sidebar(props) {
    const [menuVisibility, setMenuVisibility] = React.useState("visible")
    const [toggleVisibility, setToggleVisibility] = React.useState("hidden")

    const logout = () => {
        Axios.get("http://localhost:3001/logout").then((response) => {
            if(response.data.loggedIn === false) {
                props.setLoggedIn(false)
                props.setBalanceModalStatus(false)
                props.setProfileModalStatus(false)
            }
        })
    }

    const getStations = () => {
        Axios.get('http://localhost:3001/stations_data').then((response) =>
        console.log(response.data))
    }

    const startCharging = () => {
        if (props.loggedInUser.active_connection !== 0) {
            props.handleNotificationsDanger()
        } else {
            Axios.post('http://localhost:3001/user/{props.loggedInUser.id}/station/{props.selectedStation.station_id}/start_charging', {
                userId: props.loggedInUser.id,
                stationId: props.selectedStation.station_id,
                started_at: moment().toDate()
            }).then((response) => {
                console.log(props.loggedInUser.active_connection)
                console.log(response.data[0].active_connection)
                props.loggedInUser.active_connection = response.data[0].active_connection
                console.log(props.loggedInUser.active_connection)
                props.setUsedStation(props.selectedStation)
                props.handleNotificationsSuccess('Charging has been started')
            })
        }
    }




    return (
        <div>
            <ArrowForwardIcon onClick={() => {
                setMenuVisibility('visible')
                setToggleVisibility('hidden')
            }} style={{visibility: toggleVisibility}} className='sidebarToggle'/>
            <div className="sidenav" style={{visibility: menuVisibility}}>
                <h2 className="logo" style={{
                    display: 'inline',
                    alignItems: 'center',
                    marginRight: '100px'
                }}><CropDinIcon className="logoIcon" /> | GoElectrical</h2> <ArrowBackIcon onClick={() => {
                setMenuVisibility("hidden")
                setToggleVisibility("visible")
            }} style={{display: 'inline', cursor: 'pointer'}}/>
                <div className="headerSearch">
                    <input type="text" className="headerSearchInput" />
                    <SearchIcon className='headerIcon' />
                </div>
            <div className='navBlock'>
                <div className='sidenavLink' onClick={() => {
                    props.setProfileModalStatus(true)
                    props.setBalanceModalStatus(false)
                    props.setHistoryModalStatus(false)
                    console.log(props.loggedInUser)
                }}> <AccountBoxIcon className='sidebarIcons'/>Profile</div>
                <div className='sidenavLink' onClick={() => {
                    props.setHistoryModalStatus(true)
                    props.setBalanceModalStatus(false)
                    props.setProfileModalStatus(false)
                    props.getConnections()
                } }> <HistoryIcon className='sidebarIcons'/> Connections</div>
                <div className='sidenavLink' onClick={() => {
                    props.setBalanceModalStatus(true)
                    props.setHistoryModalStatus(false)
                    props.setProfileModalStatus(false)
                }}> <AccountBalanceWalletIcon className='sidebarIcons'/> Add balance</div>
                <div className="sidenavLink" onClick={getStations}> <DashboardIcon className='sidebarIcons' /> Subscriptions</div>
                <div className='sidenavLink' onClick={logout}> <ExitToAppIcon className='sidebarIcons'/>Logout</div>
            </div>

                {props.selectedStation &&
                 props.loggedInUser.active_connection === 0 &&
                <div className='chargingBlock'>
                    <div className='chargingBlockContent'>
                        <div className='chargingBlockTitle'>{props.selectedStation.station_name}</div>
                        <div className='chargingBlockAddress'>{props.selectedStation.station_address}</div>
                        <table className='chargingBlockDetails'>
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
                                    {props.selectedStation.is_taken === 0 ? <span>Yes</span> : <span>No</span>}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        {props.selectedStation.is_taken === 0 ?
                        <button className='startButton' onClick={() => {
                            startCharging()
                        }}>Start charging</button>
                            : null }
                    </div>
                </div>
                }

                {props.loggedInUser.active_connection !==0 && props.loggedInUser.active_connection !== null &&
                <div className='chargingBlock'>
                    <div className='chargingBlockContent'>
                        <div className='chargingBlockTitle'>Your active connection</div>
                        <div className='chargingBlockAddress'>123</div>
                        <table className='chargingBlockDetails' style={{marginLeft: '50px'}}>
                            <thead/>
                            <tbody>
                            <tr>
                                <td>Time active:</td>
                                <td>15 min</td>
                            </tr>
                            <tr>
                                <td>
                                    Power consumed:
                                </td>
                                <td>
                                    100 kWh
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <button style={{backgroundColor: '#DC143C'}} className='startButton' onClick={() => {
                            props.stopCharging()
                            props.setUsedStation(null)
                        }}>Stop charging</button>
                    </div>
                </div>
                }
            </div>
        </div>
    )
}