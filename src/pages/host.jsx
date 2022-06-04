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
        <div className='host-tables'>
            <h3>Booking Reports</h3>
            <OrderList orders={orders} />
            <div className='hosting-header flex space-between'>
                <h3>Hosting</h3>
                <button>Host new stay</button>
            </div>
            <HostingList />
        </div>
        <div className='statistics flex flex-column'>
            <div>
                <h3>Orders</h3>
            </div>
            <div>
                <h3>Total Income</h3>
            </div>
            <div>
                <h3>Total Rate</h3>
            </div>
        </div>
    </section>
}