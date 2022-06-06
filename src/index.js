import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './styles/styles.scss'
import App from './root-cmp'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <Router>
    <App />
    </Router>
  </Provider>
)

serviceWorkerRegistration.unregister()
