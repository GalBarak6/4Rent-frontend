// import { useState } from 'react'
import { Link } from "react-router-dom"

export const UserMenuModal = () => {

    // const [isOpenModal, setIsOpenModal] = useState(false)

    return <section className="user-menu-modal swing-in-top-bck">
        <ul>
            <li>
                Trips
            </li>

            <li>
                Wishlist
            </li>

            <li>
                <Link to="/login">Login</Link>
                {/* Login */}
            </li>

            <li>
                About
            </li>

        </ul>
    </section>
}