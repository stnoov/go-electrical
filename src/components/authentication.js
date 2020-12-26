import React from "react";
import './authentication.css'
import CropDinIcon from '@material-ui/icons/CropDin';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import LoginForm from "./loginForm";
import 'animate.css';
import 'react-notifications-component/dist/theme.css'
import Registration from "./registration";

export default function Authentication(props) {

    const [menuVisibility, setMenuVisibility] = React.useState("shown")
    const [toggleVisibility, setToggleVisibility] = React.useState("hidden")



    return (
        <div>
            <div className="sidenav" style={{visibility: menuVisibility}}>
                <ArrowForwardIcon onClick={() => {
                    setMenuVisibility('visible')
                    setToggleVisibility('hidden')
                }} style={{visibility: toggleVisibility}} className='sidebarToggle'/>
                <div className='sidenav-header-block'>
                    <div className="sidenav_logo_block">
                        <CropDinIcon className="logoIcon" />
                        <h2 className="logo">| GoElectrical</h2>
                    </div>
                    <ArrowBackIcon className='sidenav_arrow_back' onClick={() => {
                        setMenuVisibility("hidden")
                        setToggleVisibility("visible")
                    }}/>
                </div>


                    <LoginForm
                        setLoggedIn={props.setLoggedIn}
                        setLoggedInUser={props.setLoggedInUser}
                        handleNotificationsDanger={props.handleNotificationsDanger}
                        handleNotificationsSuccess={props.handleNotificationsSuccess}
                    />

                    <Registration
                        handleNotificationsSuccess={props.handleNotificationsSuccess}
                        handleNotificationsDanger={props.handleNotificationsDanger}
                    />


                <div className='bottomBlock'>
                    <p>After registering, you will be able to charge your electric car, make payments and track you power usage. Some of the slow chargers are free, but still require the application to be used to start the charging</p>
                </div>

            </div>
        </div>
    )
}