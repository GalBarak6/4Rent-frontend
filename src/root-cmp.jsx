import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Home } from './pages/home'
import { Host } from './pages/host'
import { AppHeader } from './cmps/app-header'
import { StayApp } from './pages/stay-app'
import { AppFooter } from './cmps/app-footer'
import { StayDetails } from './pages/stay-details'
import { Login } from './pages/login'
import { SignUp } from './pages/signup'
import { UserMenuModal } from './cmps/user-menu-modal'

const App = () => {

  const [isOpenModal, setIsOpenModal] = useState(false)

  // useEffect(() => {
  //   return () => {
  //     setIsOpenModal(false)
  //   }
  // }, [])

  const onOpenModal = () => {
    setIsOpenModal(!isOpenModal)
  }

  return <Router>
    <div className='app flex flex-column'>
      <AppHeader onOpenModal={onOpenModal} />
      <main className='main-layout'>
        <Routes>
          <Route path="/stay/:stayId" element={<StayDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/host" element={<Host />} />
          <Route path="/stay" element={<StayApp />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
      <AppFooter />
      {isOpenModal && <UserMenuModal />}
    </div>
  </Router>
}
export default App
