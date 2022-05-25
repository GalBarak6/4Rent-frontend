import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadStays } from '../store/actions/stay.actions'

import { StayList } from '../cmps/stay-list'

export const StayApp = () => {

    const { stays } = useSelector((storeState) => storeState.stayModule)
    const dispatch = useDispatch()

    useEffect(() => {
        console.log('loading')
        dispatch(loadStays())
    }, [])


    return <section className="stay-app">
        <StayList stays={stays} />
    </section>
}