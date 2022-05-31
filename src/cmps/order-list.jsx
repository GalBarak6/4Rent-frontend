import { OrderPreview } from '../cmps/order-preview'

export const OrderList = ({ orders }) => {

    return <section className="order-list">
        <table>
            <thead>
                <tr>
                    {/* <th>Date</th> */}
                    <th>Booker</th>
                    <th>Stay</th>
                    {/* <th>Stay</th> */}
                    <th>Start Date</th>
                    <th>End Date</th>
                    {/* <th>Nights</th> */}
                    <th>Guests</th>
                    {/* <th>Amount</th> */}
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {orders.map(order => { return <OrderPreview order={order} key={order._id} /> })}

            </tbody>
        </table>


    </section>
}