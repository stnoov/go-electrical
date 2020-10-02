import React from "react";
import Modal from 'react-modal'
import './profileModal.css'
import CloseIcon from '@material-ui/icons/Close';
import ChangeEmail from './changeEmail'
import ChangePassword from './changePassword'

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
                        <div className='infoField'>
                            Name: {props.loggedInUser.first_name + " " + props.loggedInUser.last_name}
                        </div>
                        <div className='infoField'>
                            Balance: {props.loggedInUser.balance} <span style={{fontWeight: '600'}}>€</span>
                        </div>
                        <div className='infoField'>
                            Subscription type: Basic
                        </div>
                </div>
                <div className='column'>
                    <ChangeEmail
                        loggedInUser={props.loggedInUser}
                        handleNotificationsDanger={props.handleNotificationsDanger}
                        setLoggedInUser={props.setLoggedInUser}
                        handleNotificationsSuccess={props.handleNotificationsSuccess}
                    />
                    <div style={{marginTop: '25px'}}>
                        <ChangePassword
                            loggedInUser={props.loggedInUser}
                            handleNotificationsDanger={props.handleNotificationsDanger}
                            setLoggedInUser={props.setLoggedInUser}
                            handleNotificationsSuccess={props.handleNotificationsSuccess}
                        />
                    </div>
                </div>
            </div>
        </Modal>
    )
}