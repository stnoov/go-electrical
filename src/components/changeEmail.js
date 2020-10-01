import React from "react";
import Axios from "axios";
import {useFormik} from "formik";
import * as Yup from "yup";
import ReportIcon from "@material-ui/icons/Report";



export default function ChangeEmail(props) {

    const{handleSubmit, handleChange, values, touched, errors, handleBlur} = useFormik({
        initialValues: {
            newEmail: ''
        },
        validationSchema: Yup.object({
            newEmail: Yup.string().email('Invalid email').max(250, 'Email is too long!').min(8, 'Email must be at least 8 characters!').required('This field is required')
        }),
        onSubmit: (values) => {
            Axios.post("http://localhost:3001/user/{props.loggedInUser.id}/change_email", {
                email: props.loggedInUser.email,
                newEmail: values.newEmail
            }).then((response) => {
                if (response.data === false) {
                    props.handleNotificationsDanger()
                } else {
                    props.setLoggedInUser(response.data[0])
                    props.handleNotificationsSuccess('Your email was changed!')
                }
            })
        }
    })

    // const changeEmail = () => {
    //     Axios.post("http://localhost:3001/user/{props.loggedInUser.id}/change_email", {
    //         email: props.loggedInUser.email,
    //         newEmail: newEmail
    //     }).then((response) => {
    //         if(response.data === false) {
    //             props.handleNotificationsDanger()
    //         } else {
    //             props.setLoggedInUser(response.data[0])
    //             props.handleNotificationsSuccess('Your email was changed!')
    //         }
    //     })
    // }

    return (
        <div style={{marginTop: '-55px'}}>
            <span className='ModalTitle'>Change email</span><br/>
            <form onSubmit={handleSubmit}>
            <input type="text"
                   style={{ marginTop: '10px'}}
                   name='newEmail'
                   id='newEmail'
                   value={values.newEmail}
                   onChange={handleChange}
                   onBlur={handleBlur}
            />
                {touched.newEmail && errors.newEmail ? (
                    <div className='inputErrors'><ReportIcon className='sidebarIcons'/>{errors.newEmail}</div>
                ) : null }
            <br/>
            <button className='profileButton' type="submit" >Change email</button>
            </form>
        </div>
    )

}