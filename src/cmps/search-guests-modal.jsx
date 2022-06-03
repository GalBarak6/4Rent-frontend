import { useState } from 'react'
import { useDispatch } from 'react-redux'

export const SearchGuestsModal = () => {

    const [guestCount, setGuestCount] = useState({ adult: 1, children: 0, infant: 0 })
    const dispatch = useDispatch()

    const onGuestCount = (indicator, type) => {
        const field = type
        const limit = field === 'adult' ? 1 : 0
        if (guestCount[field] + indicator < limit || guestCount[field] + indicator > 4) return
        setGuestCount(prevCount => ({ ...prevCount, [field]: prevCount[field] + indicator }))
    }

return <section className='search-guests-modal flex flex-column swing-in-top-bck'>

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

</section>



}