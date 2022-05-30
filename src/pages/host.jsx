import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadOrders } from '../store/actions/order-actions'
import { OrderList } from '../cmps/order-list'


export const Host = () => {
    const { orders } = useSelector((storeState) => storeState.orderModule)

    const dispatch = useDispatch()

    useEffect(() => {
        console.log('loading')
        dispatch(loadOrders())
    }, [])

    return <section className="Host">
        <OrderList orders={orders} />
    </section>
}