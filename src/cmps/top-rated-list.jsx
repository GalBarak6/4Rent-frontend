import { TopRatedPreview } from '../cmps/top-rated-preview'

export const TopRatedList = ({ stays }) => {

    return <section className="top-rated-list">
        {stays.map(stay => { return <TopRatedPreview stay={stay} key={stay._id} /> })}
    </section>
}