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
import Axios from "axios";

export default function Sidebar(props) {
    const [menuVisibility, setMenuVisibility] = React.useState("shown")
    const [toggleVisibility, setToggleVisibility] = React.useState("hidden")

    const logout = () => {
        Axios.get("http://localhost:3001/logout").then((response) => {
            if(response.data.loggedIn === false) {
                props.setLoggedIn(false)
            }
        })
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
                <div className='sidenavLink' onClick={() => console.log(props.loggedInUser)}> <AccountBoxIcon className='sidebarIcons'/>Profile</div>
                <div className='sidenavLink'> <HistoryIcon className='sidebarIcons'/> History</div>
                <div className='sidenavLink'> <AccountBalanceWalletIcon className='sidebarIcons'/> Add balance</div>
                <div className='sidenavLink' onClick={logout}> <ExitToAppIcon className='sidebarIcons'/>Logout</div>
            </div>

                {props.selectedStation &&
                    !props.usedStation &&
                <div className='chargingBlock'>
                    <div className='chargingBlockContent'>
                        <div className='chargingBlockTitle'>{props.selectedStation.stationName}</div>
                        <div className='chargingBlockAddress'>{props.selectedStation.address}</div>
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
                        <button className='startButton' onClick={() => {
                            props.setUsedStation(props.selectedStation)
                        }}>Start charging</button>
                    </div>
                </div>
                }

                {props.usedStation &&
                <div className='chargingBlock'>
                    <div className='chargingBlockContent'>
                        <div className='chargingBlockTitle'>Your active connection</div>
                        <div className='chargingBlockAddress'>{props.usedStation.stationName}</div>
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
                        <button style={{backgroundColor: '#DC143C'}} className='startButton' onClick={() => props.setUsedStation(null)}>Stop charging</button>
                    </div>
                </div>
                }
            </div>
        </div>
    )
}