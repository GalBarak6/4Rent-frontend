import { useNavigate, Link } from "react-router-dom"
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadStays, setFilter } from '../store/actions/stay.actions'

import { TopRatedList } from '../cmps/top-rated-list'
import { orderService } from "../services/order.service"

export const Home = () => {

    const history = useNavigate()
    const { stays } = useSelector((storeState) => storeState.stayModule)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setFilter({ label: '', type: [], amenities: [], price: '', city: '', capacity: '', host: '', rating: 5.0 }))
        dispatch(loadStays())
        orderService.getBtnMouseListener()
    }, [])

    function onExplore() {
        history("/stay")
    }

    return <section className="home">
        <div className="hero flex flex-column">
            <h1 className="hero-title">Find a place for your next vacation</h1>
            <button onClick={onExplore} className="hero-button">
                <span>Explore</span>
            </button>
        </div>
        <div className="top-rated-title">Top Rated Apartments</div>

        <TopRatedList stays={stays} />
        <div className="homepage-host-img">
            <div className="txt-container">
                <div>Open your door</div>
                <div>to hosting</div>
                <Link to={`/signup`} >
                    <button className='mouse-cursor-gradient-tracking'><span>Try Hosting</span></button>
                </Link>
            </div>
        </div>
    </section>
}