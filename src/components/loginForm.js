import React from "react";
import Axios from "axios";
import {useFormik} from "formik";



export default function LoginForm(props) {

    const {handleSubmit, handleChange, values} = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: (email,password) => {
            Axios.post("http://localhost:3001/login", {
                email: values.email,
                password: values.password
            }).then((response) => {
                console.log(response)
                if(response.data === true) {
                    props.setLoggedIn(true)
                }
            })
        }
    })

    return (

        <div className="loginForm">
            <form onSubmit={handleSubmit}>
            <input
                value={values.email}
                onChange={handleChange}
                id='email'
                name='email'
                type="text"
                placeholder='Phone or E-mail'/>
            <input
                value={values.password}
                onChange={handleChange}
                id='password'
                name='password'
                type="text"
                placeholder='Password'/>
            <div className="loginButtons">
                <button type='submit' className="signInButton" >Log in</button>
                <p style={{color: 'rgb(129, 140, 153)'}}>Forgot password? <u style={{cursor: 'pointer'}}>Reset</u></p>
            </div>
            </form>
        </div>
    )
}