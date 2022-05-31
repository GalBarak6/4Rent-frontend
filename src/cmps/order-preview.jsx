
export const OrderPreview = ({ order }) => {
    console.log(order);
    return <tr className="order-preview">
                   <td>{order.booker.fullname}</td>
                   <td>{order.stay}</td>
                   <td>{order.startDate}</td>
                   <td>{order.endDate}</td>
                   <td>{order.guests.adults}</td>
                   <td>{order.status}</td>
                   
    </tr>

}