import { useNavigate, Link } from "react-router-dom"
import { useEffect, useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadStays, setFilter } from '../store/actions/stay.actions'

import { TopRatedList } from '../cmps/top-rated-list'
export const Home = () => {

    const history = useNavigate()
    const { stays, filterBy } = useSelector((storeState) => storeState.stayModule)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setFilter({ ...filterBy, rating: 5.0 }))
        dispatch(loadStays())
        let btn = document.querySelector('.mouse-cursor-gradient-tracking');
        btn.addEventListener('mousemove', e => {
            let rect = e.target.getBoundingClientRect();
            let x = e.clientX - rect.left;
            let y = e.clientY - rect.top;
            btn.style.setProperty('--x', x + 'px');
            btn.style.setProperty('--y', y + 'px');
        });


    }, [])

    // const { topRatedList, popularDestination } = useSelector((storeState) => storeState.stayModule)

    useEffect(() => {
        document.documentElement.style.setProperty('--grid-colum', '1/-1')
        document.documentElement.style.setProperty('--position', 'fixed')
        document.documentElement.style.setProperty('--border-style', 'none')
        document.documentElement.style.setProperty('--font-color', '#f7f7f7')
        document.documentElement.style.setProperty('--logo-color', '#f7f7f7')
        dispatch(setFilter({ ...filterBy, rating: 5 }))
        dispatch(loadStays())
        return () => {
            document.documentElement.style.setProperty('--grid-column', '2')
            document.documentElement.style.setProperty('--position', 'block')
            document.documentElement.style.setProperty('--border-style', 'solid')
            document.documentElement.style.setProperty('--font-color', '#222222')
            document.documentElement.style.setProperty('--logo-color', '#FF385C')
            dispatch(setFilter({ ...filterBy, rating: '' }))
        }

    }, [])

    useLayoutEffect(() => {
        document.documentElement.style.setProperty('--grid-column', '1/-1')
        document.documentElement.style.setProperty('--position', 'fixed')
        const val = getComputedStyle(document.documentElement).getPropertyValue('--grid-colum')
        console.log({ val })
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