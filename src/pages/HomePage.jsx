import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { heroRelease } from '../data/releases'
import { voidloop } from '../data/voidloop'
import androidIcon from '../assets/icons/android.svg'
import appleIcon from '../assets/icons/apple.svg'
import steamIcon from '../assets/icons/steam.svg'

function WindowsIcon() {
  return (
    <img className="platform-link-icon" src={steamIcon} alt="" />
  )
}

function AppleIcon() {
  return (
    <img className="platform-link-icon" src={appleIcon} alt="" />
  )
}

function AndroidIcon() {
  return (
    <img className="platform-link-icon platform-link-icon-android" src={androidIcon} alt="" />
  )
}

export default function HomePage() {
  const heroRef = useRef(null)
  const heroBackgroundRef = useRef(null)
  const playMenuRef = useRef(null)
  const [greenOverlayEnabled, setGreenOverlayEnabled] = useState(false)
  const [playMenuOpen, setPlayMenuOpen] = useState(false)

  useEffect(() => {
    const heroElement = heroRef.current
    const backgroundElement = heroBackgroundRef.current

    if (!heroElement || !backgroundElement) {
      return undefined
    }

    let frameId = 0

    const updateParallax = () => {
      frameId = 0

      const rect = heroElement.getBoundingClientRect()
      const viewportHeight = window.innerHeight || 0

      if (rect.bottom <= 0 || rect.top >= viewportHeight) {
        return
      }

      const offset = (rect.top - viewportHeight * 0.5) * -0.28
      backgroundElement.style.setProperty('--hero-parallax-y', `${offset}px`)
    }

    const requestUpdate = () => {
      if (frameId) {
        return
      }

      frameId = window.requestAnimationFrame(updateParallax)
    }

    requestUpdate()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId)
      }
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
    }
  }, [])

  useEffect(() => {
    document.body.classList.toggle('green-overlay-active', greenOverlayEnabled)

    return () => {
      document.body.classList.remove('green-overlay-active')
    }
  }, [greenOverlayEnabled])

  useEffect(() => {
    if (!playMenuOpen) {
      return undefined
    }

    const handlePointerDown = (event) => {
      if (!playMenuRef.current?.contains(event.target)) {
        setPlayMenuOpen(false)
      }
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setPlayMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [playMenuOpen])

  return (
    <main>
      <section className="hero-section" id="hero" ref={heroRef}>
        <div className="hero-background" aria-hidden="true" ref={heroBackgroundRef}>
          <img src={heroRelease.backgroundImage} alt="" />
        </div>

        <div className="hero-copy">
          <p className="eyebrow">Indie Game Studio</p>
          <h1>Voidloop</h1>
          <p className="hero-text">
            Voidloop: Dive into cursed caves, gather
            resources, upgrade your tools, and push deeper in Indie Game Studio's
            debut roguelite adventure.
          </p>

          <div className="hero-actions">
            <div className="hero-dropdown" ref={playMenuRef}>
              <button
                aria-expanded={playMenuOpen}
                aria-haspopup="menu"
                className="button button-primary hero-cta-glow hero-dropdown-trigger"
                onClick={() => setPlayMenuOpen((open) => !open)}
                type="button"
              >
                <span>Play Voidloop</span>
                <svg className={`hero-dropdown-caret${playMenuOpen ? ' is-open' : ''}`} viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6.7 9.3a1 1 0 0 1 1.4 0L12 13.2l3.9-3.9a1 1 0 1 1 1.4 1.4l-4.6 4.6a1 1 0 0 1-1.4 0L6.7 10.7a1 1 0 0 1 0-1.4Z" />
                </svg>
              </button>
              {playMenuOpen ? (
                <div className="hero-dropdown-menu" role="menu">
                  <a
                    className="hero-dropdown-item"
                    href={voidloop.links.steam}
                    rel="noreferrer"
                    role="menuitem"
                    target="_blank"
                  >
                    <WindowsIcon />
                    <span>Steam</span>
                  </a>
                  <a
                    className="hero-dropdown-item"
                    href={voidloop.links.appStore}
                    rel="noreferrer"
                    role="menuitem"
                    target="_blank"
                  >
                    <AppleIcon />
                    <span>App Store</span>
                  </a>
                  <a
                    className="hero-dropdown-item"
                    href={voidloop.links.googlePlay}
                    rel="noreferrer"
                    role="menuitem"
                    target="_blank"
                  >
                    <AndroidIcon />
                    <span>Google Play</span>
                  </a>
                </div>
              ) : null}
            </div>
            <Link className="button button-secondary" to="/voidloop">
              Explore Voidloop
            </Link>
          </div>
        </div>

        <div className="hero-art">
          <button
            aria-label="Toggle hidden site overlay"
            className="hero-float hero-float-button"
            onClick={() => setGreenOverlayEnabled((enabled) => !enabled)}
            type="button"
          >
            <img
              src={heroRelease.floatingImage}
              alt="Featured game artwork floating over the hero background"
            />
          </button>
        </div>
      </section>

      <div className="pixel-divider" aria-hidden="true" />

      <section className="home-update-feature" aria-labelledby="home-update-title">
        <div className="home-update-image">
          <img src={voidloop.latestUpdate.screenshots[0]} alt="Void Spirit wearing a hat in Voidloop" />
        </div>
        <div className="home-update-copy">
          <p className="eyebrow">Voidloop · {voidloop.latestUpdate.version}</p>
          <h2 id="home-update-title">{voidloop.latestUpdate.label}</h2>
          <p>{voidloop.latestUpdate.description}</p>
          <Link className="button button-primary" to="/voidloop#hat-update">See what&apos;s new</Link>
        </div>
      </section>
    </main>
  )
}
