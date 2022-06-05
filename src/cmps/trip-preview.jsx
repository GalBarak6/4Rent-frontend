import { stayService } from "../services/stay.service"
import { utilService } from "../services/util.service"

export const TripPreview = ({ order }) => {

    const getStatusColor = (status) => {
        let className
        if (status === 'pending') {
            className = 'black'
        } else if (status === 'approved') {
            className = 'green'
        } else {
            className = 'red'
        }
        return className
    }

    return <tr className="trip-preview">
        <td>{(order._id).substring(0, 10)}</td>
        <td>{utilService.changeDateFormat(order.startDate)}</td>
        <td>{order.host.fullname}</td>
        <td>{order.stay}</td>
        <td>{utilService.datesDiff(order.startDate, order.endDate)}</td>
        <td>{stayService.getTotalGuestCount(order.guests)}</td>
        <td className={getStatusColor(order.status)}>{order.status}</td>
        <td>$ {(order.total)}</td>
    </tr>

}