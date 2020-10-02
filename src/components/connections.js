import React, {useEffect} from "react";
import Modal from 'react-modal'
import Axios from "axios";
import './balanceModal.css'
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


export default function Connections(props) {

    let historyData = {}
    useEffect(() => {
        Axios.get('http://localhost:3001/connections_data').then((response) => {
            historyData = response.data
        })
    })

    return (
        <Modal
            isOpen={props.historyModalStatus}
            style={customStyles}
            ariaHideApp={false}
        >
            <span className='ModalTitle'>History</span>
            <CloseIcon className='closeButton' onClick={() => props.setHistoryModalStatus(false)} />

        </Modal>
    )
}