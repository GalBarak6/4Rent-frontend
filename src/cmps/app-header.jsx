import { NavLink } from "react-router-dom"
import { ReactComponent as Logo } from "../assets/icons/logo.svg"
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from 'react'

export const AppHeader = () => {

    const history = useNavigate()
    const location = useLocation()
    const [layout, setLayout] = useState('')

    useEffect(() => {
        console.log(location);
        if (location.pathname.includes('aaa')) setLayout('details-layout')
        else setLayout('main-layout')
    }, [location.pathname])

    function onGoBack() {
        history("/")
    }

    // const headerClass = `app-header flex space-between align-center ${layout}`
    return <header className="app-header flex space-between align-center full">
        <div className="logo flex align-center" onClick={onGoBack}>
            {<Logo />}
            <h1>4RENT</h1>
        </div>

        <div className="flex">

            <nav className="main-nav flex">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/stay">Explore</NavLink>
                <NavLink to="/">Become a host</NavLink>
            </nav>

            <button className="user-menu">
                <img src={require('../assets/icons/hamburger.svg').default} alt="" />
                <img src={require('../assets/icons/user.svg').default} alt="" />
            </button>

        </div>


    </header>
}