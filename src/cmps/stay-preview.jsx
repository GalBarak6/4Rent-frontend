import { Link } from 'react-router-dom'


export const StayPreview = ({ stay }) => {
    return <section className="stay-preview">
        <Link to={`/stay/${stay._id}`}>
            <h2>{stay.name}</h2>
        </Link>
    </section>
}