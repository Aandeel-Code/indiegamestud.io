import {useEffect, useRef, useState} from 'react'
import {createPortal} from 'react-dom'
import steamIcon from '../assets/icons/steam.svg'
import featureVideoMp4 from '../assets/ANormalQuizGameGallery/Individual/video.mp4'
import featureVideoWebm from '../assets/ANormalQuizGameGallery/Individual/video.webm'
import {aNormalQuizGame} from '../data/aNormalQuizGame'
import './ANormalQuizGamePage.css'

const galleryHoverColors = [
    'var(--quiz-yellow)',
    'var(--quiz-coral)',
    'var(--quiz-green)',
    'var(--quiz-blue)',
]

const mobileMediaQuery = '(max-width: 760px)'

const getIsMobile = () =>
    typeof window !== 'undefined' && window.matchMedia(mobileMediaQuery).matches

const selectFeatureVideo = async () => {
    if (!navigator.mediaCapabilities?.decodingInfo) {
        return featureVideoWebm
    }

    try {
        const capabilities = await navigator.mediaCapabilities.decodingInfo({
            type: 'file',
            video: {
                contentType: 'video/mp4; codecs="hvc1.1.6.L120.90"',
                width: 1170,
                height: 658,
                bitrate: 1324291,
                framerate: 60,
                alphaChannel: true,
            },
        })
        const configuration = capabilities.configuration ?? capabilities.supportedConfiguration

        if (capabilities.supported && configuration?.video?.alphaChannel === true) {
            return featureVideoMp4
        }
    } catch {
        // Browsers without the alphaChannel Media Capabilities extension use WebM.
    }

    return featureVideoWebm
}

function DemoButton({children = 'Play the free demo'}) {
    return (
        <a
            className="quiz-button quiz-button-primary"
            href={aNormalQuizGame.links.demo}
            target="_blank"
            rel="noreferrer"
        >
            <img src={steamIcon} alt=""/>
            {children}
        </a>
    )
}

function WishlistButton({children = 'Wishlist on Steam'}) {
    return (
        <a
            className="quiz-button quiz-button-secondary"
            href={aNormalQuizGame.links.steam}
            target="_blank"
            rel="noreferrer"
        >
            <img src={steamIcon} alt=""/>
            {children}
        </a>
    )
}

