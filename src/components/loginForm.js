import React, {useEffect} from "react";
import Axios from "axios";
import {useFormik} from "formik";



export default function LoginForm(props) {


    Axios.defaults.withCredentials = true;

    const {handleSubmit, handleChange, values} = useFormik({
        initialValues: {
            loginEmail: '',
            loginPassword: ''
        },
        onSubmit: (loginEmail,loginPassword) => {
            Axios.post("https://go-electrical-server.herokuapp.com/login", {
                email: values.loginEmail,
                password: values.loginPassword
            }).then((response) => {
                if(!response.data === false) {
                    props.setLoggedInUser(response.data[0])
                    props.setLoggedIn(true)
                    props.handleNotificationsSuccess('You have successfully logged in!')
                } else {
                    props.handleNotificationsDanger(response.data)
                }
            })
        }
    })

    useEffect(() => {
        Axios.get("https://go-electrical-server.herokuapp.com/login").then((response) => {
            if(response.data.loggedIn === true) {
                props.setLoggedIn(true)
                props.setLoggedInUser(response.data.user[0])
            }
        })
    }, [])

    return (

        <div className="loginForm">
            <form onSubmit={handleSubmit}>
            <input
                value={values.loginEmail}
                onChange={handleChange}
                id='loginEmail'
                name='loginEmail'
                placeholder='Phone or E-mail'/>
            <input
                value={values.loginPassword}
                onChange={handleChange}
                id='loginPassword'
                name='loginPassword'
                type='password'
                placeholder='Password'/>
            <div className="loginButtons">
                <button type='submit' className="signInButton" >Log in</button>
                <p style={{color: 'rgb(129, 140, 153)'}}>Forgot password? <u style={{cursor: 'pointer'}}>Reset</u></p>
            </div>
            </form>
        </div>
    )
}