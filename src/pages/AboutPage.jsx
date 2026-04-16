export default function AboutPage() {
  return (
    <main className="page-section page-fullscreen">
      <section className="section-heading section-heading-wide about-heading">
        <p className="eyebrow">About</p>
        <h1>Indie Game Studio</h1>
        <p>
          Created by Jasper Levin during his self-employment year at the
          University of Portsmouth, the studio released its debut game, Voidloop,
          on April 13, 2026.
        </p>
      </section>

      <section className="info-grid">
        <article className="info-card">
          <h2>Founder</h2>
          <p>
            Jasper Levin is a game technology student who started the studio while
            building real production experience through self-employment and
            hands-on game development.
          </p>
        </article>
        <article className="info-card">
          <h2>How the studio works</h2>
          <p>
            The studio is currently operating out of Jasper’s bedroom, with help
            from talented friends from across the globe contributing to the work.
          </p>
        </article>
        <article className="info-card">
          <h2>Background</h2>
          <p>
            Before Voidloop, the team built game content through platforms like
            Minecraft, bringing a mix of practical technical skills, follow-through,
            and a younger perspective on the industry.
          </p>
        </article>
      </section>
    </main>
  )
}
