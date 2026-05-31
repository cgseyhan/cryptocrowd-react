import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { storyblokInit, apiPlugin } from '@storyblok/react'
import storyblokComponents from './storyblok/components'
import App from './App.jsx'
import Terms from './pages/Terms.jsx'
import Privacy from './pages/Privacy.jsx'
import CookieConsent from './components/CookieConsent.jsx'
import './index.css'

// ── Storyblok SDK Initialization (safe) ──────────────────
try {
  storyblokInit({
    accessToken: import.meta.env.VITE_STORYBLOK_ACCESS_TOKEN,
    use: [apiPlugin],
    components: storyblokComponents,
    apiOptions: {
      region: 'eu',
    },
  })
} catch (err) {
  console.warn('[Storyblok] Init failed:', err.message)
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <CookieConsent />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<App />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
