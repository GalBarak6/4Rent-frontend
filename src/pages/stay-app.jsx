import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadStays, setFilter } from '../store/actions/stay.actions'

import { StayList } from '../cmps/stay-list'
import { StayFilter } from '../cmps/stay-filter'
import { StayFilterModal } from '../cmps/stay-filter-modal'
import { loadUsers } from '../store/actions/user.actions'


export const StayApp = () => {

    const { stays, filterBy } = useSelector((storeState) => storeState.stayModule)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(loadUsers())
    // },[])

    useEffect(() => {
        dispatch(loadStays())
        dispatch(loadUsers())
    }, [filterBy])

    useEffect(() => {
        dispatch(loadStays())
    }, [isModalOpen])


    const labelChange = (value) => {
        console.log(value)
        if (value === 'All') {
            dispatch(setFilter({ ...filterBy, label: '', type: [], amenities: [], price: 100 }))
        }
        else dispatch(setFilter({ ...filterBy, label: value }))
    }

    // const setFilters = (filterByType, filterByAmenities, filterByPrice) => {
    //     dispatch(setFilter({ ...filterBy, type: filterByType, amenities: filterByAmenities, price: filterByPrice }))
    // }

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
        <StayFilter labelChange={labelChange}  onOpenModal={onOpenModal}   />
        <StayList stays={stays} />
        {isModalOpen && <StayFilterModal  onCloseModal={onCloseModal} />}

    </section>
}