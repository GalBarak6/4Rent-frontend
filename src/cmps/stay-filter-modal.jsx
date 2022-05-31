import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFilter } from '../store/actions/stay.actions'

var $ = require("jquery");

export const StayFilterModal = ({ onCloseModal }) => {

    const { filterBy } = useSelector((storeState) => storeState.stayModule)
    const dispatch = useDispatch()

    // const [filterByType, setFilterByType] = useState([])
    // const [filterByPrice, setFilterPrice] = useState(100)
    // const [filterByAmenities, setFilterByAmenities] = useState([])

    // var filterByType 
    // var filterByAmenities 
    // var filterByPrice 

    // useEffect(() => {
    //     loadFilters()
    // console.log({filterByType})
    // console.log({filterByAmenities})
    // console.log({filterByPrice})
    // }, [])

    // const loadFilters = () => {
    //      filterByType = filterBy.type
    //      filterByType.forEach( type=> {
    //          $(`input[name=${type}]`).prop('checked', true)
    //          console.log('after forEach')
    //      })

    //      filterByAmenities = filterBy.amenities
    //      filterByPrice = filterBy.price
    // }

    let filterByType = []
    let filterByAmenities = []
    let filterByPrice = 100

    // const onTypeChange = ({ target }) => {
    //     const field = target.name

    //     if (target.checked) {
    //         console.log('check onTypeChange')
    //         filterByType = [...filterByType, field]
    //     }

    //     if (!target.checked) {
    //         filterByType = filterByType.filter(type => type !== field)
    //     }
    // }

    const onTypeChange = (value) => {
        filterByType = [...filterByType, value]
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
        filterByPrice = value
    }


    const onSetFilters = (ev) => {
        ev.preventDefault()
        onCloseModal()
        // console.log('stay-filter.onSetFilters')
        setFilters(filterByType, filterByAmenities, filterByPrice)
    }

    const setFilters = (filterByType, filterByAmenities, filterByPrice) => {
        dispatch(setFilter({ ...filterBy, type: filterByType, amenities: filterByAmenities, price: filterByPrice }))
    }


    const onClearFilters = () => {
        $('input[type="checkbox"]').prop('checked', false);
        // setFilterPrice(100)
        // setFilterByAmenities([])
        // setFilterByType([])
    }


    return <section className="stay-filter-modal">
        <form onSubmit={onSetFilters}>

            <div className="modal-title">
                <button className="close-btn" onClick={() => { onCloseModal() }}>X</button>
                <div>Filters</div>
            </div>

            <div className="modal-details">
                <div className="property-type">
                    <div className="title">Property type</div>
                    <div className="property-type-labels">
                        <button type="button" className="property-type-btn" onClick={()=> {onTypeChange ("House")}} >
                            <img src={require(`../assets/icons/house.jpg`)} alt="" />
                            <div>House</div>
                        </button>
                        <button type="button" className="property-type-btn" onClick={()=>{onTypeChange ("Apartment")}} >
                            <img src={require(`../assets/icons/apartment.jpg`)} alt="" />
                            <div>Apartment</div>
                        </button>
                        <button type="button" className="property-type-btn" onClick={()=>{onTypeChange ("Guesthouse")}} >
                            <img src={require(`../assets/icons/guesthouse.jpg`)} alt="" />
                            <div>Guesthouse</div>
                        </button>
                        <button type="button" className="property-type-btn" onClick={()=>{onTypeChange ("Hotel")}} >
                            <img src={require(`../assets/icons/hotel.jpg`)} alt="" />
                            <div>Hotel</div>
                        </button>

{/* 

                        <label>
                            <input className="checkbox" type="checkbox" name="House" value="House" onChange={onTypeChange} />
                            House
                        </label>

                        <label>
                            <input type="checkbox"  name="Apartment" value="Apartment" onChange={onTypeChange} />
                            Apartment
                        </label>


                        <label>
                            <input type="checkbox"name="Guesthouse" value="Guesthouse" onChange={onTypeChange} />
                            Guesthouse
                        </label>

                        <label>
                            <input type="checkbox" name="Hotel" value="Hotel" onChange={onTypeChange} />
                            Hotel
                        </label> */}

                    </div>

                </div>

                <div className="amenities">
                    <div className="title">Amenities</div>
                    <div className="amenities-content">

                        <div>
                            <div>
                                <input type="checkbox" id="TV" name="TV" value="TV" onChange={onAmenitiesChange} />
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
                    <span>100</span>
                    <input type="range" id="price" name="price" min="100" max="10000" onChange={onPriceChange} />
                    <span>10,000</span>
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