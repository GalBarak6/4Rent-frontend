import { NavLink } from "react-router-dom"
import { ReactComponent as Logo } from "../assets/icons/logo.svg"

export const AppHeader = () => {
    return <header className="app-header flex space-between align-center full">

        <div className="logo flex">
            {<Logo />}
            <h1>4RENT</h1>
        </div>

        <nav className="main-nav flex">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/stay">Explore</NavLink>
            <NavLink to="/">Become a host</NavLink>
        </nav>

    </header>
}