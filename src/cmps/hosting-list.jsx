import { HostingPreview } from '../cmps/hosting-preview'
import { useSelector, useDispatch } from "react-redux"
// import { useEffect } from 'react'
// import { loadStays, setFilter } from '../store/actions/stay.actions'
// import { useParams } from 'react-router-dom'

export const HostingList = ({stays}) => {
    const { user } = useSelector((storeState) => storeState.userModule)
    // const { stays, filterBy } = useSelector((storeState) => storeState.stayModule)
    // const dispatch = useDispatch()
    // const params = useParams()

    // useEffect( () => {
    //     dispatch(setFilter({ ...filterBy, host: params.userId }))
    //     dispatch(loadStays())

    //     return () => {
    //         dispatch(setFilter({ ...filterBy, host: '' }))
    //     }
    // }, [params.userId])

    return <section className="hosting-list">
        <table>
            <tbody>
                {user && user.isHost && stays.map(stay => { return <HostingPreview stay={stay} key={stay._id} /> })}
            </tbody>
        </table>
    </section>
}