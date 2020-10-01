import React from "react";
import Modal from 'react-modal'
import Axios from "axios";

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

    function addBalance() {
        Axios.post("http://localhost:3001/user/{props.loggedInUser.id}/add_balance", {
            email: loggedInEmail
        }).then((response) => {
            props.setLoggedInUser(response.data[0])
        })
}

    function closeModal(){
        props.setIsOpen(false);
    }

    return (
        <Modal
            isOpen={props.modalIsOpen}
            style={customStyles}
            ariaHideApp={false}
        >
            <h2>Modal title</h2>
            <p>Modal body</p>
            <button onClick={addBalance}> ADD BALANCE </button>
            <button onClick={closeModal}>close</button>
        </Modal>
    )
}