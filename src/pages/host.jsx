import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadOrders } from '../store/actions/order-actions'
import { OrderList } from '../cmps/order-list'
import { HostingList } from '../cmps/hosting-list'

export const Host = () => {

    const { orders } = useSelector((storeState) => storeState.orderModule)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadOrders())
    }, [])

    return <section className="host">
        <h3>Booking Reports</h3>
        <OrderList orders={orders} />
        <h3>Hosting</h3>
        <HostingList />
    </section>
}