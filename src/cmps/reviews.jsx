
export const Reviews = ({reviews}) => {

    return <div className='reviews-container' id='reviews-container'>
        {reviews.map(review => {
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
}