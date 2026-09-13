import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import androidIcon from '../assets/icons/android.svg'
import appleIcon from '../assets/icons/apple.svg'
import steamIcon from '../assets/icons/steam.svg'
import { aNormalQuizGame } from '../data/aNormalQuizGame'
import { voidloop } from '../data/voidloop'

export default function HomePage() {
  const playMenuRef = useRef(null)
  const [playMenuOpen, setPlayMenuOpen] = useState(false)

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
    <main className="home-page">
      <h1 className="home-sr-only">Indie Game Studio games</h1>

      <section className="home-game-split" aria-label="Featured games">
        <article className="home-game-panel home-game-panel-voidloop" aria-labelledby="home-voidloop-title">
          <div className="home-game-panel-media" aria-hidden="true">
            <img src={voidloop.heroImage} alt="" decoding="async" fetchPriority="high" />
          </div>
          <div className="home-game-panel-content">
            <p className="home-game-kicker">Out now · Windows + Mac + mobile</p>
            <h2 className="home-sr-only" id="home-voidloop-title">Voidloop</h2>
            <img className="home-game-logo home-game-logo-voidloop hero-logo-breathe" src={voidloop.logo} alt="Voidloop" decoding="async" />
            <p className="home-game-description">{voidloop.description}</p>

            <div className="home-game-actions">
              <div className="home-game-dropdown" ref={playMenuRef}>
                <button
                  aria-expanded={playMenuOpen}
                  aria-haspopup="menu"
                  className="home-game-button home-game-button-primary home-game-dropdown-trigger"
                  onClick={() => setPlayMenuOpen((open) => !open)}
                  type="button"
                >
                  <span>Play Voidloop</span>
                  <svg
                    className={`home-game-dropdown-caret${playMenuOpen ? ' is-open' : ''}`}
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M6.7 9.3a1 1 0 0 1 1.4 0L12 13.2l3.9-3.9a1 1 0 1 1 1.4 1.4l-4.6 4.6a1 1 0 0 1-1.4 0L6.7 10.7a1 1 0 0 1 0-1.4Z" />
                  </svg>
                </button>
                {playMenuOpen ? (
                  <div className="home-game-dropdown-menu" role="menu">
                    <a
                      className="home-game-dropdown-item"
                      href={voidloop.links.steam}
                      rel="noreferrer"
                      role="menuitem"
                      target="_blank"
                    >
                      <img src={steamIcon} alt="" />
                      <span>Steam</span>
                    </a>
                    <a
                      className="home-game-dropdown-item"
                      href={voidloop.links.appStore}
                      rel="noreferrer"
                      role="menuitem"
                      target="_blank"
                    >
                      <img src={appleIcon} alt="" />
                      <span>App Store</span>
                    </a>
                    <a
                      className="home-game-dropdown-item"
                      href={voidloop.links.googlePlay}
                      rel="noreferrer"
                      role="menuitem"
                      target="_blank"
                    >
                      <img src={androidIcon} alt="" />
                      <span>Google Play</span>
                    </a>
                  </div>
                ) : null}
              </div>
              <Link className="home-game-button home-game-button-secondary" to="/voidloop">
                Explore Voidloop
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </article>

        <article className="home-game-panel home-game-panel-quiz" aria-labelledby="home-quiz-title">
          <div className="home-game-panel-media" aria-hidden="true">
            <img src={aNormalQuizGame.background} alt="" decoding="async" fetchPriority="high" />
          </div>
          <div className="home-game-panel-content">
            <p className="home-game-kicker">Coming {aNormalQuizGame.releaseDate} · {aNormalQuizGame.platforms}</p>
            <h2 className="home-sr-only" id="home-quiz-title">A Normal Quiz Game</h2>
            <img className="home-game-logo home-game-logo-quiz hero-logo-breathe" src={aNormalQuizGame.logoTrimmed} alt="A Normal Quiz Game" decoding="async" />
            <p className="home-game-description">
              A chaotic quiz show where the questions have tricks, the rules keep changing,
              and the obvious answer is rarely the safe one.
            </p>

            <div className="home-game-actions">
              <a
                className="home-game-button home-game-button-primary"
                href={aNormalQuizGame.links.steam}
                target="_blank"
                rel="noreferrer"
              >
                <span className="home-game-steam-icon" aria-hidden="true" />
                Wishlist on Steam
              </a>
              <Link className="home-game-button home-game-button-secondary" to="/a-normal-quiz-game">
                Discover the game
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </article>
      </section>
    </main>
  )
}
