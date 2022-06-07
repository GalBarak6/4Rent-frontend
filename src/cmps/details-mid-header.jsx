export const DetailsMidHeader = ({ price }) => {
    return <section className="details-mid-header">
        <div className="general flex">
            <div>Photos</div>
            <div>Amenities</div>
            <div>Reviews</div>
            <div>Location</div>
        </div>

        <div className="reserve-container flex center">
            <div className="reserve"><span className="price">${price}</span> night</div>
            <button className='mouse-cursor-gradient-tracking'><span>Reserve</span></button>
        </div>
    </section>
}