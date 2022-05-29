import { useNavigate } from "react-router-dom";
import { useEffect, useState, useLayoutEffect } from 'react'

export const Home = () => {

    const history = useNavigate()

    useEffect(() => {
        document.documentElement.style.setProperty('--grid-colum', '1/-1')
        document.documentElement.style.setProperty('--position', 'fixed')
        document.documentElement.style.setProperty('--border-style', 'none')
        return () => {
            document.documentElement.style.setProperty('--grid-column', '2')
            document.documentElement.style.setProperty('--position', 'block')
            document.documentElement.style.setProperty('--border-style', 'solid')
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
            <h1 className="hero-title">Looking for a place to stay? Let us help you!</h1>
            <button onClick={onExplore} className="hero-button">
                <span>Explore</span>
            </button>
        </div>
    </section>
}