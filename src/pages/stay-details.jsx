import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { stayService } from '../services/stay.service'
import { utilService } from '../services/util.service'
import * as React from 'react';
import { GoogleMap } from '../cmps/google-map';
// import { useSelector } from 'react-redux'
import { UserMsg } from '../cmps/user-msg'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'

export const StayDetails = () => {

    // const [x, setX] = useState(0)
    // const [y, setY] = useState(0)
    // const [bgc, setBgc] = useState('green') 

    // const { isDetailsPage } = useSelector((storeState) => storeState.stayModule)
    const [order, setOrder] = useState({ startDate: '', endDate: '', guests: 0 })
    const [stay, setStay] = useState(null)
    const [isGuestModal, setIsGuestModal] = useState(false)
    const [arrowIcon, setArrowIcon] = useState('down-arrow')
    const [totalCount, setTotalCount] = useState(1)
    const [guestCount, setGuestCount] = useState({ adult: 1, children: 0, infant: 0 })
    const params = useParams()
    // const location = useLocation()

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

    const onOpenGuestModal = () => {
        const arrow = (arrowIcon === 'down-arrow') ? 'up-arrow' : 'down-arrow'
        setArrowIcon(arrow)
        setIsGuestModal(!isGuestModal)
    }

    const onGuestCount = (indicator, type) => {
        const field = type
        const limit = field === 'adult' ? 1 : 0
        if (guestCount[field] + indicator < limit || guestCount[field] + indicator > 4) return
        setGuestCount(prevCount => ({ ...prevCount, [field]: prevCount[field] + indicator }))
        setTotalCount(totalCount + indicator)
    }

    const onReserve = () => {
        showSuccessMsg('Reservation succeed!')
    }

    // const handleMouseMouve = (e) => {
    //     console.log(e);
    //     setX(e.clientX)
    //     setY(e.clientY)
    //     console.log(x, y);
    // }

    if (!stay) return <div>Loading..</div>
    return <section className="stay-details flex flex-column">
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
                    <img src={stay.host.pictureUrl} alt="" className='host-img' />
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

                    <form onSubmit={onSubmit} className='order-form flex flex-column'>
                        <div className='order-inputs'>
                            <div className='dates-container flex space-between'>
                                <label htmlFor="startDate" className='flex flex-column'>
                                    Check-in<input type="date" name='startDate' onChange={onHandleChange} className="check-date checkin" />
                                </label>
                                <label htmlFor="endDate" className='flex flex-column'>
                                    Check-out<input type="date" name='endDate' onChange={onHandleChange} className="check-date checkout" />
                                </label>
                            </div>

                            <div className='guest-input flex flex-column'>
                                <label htmlFor="guests" className='guests-label'>GUESTS</label>
                                <div className='open-guests-btn flex space-between' onClick={onOpenGuestModal}>
                                    <div>{totalCount} guest</div>
                                    <img src={require(`../assets/icons/${arrowIcon}.png`)} alt="" className='order-icon' />
                                </div>

                                {isGuestModal &&
                                    <div className='guests-modal flex flex-column swing-in-top-bck'>
                                        <div className='guest-type flex space-between align-center'>
                                            <div className='guest-detail'>
                                                <div className='type'>Adults</div>
                                                <div className='type-exact'>Age 13+</div>
                                            </div>
                                            <div className='guest-count flex align-center'>
                                                <button onClick={() => onGuestCount(-1, 'adult')}><img src={require('../assets/icons/minus.png')} alt="" className='plus-minus-icon' /></button>
                                                <span>{guestCount.adult}</span>
                                                <button onClick={() => onGuestCount(1, 'adult')}><img src={require('../assets/icons/plus.png')} alt="" className='plus-minus-icon' /></button>
                                            </div>
                                        </div>

                                        <div className='guest-type flex space-between align-center'>
                                            <div className='guest-detail'>
                                                <div className='type'>Children</div>
                                                <div className='type-exact'>Ages 2-12</div>
                                            </div>
                                            <div className='guest-count flex align-center'>
                                                <button onClick={() => onGuestCount(-1, 'children')}><img src={require('../assets/icons/minus.png')} alt="" className='plus-minus-icon' /></button>
                                                <span className='guest-amount'>{guestCount.children}</span>
                                                <button onClick={() => onGuestCount(1, 'children')}><img src={require('../assets/icons/plus.png')} alt="" className='plus-minus-icon' /></button>
                                            </div>
                                        </div>

                                        <div className='guest-type flex space-between align-center'>
                                            <div className='guest-detail'>
                                                <div className='type'>Infants</div>
                                                <div className='type-exact'>Under 2</div>
                                            </div>
                                            <div className='guest-count flex align-center'>
                                                <button onClick={() => onGuestCount(-1, 'infant')}><img src={require('../assets/icons/minus.png')} alt="" className='plus-minus-icon' /></button>
                                                <span>{guestCount.infant}</span>
                                                <button onClick={() => onGuestCount(1, 'infant')}><img src={require('../assets/icons/plus.png')} alt="" className='plus-minus-icon' /></button>
                                            </div>
                                        </div>
                                    </div>}
                            </div>
                        </div>
                        <button type='submit' className='reserve-btn' onClick={onReserve}>Reserve</button>
                    </form>
                    <p className='order-summary-header align-self-center'>You won't be charged yet</p>
                    <div className='order-summary flex flex-column'>
                        <div className='price-sum flex space-between'>
                            <span>${stay.price} x 5 nights</span>
                            <span>${stay.price * 5}</span>
                        </div>
                        <div className='cleaning-sum flex space-between'>
                            <span>Cleaning fee</span>
                            <span>${stay.price * 0.04}</span>
                        </div>
                        <div className='service-sum flex space-between'>
                            <span>Service fee</span>
                            <span>${stay.price * 0.005}</span>
                        </div>
                        <div className='total-sum flex space-between'>
                            <span>Total</span>
                            <span>${(stay.price * 5 + stay.price * 0.04 + stay.price * 0.005).toFixed(2)}</span>
                        </div>
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

        <UserMsg />
    </section>
}