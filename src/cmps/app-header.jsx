import { NavLink, useNavigate } from "react-router-dom"
import { ReactComponent as Logo } from "../assets/icons/logo.svg"
import { useSelector } from "react-redux";
import { StaySearch } from "../cmps/stay-search"
import { useEffect, useState } from "react";

export const AppHeader = ({ onOpenModal }) => {

    const navigate = useNavigate()
    const { user } = useSelector((storeState) => storeState.userModule)

    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        window.addEventListener('scroll', changeBackground);

        return () => {
            window.removeEventListener('scroll', changeBackground);
        };
    }, [window.scrollY])

    const changeBackground = () => {
        if (window.scrollY >= 150) {
            setIsScrolled(true)
        } else {
            setIsScrolled(false)
        }
    }

    function onGoBack() {
        navigate('/')
    }
    return <header className={isScrolled ? 'app-header scrolled flex space-between align-center' : 'app-header flex space-between align-center'}>
        <div className="logo flex align-center gap" onClick={onGoBack}>
            {<Logo />}
            <div>4Rent</div>
        </div>
        <div className="search-container">
            <StaySearch />
        </div>
        <div className="main-nav-container flex align-center">
            <nav className="main-nav flex">
                {/* <NavLink to="/">Home</NavLink> */}
                {/* <NavLink to="/login">Login</NavLink> */}
                <NavLink to="/stay">Explore</NavLink>
                {user && user.isHost && <NavLink to={`/host/${user._id}`}>Booking Reports</NavLink>}
                {(user && !user.isHost) && <NavLink to={`/host/${user._id}`}>Become a host</NavLink>}
                {(!user) && <NavLink to={'/login'}>Become a host</NavLink>}
                {/* {user && user.isHost && <NavLink to='/host/'>Booking Reports</NavLink>}
                {(!user || !user.isHost) && <NavLink to='/host/'>Become a host</NavLink>} */}
            </nav>

            <button className="user-menu" onClick={onOpenModal}>
                <img src={require('../assets/icons/hamburger.svg').default} alt="" />
                {!user && <img src={require('../assets/icons/user.svg').default} alt="" />}
                {user && <img src={user.imgUrl} alt="" className="curr-user-img" />}
            </button>

        </div>

    </header>
}