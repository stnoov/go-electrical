import React from "react";
import Modal from 'react-modal'
import Axios from "axios";
import './balanceModal.css'
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


export default function BalanceModal(props) {
    let loggedInEmail = props.loggedInUser.email

    function closeModal(){
        props.setBalanceModalStatus(false);
    }

    function addBalance() {
        Axios.post("https://go-electrical-server.herokuapp.com/user/{props.loggedInUser.id}/add_balance", {
            email: loggedInEmail
        }).then((response) => {
            props.setLoggedInUser(response.data[0])
            closeModal()
            props.handleNotificationsSuccess('Balance has been updated!')
        })
}



    return (
        <Modal
            isOpen={props.balanceModalStatus}
            style={customStyles}
            ariaHideApp={false}
        >
            <span className='ModalTitle'>Add Balance</span>
            <p className='balanceText'>* This section is still in development mode, by clicking the button below, you will receive an extra <span style={{fontWeight: '700'}}>100€</span> to your balance for testing purposes</p>
            <button className='addBalanceButton' onClick={addBalance}> ADD BALANCE </button>
            <CloseIcon className='closeButton' onClick={closeModal} />
        </Modal>
    )
}