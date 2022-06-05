import { useSelector, useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { onLogout } from "../store/actions/user.actions"

export const UserMenuModal = () => {

    const dispatch = useDispatch()
    const history = useNavigate()
    const { user } = useSelector((storeState) => storeState.userModule)


    const logOut = () => {
        dispatch(onLogout())
        onGoBack()
    }

    const onGoBack = () => {
        history("/stay")
    }

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
                <Link to={`/trip/${user._id}`}>Trips</Link>
            </li>

            <li className="menu-limit">
                <Link to={`/wishlist/${user._id}`}>Wishlist</Link>
            </li>

            <li>
                Help
            </li>

            <li onClick={logOut}>
                Logout
            </li>

        </ul>}

    </section>
}