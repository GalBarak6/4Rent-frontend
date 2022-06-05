import { useState, useEffect } from 'react'
import { stayService } from '../services/stay.service'


export const SearchGuestsModal = ({ guestCount,onGuestCount }) => {


    return <section className='search-guests-modal flex flex-column swing-in-top-bck'>

        <div className='guest-type flex space-between align-center'>
            <div className='guest-detail'>
                <div className='type title'>Adults</div>
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
                <div className='type title'>Children</div>
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
                <div className='type title'>Infants</div>
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