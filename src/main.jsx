import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}

const redirectPath = new URLSearchParams(window.location.search).get('p')

if (redirectPath) {
  const nextPath = redirectPath.startsWith('/') ? redirectPath : `/${redirectPath}`
  const nextUrl = `${nextPath}${window.location.hash}`
  window.history.replaceState(null, '', nextUrl)
  window.scrollTo(0, 0)
}

if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/image-cache-sw.js', { updateViaCache: 'none' })
    .catch(() => {})
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
