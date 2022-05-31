export const Reviews = ({ stay, onGetTotalReviewScore}) => {

    return <div className='reviews-container' id='reviews-container'>
        <div className='curr-reviews'>
            <div className='flex align-center'>
                <img src={require('../assets/icons/star.svg').default} alt="" className='star-icon' />
                {onGetTotalReviewScore()} <span className='dot'></span> <div>{stay.reviews.length} Reviews</div>
            </div>

            <div className='reviews-summary flex align-center space-between'>
                <div className='stats-container flex align-center space-between'>
                    <div>Cleanliness</div>
                    <div className='rating-bar flex align-center'>
                        <meter max="5" min="0" value={stay.reviewScores.cleanliness} high="0.75" low="0.25" ></meter>
                        <span>{stay.reviewScores.cleanliness}</span>
                    </div>

                </div>
                <div className='stats-container flex align-center space-between'>
                    <div>Communication</div>
                    <div className='rating-bar flex align-center'>
                        <meter max="5" min="0" value={stay.reviewScores.communication} high="0.75" low="0.25" ></meter>
                        <span>{stay.reviewScores.communication}</span>
                    </div>
                </div>
                <div className='stats-container flex align-center space-between'>
                    <div>Check-in</div>
                    <div className='rating-bar flex align-center'>
                        <meter max="5" min="0" value={stay.reviewScores.checkin} high="0.75" low="0.25" ></meter>
                        <span>{stay.reviewScores.checkin}</span>
                    </div>
                </div>
                <div className='stats-container flex align-center space-between'>
                    <div>Accuracy</div>
                    <div className='rating-bar flex align-center'>
                        <meter max="5" min="0" value={stay.reviewScores.accuracy} high="0.75" low="0.25" ></meter>
                        <span>{stay.reviewScores.accuracy}</span>
                    </div>
                </div>
                <div className='stats-container flex align-center space-between'>
                    <div>Location</div>
                    <div className='rating-bar flex align-center'>
                        <meter max="5" min="0" value={stay.reviewScores.location} high="0.75" low="0.25" ></meter>
                        <span>{stay.reviewScores.location}</span>
                    </div>
                </div>
                <div className='stats-container flex align-center space-between'>
                    <div>Value</div>
                    <div className='rating-bar flex align-center'>
                        <meter max="5" min="0" value={stay.reviewScores.value} high="0.75" low="0.25" ></meter>
                        <span>{stay.reviewScores.value}</span>
                    </div>
                </div>
            </div>
        </div>


        <div className='reviews-info flex'>
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

    </div>
}