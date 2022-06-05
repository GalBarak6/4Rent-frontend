import { useState, useEffect } from 'react'
import { addOrder } from '../store/actions/order-actions'
import { useDispatch } from 'react-redux'
import { stayService } from '../services/stay.service'
import { utilService } from '../services/util.service'
import { OrderModal } from './order-modal'
import { orderService } from '../services/order.service'
import { DatePicker } from './date-range'

export const Checkout = ({ stay, onGetTotalReviewScore }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        orderService.getBtnMouseListener()
    }, [])

    const closeModal = () => {
        setIsModalOpen(false)
    }

    // const [dateRange, setDateRange] = useState(
    //     {
    //         startDate: utilService.formatDate(new Date()),
    //         endDate: utilService.formatDate(new Date(new Date().getTime() + (120 * 60 * 60 * 1000)))
    //     }
    // )

    const [dateRange, setDateRange] = useState(
        {
            startDate: new Date(),
            endDate: new Date(new Date().getTime() + (120 * 60 * 60 * 1000))
        }
    )

    const [isGuestModal, setIsGuestModal] = useState(false)
    const [guestCount, setGuestCount] = useState({ adult: 1, children: 0, infant: 0 })
    const dispatch = useDispatch()

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
        setIsModalOpen(true)
        const newOrder = orderService.getNewOrder(dateRange, guestCount, stay, orderService.getTotalAsNum(stay.price, utilService.datesDiff(dateRange.startDate, dateRange.endDate)))
        console.log(newOrder)
        await dispatch(addOrder(newOrder))
        // setDateRange({ startDate: utilService.formatDate(new Date()), endDate: utilService.formatDate(new Date(new Date().getTime() + (120 * 60 * 60 * 1000)))})
        setDateRange({ startDate: new Date(), endDate: new Date(new Date().getTime() + (120 * 60 * 60 * 1000))})
        setGuestCount(prevCount => ({ ...prevCount, adult: 1, children: 0, infant: 0 }))
    }

    const totalGuestCount = () => {
        const totalCount = stayService.getTotalGuestCount(guestCount)
        return totalCount
    }

    const calculateSum = (type) => {
        const total = orderService.getCalculatedPrice(type, stay.price, utilService.datesDiff(dateRange.startDate, dateRange.endDate))
        return (total)
    }

    // const onHandleDates = ({ target }) => {
    //     const field = target.name
    //     const value = target.value
    //     setDateRange(prevDates => ({ ...prevDates, [field]: value }))
    // }

    const onHandleDates = ( startDate, endDate ) => {
        console.log(startDate);
        console.log(endDate);
        setDateRange(prevDates => ({ ...prevDates, startDate, endDate }))
    }

    const numOfNights = () => {
        const nights = utilService.datesDiff(dateRange.startDate, dateRange.endDate)
        const value = (nights === 1) ? `${nights} night` : `${nights} nights`
        return value
    }

    return <div className='order-display'>
        <div className='order-container flex flex-column'>
            <div className='order-header flex'>
                <div>
                    <span className='order-price'>${stay.price.toLocaleString('en-IN')}</span> night
                </div>
                <div className='flex align-center'>
                    <img src={require('../assets/icons/star.svg').default} alt="" className='order-icon' />
                    <div>{onGetTotalReviewScore()} <span className='dot'></span> <span>{stay.reviews.length} reviews</span></div>
                </div>
            </div>

            <form onSubmit={onSubmit} className='order-form flex flex-column'>
                <div className='order-inputs'>
                    <div className='dates-container'>
                        {/* <label className='flex flex-column'>
                            CHECK-IN<input type="date" name='startDate' onChange={onHandleDates} className="check-date checkin" value={dateRange.startDate} />
                        </label>
                        <label className='flex flex-column'>
                            CHECKOUT<input type="date" name='endDate' onChange={onHandleDates} className="check-date checkout" value={dateRange.endDate} />
                        </label> */}
                        <DatePicker onHandleDates={onHandleDates} startDate={dateRange.startDate} endDate={dateRange.endDate}/>
                    </div>

                    <div className='guest-input flex flex-column'>
                        <label htmlFor="guests" className='guests-label'>GUESTS</label>
                        <div className='open-guests-btn flex space-between' onClick={onOpenGuestModal}>
                            <div className='total-guests'>{totalGuestCount()} guest</div>
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
                {/* <button type='submit' className='reserve-btn'>Reserve</button> */}
                <button type='submit' className='mouse-cursor-gradient-tracking'>
                    <span>Reserve</span>
                </button>
            </form>
            <p className='order-summary-header align-self-center'>You won't be charged yet</p>
            <div className='order-summary flex flex-column'>
                <div className='price-sum flex space-between'>
                    <span>${calculateSum('night')} x {numOfNights()}</span>
                    <span>${calculateSum('nights')}</span>
                </div>
                <div className='cleaning-sum flex space-between'>
                    <span>Cleaning fee</span>
                    <span>${calculateSum('cleaning')}</span>
                </div>
                <div className='service-sum flex space-between'>
                    <span>Service fee</span>
                    <span>${calculateSum('service')}</span>
                </div>
                <div className='total-sum flex space-between'>
                    <span>Total</span>
                    <span>${calculateSum('sum')}</span>
                </div>
            </div>

        </div>
        {isModalOpen &&
            <OrderModal closeModal={closeModal} />
        }
    </div>
}