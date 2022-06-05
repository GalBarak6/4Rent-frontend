import { HostingPreview } from '../cmps/hosting-preview'
import { useSelector } from "react-redux"

export const HostingList = ({stays}) => {
    const { user } = useSelector((storeState) => storeState.userModule)

    return <section className="hosting-list">
        <table>
            <tbody>
                {user && user.isHost && stays.map(stay => { return <HostingPreview stay={stay} key={stay._id} /> })}
            </tbody>
        </table>
    </section>
}