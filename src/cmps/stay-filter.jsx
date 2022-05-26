
export const StayFilter = ({ onHandleChange, onAmenitiesChange, onLabelChange, onPriceChange }) => {
    return <section className="stay-filter">
        {/* <button>House</button>
        <button>Apartment</button>
        <button>Guesthouse</button>
        <button>Hotel</button> */}
        <div>
            <input type="checkbox" id="House" name="House" value="House" onChange={onHandleChange} />
            <label htmlFor="House">House</label>

            <input type="checkbox" id="Apartment" name="Apartment" value="Apartment" onChange={onHandleChange} />
            <label htmlFor="Apartment">Apartment</label>

            <input type="checkbox" id="House" name="Guesthouse" value="Guesthouse" onChange={onHandleChange} />
            <label htmlFor="Guesthouse">Guesthouse</label>

            <input type="checkbox" id="Hotel" name="Hotel" value="Hotel" onChange={onHandleChange} />
            <label htmlFor="Hotel">Hotel</label>

        </div>

        <div>
            <input type="checkbox" id="TV" name="TV" value="TV" onChange={onAmenitiesChange} />
            <label htmlFor="TV">TV</label>

            <input type="checkbox" id="Wifi" name="Wifi" value="Wifi" onChange={onAmenitiesChange} />
            <label htmlFor="Wifi">Wifi</label>

            <input type="checkbox" id="Kitchen" name="Kitchen" value="Kitchen" onChange={onAmenitiesChange} />
            <label htmlFor="Kitchen">Kitchen</label>

            <input type="checkbox" id="Pool" name="Pool" value="Pool" onChange={onAmenitiesChange} />
            <label htmlFor="Pool">Pool</label>

            <input type="checkbox" id="Air conditioning" name="Air conditioning" value="Air conditioning" onChange={onAmenitiesChange} />
            <label htmlFor="Air conditioning">Air conditioning</label>

            <input type="checkbox" id="Hot tub" name="Hot tub" value="Hot tub"price />
            <label htmlFor="Hot tub">Hot tub</label>

            <input type="checkbox" id="Gym" name="Gym" value="Gym" onChange={onAmenitiesChange} />
            <label htmlFor="Gym">Gym</label>

        </div>
        <div>
            <input class="Cabins" id="Cabins" type="button" value="Cabins" onClick={onLabelChange} />
        </div>
        <div>
                <label for="price">price</label>
            <span>100</span>
            <input type="range" id="price" name="price" min="100" max="10000" onChange={onPriceChange}/>
            <span>10000</span>
        </div>




        {/*         
        <select name="types" id="types" multiple onChange={onHandleChange}>
            <option value="House" name="House">House</option>
            <option value="Apartment" name="Apartment">Apartment</option>
            <option value="Guesthouse" name="Guesthouse">Guesthouse</option>
            <option value="Hotel" name="Hotel">Hotel</option>
        </select> */}

    </section>
}