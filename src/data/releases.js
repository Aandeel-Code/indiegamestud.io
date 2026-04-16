import releaseCoverOne from '../assets/ar57i3.png'
import releaseCoverTwo from '../assets/ar57i4.png'
import releaseCoverThree from '../assets/ar57i5.png'
import heroBackdrop from '../assets/ar57i3.png'
import releaseCoverFour from '../assets/image01.png'
import heroLogo from '../assets/e23781d7_original.png'

export const releases = [
  {
    slug: 'voidloop',
    title: 'Voidloop',
    tag: 'PC / Mobile',
    description:
      'A mining roguelite adventure focused on cursed cave exploration, loot gathering, and reaching the bottom to find home.',
    image: releaseCoverTwo,
    accent: 'Out Now',
    year: '2026',
    body:
      'Voidloop is Indie Game Studio’s debut release, launched on April 13, 2026. Players venture deep into cursed caves, gather loot, upgrade their tools, and push further downward in search of home.',
  },
  {
    slug: 'cave-types',
    title: 'Cave Types',
    tag: 'Feature',
    description:
      'Explore different cave environments as the run deepens and the risk climbs.',
    image: releaseCoverTwo,
    accent: 'Voidloop Feature',
    year: '2026',
    body:
      'Different cave types shape the pacing of each descent and give the world a stronger sense of progression as players move toward the bottom.',
  },
  {
    slug: 'mining-and-combat',
    title: 'Mining and Combat',
    tag: 'Feature',
    description:
      'Mine resources, manage danger, and keep moving when the caves push back.',
    image: releaseCoverThree,
    accent: 'Voidloop Feature',
    year: '2026',
    body:
      'Resource gathering sits at the core of Voidloop, but the caves are hostile. Progress depends on balancing mining, movement, upgrades, and surviving threats deeper underground.',
  },
  {
    slug: 'abilities-and-progression',
    title: 'Abilities and Progression',
    tag: 'Feature',
    description:
      'Upgrade tools, unlock abilities, and build the kit needed to go deeper.',
    image: releaseCoverFour,
    accent: 'Voidloop Feature',
    year: '2026',
    body:
      'Upgrades and abilities help players survive longer runs and reach deeper layers of the caves, turning each attempt into meaningful progress.',
  },
]

export const heroRelease = {
  backgroundImage: heroBackdrop,
  floatingImage: heroLogo,
}
