// import { useState } from 'react'
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"

export const UserMenuModal = () => {

    // const [isOpenModal, setIsOpenModal] = useState(false)
    const { user } = useSelector((storeState) => storeState.userModule)
    return <section className="user-menu-modal swing-in-top-bck">
        {!user && <ul>
            <li>
                <Link to="/login">Login</Link>
            </li>

            <li className="menu-limit">
                <Link to="/signup">Signup</Link>
            </li>

            <li>
                About
            </li>

            <li>
                Help
            </li>

        </ul>}

        {user && <ul>

            <li>
                Trips
            </li>

            <li className="menu-limit">
                Wishlist
            </li>

            <li>
                Help
            </li>

            <li>
                Logout
            </li>

        </ul>}

    </section>
}