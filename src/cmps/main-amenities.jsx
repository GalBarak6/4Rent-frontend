export const MainAmenities = () => {
    return <ul className='main-amenities flex flex-column'>
        <li className='flex'>
            <img src={require('../assets/icons/check-in.svg').default} alt="" className='amenity-icon' />
            <div className='main-amenity-info'>
                <h3>Self check-in</h3>
                <p>Check yourself in with the lockbox.</p>
            </div>
        </li>
        <li className='flex'>
            <img src={require('../assets/icons/location.svg').default} alt="" className='amenity-icon' />
            <div className='main-amenity-info flex flex-column'>
                <h3>Great location</h3>
                <p>Recent guests have given a 5-star rating to this location.</p>
            </div>
        </li>
        <li className='flex'>
            <img src={require('../assets/icons/cancellation.svg').default} alt="" className='amenity-icon' />
            <div className='main-amenity-info'>
                <h3>Free cancellation for 48 hours.</h3>
            </div>
        </li>
    </ul>
}