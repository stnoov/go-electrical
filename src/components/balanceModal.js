import React from "react";
import Modal from 'react-modal'
import Axios from "axios";
import balanceModal from './balanceModal.css'
import CloseIcon from '@material-ui/icons/Close';

const customStyles = {
    content : {
        top                   : '10%',
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
        props.setIsOpen(false);
    }

    function addBalance() {
        Axios.post("http://localhost:3001/user/{props.loggedInUser.id}/add_balance", {
            email: loggedInEmail
        }).then((response) => {
            props.setLoggedInUser(response.data[0])
            closeModal()
        })
}



    return (
        <Modal
            isOpen={props.modalIsOpen}
            style={customStyles}
            ariaHideApp={false}
        >
            <span className='balanceModalTitle'>Add Balance</span>
            <p className='balanceText'>* This section is still in development mode, by clicking the button below, you will receive an extra <span style={{fontWeight: '700'}}>100€</span> to your balance for testing purposes</p>
            <button className='addBalanceButton' onClick={addBalance}> ADD BALANCE </button>
            <CloseIcon className='closeButton' onClick={closeModal} />
        </Modal>
    )
}