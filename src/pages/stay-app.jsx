import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadStays, setFilter } from '../store/actions/stay.actions'

import { StayList } from '../cmps/stay-list'
import { StayFilter } from '../cmps/stay-filter'
import { StayFilterModal } from '../cmps/stay-filter-modal'
// import { loadUsers } from '../store/actions/user.actions'


export const StayApp = () => {

    const { stays, filterBy } = useSelector((storeState) => storeState.stayModule)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isFilterOn, setIsFilterOn] = useState(false)

    const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(loadUsers())
    // },[])

    useEffect(() => {
        dispatch(loadStays())
        if (filterBy.type.length > 0 || filterBy.amenities.length > 0 || filterBy.price || filterBy.city || filterBy.capacity) setIsFilterOn(true)
        console.log(filterBy)
    }, [filterBy])

    useEffect(() => {
        dispatch(loadStays())
    }, [isModalOpen])

    const labelChange = (value) => {
        console.log(value)
        if (value === 'All') {
            setIsFilterOn(false)
            dispatch(setFilter({ ...filterBy, label: '', type: [], amenities: [], price: '', city:'', capacity: ''}))
        }
        else dispatch(setFilter({ ...filterBy, label: value }))
    }

    const onOpenModal = () => {
        setIsModalOpen(true)
    }
    const onCloseModal = () => {
        setIsModalOpen(false)
    }

    if (!stays) return <div className="dots">
        <div></div>
        <div></div>
        <div></div>
    </div>
    return <section className="stay-app">
        <StayFilter labelChange={labelChange} onOpenModal={onOpenModal} isFilterOn={isFilterOn} />
        <StayList stays={stays} />
        {isModalOpen && <StayFilterModal onCloseModal={onCloseModal} />}

    </section>
}