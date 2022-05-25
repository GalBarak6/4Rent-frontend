import { ReactComponent as Language } from '../assets/icons/language.svg'
// import img from '../assets/Images/hero.jpg'

export const Home = () => {
    return <section className="home full">
        <div className="hero">
            <h1>hi from home pageeee</h1>
            <p>hello</p>
        </div>
        {<Language />}
        {/* <img src={require('../assets/images/hero.jpg')} alt=""/> */}
        {/* <img src={"../assets/images/hero.jpg"} alt=""/> */}
        {/* <img src={img} alt="" /> */}
        {/* <img src="../assets/images/hero.jpg" alt="" /> */}
    </section>
}