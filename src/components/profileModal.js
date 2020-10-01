import React from "react";
import Modal from 'react-modal'
import Axios from "axios";
import './profileModal.css'
import CloseIcon from '@material-ui/icons/Close';


const customStyles = {
    content : {
        top                   : '30%',
        left                  : '60%',
        right                 : '40%',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
};




export default function ProfileModal(props) {

    const [newEmail, setNewEmail] = React.useState(props.loggedInUser.email)

    const changeEmail = () => {
        Axios.post("http://localhost:3001/user/{props.loggedInUser.id}/change_email", {
            email: props.loggedInUser.email,
            newEmail: newEmail
        }).then((response) => {
            if(response.data === false) {
                props.handleNotificationsDanger()
            } else {
                props.setLoggedInUser(response.data[0])
                props.handleNotificationsSuccess('Your email was changed!')
            }
        })
    }


    return (
        <Modal
            isOpen={props.profileModalStatus}
            style={customStyles}
            ariaHideApp={false}
        >
            <span className='ModalTitle'>Profile</span>
            <CloseIcon className='closeButton' onClick={() => props.setProfileModalStatus(false)} />
            <div className='profileInfo'>
                <div className='column'>
                        {props.loggedInUser.first_name + " " + props.loggedInUser.last_name} <br/>
                        Current Balance: {props.loggedInUser.balance}€
                </div>
                <div className='column'>
                    <div style={{marginTop: '-55px'}}>
                    <span className='ModalTitle'>Change email</span><br/>

                    <input type="text"
                           onChange={(event) => {
                                setNewEmail(event.target.value)
                    }}
                           style={{ marginTop: '10px'}}
                    /> <br/>

                    <button className='profileButton' onClick={changeEmail} >Change email</button>
                    </div>
                    <div style={{marginTop: '25px'}}>
                        <span className='ModalTitle'>Change password</span><br/>
                        Old password: <input style={{marginLeft: '7px', marginTop: '10px'}} type="password"/> <br/>
                        New password: <input type="password"/> <br/>
                        <button className='profileButton'>Change password</button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}