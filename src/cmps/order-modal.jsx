import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { stayService } from '../services/stay.service'
import { utilService } from "../services/util.service"

export const OrderModal = ({ closeModal, order, stay }) => {


    useEffect(() => {
        document.documentElement.style.setProperty('--overflow', 'hidden')
        return () => {
            document.documentElement.style.setProperty('--overflow', 'unset')
        }
    }, [])

    const totalGuestCount = () => {
        const totalCount = stayService.getTotalGuestCount(order.guests)
        return totalCount
    }

    const convert = (str) => {
        var date = new Date(str),
            month = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2)
        return [date.getFullYear(), month, day].join("-")
    }

    const onCloseModal = () => {
        closeModal()
    }

    console.log(stay)
    console.log(order)
    console.log(order.startDate)

    if (!order) return

    return <section className="order-modal">
        <div className="modal-title">
            <button className="close-btn" onClick={() => { onCloseModal() }}>
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', fill: 'none', height: '16px', width: '16px', stroke: 'rgb(34, 34, 34)', strokeWidth: '3', overflow: 'visible' }}><path d="m6 6 20 20"></path><path d="m26 6-20 20"></path></svg>
            </button>
            <div>Order number: 2893840825</div>
        </div>
        <div className="modal-details flex">
            <div className="title">Thanks for your order!</div>
            <div className="order-txt">
                <div>Your reservation was sent to the host</div>
                <div>The host will reply shortly</div>
            </div>
            <div className="order-details">

                <h4>Reservation Details:</h4>
                <h3>{order.stay}</h3>
                <div>
                    From: {utilService.changeDateFormat(utilService.formatDate(order.startDate))}
                </div>
                <div>
                    Until: {utilService.changeDateFormat(utilService.formatDate(order.endDate))}
                </div>
                <div>
                    {utilService.datesDiff(order.startDate, order.endDate)} nights
                </div>
                {/* <div>
                {stayService.getTotalGuestCount(order.guests)} guests
            </div> */}
                <div >
                    <span className="bold"> Total: </span> ${(order.total).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </div>
                {/* <div className="img-container">
                <img src={require(`../assets/Images/${stay.imgUrls[0]}`)} alt="" />
            </div> */}

            </div>

        </div>
        <button className="btn">
            <Link to={`/stay`} >
                Continue Exploring
            </Link>

        </button>
    </section>

}
