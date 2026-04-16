import { Link, useParams } from 'react-router-dom'
import { releases } from '../data/releases'

export default function ReleaseDetailPage() {
  const { slug } = useParams()
  const release = releases.find((entry) => entry.slug === slug)

  if (!release) {
    return (
      <main className="page-section">
        <section className="detail-layout">
          <div className="detail-copy">
            <p className="eyebrow">Not Found</p>
            <h1>That release page does not exist.</h1>
            <p>Check the Voidloop release pages or update the release data for a new entry.</p>
            <Link className="button button-primary" to="/releases">
              Back to releases
            </Link>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="page-section">
      <section className="detail-layout">
        <div className="detail-copy">
          <p className="eyebrow">{release.tag}</p>
          <h1>{release.title}</h1>
          <p className="detail-meta">
            {release.accent} · {release.year}
          </p>
          <p>{release.body}</p>

          <div className="hero-actions">
            <Link className="button button-primary" to="/contact">
              Contact the studio
            </Link>
            <Link className="button button-secondary" to="/releases">
              Back to releases
            </Link>
          </div>
        </div>

        <div className="detail-media">
          <img src={release.image} alt={release.title} />
          <p className="detail-caption">{release.description}</p>
        </div>
      </section>
    </main>
  )
}
