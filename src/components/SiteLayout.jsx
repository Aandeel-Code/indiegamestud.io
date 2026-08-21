import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import logoImage from '../assets/image01.png'
import blueskyIcon from '../assets/icons/bluesky.svg'
import emailIcon from '../assets/icons/envelope.svg'
import instagramIcon from '../assets/icons/instagram.svg'
import linkedinIcon from '../assets/icons/linkedin.svg'
import xIcon from '../assets/icons/x.svg'
import { getSeoForPath } from '../seo'

function linkClassName({ isActive }) {
  return isActive ? 'nav-link is-active' : 'nav-link'
}

export default function SiteLayout() {
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const seo = getSeoForPath(location.pathname)

    document.title = seo.title

    const updateMeta = (selector, attribute, value) => {
      const element = document.head.querySelector(selector)

      if (element) {
        element.setAttribute(attribute, value)
      }
    }

    updateMeta('meta[name="title"]', 'content', seo.title)
    updateMeta('meta[name="description"]', 'content', seo.description)
    updateMeta('meta[property="og:title"]', 'content', seo.title)
    updateMeta('meta[property="og:description"]', 'content', seo.description)
    updateMeta('meta[property="og:image"]', 'content', seo.image)
    updateMeta('meta[property="og:url"]', 'content', seo.url)
    updateMeta('meta[name="twitter:title"]', 'content', seo.title)
    updateMeta('meta[name="twitter:description"]', 'content', seo.description)
    updateMeta('meta[name="twitter:image"]', 'content', seo.image)
  }, [location.pathname])

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
            <img src={xIcon} alt="" />
          </a>
          <a
            className="social-link"
            href="https://bsky.app/profile/indiegamestudio.bsky.social/"
            target="_blank"
            rel="noreferrer"
            aria-label="Bluesky"
          >
            <img src={blueskyIcon} alt="" />
          </a>
          <a
            className="social-link"
            href="https://www.instagram.com/indiegamestudio_/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
          >
            <img src={instagramIcon} alt="" />
          </a>
          <a
            className="social-link"
            href="https://www.linkedin.com/in/jasper-levin-b25b73298/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <img src={linkedinIcon} alt="" />
          </a>
          <a
            className="social-link"
            href="mailto:jasper@indiegamestud.io"
            aria-label="Email"
          >
            <img src={emailIcon} alt="" />
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
