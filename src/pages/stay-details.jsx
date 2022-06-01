import { useEffect, useState, useLayoutEffect } from 'react'
import { useParams } from 'react-router-dom'
import { stayService } from '../services/stay.service'
import * as React from 'react'
import { GoogleMap } from '../cmps/google-map'
import { Amenities } from '../cmps/amenities'
import { Checkout } from '../cmps/checkout'
import { Reviews } from '../cmps/reviews'
import { MainAmenities } from '../cmps/main-amenities'
import { StayGallery } from '../cmps/stay-gallery'
import {AddReview} from '../cmps/add-review'

export const StayDetails = () => {

    const [stay, setStay] = useState(null)
    const params = useParams()

    useEffect(() => {
        loadStay()
        document.documentElement.style.setProperty('--right', '20%')
        return () => {
            document.documentElement.style.setProperty('--padding', '80px')
            document.documentElement.style.setProperty('--right', '5%')
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
        <div className='start-info flex align-center'>
            <img src={require('../assets/icons/star.svg').default} alt="" className='start-icon' />
            {onGetTotalReviewScore()} <span className='dot'></span> <a href="#reviews-container">{stay.reviews.length} Reviews</a> <span className='dot'></span> {stay.loc.city} {stay.loc.address} {stay.loc.country}
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

        <Reviews stay={stay} onGetTotalReviewScore={onGetTotalReviewScore}/>

        <AddReview loadStay={loadStay} stay={stay}/>

        <div className='map'>
            <h2>Where you`ll be</h2>
            <GoogleMap lat={stay.loc.lat} lng={stay.loc.lan} />
        </div>

    </section>
}