import { utilService } from "../services/util.service"



export const Amenities = ({ stay }) => {
    return <div className='amenities'>
        <h1 className='amenities-list-header'>
            What this place offers
        </h1>
        <ul className='amenities-list'>
            {stay.amenities.map(amenity => <li key={utilService.makeId()} className='flex align-center'><img src={require(`../assets/icons/${amenity}.png`)} alt="" className='amenity-icon' /><span className='amenity-name'>{amenity}</span></li>)}
        </ul>
    </div>
}
