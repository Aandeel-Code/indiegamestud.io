import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import logoImage from '../assets/image01.png'

function linkClassName({ isActive }) {
  return isActive ? 'nav-link is-active' : 'nav-link'
}

export default function SiteLayout() {
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 4)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [location.pathname])

  return (
    <div className="page-shell">
      <header className={isScrolled ? 'topbar is-scrolled' : 'topbar'}>
        <NavLink className="brand" to="/">
          <img src={logoImage} alt="Indie Game Studio" />
        </NavLink>

        <nav className="topnav" aria-label="Primary">
          <NavLink className={linkClassName} to="/">
            Home
          </NavLink>
          <NavLink className={linkClassName} to="/voidloop">
            Voidloop
          </NavLink>
          <NavLink className={linkClassName} to="/about">
            About
          </NavLink>
          <NavLink className={linkClassName} to="/contact">
            Contact
          </NavLink>
        </nav>
      </header>

      <div className="page-transition" key={location.pathname}>
        <Outlet />
      </div>

      <footer className="site-footer">
        <div className="footer-brand">
          <NavLink className="brand footer-logo" to="/">
            <img src={logoImage} alt="Indie Game Studio" />
          </NavLink>
        </div>

        <div className="footer-socials" aria-label="Social links">
          <a
            className="social-link"
            href="https://x.com/1ndieGameStudio/"
            target="_blank"
            rel="noreferrer"
            aria-label="X"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17.64 3H20.7l-6.68 7.63L22 21h-6.27l-4.9-6.4L5.23 21H2.16l7.14-8.16L2 3h6.43l4.43 5.85L17.64 3Zm-1.1 16.12h1.7L7.5 4.78H5.68l10.86 14.34Z" />
            </svg>
          </a>
          <a
            className="social-link"
            href="https://bsky.app/profile/indiegamestudio.bsky.social/"
            target="_blank"
            rel="noreferrer"
            aria-label="Bluesky"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 11.36c1.67-3.21 6.22-8.18 8.63-9.88 1.73-1.22 2.37-1.01 2.37-.21 0 1.61-2.1 6.68-3.09 8.58-.68 1.31-1.5 2.58-2.78 3.34 1.16-.19 2.47-.03 3.3.68 1.47 1.25 1.01 3.37-.38 4.51-1.56 1.28-4.2 1.56-6.2.77-1.14-.45-1.93-1.3-2.55-2.34-.62 1.04-1.41 1.89-2.55 2.34-2 .79-4.64.51-6.2-.77-1.39-1.14-1.85-3.26-.38-4.51.83-.71 2.14-.87 3.3-.68-1.28-.76-2.1-2.03-2.78-3.34C3.1 7.86 1 2.79 1 1.18c0-.8.64-1.01 2.37.21C5.78 3.18 10.33 8.15 12 11.36Z" />
            </svg>
          </a>
          <a
            className="social-link"
            href="https://www.instagram.com/indiegamestudio_/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7.25 2h9.5A5.25 5.25 0 0 1 22 7.25v9.5A5.25 5.25 0 0 1 16.75 22h-9.5A5.25 5.25 0 0 1 2 16.75v-9.5A5.25 5.25 0 0 1 7.25 2Zm0 1.8A3.45 3.45 0 0 0 3.8 7.25v9.5a3.45 3.45 0 0 0 3.45 3.45h9.5a3.45 3.45 0 0 0 3.45-3.45v-9.5a3.45 3.45 0 0 0-3.45-3.45h-9.5Zm9.9 1.35a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.8A3.2 3.2 0 1 0 12 15.2 3.2 3.2 0 0 0 12 8.8Z" />
            </svg>
          </a>
          <a
            className="social-link"
            href="https://www.linkedin.com/in/jasper-levin-b25b73298/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4.98 3.5a1.98 1.98 0 1 1 0 3.96 1.98 1.98 0 0 1 0-3.96ZM3.3 8.85h3.36V20.7H3.3V8.85Zm5.48 0h3.22v1.62h.05c.45-.85 1.54-1.95 3.16-1.95 3.38 0 4 2.22 4 5.1v7.08h-3.36v-6.27c0-1.5-.03-3.43-2.09-3.43-2.1 0-2.42 1.64-2.42 3.32v6.38H8.78V8.85Z" />
            </svg>
          </a>
          <a
            className="social-link"
            href="mailto:jasper@indiegamestud.io"
            aria-label="Email"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 5.25A2.25 2.25 0 0 1 5.25 3h13.5A2.25 2.25 0 0 1 21 5.25v13.5A2.25 2.25 0 0 1 18.75 21H5.25A2.25 2.25 0 0 1 3 18.75V5.25Zm2.1.41v.15l6.9 5.11 6.9-5.11v-.15H5.1Zm13.8 2.4-6.36 4.7a.9.9 0 0 1-1.08 0L5.1 8.06v10.69c0 .08.07.15.15.15h13.5c.08 0 .15-.07.15-.15V8.06Z" />
            </svg>
          </a>
        </div>

        <div className="footer-meta">
          <p>© 2026 Indie Game Studio. All rights reserved.</p>
          <p>Made by aandeel.</p>
        </div>
      </footer>
    </div>
  )
}
