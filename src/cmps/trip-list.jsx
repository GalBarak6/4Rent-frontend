import { TripPreview } from '../cmps/trip-preview'

export const TripList = ({ orders }) => {

    return <section className="trip-list">
        <h1>Trips</h1>
        <table>
            <thead>
                <tr>
                    <th>Reservation Num.</th>
                    <th>Arrival</th>
                    <th>Host</th>
                    <th>Stay</th>
                    <th>Nights</th>
                    <th>Guests</th>
                    <th>Status</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                {orders.map(order => { return <TripPreview order={order} key={order._id} /> })}
            </tbody>
        </table>
    </section>
}