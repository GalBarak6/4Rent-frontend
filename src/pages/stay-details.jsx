import * as React from 'react'
import { useEffect, useState, useLayoutEffect } from 'react'
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom'
import { stayService } from '../services/stay.service'
import { GoogleMap } from '../cmps/google-map'
import { Amenities } from '../cmps/amenities'
import { Checkout } from '../cmps/checkout'
import { Reviews } from '../cmps/reviews'
import { MainAmenities } from '../cmps/main-amenities'
import { StayGallery } from '../cmps/stay-gallery'
import { AddReview } from '../cmps/add-review'
import { DatePicker } from '../cmps/date-range';

export const StayDetails = () => {

    const [stay, setStay] = useState(null)
    const params = useParams()
    const { user } = useSelector((storeState) => storeState.userModule)

    useEffect(() => {
        loadStay()
        document.documentElement.style.setProperty('--right', '18%')
        return () => {
            document.documentElement.style.setProperty('--padding', '80px')
            document.documentElement.style.setProperty('--right', '4%')
        }

    }, [])

    useEffect(() => {
        console.log('loading stay details')
        loadStay()
    }, [params.stayId])

    useLayoutEffect(() => {
        document.documentElement.style.setProperty('--padding', '350px')
    }, [])

    const loadStay = async () => {
        const stay = await stayService.getById(params.stayId)
        setStay(stay)
    }

    const onGetTotalReviewScore = () => {
        const totalScores = stayService.getTotalReviewScore(stay.reviewScores)
        return totalScores
    }

    if (!stay) return <div className="dots">
        <div></div>
        <div></div>
        <div></div>
    </div>

    return <section className="stay-details flex flex-column">

        <h1 className='stay-name'>{stay.name}</h1>
        <div className='start-info flex align-center space-between'>
            <div className='flex align-center'>
                <img src={require('../assets/icons/star.svg').default} alt="" className='start-icon' />
                {onGetTotalReviewScore()} <span className='dot'></span> <a href="#reviews-container">{stay.reviews.length} Reviews</a> <span className='dot'></span> {stay.loc.city} {stay.loc.address} {stay.loc.country}
            </div>
            <div className='flex align-center'>
                <button className='flex'>
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', fill: 'none', height: '16px', width: '16px', stroke: '#222222', strokeWidth: '2', overflow: 'visible' }}><g fill="none"><path d="M27 18v9a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-9"></path><path d="M16 3v23V3z"></path><path d="M6 13l9.293-9.293a1 1 0 0 1 1.414 0L26 13"></path></g></svg>
                    <span>Share</span>
                </button>
                <button className='flex'>
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', fill: 'none', height: '16px', width: '16px', stroke: '#222222', strokeWidth: '2', overflow: 'visible' }}><path d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z"></path></svg>
                    <span>Save</span>
                </button>
            </div>
        </div>

        <StayGallery imgUrls={stay.imgUrls} />

        <div className='stay-info-container'>
            <div className='stay-info'>
                <div className='host-info flex space-between'>
                    <div>
                        <h2>Cabin hosted by {stay.host.fullname}</h2>
                        <p className='flex align-center'>{stay.capacity} guests <span className='dot'></span> {stay.bedrooms} bedrooms <span className='dot'></span> {stay.beds} beds</p>
                    </div>
                    <img src={stay.host.pictureUrl} alt="" className='host-img' />
                </div>

                <MainAmenities />

                <p className='stay-summary'>
                    {stay.summary}
                </p>

                <Amenities stay={stay} />
            </div>

            <Checkout stay={stay} onGetTotalReviewScore={onGetTotalReviewScore} />
        </div>

        <Reviews stay={stay} onGetTotalReviewScore={onGetTotalReviewScore} />

        {user && <AddReview loadStay={loadStay} stay={stay} />}

        <div className='map'>
            <h2>Where you`ll be</h2>
            <GoogleMap lat={stay.loc.lat} lng={stay.loc.lan} />
        </div>

    </section>
}