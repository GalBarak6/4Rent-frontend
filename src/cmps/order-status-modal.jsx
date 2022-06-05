import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadOrders, updateOrder } from '../store/actions/order-actions'
import { useOutsideClick } from '../cmps/use-outside-click'


export const OrderStatusModal = ({ order, closeModal }) => {

    const dispatch = useDispatch()

    // const ref = useRef()

    // useOutsideClick(ref, () => {
    //     if(isOpenModal) isOpenModal=(!isOpenModal)
    //     else onCloseModal()
    // })

    // const { orders } = useSelector((storeState) => storeState.orderModule)
    // console.log(order);


    const onHandleChange = async (status) => {
        const newOrder = { ...order, status }
        await dispatch(updateOrder(newOrder))
        // await dispatch(loadOrders())
        onCloseModal()
    }

    const onCloseModal = () => {
        closeModal()
    }

    return <div className="order-status-modal slide-bottom">
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