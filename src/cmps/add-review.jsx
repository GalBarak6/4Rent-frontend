import * as React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { useState } from 'react'
import { addReviewToStay } from '../store/actions/stay.actions'
import { SendBtn } from './send-btn'
import { useDispatch } from 'react-redux'

export const AddReview = ({ loadStay , stay}) => {

    const dispatch = useDispatch()

    const [ratings, setRatings] = useState({
        cleanliness: '',
        checkin: '',
        location: '',
        communication: '',
        accuracy: '',
        value: ''
    })

    const onHandleChange = ({ target }) => {
        const value = target.value
        const field = target.name
        console.log(value, field);
        setRatings(prevRatings => ({ ...prevRatings, [field]: value }))
    }

    const onAddReview = async (ev) => {
        ev.preventDefault()
        const txt = ev.target[0].value
        console.log(txt)
        console.log(stay)
        console.log(ratings);
        // await dispatch(addReviewToStay(txt, stay))
        // loadStay()
        // ev.target[0].value = ''
    }

    return (
        <div className='add-review-container'>
            <div className='add-title'>
                <h2>Add a review</h2>
            </div>
            <Stack spacing={1}>
                <div className="add-review-ratings">
                    <div>
                        <div>Cleanliness</div>
                        <Rating name="cleanliness" defaultValue={2.5} precision={0.5} onChange={onHandleChange} />
                    </div>
                    <div>
                        <div>Checkin</div>
                        <Rating name="checkin" defaultValue={2.5} precision={0.5} onChange={onHandleChange} />
                    </div>
                    <div>
                        <div>Location</div>
                        <Rating name="location" defaultValue={2.5} precision={0.5} onChange={onHandleChange} />
                    </div>
                    <div>
                        <div>Communication</div>
                        <Rating name="communication" defaultValue={2.5} precision={0.5} onChange={onHandleChange} />
                    </div>
                    <div>
                        <div>Accuracy</div>
                        <Rating name="accuracy" defaultValue={2.5} precision={0.5} onChange={onHandleChange} />
                    </div>
                    <div>
                        <div>Value</div>
                        <Rating name="value" defaultValue={2.5} precision={0.5} onChange={onHandleChange} />
                    </div>
                </div>
            </Stack>
            <form onSubmit={onAddReview}>
                <div>
                    <textarea name="new-review" id="new-review" rows="10" placeholder='Write your review here..'></textarea>
                </div>
                <SendBtn />
            </form>
        </div>
    )
}



// return (
//     <Stack spacing={1}>
//         <div className="add-review-ratings">
//             <div>
//                 <div>Cleanliness</div>
//                 <Rating name="cleanliness" defaultValue={2.5} precision={0.5} onChange={onHandleChange} />
//             </div>
//             <div>
//                 <div>Checkin</div>
//                 <Rating name="checkin" defaultValue={2.5} precision={0.5} onChange={onHandleChange} />
//             </div>
//             <div>
//                 <div>Location</div>
//                 <Rating name="location" defaultValue={2.5} precision={0.5} onChange={onHandleChange} />
//             </div>
//             <div>
//                 <div>Communication</div>
//                 <Rating name="communication" defaultValue={2.5} precision={0.5} onChange={onHandleChange} />
//             </div>
//             <div>
//                 <div>Accuracy</div>
//                 <Rating name="accuracy" defaultValue={2.5} precision={0.5} onChange={onHandleChange} />
//             </div>
//             <div>
//                 <div>Value</div>
//                 <Rating name="value" defaultValue={2.5} precision={0.5} onChange={onHandleChange} />
//             </div>
//         </div>
//     </Stack>
// )