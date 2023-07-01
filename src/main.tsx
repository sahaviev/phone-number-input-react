import React from 'react'
import ReactDOM from 'react-dom/client'
import { PhoneInput } from './PhoneInput.tsx'

import './styles.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <PhoneInput />
  </React.StrictMode>,
)
