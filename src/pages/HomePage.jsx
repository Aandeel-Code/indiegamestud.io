import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { heroRelease } from '../data/releases'
import { voidloop } from '../data/voidloop'

function WindowsIcon() {
  return (
    <svg className="platform-link-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M2.6 2.6h8.55v8.55H2.6V2.6Zm10.25 0h8.55v8.55h-8.55V2.6ZM2.6 12.85h8.55v8.55H2.6v-8.55Zm10.25 0h8.55v8.55h-8.55v-8.55Z" />
    </svg>
  )
}

function AppleIcon() {
  return (
    <svg className="platform-link-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M16.365 12.673c-.027-2.861 2.336-4.235 2.442-4.299-1.334-1.947-3.405-2.214-4.143-2.244-1.744-.184-3.436 1.045-4.325 1.045-.906 0-2.273-1.027-3.747-.997-1.918.03-3.713 1.14-4.697 2.86-2.029 3.515-.516 8.683 1.43 11.527.974 1.393 2.111 2.95 3.598 2.895 1.455-.061 2-.93 3.759-.93 1.743 0 2.257.93 3.771.895 1.562-.025 2.546-1.398 3.486-2.804 1.126-1.595 1.578-3.169 1.595-3.249-.037-.012-3.135-1.198-3.169-4.699ZM13.524 4.276c.783-.979 1.319-2.307 1.17-3.661-1.133.05-2.55.783-3.365 1.743-.723.845-1.368 2.225-1.201 3.527 1.273.095 2.57-.645 3.396-1.609Z" />
    </svg>
  )
}

function AndroidIcon() {
  return (
    <svg className="platform-link-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7.18 8.4h9.64c.27 0 .49.22.49.49v7.41a1.2 1.2 0 0 1-1.2 1.2h-.58v2.07a.93.93 0 1 1-1.86 0V17.5h-3.34v2.07a.93.93 0 1 1-1.86 0V17.5h-.58a1.2 1.2 0 0 1-1.2-1.2V8.89c0-.27.22-.49.49-.49Zm2.32-3.13a.45.45 0 0 1-.17-.61.45.45 0 0 1 .61-.17l1.15.66a5.24 5.24 0 0 1 1.86-.34c.65 0 1.28.12 1.86.34l1.15-.66a.45.45 0 1 1 .44.78l-1 .57a5.18 5.18 0 0 1 1.96 2.11H7.54A5.18 5.18 0 0 1 9.5 5.84l-1-.57Zm1.3 1.72a.56.56 0 1 0 0-1.12.56.56 0 0 0 0 1.12Zm4.4 0a.56.56 0 1 0 0-1.12.56.56 0 0 0 0 1.12ZM5.1 9.38c.51 0 .93.42.93.93v4.95a.93.93 0 1 1-1.86 0v-4.95c0-.51.42-.93.93-.93Zm13.8 0c.51 0 .93.42.93.93v4.95a.93.93 0 1 1-1.86 0v-4.95c0-.51.42-.93.93-.93Z" />
    </svg>
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
    </main>
  )
}
