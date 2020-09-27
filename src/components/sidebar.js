import React from "react";
import './sidebar.css'
import CropDinIcon from '@material-ui/icons/CropDin';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export default function Sidebar() {

    const [menuVisibility, setMenuVisibility] = React.useState("shown")

    return (

        <div className="sidenav" style={{visibility: menuVisibility}}>
            <h2 className="logo" style={{
                display: 'inline',
                alignItems: 'center',
                marginRight: '100px'
            }}><CropDinIcon className="logoIcon" /> | GoElectrical</h2> <ArrowBackIcon onClick={() => setMenuVisibility("hidden")} style={{display: 'inline'}}/>
            <div className="loginForm">
                <input type="text" placeholder='Phone or E-mail'/>
                <input type="text" placeholder='Password'/>
                <div className="loginButtons">
                    <button className="signInButton">Log in</button>
                    <p style={{color: 'rgb(129, 140, 153)'}}>Forgot password? <u>Reset</u></p>
                </div>
            </div>
            <div style={{textAlign: 'center'}}>
                <h2 style={{marginBottom: '-5px'}}>First time here?</h2>
                <small>Sign up for <span style={{color: '#3CB371'}}>GoElectrical</span></small>
            </div>
            <div className="loginForm">
                <input type="text" placeholder='Your first name'/>
                <input type="text" placeholder='Your last name'/>
                <input type="text" placeholder='Your email'/>
                <button className='registerButton'>Continue registration</button>
            </div>

            <div className='bottomBlock'>
                <p>After registering, you will be able to charge your electric car, make payments and track you power usage</p>
            </div>

        </div>
    )
}