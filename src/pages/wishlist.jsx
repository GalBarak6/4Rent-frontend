import { useSelector } from "react-redux"
import { useEffect, useState } from 'react'

import { StayList } from '../cmps/stay-list'

export const WishList = () => {

    const [stays, setStays] = useState('')
    const { user } = useSelector((storeState) => storeState.userModule)

    useEffect(() => {
        console.log('user', user);
        setStays(user.wishlist)
    }, [])
console.log('staysss', stays);
    if (!stays) return
    return <section className="wishlist">
        <h1>Wishlist</h1>
        <StayList stays={stays} />
    </section>
}