import { useState } from 'react'

export const UserMenuModal = () => {

    const [isOpenModal, setIsOpenModal] = useState(false)

    return <section className="user-menu-modal">
        <ul>
            <li>
                Trips
            </li>
            <li>
                Wishlist
            </li>
            <li>
                Signup
            </li>
            <li>
                Login
            </li>
            <li>
                About
            </li>
        </ul>
    </section>
}