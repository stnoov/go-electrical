import React from "react";
import './authentication.css'
import CropDinIcon from '@material-ui/icons/CropDin';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import {useFormik} from "formik";
import Axios from "axios";
import LoginForm from "./loginForm";
import * as Yup from 'yup'
import ReportIcon from '@material-ui/icons/Report';
import ReactNotification from 'react-notifications-component'
import 'animate.css';
import {store} from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

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

    const handleNotificationsDanger = () => {
        store.addNotification({
            title: "ERROR!",
            message: "User with this email is already registered",
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


    const {handleSubmit, handleChange, values, touched, errors, handleBlur} = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            first_name: Yup.string().max(100, 'First name is too long!').min(2, 'First name is too short!').required('First name is required!'),
            last_name: Yup.string().max(100, 'Last name is too long!').min(2, 'Last name is too short!').required('Last name is required!'),
            email: Yup.string().email('Invalid email').max(250, 'Email is too long!').min(8, 'Email must be at least 8 characters!').required('Email is required!'),
            password: Yup.string().max(250, 'Password is too long!').min(6, 'Password must be at least 6 characters!').required('Password is required!')
        }),
        onSubmit: (values) => {
            Axios.post("http://localhost:3001/register", {
                first_name: values.first_name,
                last_name: values.last_name,
                email: values.email,
                password: values.password,
                created_at: Date.now()
            }).then((response) => {
                if(response.data === true) {
                    console.log(response)
                    handleNotificationsSuccess()
                } else {
                    console.log('ERROR!', response)
                    handleNotificationsDanger()
                }


            })
        }
    })


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

                    <LoginForm setLoggedIn={props.setLoggedIn}/>

                <div className="loginForm">
                    <div style={{textAlign: 'center'}}>
                        <span style={{marginBottom: '-10px', fontSize: '22px', fontWeight: '700'}}>First time here?</span><br/>
                        <small>Sign up for <span style={{color: '#3CB371'}}>GoElectrical</span></small>
                    </div>
                    <form onSubmit={handleSubmit}>
                    <input
                        onBlur={handleBlur}
                        value={values.first_name}
                        onChange={handleChange}
                        style={{marginTop: '20px'}}
                        id='first_name'
                        name='first_name'
                        placeholder='Your first name'/>
                        {touched.first_name && errors.first_name ? (
                            <div className='inputErrors'><ReportIcon className='sidebarIcons'/>{errors.first_name}</div>
                        ) : null }
                    <input
                        onBlur={handleBlur}
                        value={values.last_name}
                        onChange={handleChange}
                        id='last_name'
                        name='last_name'
                        placeholder='Your last name'/>
                        {touched.last_name && errors.last_name ? (
                            <div className='inputErrors'><ReportIcon className='sidebarIcons'/>{errors.last_name}</div>
                        ) : null }
                    <input
                        onBlur={handleBlur}
                        value={values.email}
                        onChange={handleChange}
                        id='email'
                        name='email'
                        placeholder='Your email'/>
                        {touched.email && errors.email ? (
                            <div className='inputErrors'><ReportIcon className='sidebarIcons'/>{errors.email}</div>
                        ) : null }
                    <input
                        onBlur={handleBlur}
                        value={values.password}
                        onChange={handleChange}
                        type='password'
                        id='password'
                        name='password'
                        placeholder='Your password'/>
                        {touched.password && errors.password ? (
                            <div className='inputErrors'><ReportIcon className='sidebarIcons'/>{errors.password}</div>
                        ) : null }
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