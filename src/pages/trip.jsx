import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadOrders } from '../store/actions/order-actions'
import { loadStays, setFilter } from '../store/actions/stay.actions'
import { useParams } from 'react-router-dom'

export const Trip = () => {

    const { orders } = useSelector((storeState) => storeState.orderModule)
    const { stays, filterBy } = useSelector((storeState) => storeState.stayModule)
    const dispatch = useDispatch()
    const params = useParams()

    useEffect(() => {
        dispatch(loadOrders())
    }, [])

    useEffect( () => {
        dispatch(setFilter({ ...filterBy, booker: params.userId }))
        dispatch(loadStays())

        return () => {
            dispatch(setFilter({ ...filterBy, booker: '' }))
        }
    }, [params.userId])

    return <section className="host">
        <div className='host-tables'>
            <h3>Booking Reports</h3>
            <div className='hosting-header flex space-between'>
                <h3>Hosting</h3>
                <button>Host new stay</button>
            </div>
        </div>
        <div className='statistics flex flex-column'>
            <div>
                <h3>Orders</h3>
                <h3>{orders.length}</h3>
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