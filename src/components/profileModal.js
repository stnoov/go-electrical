import React from "react";
import Modal from 'react-modal'
import './profileModal.css'
import CloseIcon from '@material-ui/icons/Close';
import ChangeEmail from './changeEmail'

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
                    <ChangeEmail
                        loggedInUser={props.loggedInUser}
                        handleNotificationsDanger={props.handleNotificationsDanger}
                        setLoggedInUser={props.setLoggedInUser}
                        handleNotificationsSuccess={props.handleNotificationsSuccess}
                    />
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