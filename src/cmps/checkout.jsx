import { useState } from 'react'
import { addOrder } from '../store/actions/order-actions';
import { useDispatch } from 'react-redux';
import { stayService } from '../services/stay.service';
import {utilService} from '../services/util.service'
import { OrderModal } from './order-modal';

export const Checkout = ({ stay }) => {
    const [isModalOpen, setIsModalOpen] = useState(true)

    const onOpenModal = () => {
        setIsModalOpen(true)
    }
    const onCloseModal = () => {
        setIsModalOpen(false)
    }

    const [order, setOrder] = useState({ startDate: '', endDate: '', guests: 0 })
    const [isGuestModal, setIsGuestModal] = useState(false)
    const [guestCount, setGuestCount] = useState({ adult: 1, children: 0, infant: 0 })
    const dispatch = useDispatch()

    const onHandleChange = ({ target }) => {
        const value = target.type === 'number' ? +target.value : target.value
        const field = target.name
        setOrder(prevOrder => ({ ...prevOrder, [field]: value }))
    }

    const onGuestCount = (indicator, type) => {
        const field = type
        const limit = field === 'adult' ? 1 : 0
        if (guestCount[field] + indicator < limit || guestCount[field] + indicator > 4) return
        setGuestCount(prevCount => ({ ...prevCount, [field]: prevCount[field] + indicator }))
    }

    const onOpenGuestModal = () => {
        setIsGuestModal(!isGuestModal)
    }

    const onArrowToggle = () => {
        const arrow = (isGuestModal) ? 'up-arrow' : 'down-arrow'
        return arrow
    }

    const onSubmit = async (ev) => {
        ev.preventDefault()
        const newOrder = stayService.getNewOrder(order, guestCount, stay)
        await dispatch(addOrder(newOrder))
    }

    const onGetTotalCount = () => {
        const totalCount = stayService.getTotalGuestCount(guestCount)
        return totalCount
    }

    return <div className='order-display'>
        <div className='order-container flex flex-column'>
            <div className='order-header flex'>
                <div>
                    <span className='order-price'>${stay.price.toLocaleString('en-IN')}</span> night
                </div>
                <div className='flex align-center'>
                    <img src={require('../assets/icons/star.svg').default} alt="" className='order-icon' />
                    <div>{stay.reviewScores.rating} <span className='dot'></span> <span>{stay.reviews.length} Reviews</span></div>
                </div>
            </div>

            <form onSubmit={onSubmit} className='order-form flex flex-column'>
                <div className='order-inputs'>
                    <div className='dates-container flex space-between'>
                        <label htmlFor="startDate" className='flex flex-column'>
                            CHECK-IN<input type="date" name='startDate' onChange={onHandleChange} className="check-date checkin" />
                        </label>
                        <label htmlFor="endDate" className='flex flex-column'>
                            CHECKOUT<input type="date" name='endDate' onChange={onHandleChange} className="check-date checkout" />
                        </label>
                    </div>

                    <div className='guest-input flex flex-column'>
                        <label htmlFor="guests" className='guests-label'>GUESTS</label>
                        <div className='open-guests-btn flex space-between' onClick={onOpenGuestModal}>
                            <div>{onGetTotalCount()} guest</div>
                            <img src={require(`../assets/icons/${onArrowToggle()}.png`)} alt="" className='order-icon' />
                        </div>

                        {isGuestModal &&
                            <div className='guests-modal flex flex-column swing-in-top-bck'>
                                <div className='guest-type flex space-between align-center'>
                                    <div className='guest-detail'>
                                        <div className='type'>Adults</div>
                                        <div className='type-exact'>Age 13+</div>
                                    </div>
                                    <div className='guest-count flex align-center'>
                                        <button type='button' onClick={() => onGuestCount(-1, 'adult')}><img src={require('../assets/icons/minus.png')} alt="" className='plus-minus-icon' /></button>
                                        <span>{guestCount.adult}</span>
                                        <button type='button' onClick={() => onGuestCount(1, 'adult')}><img src={require('../assets/icons/plus.png')} alt="" className='plus-minus-icon' /></button>
                                    </div>
                                </div>

                                <div className='guest-type flex space-between align-center'>
                                    <div className='guest-detail'>
                                        <div className='type'>Children</div>
                                        <div className='type-exact'>Ages 2-12</div>
                                    </div>
                                    <div className='guest-count flex align-center'>
                                        <button type='button' onClick={() => onGuestCount(-1, 'children')}><img src={require('../assets/icons/minus.png')} alt="" className='plus-minus-icon' /></button>
                                        <span className='guest-amount'>{guestCount.children}</span>
                                        <button type='button' onClick={() => onGuestCount(1, 'children')}><img src={require('../assets/icons/plus.png')} alt="" className='plus-minus-icon' /></button>
                                    </div>
                                </div>

                                <div className='guest-type flex space-between align-center'>
                                    <div className='guest-detail'>
                                        <div className='type'>Infants</div>
                                        <div className='type-exact'>Under 2</div>
                                    </div>
                                    <div className='guest-count flex align-center'>
                                        <button type='button' onClick={() => onGuestCount(-1, 'infant')}><img src={require('../assets/icons/minus.png')} alt="" className='plus-minus-icon' /></button>
                                        <span>{guestCount.infant}</span>
                                        <button type='button' onClick={() => onGuestCount(1, 'infant')}><img src={require('../assets/icons/plus.png')} alt="" className='plus-minus-icon' /></button>
                                    </div>
                                </div>
                            </div>}
                    </div>
                </div>
                <button type='submit' className='reserve-btn'>Reserve</button>
            </form>
            <p className='order-summary-header align-self-center'>You won't be charged yet</p>
            <div className='order-summary flex flex-column'>
                <div className='price-sum flex space-between'>
                    <span>${stay.price.toLocaleString('en-IN')} x 5 nights</span>
                    <span>${(stay.price * 5).toLocaleString('en-IN')}</span>
                </div>
                <div className='cleaning-sum flex space-between'>
                    <span>Cleaning fee</span>
                    <span>${(stay.price * 0.04).toLocaleString('en-IN')}</span>
                </div>
                <div className='service-sum flex space-between'>
                    <span>Service fee</span>
                    <span>${(stay.price * 0.005).toLocaleString('en-IN')}</span>
                </div>
                <div className='total-sum flex space-between'>
                    <span>Total</span>
                    <span>${(stay.price * 5 + stay.price * 0.04 + stay.price * 0.005).toLocaleString('en-IN')}</span>
                </div>
            </div>
        </div>
    </div>
}