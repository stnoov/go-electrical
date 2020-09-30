import React from "react";
import './authentication.css'
import CropDinIcon from '@material-ui/icons/CropDin';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import LoginForm from "./loginForm";
import ReactNotification from 'react-notifications-component'
import 'animate.css';
import {store} from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import Registration from "./registration";

export default function Authentication(props) {

    const [menuVisibility, setMenuVisibility] = React.useState("shown")
    const [toggleVisibility, setToggleVisibility] = React.useState("hidden")

    const handleNotificationsSuccess = () => {
        store.addNotification({
            title: "You have been successfully registered",
            message: "Now you can use all the features of the app",
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

    const handleNotificationsDanger = (message = 'ERROR!') => {
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
            width: 550
        })
    }

    return (
        <div>
            <ReactNotification />
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

                    <LoginForm
                        setLoggedIn={props.setLoggedIn}
                        handleNotificationsDanger={handleNotificationsDanger}
                        handleNotificationsSuccess={handleNotificationsSuccess}
                    />

                    <Registration
                        handleNotificationsSuccess={handleNotificationsSuccess}
                        handleNotificationsDanger={handleNotificationsDanger}
                    />


                <div className='bottomBlock'>
                    <p>After registering, you will be able to charge your electric car, make payments and track you power usage. Some of the slow chargers are free, but still require the application to be used to start the charging</p>
                </div>

            </div>
        </div>
    )
}