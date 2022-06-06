import { OrderPreview } from '../cmps/order-preview'
import { useSelector } from "react-redux"

export const OrderList = ({ orders, onHandleOrderPaging }) => {

    const { user } = useSelector((storeState) => storeState.userModule)

    return <section className="order-list">
        <table>
            <thead>
                <tr>
                    <th>Reservation Num.</th>
                    <th>Arrival</th>
                    <th>Nights</th>
                    <th>Booker</th>
                    <th>Stay</th>
                    <th>Guests</th>
                    <th>Status</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                {user && user.isHost && orders.map(order => { return <OrderPreview order={order} key={order._id} /> })}
            </tbody>
        </table>
        <div className='flex space-between'>
            <img className="paging-icon previous" src={require('../assets/icons/previous.png')} alt="" onClick={() => onHandleOrderPaging('previous')} />
            <img className="paging-icon next" src={require('../assets/icons/next.png')} alt="" onClick={() => onHandleOrderPaging('next')} />
        </div>
    </section>
}