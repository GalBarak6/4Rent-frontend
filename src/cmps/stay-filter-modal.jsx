import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFilter } from '../store/actions/stay.actions'

var $ = require("jquery");

export const StayFilterModal = ({ onCloseModal }) => {

    const { filterBy } = useSelector((storeState) => storeState.stayModule)
    const dispatch = useDispatch()
    const [filterByPrice, setFilterPrice] = useState(filterBy.price)
    const [filterByType, setFilterByType] = useState(filterBy.type)

    let filterByAmenities = []


    const onTypeChange = (value) => {
        setFilterByType((prevState) => (
            [...prevState, value]
        ))
        // filterByType = [...filterByType, value]
    }

    const onAmenitiesChange = ({ target }) => {
        const field = target.name

        if (target.checked) {
            filterByAmenities = [...filterByAmenities, field]
        }

        if (!target.checked) {
            filterByAmenities = filterByAmenities.filter(amenity => amenity !== field)
        }

    }

    const onPriceChange = ({ target }) => {
        let { value } = target
        setFilterPrice(value)
    }


    const onSetFilters = (ev) => {
        ev.preventDefault()
        onCloseModal()
        setFilters(filterByType, filterByAmenities, filterByPrice)
    }

    const setFilters = (filterByType, filterByAmenities, filterByPrice) => {
        dispatch(setFilter({ ...filterBy, type: filterByType, amenities: filterByAmenities, price: filterByPrice }))
    }


    const onClearFilters = () => {
        $('input[type="checkbox"]').prop('checked', false)
        setFilterByType([])
    }

    let typeClassName = ''

    return <section className="stay-filter-modal">
        <form onSubmit={onSetFilters}>

            <div className="modal-title">
                {/* <button className="close-btn" onClick={() => { onCloseModal() }}>X</button> */}
                <button className="close-btn" onClick={() => { onCloseModal() }}>
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', fill: 'none', height: '16px', width: '16px', stroke: 'rgb(34, 34, 34)', strokeWidth: '3', overflow: 'visible' }}><path d="m6 6 20 20"></path><path d="m26 6-20 20"></path></svg>
                </button>

                <div className="title">Filters</div>
            </div>

            <div className="modal-details">

                <div className="property-type">
                    <div className="title">Property type</div>
                    <div className="property-type-labels">
                        {
                            (typeClassName = filterByType.includes('House') ? 'property-type-btn selected' : 'property-type-btn') &&
                            <button type="button" className={typeClassName} onClick={() => { onTypeChange("House") }} >
                                <img src={require(`../assets/icons/house.jpg`)} alt="" />
                                <div>House</div>
                            </button>
                        }
                        {
                            (typeClassName = filterByType.includes('Apartment') ? 'property-type-btn selected' : 'property-type-btn') &&
                            <button type="button" className={typeClassName} onClick={() => { onTypeChange("Apartment") }} >
                                <img src={require(`../assets/icons/apartment.jpg`)} alt="" />
                                <div>Apartment</div>
                            </button>
                        }

                        {
                            (typeClassName = filterByType.includes('Guesthouse') ? 'property-type-btn selected' : 'property-type-btn') &&
                            <button type="button" className={typeClassName} onClick={() => { onTypeChange("Guesthouse") }} >
                                <img src={require(`../assets/icons/guesthouse.jpg`)} alt="" />
                                <div>Guesthouse</div>
                            </button>

                        }
                        {
                            (typeClassName = filterByType.includes('Hotel') ? 'property-type-btn selected' : 'property-type-btn') &&
                            <button type="button" className={typeClassName} onClick={() => { onTypeChange("Hotel") }} >
                                <img src={require(`../assets/icons/hotel.jpg`)} alt="" />
                                <div>Hotel</div>
                            </button>
                        }

                    </div>

                </div>

                <div className="amenities">
                    <div className="title">Amenities</div>
                    <div className="amenities-content">

                        <div>
                            <div>
                                <input className="checkbox"type="checkbox" id="TV" name="TV" value="TV" onChange={onAmenitiesChange} />
                                <label htmlFor="TV">TV</label>
                            </div>

                            <div>
                                <input type="checkbox" id="Wifi" name="Wifi" value="Wifi" onChange={onAmenitiesChange} />
                                <label htmlFor="Wifi">Wifi</label>
                            </div>
                            <div>
                                <input type="checkbox" id="Kitchen" name="Kitchen" value="Kitchen" onChange={onAmenitiesChange} />
                                <label htmlFor="Kitchen">Kitchen</label>
                            </div>
                            <div>
                                <input type="checkbox" id="Pool" name="Pool" value="Pool" onChange={onAmenitiesChange} />
                                <label htmlFor="Pool">Pool</label>
                            </div>
                        </div>
                        <div>
                            <div>
                                <input type="checkbox" id="Air conditioning" name="Air conditioning" value="Air conditioning" onChange={onAmenitiesChange} />
                                <label htmlFor="Air conditioning">Air conditioning</label>
                            </div>
                            <div>
                                <input type="checkbox" id="Hot tub" name="Hot tub" value="Hot tub" price />
                                <label htmlFor="Hot tub">Hot tub</label>
                            </div>
                            <div>
                                <input type="checkbox" id="Gym" name="Gym" value="Gym" onChange={onAmenitiesChange} />
                                <label htmlFor="Gym">Gym</label>
                            </div>
                            <div>
                                <input type="checkbox" id="Self check-in" name="Self check-in" value="Self check-in" onChange={onAmenitiesChange} />
                                <label htmlFor="Self check-in">Self check-in</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="price">
                    <div className="title">Price range</div>
                    <div>The average nightly price is $600</div>
                    <input type="range" id="price" name="price" min="100" max="5000" onChange={onPriceChange} value={filterByPrice || 100} />
                    <div className="minmax-container">
                        <div className="minmax">
                            <div>min price</div>
                            {filterByPrice && <div>${filterByPrice}</div>}
                            {!filterByPrice && <div>$100</div>}

                        </div>
                        <span>-</span>
                        <div className="minmax">
                            <div>max price</div>
                            <div>$5,000+</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal-footer">
                <button type="button" className="clear-btn" onClick={() => { onClearFilters() }}>Clear all</button>
                <button className="show-btn">Show 1,000+ stays</button>
            </div>
        </form>

    </section >
}



    // const onTypeChange = ({ target }) => {
    //     const field = target.name
    //     let { value } = target
    //     console.log({ value })
    //     console.log({ field })

    //     if (target.checked) {
    //         setFilterByType((prevState) => (
    //             [...prevState, field]
    //         ))
    //     }

    //     if (!target.checked) {
    //         setFilterByType((prevState) => (
    //             prevState.filter(type => type !== field)
    //         ))
    //     }
    // }


    // const onAmenitiesChange = ({ target }) => {
    //     const field = target.name

    //     if (target.checked) {
    //         setFilterByAmenities((prevState) => (
    //             [...prevState, field]
    //         ))
    //     }

    //     if (!target.checked) {
    //         setFilterByAmenities((prevState) => (
    //             prevState.filter(amenity => amenity !== field)
    //         ))
    //     }
    // }


// const onPriceChange = ({ target }) => {
//     const field = target.name
//     let { value } = target
//     setFilterPrice(value)
// }