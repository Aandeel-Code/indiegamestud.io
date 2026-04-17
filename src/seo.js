const siteUrl = 'https://indiegamestud.io'
const defaultImage = `${siteUrl}/og-image.png`

export const seoByPath = {
  '/': {
    title: 'Indie Game Studio',
    description:
      'A bedroom-born indie studio creating bold, original games. Powered by global talent and shaped by years of Minecraft game development.',
    image: defaultImage,
    url: siteUrl,
  },
  '/voidloop': {
    title: 'Voidloop | Indie Game Studio',
    description:
      'Voidloop is a mining roguelite adventure about cursed cave descents, loot gathering, camp upgrades, and fighting deeper toward home.',
    image: defaultImage,
    url: `${siteUrl}/voidloop/`,
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
