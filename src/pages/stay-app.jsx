import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { loadStays, setFilter } from '../store/actions/stay.actions'
import { StayList } from '../cmps/stay-list'
import { StayFilter } from '../cmps/stay-filter'
import { Loader } from '../cmps/loader'
import { StayFilterModal } from '../cmps/stay-filter-modal'

export const StayApp = () => {

    const { stays, filterBy } = useSelector((storeState) => storeState.stayModule)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isFilterOn, setIsFilterOn] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadStays())
        if (filterBy.type.length > 0 || filterBy.amenities.length > 0 || filterBy.price) setIsFilterOn(true)
        if (filterBy.rating) dispatch(setFilter({ ...filterBy, rating: '' }))
    }, [filterBy])

    useEffect(() => {
        dispatch(loadStays())
    }, [isModalOpen])

    const handleLabelChange = (value) => {
        if (value === 'All') {
            setIsFilterOn(false)
            dispatch(setFilter({ ...filterBy, label: '', type: [], amenities: [], price: '', city: '', capacity: '' }))
        }
        else dispatch(setFilter({ ...filterBy, label: value }))
    }

    const onOpenModal = () => {
        setIsModalOpen(true)
    }
    const onCloseModal = () => {
        setIsModalOpen(false)
    }

    return <section className="stay-app">
        <StayFilter handleLabelChange={handleLabelChange} onOpenModal={onOpenModal} isFilterOn={isFilterOn} />
        {/* <Loader /> */}
        {!stays ? <Loader /> : <StayList stays={stays} />}
        {isModalOpen && <StayFilterModal onCloseModal={onCloseModal} />}

    </section>
}