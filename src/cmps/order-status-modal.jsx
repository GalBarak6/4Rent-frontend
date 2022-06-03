import React from 'react'
import { useState } from 'react'
// import { updateOrder } from '../store/actions/order-actions'

export const OrderStatusModal = ({ order, closeModal }) => {

    const [orderStatus, setOrderStatus] = useState('pending')

    const onHandleChange = (status) => {
        setOrderStatus(status)
        console.log(orderStatus)
        // await dispatch(updateOrder(txt, stay))
    }

    const onCloseModal = () => {
        closeModal()
    }

    return <section className="order-status-modal">
        <div className="modal-title">
            <button className="close-btn">
                <img className="exit-icon" src={require('../assets/icons/exit.png')} alt="" onClick={onCloseModal} />
            </button>
        </div>
        <div className="options">
            <div className='flex center' onClick={() => onHandleChange('approved')}>
                <span>Approve</span>
            </div>
            <div className='flex center' onClick={() => onHandleChange('declined')}>
                <span>Decline</span>
            </div>
        </div>
    </section>

}