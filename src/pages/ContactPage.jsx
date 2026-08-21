import { voidloop } from '../data/voidloop'
import blueskyIcon from '../assets/icons/bluesky.svg'
import discordIcon from '../assets/icons/discord.svg'
import instagramIcon from '../assets/icons/instagram.svg'
import linkedinIcon from '../assets/icons/linkedin.svg'
import xIcon from '../assets/icons/x.svg'

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
              <img src={xIcon} alt="" />
              <span>X</span>
            </a>
            <a
              className="contact-social-link"
              href="https://bsky.app/profile/indiegamestudio.bsky.social/"
              target="_blank"
              rel="noreferrer"
            >
              <img src={blueskyIcon} alt="" />
              <span>Bluesky</span>
            </a>
            <a
              className="contact-social-link"
              href="https://www.instagram.com/indiegamestudio_/"
              target="_blank"
              rel="noreferrer"
            >
              <img src={instagramIcon} alt="" />
              <span>Instagram</span>
            </a>
            <a
              className="contact-social-link"
              href="https://www.linkedin.com/in/jasper-levin-b25b73298/"
              target="_blank"
              rel="noreferrer"
            >
              <img src={linkedinIcon} alt="" />
              <span>LinkedIn</span>
            </a>
          </div>
        </article>
        <article className="info-card">
          <h2>Game Discord servers</h2>
          <div className="hero-actions">
            <a
              className="contact-discord-button"
              href={voidloop.links.discord}
              target="_blank"
              rel="noreferrer"
            >
              <img src={discordIcon} alt="" />
              <span>Voidloop Discord</span>
            </a>
          </div>
        </article>
      </section>
    </main>
  )
}
