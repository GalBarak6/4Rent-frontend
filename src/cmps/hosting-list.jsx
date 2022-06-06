import { HostingPreview } from '../cmps/hosting-preview'
import { useSelector } from "react-redux"

export const HostingList = ({ stays, onHandleStayPaging }) => {
    const { user } = useSelector((storeState) => storeState.userModule)

    return <section className="hosting-list">
        <table>
            <tbody>
                {user && user.isHost && stays.map(stay => { return <HostingPreview stay={stay} key={stay._id} /> })}
            </tbody>
        </table>

        <div className='flex space-between'>
            <img className="paging-icon previous" src={require('../assets/icons/previous.png')} alt="" />
            <img className="paging-icon next" src={require('../assets/icons/next.png')} alt="" />
        </div>

    </section>
}