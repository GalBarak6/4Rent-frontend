import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setFilter } from '../store/actions/stay.actions'
import { SearchGuestsModal } from './search-guests-modal'

export const StaySearch = () => {
    const { filterBy } = useSelector((storeState) => storeState.stayModule)
    const [filterByCity, setFilterByCity] = useState(filterBy.city)
    const [isGuestModalOpen, setIsGuestModalOpen] = useState(true)



    const dispatch = useDispatch()

    const onHandleChange = ({ target }) => {
        const { value } = target
        console.log('handleChange', { target })
        if (value) {
            setFilterByCity(value)
        }
    }

    const onSearch = (ev) => {
        ev.preventDefault()
        dispatch(setFilter({ ...filterBy, city: filterByCity }))
    }


    return <section className='stay-search'>
        {/* <div className='where'>Any where</div>
        <span>|</span>
        <div>Any week</div>
        <span>|</span>
        <div>Add guests</div> */}
        {/* <button className='btn'>Anywhere  </button> */}

        <form onSubmit={onSearch} className='stay-search-form'>

            <div>
                <input type="text" id="search-where" name="search-where" placeholder="Anywhere" onChange={onHandleChange} />
            </div><span>|</span>
            <button className='btn'>Any week</button><span>|</span>
            <button className='btn'>Add guests</button>
            <button className="search-btn">
                <svg viewBox="0 0 32 32" className='search-icon' xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', fill: 'none', height: '12px', width: '12px', stroke: '#ffffff', strokeWidth: '5.33333', overflow: 'visible' }}><g fill="none"><path d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9"></path></g></svg>
            </button>

        </form>

        {/* {isGuestModalOpen && <SearchGuestsModal/>} */}

    </section>
}