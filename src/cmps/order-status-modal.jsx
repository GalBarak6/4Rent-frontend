import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadOrders, updateOrder } from '../store/actions/order-actions'

export const OrderStatusModal = ({ order, closeModal }) => {

    const dispatch = useDispatch()

    const { orders } = useSelector((storeState) => storeState.orderModule)
    // const [orderStatus, setOrderStatus] = useState('pending')
    console.log(order);

    const onHandleChange = async (status) => {
        // setOrderStatus(status)
        const newOrder = {...order, status}
        await dispatch(updateOrder(newOrder))
        await dispatch(loadOrders())
        onCloseModal()
    }

    const onCloseModal = () => {
        closeModal()
    }

    return <div className="order-status-modal">
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
    </div>

}