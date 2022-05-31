import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadStays, setFilter } from '../store/actions/stay.actions'

import { StayList } from '../cmps/stay-list'
import { StayFilter } from '../cmps/stay-filter'


export const StayApp = () => {

    const { stays, filterBy } = useSelector((storeState) => storeState.stayModule)
    const [filterByLabel, setFilterByLabel] = useState('')

    const dispatch = useDispatch()

    useEffect(() => {
        console.log('loading')
        dispatch(loadStays())
    }, [])

    useEffect(() => {
        dispatch(loadStays())
        // console.log('stay-app.useEffect -- after setFilterBy ', filterBy)
    }, [filterBy])

    useEffect(() => {
        dispatch(setFilter({ ...filterBy, label: filterByLabel }))
    }, [filterByLabel])


    const labelChange = (value) => {
        console.log(value)
        if (value === 'All') {
            setFilterByLabel('')
            setFilters([],[],100)

        }
        else setFilterByLabel(value)
    }

    const setFilters = (filterByType, filterByAmenities, filterByPrice) => {
        dispatch(setFilter({ ...filterBy, type: filterByType, amenities: filterByAmenities, price: filterByPrice }))
    }

    if (!stays) return <div className="dots">
        <div></div>
        <div></div>
        <div></div>
    </div>
    return <section className="stay-app">
        <StayFilter labelChange={labelChange} setFilters={setFilters}/>
        <StayList stays={stays} />
    </section>
}