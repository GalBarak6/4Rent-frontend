import { Link } from 'react-router-dom'
import { DemoCarousel } from './carousel'

export const TopRatedPreview = ({ stay }) => {
    return <section className="top-rated-preview">

        <Link to={`/stay/${stay._id}`}>
        <div className="img-container">
            <img src={require(`../assets/Images/${stay.imgUrls[0]}`)} alt="" />
        </div>
            <div className="txt-container">
                <div className="flex space-between align-center">
                    <div className="bold">{stay.name} - {stay.loc.city}<span>, {stay.loc.country}</span></div>
                    <div className="flex align-center gap">
                    </div>
                </div>
                {/* <div>{stay.name}</div> */}

            </div>
        </Link>
    </section>
}