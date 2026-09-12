import {useEffect, useState} from 'react'
import {createPortal} from 'react-dom'
import steamIcon from '../assets/icons/steam.svg'
import featureVideo from '../assets/ANormalQuizGameGallery/Individual/video.mp4'
import {aNormalQuizGame} from '../data/aNormalQuizGame'
import './ANormalQuizGamePage.css'

const galleryHoverColors = [
    'var(--quiz-yellow)',
    'var(--quiz-coral)',
    'var(--quiz-green)',
    'var(--quiz-blue)',
]

export default function ANormalQuizGamePage() {
    const [activeIndex, setActiveIndex] = useState(null)
    const [hoveredGalleryIndex, setHoveredGalleryIndex] = useState(null)
    const [galleryHoverColorIndex, setGalleryHoverColorIndex] = useState(-1)

    useEffect(() => {
        if (activeIndex === null) {
            return undefined
        }

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setActiveIndex(null)
            }

            if (event.key === 'ArrowRight') {
                setActiveIndex((index) => (index + 1) % aNormalQuizGame.gallery.length)
            }

            if (event.key === 'ArrowLeft') {
                setActiveIndex(
                    (index) => (index - 1 + aNormalQuizGame.gallery.length) % aNormalQuizGame.gallery.length,
                )
            }
        }

        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        window.addEventListener('keydown', handleKeyDown)

        return () => {
            document.body.style.overflow = previousOverflow
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [activeIndex])

    const activeScreenshot =
        activeIndex === null ? null : aNormalQuizGame.gallery[activeIndex]

    const showPrevious = () => {
        setActiveIndex(
            (index) => (index - 1 + aNormalQuizGame.gallery.length) % aNormalQuizGame.gallery.length,
        )
    }

    const showNext = () => {
        setActiveIndex((index) => (index + 1) % aNormalQuizGame.gallery.length)
    }

    const handleGalleryMouseEnter = (index) => {
        setHoveredGalleryIndex(index)
        setGalleryHoverColorIndex((colorIndex) => (colorIndex + 1) % galleryHoverColors.length)
    }

    const handleGalleryFocus = (index) => {
        setHoveredGalleryIndex(index)
    }

    return (
        <main className="quiz-page">
            <section className="quiz-hero" id="quiz-top" aria-labelledby="quiz-page-title">
                <img className="quiz-hero-background" src={aNormalQuizGame.background} alt="" decoding="async"
                     fetchPriority="high"/>
                <div className="quiz-hero-overlay" aria-hidden="true"/>

                <div className="quiz-hero-content">
                    <div className="quiz-hero-copy">
                        <p className="quiz-overline">coming soon</p>
                        <h1 className="quiz-sr-only" id="quiz-page-title">
                            A Normal Quiz Game
                        </h1>
                        <p className="quiz-hero-lede">
                            A quiz game where you try to solve the questions, but the questions have
                            tricks and gimmicks.
                        </p>

                        <div className="quiz-hero-actions">
                            <a
                                className="quiz-button quiz-button-primary"
                                href={aNormalQuizGame.links.steam}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <img src={steamIcon} alt=""/>
                                Wishlist on Steam
                            </a>
                            <a className="quiz-button quiz-button-secondary" href="#quiz-gallery">
                                View the gallery
                                <span aria-hidden="true">↓</span>
                            </a>
                        </div>
                    </div>

                    <div className="quiz-hero-logo-stage">
                        <div className="quiz-hero-dial" aria-hidden="true">
                            <img src={aNormalQuizGame.background} alt="" decoding="async"/>
                        </div>
                        <img
                            className="quiz-hero-logo hero-logo-breathe"
                            src={aNormalQuizGame.logo}
                            alt="A Normal Quiz Game"
                            decoding="async"
                        />
                    </div>

                    <div className="quiz-hero-art" aria-hidden="true">
                        <img className="quiz-hero-orphan" src={aNormalQuizGame.decorativeArt.orphan} alt=""
                             decoding="async"/>
                        <img className="quiz-hero-car" src={aNormalQuizGame.decorativeArt.carOne} alt=""
                             decoding="async"/>
                        <img className="quiz-hero-dice" src={aNormalQuizGame.decorativeArt.dice} alt=""
                             decoding="async"/>
                    </div>
                </div>

                <div className="quiz-hero-ticker" aria-hidden="true">
                    <span>A NORMAL QUIZ GAME</span>
                    <span>•</span>
                    <span>WINDOWS + MAC</span>
                    <span>•</span>
                    <span>Q1 2027</span>
                    <span>•</span>
                    <span>WISHLIST NOW</span>
                </div>
                <a className="quiz-hero-see-more" href="#quiz-features">
                    See more <span aria-hidden="true">↓</span>
                </a>
            </section>

            <div className="quiz-page-body">
                <section
                    className="quiz-section quiz-features-section"
                    id="quiz-features"
                    aria-labelledby="quiz-features-title"
                >
                    <div className="quiz-features-copy">
                        <h2 id="quiz-features-title">The questions are only the beginning.</h2>
                        <p>
                            Each round twists the rules with tricks, gimmicks, and unexpected
                            punishments. Read carefully, think sideways, and try not to trust the
                            obvious answer.
                        </p>
                    </div>
                    <video
                        className="quiz-features-video"
                        src={featureVideo}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                        aria-label="A Normal Quiz Game animation"
                    />
                </section>

                <section className="quiz-facts" id="quiz-details" aria-label="Release details">
                    <img
                        className="quiz-section-prop quiz-facts-monster-prop"
                        src={aNormalQuizGame.decorativeArt.monster}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        decoding="async"
                    />
                    <img
                        className="quiz-section-prop quiz-facts-orphan-prop"
                        src={aNormalQuizGame.decorativeArt.button}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        decoding="async"
                    />
                    <div className="quiz-facts-inner">
                        <div className="quiz-facts-heading">
                            <h2>Get ready to answer badly.</h2>
                        </div>
                        <dl className="quiz-facts-list">
                            <div>
                                <dt>Release</dt>
                                <dd>{aNormalQuizGame.releaseDate}</dd>
                            </div>
                            <div>
                                <dt>Platforms</dt>
                                <dd>{aNormalQuizGame.platforms}</dd>
                            </div>
                        </dl>
                    </div>
                </section>

                <section className="quiz-gallery-section" id="quiz-gallery" aria-labelledby="quiz-gallery-title">
                    <div className="quiz-section quiz-gallery-heading">
                        <div className="quiz-section-heading quiz-section-heading-light">
                            <h2 id="quiz-gallery-title">A peek behind the question mark.</h2>
                            <p>
                                Browse question rounds and punishment rounds from the world of A Normal
                                Quiz Game. Select any frame to view it full size.
                            </p>
                        </div>
                        <img className="quiz-gallery-dice" src={aNormalQuizGame.decorativeArt.dice} alt=""
                             loading="lazy" decoding="async"/>
                    </div>

                    <div className="quiz-gallery-grid">
                        {aNormalQuizGame.gallery.map((screenshot, index) => (
                            <button
                                className={`quiz-gallery-card${index === 0 ? ' quiz-gallery-card-featured' : ''}${
                                    hoveredGalleryIndex === index ? ' is-hovered' : ''
                                }`}
                                key={screenshot.label}
                                onClick={() => setActiveIndex(index)}
                                onBlur={() => setHoveredGalleryIndex(null)}
                                onFocus={() => handleGalleryFocus(index)}
                                onMouseEnter={() => handleGalleryMouseEnter(index)}
                                onMouseLeave={() => setHoveredGalleryIndex(null)}
                                style={
                                    hoveredGalleryIndex === index
                                        ? {'--gallery-hover-color': galleryHoverColors[galleryHoverColorIndex]}
                                        : undefined
                                }
                                type="button"
                            >
                                <div className="quiz-gallery-card-media">
                                    <img
                                        src={screenshot.image}
                                        alt={`${screenshot.label} screenshot`}
                                        loading="lazy"
                                        decoding="async"
                                    />
                                </div>
                                <span>
                  <small>{screenshot.group}</small>
                                    {screenshot.label}
                </span>
                            </button>
                        ))}
                    </div>
                </section>

                <section className="quiz-support" aria-labelledby="quiz-support-title">
                    <div className="quiz-section">
                        <img
                            className="quiz-section-prop quiz-support-taxes-prop"
                            src={aNormalQuizGame.decorativeArt.taxes}
                            alt=""
                            aria-hidden="true"
                            loading="lazy"
                            decoding="async"
                        />
                        <div className="quiz-section-heading quiz-section-heading-light">
                            <h2 id="quiz-support-title">Download materials, &amp; request keys.</h2>
                        </div>
                        <div className="quiz-support-actions">
                            <a className="quiz-support-action quiz-support-action-request"
                               href={aNormalQuizGame.links.requestKey}>
                                <span>Request a key</span>
                                <span aria-hidden="true">→</span>
                            </a>
                            <a
                                className="quiz-support-action quiz-support-action-press"
                                href={aNormalQuizGame.links.pressKit}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <span>Press kit</span>
                                <span aria-hidden="true">→</span>
                            </a>
                        </div>
                    </div>
                </section>

                <section className="quiz-final-cta" aria-label="Steam wishlist call to action">
                    <div className="quiz-final-cta-copy">
                        <p className="quiz-final-meta">Q1 2027 / Windows + Mac</p>
                        <h2>Ready for a normal one?</h2>
                        <a
                            className="quiz-button quiz-button-primary"
                            href={aNormalQuizGame.links.steam}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <img src={steamIcon} alt=""/>
                            Add to your Steam wishlist
                        </a>
                    </div>
                </section>
            </div>

            {activeScreenshot
                ? createPortal(
                    <div
                        className="quiz-lightbox"
                        role="dialog"
                        aria-modal="true"
                        aria-label={`${activeScreenshot.label} screenshot`}
                        onClick={(event) => {
                            if (event.target === event.currentTarget) {
                                setActiveIndex(null)
                            }
                        }}
                    >
                        <button
                            className="quiz-lightbox-close"
                            type="button"
                            onClick={() => setActiveIndex(null)}
                            aria-label="Close gallery"
                        >
                            ×
                        </button>
                        <button
                            className="quiz-lightbox-nav quiz-lightbox-prev"
                            type="button"
                            onClick={showPrevious}
                            aria-label="Previous screenshot"
                        >
                            ←
                        </button>
                        <figure className="quiz-lightbox-figure">
                            <img src={activeScreenshot.image} alt={`${activeScreenshot.label} screenshot`}/>
                            <figcaption>
                                <span>{activeScreenshot.group}</span>
                                {activeScreenshot.label} · {activeIndex + 1} / {aNormalQuizGame.gallery.length}
                            </figcaption>
                        </figure>
                        <button
                            className="quiz-lightbox-nav quiz-lightbox-next"
                            type="button"
                            onClick={showNext}
                            aria-label="Next screenshot"
                        >
                            →
                        </button>
                    </div>,
                    document.body,
                )
                : null}
        </main>
    )
}
