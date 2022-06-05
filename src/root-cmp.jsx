import { HashRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
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

const App = () => {

  const [isOpenModal, setIsOpenModal] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setIsOpenModal(false)
  }, [location.pathname])

  const onOpenModal = () => {
    setIsOpenModal(!isOpenModal)
  }

  return <div className='app'>
    <AppHeader onOpenModal={onOpenModal} />
    <main className='main-layout'>
      <Routes>
        <Route path="/stay/edit/:stayId?" element={<StayEdit />} />
        <Route path="/stay/:stayId" element={<StayDetails />} />
        <Route path="/host/:userId" element={<Host />} />
        <Route path="/wishlist/:userId" element={<WishList />} />
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
