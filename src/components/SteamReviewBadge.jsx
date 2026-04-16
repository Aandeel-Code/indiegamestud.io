import steamReview from '../data/steamReview.json'

const numberFormatter = new Intl.NumberFormat('en-US')

export default function SteamReviewBadge({ className = '' }) {
  const reviewLabel = steamReview.review_score_desc ?? 'Steam Reviews'
  const reviewCount = steamReview.total_reviews
  const metaText = typeof reviewCount === 'number'
    ? `${numberFormatter.format(reviewCount)} reviews`
    : 'Updated at build time'

  return (
    <div className={`steam-review-badge ${className}`.trim()}>
      <span className="steam-review-badge-label">Steam Reviews</span>
      <div className="steam-review-badge-summary">
        <strong className="steam-review-badge-score">{reviewLabel}</strong>
        <span className="steam-review-badge-meta">{metaText}</span>
      </div>
    </div>
  )
}
