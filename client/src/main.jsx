import React from 'react'
import ReactDOM from 'react-dom/client'

import {VitalFitApp} from './VitalFitApp'

import './index.css'
import {BrowserRouter} from 'react-router-dom'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <VitalFitApp />
    </BrowserRouter>
  </React.StrictMode>,
)
