import { useSelector, useDispatch } from "react-redux";
import { removeStay } from "../store/actions/stay.actions";

export const HostingPreview = ({ stay }) => {

    const dispatch = useDispatch()

    const onRemoveStay = async() => {
        console.log(stay._id);
        await dispatch(removeStay(stay._id))
    }
    return <tr className="hosting-preview">
        <td>
            <img src={require(`../assets/Images/${stay.imgUrls[0]}`)} alt="" className='stay-host-img' />
        </td>
        <td>
            {stay.name}
            {stay.type}
        </td>
        <td>
            <img src={require('../assets/icons/star.svg').default} alt="" className='star-icon' />
            {stay.reviewScores.rating}
            <span>({stay.reviews.length})</span>
        </td>
        <td>
            <button>Edit</button>
            <button onClick={onRemoveStay}>Remove</button>
        </td>
    </tr>

}