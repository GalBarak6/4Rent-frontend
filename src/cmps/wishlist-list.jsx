import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadOrders } from '../store/actions/order-actions'
import { OrderList } from '../cmps/order-list'
import { HostingList } from '../cmps/hosting-list'
import { loadStays, setFilter } from '../store/actions/stay.actions'
import { useParams } from 'react-router-dom'

export const Host = () => {

    const { orders } = useSelector((storeState) => storeState.orderModule)
    const { stays, filterBy } = useSelector((storeState) => storeState.stayModule)
    const dispatch = useDispatch()
    const params = useParams()

    useEffect(() => {
        dispatch(loadOrders())
    }, [])

    useEffect( () => {
        dispatch(setFilter({ ...filterBy, host: params.userId }))
        dispatch(loadStays())

        return () => {
            dispatch(setFilter({ ...filterBy, host: '' }))
        }
    }, [params.userId])

    const calculateIncome = () => {
        let income = 0
        orders.map(order => {
            income = income + (order.total)
        })
        return income
    }

    const calculateRating = () => {
        let rating = 0
        stays.map(stay => {
            rating += stay.reviewScores.rating
        })
        return rating/stays.length
    }

    return <section className="host">
        <div className='host-tables'>
            <h3>Booking Reports</h3>
            <OrderList orders={orders} />
            <div className='hosting-header flex space-between'>
                <h3>Hosting</h3>
                <button>Host new stay</button>
            </div>
            <HostingList stays={stays}/>
        </div>
        <div className='statistics flex flex-column'>
            <div>
                <h3>Orders</h3>
                <h3>{orders.length}</h3>
            </div>
            <div>
                <h3>Total Income</h3>
                <h4>$ {calculateIncome().toLocaleString('en-IN')}</h4>
            </div>
            <div>
                <h3>Total Rate</h3>
                <img src={require('../assets/icons/star.svg').default} alt="" className='star-icon' />
                {calculateRating()}
            </div>
        </div>
    </section>
}