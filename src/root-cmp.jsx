import { HashRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { Home } from './pages/home'
import { Host } from './pages/host'
import { AppHeader } from './cmps/app-header'
import { StayApp } from './pages/stay-app'
import { AppFooter } from './cmps/app-footer'
import { StayDetails } from './pages/stay-details'
import { Login } from './pages/login'
import { SignUp } from './pages/signup'
import { UserMenuModal } from './cmps/user-menu-modal'
import { WishList } from './pages/wishlist'
import { StayEdit } from './pages/stay-edit'
import { Trip } from './pages/trip'

const App = () => {


  const [isOpenModal, setIsOpenModal] = useState(false)
  const [layout, setLayout] = useState('main-layout')
  const location = useLocation()

  useEffect(() => {
    setIsOpenModal(false)
    let currLayout
    if (location.pathname.includes('stay/')) {
      currLayout = 'details-layout'
    } else if(location.pathname === '/'){
      currLayout = 'main-layout'
    } else {
      currLayout = 'stay-layout'
    }
    setLayout(currLayout)
  }, [location.pathname])


  const onOpenModal = () => {
    setIsOpenModal(!isOpenModal)
  }

  return <div className='app'>
    <AppHeader onOpenModal={onOpenModal} />
    <main className={layout}>
      <Routes>
        <Route path="/stay/edit/:stayId?" element={<StayEdit />} />
        <Route path="/stay/:stayId" element={<StayDetails />} />
        <Route path="/host/:userId" element={<Host />} />
        <Route path="/wishlist/:userId" element={<WishList />} />
        <Route path="/trip/:userId" element={<Trip />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/stay" element={<StayApp />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </main>
    <AppFooter />
    {isOpenModal && <UserMenuModal />}
  </div>
}

export default App
