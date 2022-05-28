import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import { Home } from './pages/home'
import { AppHeader } from './cmps/app-header'
import { StayApp } from './pages/stay-app'
import { AppFooter } from './cmps/app-footer'
import { StayDetails } from './pages/stay-details'

function App() {

 return <Router>
    <div className="app main-layout">
      <AppHeader />
      <main>
        <Routes>
          <Route path="/stay/:stayId" element={<StayDetails />} />
          {/* <Route path="/signup" element={<Signup />}/> */}
          <Route path="/stay" element={<StayApp />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
      <AppFooter />
    </div>
  </Router>
}
export default App
