import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadOrders } from '../store/actions/order-actions'
import { OrderList } from '../cmps/order-list'
import { HostingList } from '../cmps/hosting-list'
import { loadStays, setFilter } from '../store/actions/stay.actions'
import { useParams, Link } from 'react-router-dom'
import { orderService } from '../services/order.service'

export const Host = () => {

    // const [orders, setOrders] = useState('')
    const { orders } = useSelector((storeState) => storeState.orderModule)
    const { stays, filterBy } = useSelector((storeState) => storeState.stayModule)
    const dispatch = useDispatch()
    const params = useParams()

    useEffect(() => {
        dispatch(loadOrders({ host: params.userId }))
    }, [])

    useEffect(() => {
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
        return rating / stays.length
    }

    if (!orders) return
    return <section className="host">
        <div className='host-tables'>
            <h3>Booking Reports</h3>
            <OrderList orders={orders} />
            <div className='hosting-header flex space-between'>
                <h3>Hosting</h3>
                <button>Host new stay</button>
                {/* <Link to={`/stay/edit/`}>Host new stay</Link> */}
            </div>
            <HostingList stays={stays} />
        </div>
        <div className='statistics flex flex-column'>
            <div className='orders'>
                <h3>Orders</h3>
                <div className='flex align-center'>
                    <img className="statistics-icon" src={require('../assets/icons/orders.svg').default} alt="" />
                    <h4>{orders.length}</h4>
                </div>
            </div>
            <div className='income'>
                <h3>Total Income</h3>
                <div className='flex align-center'>
                    <img className="statistics-icon" src={require('../assets/icons/revenue.png')} alt="" />
                    <h4>$ {calculateIncome().toLocaleString('en-IN')}</h4>
                </div>
            </div>
            <div className='rate'>
                <h3>Total Rate</h3>
                <div className='flex align-center'>
                    <img className="statistics-icon" src={require('../assets/icons/star2.png')} alt="" />
                    <h4>{calculateRating().toFixed(1)}</h4>
                </div>
            </div>
        </div>
    </section>
}