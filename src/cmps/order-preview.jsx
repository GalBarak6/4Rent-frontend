
export const OrderPreview = ({ order }) => {
    return <tr className="order-preview">
                   <td>{order.booker.fullName}</td>
                   <td>{order.startDate}</td>
                   <td>{order.endDate}</td>
                   {/* <td>{order.guests.total}</td> */}


    </tr>

}