import React from 'react'
import { Link } from 'react-router-dom'

export const OrderModal = ({ closeModal }) => {

    const onCloseModal = () => {
        closeModal()
    }

    return <section className="order-modal">
        <div className="modal-title">
            <button className="close-btn" onClick={() => { onCloseModal() }}>X</button>
            <div>Order number: 2893840825</div>
        </div>
        <div className="modal-details">
            <div className="title">Thanks for your order!</div>
            <div>Your reservation was sent to the host</div>
            <div>The host will reply shortly</div>

        </div>
        <button className="btn">
            <Link to={`/stay`} >
                Continue Exploring
            </Link>

        </button>
    </section>

}
