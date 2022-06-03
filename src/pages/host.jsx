import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { loadOrders } from '../store/actions/order-actions'
import { OrderList } from '../cmps/order-list'
import { HostingList } from '../cmps/hosting-list'
import { OrderStatusModal } from '../cmps/order-status-modal'

export const Host = () => {

    const { orders } = useSelector((storeState) => storeState.orderModule)
    // const { user } = useSelector((storeState) => storeState.userModule)
    // const params = useParams()

    const dispatch = useDispatch()

    useEffect(() => {
        console.log('loading')
        dispatch(loadOrders())
    }, [])

    return <section className="Host">
        <h3>Booking Reports</h3>
        <OrderList orders={orders} />
        <HostingList />
        <OrderStatusModal />
    </section>
}