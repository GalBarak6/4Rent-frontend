// import { useState } from 'react'
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"

export const UserMenuModal = () => {

    // const [isOpenModal, setIsOpenModal] = useState(false)
    const { user } = useSelector((storeState) => storeState.userModule)
    console.log(user);
    return <section className="user-menu-modal swing-in-top-bck">
        <ul>
            <li>
                Trips
            </li>

            <li>
                Wishlist
            </li>

            <li>
                {!user && <Link to="/login">Login</Link>}
                {user && 'Logout'}
            </li>

            <li>
                About
            </li>

        </ul>
    </section>
}