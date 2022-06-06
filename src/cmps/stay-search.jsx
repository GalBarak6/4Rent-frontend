import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setFilter } from '../store/actions/stay.actions'
import { SearchGuestsModal } from './search-guests-modal'
import { SearchCalenderModal } from './search-calender-modal'
import { useNavigate } from "react-router-dom"
import { stayService } from '../services/stay.service'

export const StaySearch = () => {
    const { filterBy } = useSelector((storeState) => storeState.stayModule)

    const [filterByCity, setFilterByCity] = useState(filterBy.city)
    const [isGuestModalOpen, setIsGuestModalOpen] = useState(false)
    const [isCalenderModalOpen, setIsCalenderModalOpen] = useState(false)

    const [totalGuests, setTotalGuests] = useState('')
    const [guestCount, setGuestCount] = useState({ adult: 1, children: 0, infant: 0 })

    const [dateRange, setDateRange] = useState([
        {
            startDate: '',
            endDate: '',
            key: 'selection',
        },
    ])

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {

        if (!filterBy.capacity && !filterBy.city) {
            setFilterByCity('')

            setGuestCount({ adult: 1, children: 0, infant: 0 })
            setTotalGuests('')
            setDateRange([
                {
                    startDate: '',
                    endDate: '',
                    key: 'selection',
                },
            ])

        }

    }, [filterBy])


    function goToExplore() {
        navigate('/stay')
    }

    const onHandleCityChange = ({ target }) => {
        const { value } = target
        console.log('handleChange', { target })
        if (value) {
            setFilterByCity(value)
        }
    }

    const onHandleGuestsChange = () => {
        setIsCalenderModalOpen(false)
        setIsGuestModalOpen(!isGuestModalOpen)
        const totalCount = stayService.getTotalGuestCount(guestCount)
        setTotalGuests(totalCount)
    }

    const onGuestCount = (indicator, type) => {
        console.log('onGuestCount')
        const field = type
        const limit = field === 'adult' ? 1 : 0
        if (guestCount[field] + indicator < limit || guestCount[field] + indicator > 4) return

        setGuestCount(prevCount => ({ ...prevCount, [field]: prevCount[field] + indicator }))
        setTotalGuests(prevState => prevState + indicator)
    }

    const onSetDates = () => {
        setIsGuestModalOpen(false)
        setIsCalenderModalOpen(!isCalenderModalOpen)
        setDateRange([
            {
                startDate: new Date(),
                endDate: new Date(),
                key: 'selection',
            },
        ])
    }

    const handleDatesChange = (startDate, endDate) => {
        console.log('handleDatesChange', { startDate }, { endDate })
        setDateRange([
            {
                startDate,
                endDate,
                key: 'selection'
            },
        ])

    }

    const onSearch = (ev) => {
        ev.preventDefault()
        setIsGuestModalOpen(false)
        setIsCalenderModalOpen(false)
        dispatch(setFilter({ ...filterBy, city: filterByCity, capacity: totalGuests }))
        goToExplore()
    }

    const convert = (startDateStr, endDateStr) => {
        let startDate = new Date(startDateStr)
        let endDate = new Date(endDateStr)
        let month = ("0" + (startDate.getMonth() + 1))
        startDate = ("0" + startDate.getDate()).slice(-2)
        endDate = ("0" + endDate.getDate()).slice(-2)
        let DateStr = `${startDate}-${endDate}/${month}`

        return DateStr
    }

    return <section className="stay-search">

        <form onSubmit={onSearch} className="stay-search-form">

            <div>
                <input type="text" id="search-where" name="search-where" placeholder="Anywhere" value={filterByCity} onChange={onHandleCityChange} autoComplete="off"/>
            </div>

            {!dateRange[0].startDate &&
                <button type="button" className="btn" onClick={onSetDates}>Any week
                    {/* <div>{convert(dateRange[0].startDate, dateRange[0].endDate)}</div> */}
                </button>

            }
            {dateRange[0].startDate &&
                <button type="button" className="btn" onClick={onSetDates}>{convert(dateRange[0].startDate, dateRange[0].endDate)}</button>

            }
            {/* <div>{convert(dateRange[0].startDate, dateRange[0].endDate)}</div> */}

            {!totalGuests &&
                <button type="button" className="btn" onClick={onHandleGuestsChange}>Add guests</button>
            }
            {totalGuests &&
                <button type="button" className="btn" onClick={onHandleGuestsChange}>{totalGuests} guests</button>
            }


            <button className="search-btn">
                <svg viewBox="0 0 32 32" className="search-icon" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', fill: 'none', height: '12px', width: '12px', stroke: '#ffffff', strokeWidth: '5.33333', overflow: 'visible' }}><g fill="none"><path d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9"></path></g></svg>
            </button>

        </form>

        {isGuestModalOpen && <SearchGuestsModal onGuestCount={onGuestCount} guestCount={guestCount} />}
        {isCalenderModalOpen && <SearchCalenderModal dateRange={dateRange} handleDatesChange={handleDatesChange} />}

    </section>
}