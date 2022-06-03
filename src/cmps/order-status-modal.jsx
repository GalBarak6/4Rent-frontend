import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export const OrderStatusModal = ({order}) => {

    const [orderStatus, setOrderStatus] = useState('pending')


    const onHandleChange = () => {

    }

    // const onCloseModal = () => {
    //     closeModal()
    // }

    return <section className="order-status-modal">
        <div className="modal-title">
            <button className="close-btn">
            <img className="exit-icon" src={require('../assets/icons/exit.png')} alt="" />
            </button>
            <div>Change order status</div>
        </div>
        <div className="options">
            <div>Approve</div>
            <div>Decline</div>
        </div>
    </section>

}