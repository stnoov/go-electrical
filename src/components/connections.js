import React from "react";
import Modal from 'react-modal'
import Moment from 'react-moment';
import moment from "moment";
import './balanceModal.css'
import CloseIcon from '@material-ui/icons/Close';
import './connections.css'

const customStyles = {
    content : {
        top                   : '40%',
        left                  : '60%',
        right                 : '40%',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
};


export default function Connections(props) {

    return (
        <Modal
            isOpen={props.historyModalStatus}
            style={customStyles}
            ariaHideApp={false}
        >
            <span className='ModalTitle'>Current connections & History</span>
            <CloseIcon className='closeButton' onClick={() => props.setHistoryModalStatus(false)} />
        <table style={{textAlign: 'center', width: '100%', marginTop: '20px'}}>
            <thead>
            <tr>
                <th>Station ID:</th>
                <th>Station Name:</th>
                <th>Station Address:</th>
                <th>Finished at:</th>
                <th>Time active:</th>
                <th>Total bill:</th>
                <th>Status:</th>
            </tr>
            </thead>
            <tbody>
            { props.currentConnections &&
            props.currentConnections.map((connection, index) =>
                <tr key={index}>
                    <td>{connection.station_id}</td>
                    <td>{connection.station_name}</td>
                    <td>{connection.station_address}</td>
                    <td>{connection.finished_at == null ? 'In progress' : <Moment parse="YYYY-MM-DD HH:mm">
                        {connection.finished_at}
                    </Moment>}</td>
                    <td>
                        {connection.finished_at == null ? <Moment fromNow ago>{connection.started_at}</Moment> : moment.duration(moment(connection.finished_at).diff(moment(connection.started_at))).minutes() + " min" }
                    </td>
                    <td>{connection.is_over !== 1 ? 'In progress' :
                        Math.round(moment.duration(moment(connection.finished_at).diff(moment(connection.started_at))).minutes() * connection.price ) + '€'
                    }

                    </td>
                    <td>{connection.is_over === 1 ? 'Ended' : <button onClick={() =>  {
                        props.stopCharging(connection.connection_id, Math.round(moment.duration(moment(moment().toDate()).diff(moment(connection.started_at))).minutes() * connection.price ))
                    }} className='stopCharging'> Stop Charging</button>}</td>
                </tr>
            )}
            </tbody>
        </table>
        </Modal>
    )
}