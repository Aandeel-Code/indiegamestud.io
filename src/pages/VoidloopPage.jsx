import { useState } from 'react'
import { createPortal } from 'react-dom'
import { voidloop } from '../data/voidloop'

export default function VoidloopPage() {
  const allScreenshots = [
    ...voidloop.featuredScreenshots,
    ...voidloop.galleryScreenshots,
  ]
  const [activeScreenshot, setActiveScreenshot] = useState(null)

  const showPreviousScreenshot = () => {
    if (!activeScreenshot) {
      return
    }

    const nextIndex =
      (activeScreenshot.index - 1 + allScreenshots.length) % allScreenshots.length

    setActiveScreenshot({ image: allScreenshots[nextIndex], index: nextIndex })
  }

  const showNextScreenshot = () => {
    if (!activeScreenshot) {
      return
    }

    const nextIndex = (activeScreenshot.index + 1) % allScreenshots.length
    setActiveScreenshot({ image: allScreenshots[nextIndex], index: nextIndex })
  }

  return (
    <>
      <main className="page-section game-page">
        <section className="game-hero">
          <img src={voidloop.heroImage} alt={voidloop.title} />
          {voidloop.links.discord ? (
            <a
              aria-label="Discord"
              className="hero-discord"
              href={voidloop.links.discord}
              rel="noreferrer"
              target="_blank"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.317 4.369a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037 13.714 13.714 0 0 0-.607 1.233 18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.233.077.077 0 0 0-.079-.037 19.736 19.736 0 0 0-4.885 1.515.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.027 13.83 13.83 0 0 0 1.226-1.994.076.076 0 0 0-.041-.105 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.009c.12.099.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.04.106 15.885 15.885 0 0 0 1.225 1.993.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.055c.5-5.177-.838-9.674-3.548-13.66a.061.061 0 0 0-.031-.03ZM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.418 0-1.333.955-2.418 2.157-2.418 1.21 0 2.175 1.095 2.157 2.418 0 1.333-.955 2.418-2.157 2.418Zm7.975 0c-1.183 0-2.157-1.085-2.157-2.418 0-1.333.955-2.418 2.157-2.418 1.21 0 2.175 1.095 2.157 2.418 0 1.333-.946 2.418-2.157 2.418Z" />
              </svg>
              <span>Discord</span>
            </a>
          ) : (
            <button
              aria-label="Discord link placeholder"
              className="hero-discord is-placeholder"
              title="Add voidloop.links.discord in src/data/voidloop.js"
              type="button"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.317 4.369a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037 13.714 13.714 0 0 0-.607 1.233 18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.233.077.077 0 0 0-.079-.037 19.736 19.736 0 0 0-4.885 1.515.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.027 13.83 13.83 0 0 0 1.226-1.994.076.076 0 0 0-.041-.105 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.009c.12.099.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.04.106 15.885 15.885 0 0 0 1.225 1.993.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.055c.5-5.177-.838-9.674-3.548-13.66a.061.061 0 0 0-.031-.03ZM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.418 0-1.333.955-2.418 2.157-2.418 1.21 0 2.175 1.095 2.157 2.418 0 1.333-.955 2.418-2.157 2.418Zm7.975 0c-1.183 0-2.157-1.085-2.157-2.418 0-1.333.955-2.418 2.157-2.418 1.21 0 2.175 1.095 2.157 2.418 0 1.333-.946 2.418-2.157 2.418Z" />
              </svg>
              <span>Discord</span>
            </button>
          )}
          <div className="game-hero-overlay">
            <p className="release-tag">{voidloop.releaseLabel}</p>
            <h1>{voidloop.title}</h1>
            <p>{voidloop.description}</p>
            <div className="hero-actions">
              <a
                className="button button-primary"
                href={voidloop.links.steam}
                target="_blank"
                rel="noreferrer"
              >
                View on Steam
              </a>
              <a
                className="button button-secondary"
                href={voidloop.links.pressKit}
                target="_blank"
                rel="noreferrer"
              >
                Open press kit
              </a>
            </div>
          </div>
        </section>

        {voidloop.links.discord ? (
          <a
            className="mobile-discord button button-secondary"
            href={voidloop.links.discord}
            rel="noreferrer"
            target="_blank"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.317 4.369a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037 13.714 13.714 0 0 0-.607 1.233 18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.233.077.077 0 0 0-.079-.037 19.736 19.736 0 0 0-4.885 1.515.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.027 13.83 13.83 0 0 0 1.226-1.994.076.076 0 0 0-.041-.105 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.009c.12.099.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.04.106 15.885 15.885 0 0 0 1.225 1.993.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.055c.5-5.177-.838-9.674-3.548-13.66a.061.061 0 0 0-.031-.03ZM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.418 0-1.333.955-2.418 2.157-2.418 1.21 0 2.175 1.095 2.157 2.418 0 1.333-.955 2.418-2.157 2.418Zm7.975 0c-1.183 0-2.157-1.085-2.157-2.418 0-1.333.955-2.418 2.157-2.418 1.21 0 2.175 1.095 2.157 2.418 0 1.333-.946 2.418-2.157 2.418Z" />
            </svg>
            <span>Join Discord</span>
          </a>
        ) : null}

        <section className="section-heading section-heading-wide">
          <p className="eyebrow">Overview</p>
          <h2>{voidloop.tagline}</h2>
          <p>
            Released on {voidloop.releaseDate}, Voidloop is Indie Game Studio&apos;s
            debut game, built around risky descents, camp-based progression, and a
            steady push back toward home.
          </p>
        </section>

        <section className="info-grid facts-grid">
          {voidloop.facts.map((fact) => (
            <article className="info-card" key={fact.label}>
              <p className="release-tag">{fact.label}</p>
              <h3>{fact.value}</h3>
            </article>
          ))}
        </section>

        <section className="section-heading section-heading-wide">
          <p className="eyebrow">Features</p>
          <h2>Designed around repeat runs, stronger loadouts, and deeper cave pressure.</h2>
        </section>

        <section className="info-grid">
          {voidloop.features.map((feature) => (
            <article className="info-card" key={feature}>
              <p>{feature}</p>
            </article>
          ))}
        </section>

        <section className="section-heading section-heading-wide">
          <p className="eyebrow">Gallery</p>
          <h2>Current visuals from camp, caves, and progression systems.</h2>
        </section>

        <section className="release-grid">
          {voidloop.featuredScreenshots.map((image, index) => (
            <button
              className="release-card static-card screenshot-card"
              key={image}
              onClick={() => setActiveScreenshot({ image, index })}
              type="button"
            >
              <img src={image} alt={`${voidloop.title} screenshot ${index + 1}`} />
            </button>
          ))}
        </section>

        <section className="mini-gallery-grid">
          {voidloop.galleryScreenshots.map((image, index) => (
            <button
              className="mini-gallery-card"
              key={image}
              onClick={() =>
                setActiveScreenshot({
                  image,
                  index: voidloop.featuredScreenshots.length + index,
                })
              }
              type="button"
            >
              <img
                src={image}
                alt={`${voidloop.title} gallery screenshot ${index + 4}`}
              />
            </button>
          ))}
        </section>

        <section className="presskit-section">
          <div className="section-heading section-heading-wide">
            <p className="eyebrow">Press Kit</p>
            <h2>Download materials, & request keys</h2>
          </div>

          <div className="info-grid">
            <article className="info-card presskit-card">
              <h3>Download Press kit</h3>
              <p>
                Access the live press kit for logos, screenshots, videos and the trailer.
              </p>
              <div className="hero-actions">
                <a
                  className="button button-primary"
                  href={voidloop.links.pressKit}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open press kit
                </a>
              </div>
            </article>
            <article className="info-card presskit-card">
              <h3>Steam key requests</h3>
              <p>
                Request coverage access for Voidloop.
              </p>
              <div className="hero-actions">
                <a
                  className="button button-secondary"
                  href={voidloop.links.reqKey}
                  target="_blank"
                  rel="noreferrer"
                >
                  Request Key
                </a>
              </div>
            </article>
          </div>
        </section>

        <section className="section-heading section-heading-wide">
          <p className="eyebrow">Credits</p>
          <h2>The current team behind Voidloop.</h2>
        </section>

        <section className="info-grid">
          {voidloop.credits.map((credit) => (
            <article className="info-card" key={credit.role}>
              <p className="release-tag">{credit.role}</p>
              <h3>{credit.name}</h3>
            </article>
          ))}
        </section>

        <section className="section-heading section-heading-wide">
          <p className="eyebrow">About This Game</p>
          <h2>Built during Jasper Levin&apos;s self-employed placement year and expanded with a small collaborator team.</h2>
          <p>{voidloop.about}</p>
        </section>
      </main>

      {activeScreenshot
        ? createPortal(
        <div
          aria-modal="true"
          className="lightbox"
          onClick={() => setActiveScreenshot(null)}
          role="dialog"
          >
          <button
            aria-label="Previous screenshot"
            className="lightbox-nav lightbox-nav-prev"
            onClick={(event) => {
              event.stopPropagation()
              showPreviousScreenshot()
            }}
            type="button"
          >
            ‹
          </button>
          <button
            aria-label="Close screenshot"
            className="lightbox-close"
            onClick={() => setActiveScreenshot(null)}
            type="button"
          >
            ×
          </button>
          <div
            className="lightbox-panel"
            onClick={(event) => event.stopPropagation()}
            role="document"
          >
            <img
              src={activeScreenshot.image}
              alt={`${voidloop.title} screenshot ${activeScreenshot.index + 1}`}
            />
          </div>
          <button
            aria-label="Next screenshot"
            className="lightbox-nav lightbox-nav-next"
            onClick={(event) => {
              event.stopPropagation()
              showNextScreenshot()
            }}
            type="button"
          >
            ›
          </button>
        </div>,
            document.body,
          )
        : null}
    </>
  )
}
