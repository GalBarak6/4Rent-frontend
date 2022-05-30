import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadStays, setFilter } from '../store/actions/stay.actions'
// import $ from "jquery";
var $ = require( "jquery" );

// export const StayFilter = ({ onTypeChange, onAmenitiesChange, labelChange, onPriceChange, onSetFilters }) => {
export const StayFilter = ({ setFilters, labelChange }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedFilter, setSelectedFilter] = useState('All')

    const { filterBy } = useSelector((storeState) => storeState.stayModule)
    const [filterByType, setFilterByType] = useState([])
    const [filterByPrice, setFilterPrice] = useState(100)
    const [filterByAmenities, setFilterByAmenities] = useState([])

    const onTypeChange = ({ target }) => {
        const field = target.name
        let { value } = target
        console.log({ value })
        console.log({ field })

        if (target.checked) {
            setFilterByType((prevState) => (
                [...prevState, field]
            ))
        }

        if (!target.checked) {
            setFilterByType((prevState) => (
                prevState.filter(type => type !== field)
            ))
        }
    }
    const onAmenitiesChange = ({ target }) => {
        const field = target.name

        if (target.checked) {
            setFilterByAmenities((prevState) => (
                [...prevState, field]
            ))
        }

        if (!target.checked) {
            setFilterByAmenities((prevState) => (
                prevState.filter(amenity => amenity !== field)
            ))
        }
    }

    const onPriceChange = ({ target }) => {
        const field = target.name
        let { value } = target
        setFilterPrice(value)
    }

    const onLabelChange = (value) => {
        setSelectedFilter(value)
        labelChange(value)
    }

    
    const onOpenModal = () => {
        setIsModalOpen(true)
    }
    const onCloseModal = () => {
        setIsModalOpen(false)
    }
    
    const onSetFilters = () => {
        // ev.preventDefault()
        setIsModalOpen(false)
        console.log('stay-filter.onSetFilters')
        setFilters(filterByType, filterByAmenities, filterByPrice)
    }

    const onClearFilters = () => {
        // document.getElementById("House").checked = false
        $( 'input[type="checkbox"]' ).prop('checked', false);
        setFilterPrice(100)
        setFilterByAmenities([])
        setFilterByType([])
    }


    let className = ''
    return <section className="stay-filter">

        <div className="labels-container">
            {
                (className = (selectedFilter === 'All') ? 'btn-label selected' : 'btn-label') &&
                <button onClick={() => { onLabelChange("All") }} className={className}>
                    <img src={require(`../assets/icons/allHomes.jpg`)} alt="" />
                    <div>All Homes</div>
                </button>
            }


            {
                (className = (selectedFilter === 'Design') ? 'btn-label selected' : 'btn-label') &&
                <button onClick={() => { onLabelChange("Design") }} className={className} >
                    <img src={require(`../assets/icons/design.jpg`)} alt="" />
                    <div>Design</div>
                </button>}
            {
                (className = (selectedFilter === 'Beach') ? 'btn-label selected' : 'btn-label') &&
                <button onClick={() => { onLabelChange("Beach") }} className={className}>
                    <img src={require(`../assets/icons/beach.jpg`)} alt="" />
                    <div>Beach</div>
                </button>}
            {
                (className = (selectedFilter === 'Amazing pools') ? 'btn-label selected' : 'btn-label') &&
                <button onClick={() => { onLabelChange("Amazing pools") }} className={className}  >
                    <img src={require(`../assets/icons/pools.jpg`)} alt="" />
                    <div>Amazing pools</div>
                </button>}
            {
                (className = (selectedFilter === 'Cabins') ? 'btn-label selected' : 'btn-label') &&
                <button onClick={() => { onLabelChange("Cabins") }} className={className} >
                    <img src={require(`../assets/icons/cabins.jpg`)} alt="" />
                    <div>Cabins</div>
                </button>}
            {
                (className = (selectedFilter === 'OMG!') ? 'btn-label selected' : 'btn-label') &&
                <button onClick={() => { onLabelChange("OMG!") }} className={className}>
                    <img src={require(`../assets/icons/omg.jpg`)} alt="" />
                    <div>OMG!</div>
                </button>}
            {
                (className = (selectedFilter === 'Camping') ? 'btn-label selected' : 'btn-label') &&
                <button onClick={() => { onLabelChange("Camping") }} className={className} >
                    <img src={require(`../assets/icons/camping.jpg`)} alt="" />
                    <div>Camping</div>
                </button>}
            {
                (className = (selectedFilter === 'Islands') ? 'btn-label selected' : 'btn-label') &&
                <button onClick={() => { onLabelChange("Islands") }} className={className} >
                    <img src={require(`../assets/icons/Islands.jpg`)} alt="" />
                    <div>Islands</div>
                </button>}
            {
                (className = (selectedFilter === 'Tiny homes') ? 'btn-label selected' : 'btn-label') &&
                <button onClick={() => { onLabelChange("Tiny homes") }} className={className} >
                    <img src={require(`../assets/icons/Tiny homes.jpg`)} alt="" />
                    <div>Tiny homes</div>
                </button>}
            {
                (className = (selectedFilter === 'Lakefront') ? 'btn-label selected' : 'btn-label') &&
                <button onClick={() => { onLabelChange("Lakefront") }} className={className} >
                    <img src={require(`../assets/icons/Lakefront.jpg`)} alt="" />
                    <div>Lakefront</div>
                </button>}

            {/* {
                (className = (selectedFilter === 'Arctic') ? 'btn-label selected' : 'btn-label') &&
                <button onClick={() => { onLabelChange("Arctic") }} className={className} >
                    <img src={require(`../assets/icons/Arctic.jpg`)} alt="" />
                    <div>Arctic</div>
                </button>} */}

        </div>
        <div>
            <button className="btn-filters" onClick={() => { onOpenModal() }}>
                <span ><svg className="icon-container" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" >
                    <path d="M5 8c1.306 0 2.418.835 2.83 2H14v2H7.829A3.001 3.001 0 1 1 5 8zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm6-8a3 3 0 1 1-2.829 4H2V4h6.17A3.001 3.001 0 0 1 11 2zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path></svg>
                </span>
                <span>Filters</span>

            </button>
        </div>
        {
            isModalOpen &&
            <div className="filters-modal">
                <form onSubmit={() => { onSetFilters() }}>

                    <div className="modal-title">
                        <button className="close-btn" onClick={() => { onCloseModal() }}>X</button>
                        <div>Filters</div>
                    </div>

                    <div className="modal-details">
                        <div className="property-type">
                            <div className="title">Property type</div>
                            <input type="checkbox" id="House" name="House" value="House" onChange={onTypeChange} />
                            <label htmlFor="House">House</label>

                            <input type="checkbox" id="Apartment" name="Apartment" value="Apartment" onChange={onTypeChange} />
                            <label htmlFor="Apartment">Apartment</label>

                            <input type="checkbox" id="House" name="Guesthouse" value="Guesthouse" onChange={onTypeChange} />
                            <label htmlFor="Guesthouse">Guesthouse</label>

                            <input type="checkbox" id="Hotel" name="Hotel" value="Hotel" onChange={onTypeChange} />
                            <label htmlFor="Hotel">Hotel</label>

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

            </div>
        }




    </section >
}