import React from "react";
import './authentication.css'
import CropDinIcon from '@material-ui/icons/CropDin';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

export default function Authentication(props) {

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
                <div className="loginForm">
                    <input onChange={(e) => props.setLoginEmail(e.target.value)} type="text" placeholder='Phone or E-mail'/>
                    <input onChange={(e) => props.setLoginPassword(e.target.value)} type="text" placeholder='Password'/>
                    <div className="loginButtons">
                        <button className="signInButton" onClick={props.login}>Log in</button>
                        <p style={{color: 'rgb(129, 140, 153)'}}>Forgot password? <u style={{cursor:'pointer'}}>Reset</u></p>
                    </div>
                </div>
                <div className="loginForm">
                    <div style={{textAlign: 'center'}}>
                        <span style={{marginBottom: '-10px', fontSize: '22px', fontWeight: '700'}}>First time here?</span><br/>
                        <small>Sign up for <span style={{color: '#3CB371'}}>GoElectrical</span></small>
                    </div>
                    <input onChange={event => props.setRegFirstName(event.target.value)} style={{marginTop: '20px'}} type="text" placeholder='Your first name'/>
                    <input onChange={event => props.setRegLastName(event.target.value)} type="text" placeholder='Your last name'/>
                    <input onChange={event => props.setRegEmail(event.target.value)} type="text" placeholder='Your email'/>
                    <input onChange={event => props.setRegPassword(event.target.value)} type="text" placeholder='Your password'/>
                    <button onClick={() => props.register()} className='registerButton'>Register</button>
                </div>

                <div className='bottomBlock'>
                    <p>After registering, you will be able to charge your electric car, make payments and track you power usage. Some of the slow chargers are free, but still require the application to be used to start the charging</p>
                </div>

            </div>
        </div>
    )
}