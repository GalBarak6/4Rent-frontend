import { useNavigate } from "react-router-dom";

export const Home = () => {

    const history = useNavigate()

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