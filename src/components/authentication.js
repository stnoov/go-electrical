import React from "react";
import './authentication.css'
import CropDinIcon from '@material-ui/icons/CropDin';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import {useFormik} from "formik";
import Axios from "axios";
import LoginForm from "./loginForm";

export default function Authentication(props) {

    const [menuVisibility, setMenuVisibility] = React.useState("shown")
    const [toggleVisibility, setToggleVisibility] = React.useState("hidden")



    const {handleSubmit, handleChange, values} = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            email: '',
            password: ''
        },
        onSubmit: (values) => {
            Axios.post("http://localhost:3001/register", {
                first_name: values.first_name,
                last_name: values.last_name,
                email: values.email,
                password: values.password,
                created_at: Date.now()
            }).then((response) => {
                console.log(response)
            })
        }
    })


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

                    <LoginForm setLoggedIn={props.setLoggedIn}/>

                <div className="loginForm">
                    <div style={{textAlign: 'center'}}>
                        <span style={{marginBottom: '-10px', fontSize: '22px', fontWeight: '700'}}>First time here?</span><br/>
                        <small>Sign up for <span style={{color: '#3CB371'}}>GoElectrical</span></small>
                    </div>
                    <form onSubmit={handleSubmit}>
                    <input
                        value={values.first_name}
                        onChange={handleChange}
                        style={{marginTop: '20px'}}
                        id='first_name'
                        name='first_name'
                        placeholder='Your first name'/>
                    <input
                        value={values.last_name}
                        onChange={handleChange}
                        id='last_name'
                        name='last_name'
                        placeholder='Your last name'/>
                    <input
                        value={values.email}
                        onChange={handleChange}
                        id='email'
                        name='email'
                        placeholder='Your email'/>
                    <input
                        value={values.password}
                        onChange={handleChange}
                        id='password'
                        name='password'
                        placeholder='Your password'/>
                    <button type="submit" className='registerButton'>Register</button>
                    </form>
                </div>

                <div className='bottomBlock'>
                    <p>After registering, you will be able to charge your electric car, make payments and track you power usage. Some of the slow chargers are free, but still require the application to be used to start the charging</p>
                </div>

            </div>
        </div>
    )
}