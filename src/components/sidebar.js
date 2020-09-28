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

export default function Sidebar(props) {
    const [menuVisibility, setMenuVisibility] = React.useState("shown")
    const [toggleVisibility, setToggleVisibility] = React.useState("hidden")

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
                <div className='sidenavLink'> <AccountBoxIcon/>Profile</div>
                <div className='sidenavLink'> <HistoryIcon /> History</div>
                <div className='sidenavLink'> <AccountBalanceWalletIcon /> Add balance</div>
                <div className='sidenavLink' onClick={props.logout}> <ExitToAppIcon />Logout</div>
            </div>

                {props.selectedStation &&
                <div className='chargingBlock'>
                    <div className='chargingBlockContent'>
                        <div className='chargingBlockTitle'>{props.selectedStation.stationName}</div>
                        <div className='chargingBlockAddress'>{props.selectedStation.address}</div>
                        <table className='chargingBlockDetails'>
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
                        </table>
                        <button className='startButton'>Start charging</button>
                    </div>
                </div>
                }
            </div>
        </div>
    )
}