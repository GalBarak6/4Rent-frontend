
import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export const OrderModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(true)

    const onOpenModal = () => {
        setIsModalOpen(true)
    }
    const onCloseModal = () => {
        setIsModalOpen(false)
    }

    return <section className="order-modal">
        {isModalOpen && <React.Fragment>
            <div className="modal-title">
                <button className="close-btn" onClick={() => { onCloseModal() }}>X</button>
                <div>Order number: 2893840825</div>
            </div>
            <div className="modal-details">
                <div className="title">Thanks for your order!</div>
                <div>Your reservation was sent to host</div>
                <div>Host will reply shortly</div>

            </div>
        </React.Fragment>
        }
    </section>

}