export default function ANormalQuizGamePage() {
    const [activeIndex, setActiveIndex] = useState(null)
    const [isMobile, setIsMobile] = useState(getIsMobile)
    const [featureVideoSource, setFeatureVideoSource] = useState(null)
    const [hoveredGalleryIndex, setHoveredGalleryIndex] = useState(null)
    const [galleryHoverColorIndex, setGalleryHoverColorIndex] = useState(-1)
    const lightboxCloseRef = useRef(null)
    const lightboxReturnFocusRef = useRef(null)

    useEffect(() => {
        let isCancelled = false

        selectFeatureVideo().then((source) => {
            if (!isCancelled) {
                setFeatureVideoSource(source)
            }
        })

        return () => {
            isCancelled = true
        }
    }, [])

    useEffect(() => {
        const mediaQuery = window.matchMedia(mobileMediaQuery)
        const handleChange = (event) => setIsMobile(event.matches)

        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', handleChange)
            return () => mediaQuery.removeEventListener('change', handleChange)
        }

        mediaQuery.addListener(handleChange)
        return () => mediaQuery.removeListener(handleChange)
    }, [])

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

    const isLightboxOpen = activeIndex !== null

    useEffect(() => {
        if (!isLightboxOpen) {
            return undefined
        }

        const returnFocusTarget = lightboxReturnFocusRef.current
        lightboxCloseRef.current?.focus()

        return () => returnFocusTarget?.focus()
    }, [isLightboxOpen])

    useEffect(() => {
        if (activeIndex === null) {
            return
        }

        const neighboringIndexes = [
            (activeIndex - 1 + aNormalQuizGame.gallery.length) % aNormalQuizGame.gallery.length,
            (activeIndex + 1) % aNormalQuizGame.gallery.length,
        ]

        neighboringIndexes.forEach((index) => {
            const screenshot = aNormalQuizGame.gallery[index]
            const preloadImage = new Image()
            preloadImage.src = isMobile ? screenshot.mobileImage : screenshot.image
            preloadImage.decode?.().catch(() => {})
        })
    }, [activeIndex, isMobile])

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

    const openLightbox = (event, index) => {
        lightboxReturnFocusRef.current = event.currentTarget
        setActiveIndex(index)
    }

    return (
        <main className="quiz-page">
            <section className="quiz-hero" id="quiz-top" aria-labelledby="quiz-page-title">
                {!isMobile ? (
                    <>
                        <img className="quiz-hero-background" src={aNormalQuizGame.background} alt="" decoding="async"
                             fetchPriority="high"/>
                        <div className="quiz-hero-overlay" aria-hidden="true"/>
                    </>
                ) : null}

                <div className="quiz-hero-content">
                    <div className="quiz-hero-copy">
                        <p className="quiz-overline">{aNormalQuizGame.demo.label} out now</p>
                        <h1 className="quiz-sr-only" id="quiz-page-title">
                            A Normal Quiz Game
                        </h1>
                        <p className="quiz-hero-lede">
                            A quiz game where you try to solve the questions, but the questions have
                            tricks and gimmicks.
                        </p>

                        <div className="quiz-hero-actions">
                            <DemoButton/>
                            <WishlistButton/>
                        </div>
                    </div>

                    <div className="quiz-hero-logo-stage">
                        {!isMobile ? (
                            <div className="quiz-hero-dial" aria-hidden="true">
                                <img src={aNormalQuizGame.background} alt="" decoding="async"/>
                            </div>
                        ) : null}
                        <picture className="quiz-hero-logo-picture">
                            <source media={mobileMediaQuery} srcSet={aNormalQuizGame.logoTrimmed}/>
                            <img
                                className="quiz-hero-logo hero-logo-breathe"
                                src={aNormalQuizGame.logo}
                                alt="A Normal Quiz Game"
                                decoding="async"
                            />
                        </picture>
                    </div>

                    {!isMobile ? (
                        <div className="quiz-hero-art" aria-hidden="true">
                            <img className="quiz-hero-orphan" src={aNormalQuizGame.decorativeArt.orphan} alt=""
                                 decoding="async"/>
                            <img className="quiz-hero-car" src={aNormalQuizGame.decorativeArt.carOne} alt=""
                                 decoding="async"/>
                            <img className="quiz-hero-dice" src={aNormalQuizGame.decorativeArt.dice} alt=""
                                 decoding="async"/>
                        </div>
                    ) : null}
                </div>

                {!isMobile ? (
                    <>
                        <div className="quiz-hero-ticker" aria-hidden="true">
                            <span>A NORMAL QUIZ GAME</span>
                            <span>•</span>
                            <span>FREE DEMO OUT NOW</span>
                            <span>•</span>
                            <span>{aNormalQuizGame.platforms.toUpperCase()}</span>
                            <span>•</span>
                            <span>{aNormalQuizGame.releaseDate.toUpperCase()}</span>
                            <span>•</span>
                            <span>WISHLIST NOW</span>
                        </div>
                        <a className="quiz-hero-see-more" href="#quiz-features">
                            See more <span aria-hidden="true">↓</span>
                        </a>
                    </>
                ) : null}
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
                        src={featureVideoSource ?? undefined}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                        aria-label="A Normal Quiz Game animation"
                    />
                </section>

                <section className="quiz-section quiz-demo" id="quiz-demo" aria-labelledby="quiz-demo-title">
                    <div className="quiz-demo-card">
                        <img
                            className="quiz-demo-prop"
                            src={aNormalQuizGame.decorativeArt.dice}
                            alt=""
                            aria-hidden="true"
                            loading="lazy"
                            decoding="async"
                        />
                        <div className="quiz-demo-copy">
                            <p className="quiz-demo-badge">
                                <svg viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M12 3a1 1 0 0 1 1 1v9.59l3.3-3.3a1 1 0 1 1 1.4 1.42l-5 5a1 1 0 0 1-1.4 0l-5-5a1 1 0 1 1 1.4-1.42l3.3 3.3V4a1 1 0 0 1 1-1ZM5 19a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1Z"/>
                                </svg>
                                {aNormalQuizGame.demo.label} · {aNormalQuizGame.demo.status}
                            </p>
                            <h2 id="quiz-demo-title">The demo is out. Go get it wrong.</h2>
                            <p>
                                Try the questions, the tricks, and the punishments for yourself before
                                the full game arrives in {aNormalQuizGame.releaseDate}. If you enjoy
                                losing, add it to your wishlist on the way out.
                            </p>
                        </div>
                        <div className="quiz-demo-actions">
                            <DemoButton>Download the free demo</DemoButton>
                            <WishlistButton/>
                        </div>
                    </div>
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
                        className="quiz-section-prop quiz-facts-button-prop"
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
                            <div>
                                <dt>{aNormalQuizGame.demo.label}</dt>
                                <dd>
                                    <a href={aNormalQuizGame.links.demo} target="_blank" rel="noreferrer">
                                        Out now
                                    </a>
                                </dd>
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
                                key={screenshot.image}
                                onClick={(event) => openLightbox(event, index)}
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
                                    <picture>
                                        <source media={mobileMediaQuery} srcSet={screenshot.mobileImage}/>
                                        <img
                                            src={screenshot.image}
                                            alt={`${screenshot.label} screenshot`}
                                            width="2560"
                                            height="1440"
                                            loading="lazy"
                                            decoding="async"
                                        />
                                    </picture>
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

                <section className="quiz-final-cta" aria-label="Play the demo and wishlist on Steam">
                    <div className="quiz-final-cta-copy">
                        <p className="quiz-final-meta">
                            {aNormalQuizGame.demo.label} out now / {aNormalQuizGame.releaseDate} / {aNormalQuizGame.platforms}
                        </p>
                        <h2>Ready for a normal one?</h2>
                        <div className="quiz-final-cta-actions">
                            <DemoButton/>
                            <WishlistButton>Add to your Steam wishlist</WishlistButton>
                        </div>
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
                            ref={lightboxCloseRef}
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
                            <picture>
                                <source media={mobileMediaQuery} srcSet={activeScreenshot.mobileImage}/>
                                <img
                                    src={activeScreenshot.image}
                                    alt={`${activeScreenshot.label} screenshot`}
                                    width="2560"
                                    height="1440"
                                    decoding="async"
                                />
                            </picture>
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
