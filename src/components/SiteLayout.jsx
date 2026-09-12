import { useEffect, useLayoutEffect, useRef, useState } from 'react'
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
  const [mobileMenu, setMobileMenu] = useState({ path: '', isOpen: false })
  const headerRef = useRef(null)
  const menuButtonRef = useRef(null)
  const location = useLocation()
  const isQuizPage = location.pathname.replace(/\/$/, '') === '/a-normal-quiz-game'
  const isMenuOpen = mobileMenu.path === location.pathname && mobileMenu.isOpen

  const closeMenu = () => {
    setMobileMenu({ path: location.pathname, isOpen: false })
  }

  const toggleMenu = () => {
    setMobileMenu((currentMenu) => ({
      path: location.pathname,
      isOpen: currentMenu.path === location.pathname ? !currentMenu.isOpen : true,
    }))
  }

  useLayoutEffect(() => {
    const header = headerRef.current
    const shell = header.parentElement
    const updateHeaderHeight = () => {
      shell.style.setProperty('--site-header-height', `${header.getBoundingClientRect().height}px`)
    }

    updateHeaderHeight()

    const resizeObserver = new ResizeObserver(updateHeaderHeight)
    resizeObserver.observe(header, { box: 'border-box' })

    return () => {
      resizeObserver.disconnect()
      shell.style.removeProperty('--site-header-height')
    }
  }, [])

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

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMobileMenu((currentMenu) => ({ ...currentMenu, isOpen: false }))
        menuButtonRef.current?.focus()
      }
    }

    const handlePointerDown = (event) => {
      if (!headerRef.current?.contains(event.target)) {
        setMobileMenu((currentMenu) => ({ ...currentMenu, isOpen: false }))
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('pointerdown', handlePointerDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('pointerdown', handlePointerDown)
    }
  }, [isMenuOpen])

  useEffect(() => {
    const desktopMediaQuery = window.matchMedia('(min-width: 861px)')
    const handleBreakpointChange = (event) => {
      if (event.matches) {
        setMobileMenu((currentMenu) => ({ ...currentMenu, isOpen: false }))
      }
    }

    if (desktopMediaQuery.addEventListener) {
      desktopMediaQuery.addEventListener('change', handleBreakpointChange)
      return () => desktopMediaQuery.removeEventListener('change', handleBreakpointChange)
    }

    desktopMediaQuery.addListener(handleBreakpointChange)
    return () => desktopMediaQuery.removeListener(handleBreakpointChange)
  }, [])

  return (
    <div
      className={`page-shell${isQuizPage ? ' page-shell-quiz' : ''}`}
    >
      <header
        ref={headerRef}
        className={`topbar${isScrolled ? ' is-scrolled' : ''}${isMenuOpen ? ' is-menu-open' : ''}`}
      >
        <NavLink className="brand" to="/" onClick={closeMenu}>
          <img src={logoImage} alt="Indie Game Studio" decoding="async" />
        </NavLink>

        <button
          ref={menuButtonRef}
          className={`nav-menu-toggle${isMenuOpen ? ' is-open' : ''}`}
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={toggleMenu}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>

        <nav
          id="primary-navigation"
          className={`topnav${isMenuOpen ? ' is-open' : ''}`}
          aria-label="Primary"
        >
          <NavLink className={linkClassName} to="/" onClick={closeMenu}>
            Home
          </NavLink>
          <NavLink className={linkClassName} to="/voidloop" onClick={closeMenu}>
            Voidloop
          </NavLink>
          <NavLink className={linkClassName} to="/a-normal-quiz-game" onClick={closeMenu}>
            A Normal Quiz Game
          </NavLink>
          <NavLink className={linkClassName} to="/about" onClick={closeMenu}>
            About
          </NavLink>
          <NavLink className={linkClassName} to="/contact" onClick={closeMenu}>
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
            <img src={logoImage} alt="Indie Game Studio" loading="lazy" decoding="async" />
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
