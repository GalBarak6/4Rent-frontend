import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadOrders } from '../store/actions/order-actions'
import { useParams } from 'react-router-dom'
import { TripList } from '../cmps/trip-list'

export const Trip = () => {

    const { orders } = useSelector((storeState) => storeState.orderModule)
    const dispatch = useDispatch()
    const params = useParams()

    useEffect(() => {
        dispatch(loadOrders({ booker: params.userId }))
    }, [])

    return <section className="trip">
        <TripList orders={orders} />
    </section>
}