import { stayService } from "../services/stay.service"

export const OrderPreview = ({ order }) => {
    // console.log(order)
    return <tr className="order-preview">
        {/* <td>{order.booker.fullname}</td> */}
        {/* <td>{order.booker._id}</td> */}
        <td>{order.host.fullname}</td>
        <td>{order.stay}</td>
        <td>{order.startDate}</td>
        <td>{order.endDate}</td>
        <td>{stayService.getTotalGuestCount(order.guests)}</td>
        <td>{order.status}</td>
    </tr>

}