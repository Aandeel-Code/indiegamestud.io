import { Link } from 'react-router-dom'
import { releases } from '../data/releases'

export default function ReleasesPage() {
  return (
    <main className="page-section">
      <section className="section-heading section-heading-wide">
        <p className="eyebrow">Voidloop</p>
        <h1>Featured systems and supporting pages from the studio’s debut release.</h1>
        <p>
          Voidloop released on April 13, 2026, with supporting pages for the
          game’s core features, progression, and cave exploration.
        </p>
      </section>

      <section className="release-grid">
        {releases.map((release) => (
          <Link
            className="release-card"
            key={release.slug}
            to={`/releases/${release.slug}`}
          >
            <img src={release.image} alt={release.title} />
            <div className="release-overlay">
              <p className="release-tag">{release.tag}</p>
              <h3>{release.title}</h3>
              <p>{release.description}</p>
            </div>
          </Link>
        ))}
      </section>
    </main>
  )
}
