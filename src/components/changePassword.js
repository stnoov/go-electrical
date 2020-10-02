import React from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import Axios from "axios";
import ReportIcon from "@material-ui/icons/Report";

export default function ChangePassword(props) {

    const{handleSubmit, handleChange, values, touched, errors, handleBlur} = useFormik({
        initialValues: {
            oldPassword: '',
            newPassword: ''
        },
        validationSchema: Yup.object({
            oldPassword: Yup.string().max(250, 'Password is too long!').min(6, 'Password is too short!').required('Password is required!'),
            newPassword: Yup.string().max(250, 'Password is too long!').min(6, 'New password must be at least 6 characters!').required('Password is required!')
        }),
        onSubmit: (values) => {
            Axios.post("http://localhost:3001/user/{props.loggedInUser.id}/change_password", {
                email: props.loggedInUser.email,
                oldPassword: values.oldPassword,
                newPassword: values.newPassword
            }).then((response) => {
                if (response.data === false) {
                    props.handleNotificationsDanger()
                } else {
                    props.setLoggedInUser(response.data[0])
                    props.handleNotificationsSuccess('Your password was updated!')
                }
            })
        }
    })

    return (
        <div>
            <form onSubmit={handleSubmit}>
            <span className='ModalTitle'>Change password</span><br/>
            <div style={{ marginTop: '15px'}}>
            Old password:<br/>
            <input

                type="password"
                id='oldPassword'
                name='oldPassword'
                value={values.oldPassword}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            </div>
            {touched.oldPassword && errors.oldPassword ? (
                <div className='inputErrors'><ReportIcon className='sidebarIcons'/>{errors.oldPassword}</div>
            ) : null }
            <br/>
            <div style={{ marginTop: '-25px'}}>
            New password:<br/>
            <input
                type="password"
                id='newPassword'
                name='newPassword'
                value={values.newPassword}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            </div>
            {touched.newPassword && errors.newPassword ? (
                <div className='inputErrors'><ReportIcon className='sidebarIcons'/>{errors.newPassword}</div>
            ) : null }
            <br/>
            <button type='submit' className='profileButton'>Change password</button>
            </form>
        </div>
    )
}