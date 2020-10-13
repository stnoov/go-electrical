import React from "react";
import ReportIcon from "@material-ui/icons/Report";
import {useFormik,} from "formik";
import * as Yup from "yup";
import Axios from "axios";




export default function Registration(props) {

    const {handleSubmit, handleChange, values, touched, errors, handleBlur, resetForm, isSubmitting} = useFormik({
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
            Axios.post("https://go-electrical-server.herokuapp.com/register", {
                first_name: values.first_name,
                last_name: values.last_name,
                email: values.email,
                password: values.password,
                balance: 0,
                created_at: Date.now()
            }).then((response) => {
                if(response.data === true) {
                    props.handleNotificationsSuccess('You have successfully registered!')
                    resetForm();
                } else {
                    props.handleNotificationsDanger(response.data)
                }
            })
        }
    })

    return (
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
                {errors.first_name && touched.first_name && errors.first_name ? (
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
                {touched.password && errors.password && (
                    <div className='inputErrors'><ReportIcon className='sidebarIcons'/>{errors.password}</div>
                ) }
                <button type="submit" className='registerButton' disabled={isSubmitting} >Register</button>
            </form>
        </div>
    )
}