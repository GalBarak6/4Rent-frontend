import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadStays, setFilter } from '../store/actions/stay.actions'

import { StayList } from '../cmps/stay-list'
import { StayFilter } from '../cmps/stay-filter'


export const StayApp = () => {

    const { stays, filterBy } = useSelector((storeState) => storeState.stayModule)
    const [filterByType, setFilterByType] = useState([])
    const [filterByPrice, setFilterPrice] = useState(100)
    const [filterByAmenities, setFilterByAmenities] = useState([])
    const [filterByLabel, setFilterByLabel] = useState('')


    const dispatch = useDispatch()

    useEffect(() => {
        console.log('loading')
        dispatch(loadStays())
    }, [])



    useEffect(() => {
        dispatch(loadStays())
        console.log('from stay-app', filterBy)
    }, [filterBy])

    useEffect(() => {
        dispatch(setFilter({ ...filterBy, type: filterByType }))
    }, [filterByType])

    useEffect(() => {
        dispatch(setFilter({ ...filterBy, price: filterByPrice }))
        console.log(filterBy)
    }, [filterByPrice])

    useEffect(() => {
        dispatch(setFilter({ ...filterBy, amenities: filterByAmenities }))
    }, [filterByAmenities])

    useEffect(() => {
        dispatch(setFilter({ ...filterBy, label: filterByLabel }))
        console.log('after filterByLabel ', filterBy)
    }, [filterByLabel])

    const onHandleChange = ({ target }) => {
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

    const labelChange = (value) => {
        console.log(value)
        if (value === 'All') setFilterByLabel('')
        else setFilterByLabel(value)
    }
    const onPriceChange = ({ target }) => {
        const field = target.name
        let { value } = target
        setFilterPrice(value)
    }

    if (!stays) return <div className="dots">
        <div></div>
        <div></div>
        <div></div>
    </div>
    return <section className="stay-app">
        <StayFilter filterBy={filterBy}
            onHandleChange={onHandleChange}
            onAmenitiesChange={onAmenitiesChange}
            labelChange={labelChange}
            onPriceChange={onPriceChange}
        />
        <StayList stays={stays} />
    </section>
}