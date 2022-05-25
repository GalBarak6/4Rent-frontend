import { StayPreview } from '../cmps/stay-preview'

export const StayList = ({ stays }) => {
    return <section className="stay-list">
        {stays.map(stay => { return <StayPreview stay={stay} key={stay._id} /> })}
    </section>
}