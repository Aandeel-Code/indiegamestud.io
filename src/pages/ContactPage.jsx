export default function ContactPage() {
  return (
    <main className="page-section page-fullscreen">
      <section className="section-heading section-heading-wide">
        <p className="eyebrow">Contact</p>
        <h1>Get in touch with Indie Game Studio.</h1>
        <p>
          Follow the studio online, get in contact directly by email, or use the
          social links in the footer for the latest updates on Voidloop.
        </p>
      </section>

      <section className="info-grid">
        <article className="info-card">
          <h2>Email</h2>
          <p>
            <a className="contact-email-link" href="mailto:jasper@indiegamestud.io">
              jasper@indiegamestud.io
            </a>
          </p>
        </article>
        <article className="info-card">
          <h2>Studio socials</h2>
          <div className="contact-socials" aria-label="Studio social links">
            <a
              className="contact-social-link"
              href="https://x.com/1ndieGameStudio/"
              target="_blank"
              rel="noreferrer"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.64 3H20.7l-6.68 7.63L22 21h-6.27l-4.9-6.4L5.23 21H2.16l7.14-8.16L2 3h6.43l4.43 5.85L17.64 3Zm-1.1 16.12h1.7L7.5 4.78H5.68l10.86 14.34Z" />
              </svg>
              <span>X</span>
            </a>
            <a
              className="contact-social-link"
              href="https://bsky.app/profile/indiegamestudio.bsky.social/"
              target="_blank"
              rel="noreferrer"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 11.36c1.67-3.21 6.22-8.18 8.63-9.88 1.73-1.22 2.37-1.01 2.37-.21 0 1.61-2.1 6.68-3.09 8.58-.68 1.31-1.5 2.58-2.78 3.34 1.16-.19 2.47-.03 3.3.68 1.47 1.25 1.01 3.37-.38 4.51-1.56 1.28-4.2 1.56-6.2.77-1.14-.45-1.93-1.3-2.55-2.34-.62 1.04-1.41 1.89-2.55 2.34-2 .79-4.64.51-6.2-.77-1.39-1.14-1.85-3.26-.38-4.51.83-.71 2.14-.87 3.3-.68-1.28-.76-2.1-2.03-2.78-3.34C3.1 7.86 1 2.79 1 1.18c0-.8.64-1.01 2.37.21C5.78 3.18 10.33 8.15 12 11.36Z" />
              </svg>
              <span>Bluesky</span>
            </a>
            <a
              className="contact-social-link"
              href="https://www.instagram.com/indiegamestudio_/"
              target="_blank"
              rel="noreferrer"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7.25 2h9.5A5.25 5.25 0 0 1 22 7.25v9.5A5.25 5.25 0 0 1 16.75 22h-9.5A5.25 5.25 0 0 1 2 16.75v-9.5A5.25 5.25 0 0 1 7.25 2Zm0 1.8A3.45 3.45 0 0 0 3.8 7.25v9.5a3.45 3.45 0 0 0 3.45 3.45h9.5a3.45 3.45 0 0 0 3.45-3.45v-9.5a3.45 3.45 0 0 0-3.45-3.45h-9.5Zm9.9 1.35a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.8A3.2 3.2 0 1 0 12 15.2 3.2 3.2 0 0 0 12 8.8Z" />
              </svg>
              <span>Instagram</span>
            </a>
            <a
              className="contact-social-link"
              href="https://www.linkedin.com/in/jasper-levin-b25b73298/"
              target="_blank"
              rel="noreferrer"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4.98 3.5a1.98 1.98 0 1 1 0 3.96 1.98 1.98 0 0 1 0-3.96ZM3.3 8.85h3.36V20.7H3.3V8.85Zm5.48 0h3.22v1.62h.05c.45-.85 1.54-1.95 3.16-1.95 3.38 0 4 2.22 4 5.1v7.08h-3.36v-6.27c0-1.5-.03-3.43-2.09-3.43-2.1 0-2.42 1.64-2.42 3.32v6.38H8.78V8.85Z" />
              </svg>
              <span>LinkedIn</span>
            </a>
          </div>
        </article>
        <article className="info-card">
          <h2>Current focus</h2>
          <p>Voidloop is out now, released on April 13, 2026.</p>
        </article>
      </section>
    </main>
  )
}
