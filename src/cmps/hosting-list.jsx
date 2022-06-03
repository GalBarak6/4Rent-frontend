import { HostingPreview } from '../cmps/hosting-preview'
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react'
import { loadStays, setFilter } from '../store/actions/stay.actions'

export const HostingList = () => {
    const { user } = useSelector((storeState) => storeState.userModule)
    const { stays, filterBy } = useSelector((storeState) => storeState.stayModule)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setFilter({ ...filterBy, host: 'Linda-Lee' }))
        dispatch(loadStays())
        console.log(stays)
    }, [])

    
    return <section className="hosting-list">
        <table>
            <tbody>
                {user && user.isHost && stays.map(stay => { return <HostingPreview stay={stay} key={stay.host._id} /> })}
            </tbody>
        </table>
    </section>
}