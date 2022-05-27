import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { stayService } from '../services/stay.service'
import { utilService } from '../services/util.service'
import * as React from 'react';
import { GoogleMap } from '../cmps/google-map';

export const StayDetails = () => {

    // const [x, setX] = useState(0)
    // const [y, setY] = useState(0)
    // const [bgc, setBgc] = useState('green') 
    const [order, setOrder] = useState({ startDate: '', endDate: '', guests: 0 })
    const [stay, setStay] = useState(null)
    const params = useParams()
    const location = useLocation()

    useEffect(() => {
        console.log('loading stay details')
        loadStay()
    }, [params.stayId])

    const loadStay = async () => {
        const stay = await stayService.getById(params.stayId)
        setStay(stay)
    }

    const onHandleChange = ({ target }) => {
        const value = target.type === 'number' ? +target.value : target.value
        const field = target.name
        console.log(target.value)
        console.log(field)
        setOrder(prevOrder => ({ ...prevOrder, [field]: value }))
    }

    const onSubmit = (ev) => {
        ev.preventDefault()
    }

    // const handleMouseMouve = (e) => {
    //     console.log(e);
    //     setX(e.clientX)
    //     setY(e.clientY)
    //     console.log(x, y);
    // }

    console.log(params)
    if (!stay) return <div>Loading..</div>
    return <section className="stay-details flex flex-column">
        {/* <MyComponent /> */}
        <h1 className='stay-name'>{stay.name}</h1>
        {/* <button onMouseMove={handleMouseMouve} style={{backgroundColor: bgc, backgroundPositionX: x, backgroundPositionY: y}}>testing is bgc working?</button> */}
        <div className='start-info flex align-center'>
            <img src={require('../assets/icons/star.svg').default} alt="" className='start-icon' />
            {stay.reviewScores.rating} <span className='dot'></span> <a href="#reviews-container">{stay.reviews.length} Reviews</a> <span className='dot'></span> {stay.loc.city} {stay.loc.address} {stay.loc.country}
        </div>
        <div className='stay-gallery'>
            {stay.imgUrls.map(img => <img src={require(`../assets/Images/${img}`)} alt="" key={img} className={stay.imgUrls[0] === img ? 'main-img' : ''} />)}
        </div>
        <div className='stay-info-container flex'>
            <div className='stay-info'>
                <div className='host-info flex space-between'>
                    <div>
                        <h2>Cabin hosted by {stay.host.fullname}</h2>
                        <p className='flex align-center'>{stay.capacity} guests <span className='dot'></span> {stay.bedrooms} bedrooms <span className='dot'></span> {stay.beds} beds</p>
                    </div>
                    <img src="http://res.cloudinary.com/dqj9g5gso/image/upload/v1643442255/allzuvxs7ig4wxgmdjh0.jpg" alt="" className='host-img' />
                </div>
                <ul className='main-amenities flex flex-column'>
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
                <p className='stay-summary'>
                    {stay.summary}
                </p>
                <div className='amenities'>
                    <h1 className='amenities-list-header'>
                        What this place offers
                    </h1>
                    <ul className='amenities-list'>
                        {stay.amenities.map(amenity => <li key={utilService.makeId()} className='flex align-center'><img src={require(`../assets/icons/${amenity}.png`)} alt="" className='amenity-icon' /><span className='amenity-name'>{amenity}</span></li>)}
                    </ul>
                </div>
            </div>
            <div className='order-display'>
                <div className='order-container flex flex-column'>
                    <div className='order-header flex'>
                        <p>
                            <span className='order-price'>${stay.price}</span> / night
                        </p>
                        <p>
                            <img src={require('../assets/icons/star.svg').default} alt="" className='order-icon' />
                            {stay.reviewScores.rating} <span className='dot'></span> {stay.reviews.length} Reviews
                        </p>
                    </div>
                    <form onSubmit={onSubmit}>
                        <label htmlFor="startDate">
                            start-date<input type="date" name='startDate' onChange={onHandleChange} />
                        </label>
                        <label htmlFor="endDate">
                            end-date<input type="date" name='endDate' onChange={onHandleChange} />
                        </label>
                        <label htmlFor="guests">
                            Guests<input type="number" name='guests' onChange={onHandleChange} />
                        </label>

                        <button type='submit'>Reserve</button>
                    </form>
                    <div className='order-data'>

                    </div>
                </div>
            </div>
        </div>
        <div className='reviews-container' id='reviews-container'>
            {stay.reviews.map(review => {
                return <div className='review flex flex-column' key={review.id}>
                    <div className='review-user-info flex align-center'>
                        <img src={review.by.imgUrl} alt="" className='user-img' />
                        <div>
                            <h2>{review.by.fullname}</h2>
                            <h4 className='review-date'>{review.date}</h4>
                        </div>
                    </div>
                    <p>{review.txt}</p>
                </div>
            })}
        </div>
        <div>
            <GoogleMap lat={stay.loc.lat} lng={stay.loc.lan} />
        </div>

    </section>
}