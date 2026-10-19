const siteUrl = 'https://indiegamestud.io'
const defaultImage = `${siteUrl}/Logo_Basic_Largey.png`
const voidloopImage = `${siteUrl}/voidloop-og.png`
const quizGameImage = `${siteUrl}/a-normal-quiz-game-og.jpg`

export const seoByPath = {
  '/': {
    title: 'Home | Indie Game Studio',
    description:
      'A bedroom-born indie studio creating bold, original games. Powered by global talent and shaped by years of Minecraft game development.',
    image: defaultImage,
    url: siteUrl,
  },
  '/voidloop': {
    title: 'Voidloop | Indie Game Studio',
    description:
      'Voidloop is a mining roguelite adventure about cursed cave descents, loot gathering, camp upgrades, and fighting deeper toward home.',
    image: voidloopImage,
    url: `${siteUrl}/voidloop/`,
  },
  '/a-normal-quiz-game': {
    title: 'A Normal Quiz Game | Indie Game Studio',
    description:
      'A Normal Quiz Game is a colourful quiz show full of tricky questions, unexpected gimmicks, and chaotic consequences. Play the free demo on Steam now. Coming Q1 2027 for Windows.',
    image: quizGameImage,
    url: `${siteUrl}/a-normal-quiz-game/`,
  },
  '/about': {
    title: 'About | Indie Game Studio',
    description:
      'Learn about Indie Game Studio, its origins, collaborators, and the team behind Voidloop.',
    image: defaultImage,
    url: `${siteUrl}/about/`,
  },
  '/contact': {
    title: 'Contact | Indie Game Studio',
    description:
      'Get in touch with Indie Game Studio for press, partnerships, key requests, and general enquiries.',
    image: defaultImage,
    url: `${siteUrl}/contact/`,
  },
}

export function getSeoForPath(pathname) {
  const normalizedPath =
    pathname !== '/' && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname

  return seoByPath[normalizedPath] ?? seoByPath['/']
}
