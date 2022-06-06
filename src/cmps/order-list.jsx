import { OrderPreview } from '../cmps/order-preview'
import { useSelector } from "react-redux"

export const OrderList = ({ orders }) => {

    const { user } = useSelector((storeState) => storeState.userModule)

    return <section className="order-list">
        <table>
            <thead>
                <tr>
                    <th>Reservation Num.</th>
                    <th>Arrival</th>
                    <th>Booker</th>
                    <th>Stay</th>
                    <th>Nights</th>
                    <th>Guests</th>
                    <th>Status</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                {user && user.isHost && orders.map(order => { return <OrderPreview order={order} key={order._id} /> })}
            </tbody>
        </table>
    </section>
}