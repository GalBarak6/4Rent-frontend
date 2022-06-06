import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadOrders } from '../store/actions/order-actions'
import { OrderList } from '../cmps/order-list'
import { HostingList } from '../cmps/hosting-list'
import { loadStays, setFilter } from '../store/actions/stay.actions'
import { useParams } from 'react-router-dom'

export const Host = () => {

    const { orders } = useSelector((storeState) => storeState.orderModule)
    const { stays, filterBy } = useSelector((storeState) => storeState.stayModule)
    const [orderPageIdx, setOrderPageIdx] = useState(0)
    // const [stayPageIdx, setStayPageIdx] = useState(0)
    const dispatch = useDispatch()
    const params = useParams()

    useEffect(() => {
        dispatch(loadOrders({ host: params.userId, orderPageIdx }))
    }, [orderPageIdx])

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
            if (order.status === 'approved') {
                income = income + (order.total)
            }
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

    const calculateGuests = () => {
        let guests = 0
        stays.map(stay => {
            guests += stay.capacity
        })
        return guests
    }

    const onHandleOrderPaging = (type) => {
        if (type === 'previous' && orderPageIdx > 0) {
            setOrderPageIdx(orderPageIdx - 1)
        } else if (type === 'next') {
            setOrderPageIdx(orderPageIdx + 1)
        }
    }

    // const onHandleStayPaging = (type) => {
    //     if (type === 'previous' && stayPageIdx > 0) {
    //         setStayPageIdx(stayPageIdx - 1)
    //     } else if (type === 'next') {
    //         setStayPageIdx(stayPageIdx + 1)
    //     }
    // }

    if (!orders) return
    return <section className="host">
        <div className='host-tables'>
            <h3>Booking Reports</h3>
            <OrderList orders={orders} onHandleOrderPaging={onHandleOrderPaging} />
            <div className='hosting-header flex space-between'>
                <h3>Hosting</h3>
                <button>Host new stay</button>
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
                    <h4>${calculateIncome().toLocaleString('en-IN')}</h4>
                </div>
            </div>
            <div className='rate'>
                <h3>Total Rate</h3>
                <div className='flex align-center'>
                    <img className="statistics-icon" src={require('../assets/icons/star2.png')} alt="" />
                    <h4>{calculateRating().toFixed(1)}</h4>
                </div>
            </div>
            <div className='guests'>
                <h3>Total Guests</h3>
                <div className='flex align-center'>
                    <img className="statistics-icon" src={require('../assets/icons/guest.png')} alt="" />
                    <h4>{calculateGuests()}</h4>
                </div>
            </div>
        </div>
    </section>
}