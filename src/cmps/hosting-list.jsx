import { HostingPreview } from '../cmps/hosting-preview'
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react'
import { loadStays, setFilter } from '../store/actions/stay.actions'

export const HostingList = () => {
    const { user } = useSelector((storeState) => storeState.userModule)
    const { stays, filterBy } = useSelector((storeState) => storeState.stayModule)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setFilter({ ...filterBy, host: 'Linda-Lee' }))
        dispatch(loadStays())
        console.log(stays);
        
    }, [])

    
    return <section className="order-list">
        <table>
            <tbody>
                {/* {user && user.isHost && orders.map(order => { return <OrderPreview order={order} key={order._id} /> })} */}
            </tbody>
        </table>
    </section>
}