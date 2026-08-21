import heroBackdrop from '../assets/ar57i3.png'
import campBlacksmith from '../assets/VoidloopGallery/Camp-Blacksmith.jpg'
import campInventory from '../assets/VoidloopGallery/Camp-Inventory.jpg'
import campMain from '../assets/VoidloopGallery/Camp-Main.jpg'
import campMarket from '../assets/VoidloopGallery/Camp-Market.jpg'
import campWitchHut from '../assets/VoidloopGallery/Camp-Witch-Hut.jpg'
import cutsceneVoid from '../assets/VoidloopGallery/Cutscene-Void.jpg'
import ingameCraggyCavern from '../assets/VoidloopGallery/Ingame-Craggy-Cavern.jpg'
import ingameDesolateDungeon from '../assets/VoidloopGallery/Ingame-Desolate-Dungeon.jpg'
import ingameMoltenMineshaft from '../assets/VoidloopGallery/Ingame-Molten-Mineshaft.jpg'
import ingameSlipperySanctuary from '../assets/VoidloopGallery/Ingame-Slippery-Sanctuary.jpg'
import hatUnlocked from '../assets/hatunlocked.png'
import hatInGame from '../assets/hatingame.png'
import hatMenu from '../assets/hatmenu.png'
import cosmeticsLarger from '../assets/cosmetics-larger.png'

export const voidloop = {
  title: 'Voidloop',
  tagline: 'Mining adventure with roguelite elements',
  releaseLabel: 'Out Now',
  releaseDate: 'April 13, 2026',
  platforms: ['Windows', 'Mac', 'iPhone', 'Android'],
  heroImage: heroBackdrop,
  featuredScreenshots: [cutsceneVoid, campMain, campMarket],
  galleryScreenshots: [
    campBlacksmith,
    campInventory,
    campWitchHut,
    ingameCraggyCavern,
    ingameDesolateDungeon,
    ingameMoltenMineshaft,
    ingameSlipperySanctuary,
  ],
  latestUpdate: {
    version: 'v1.1',
    label: 'Hat Update',
    description:
      'Suit up for your next descent. v1.1 adds collectible hats, a new way to customise your Void Spirit, and a fresh look for every run.',
    screenshots: [cosmeticsLarger, hatUnlocked, hatMenu, hatInGame],
  },
  summary:
    'You play as a lonely Void Spirit who has wandered too far from home. Use your camp as a hub to prepare for each descent into ever-changing caves filled with rare loot and dangerous foes.',
  description:
    'Voidloop is a mining adventure with roguelite elements. Mine, fight, and loot your way through cursed caves, return to camp between runs, and build the strength needed to find your way back to the void.',
  features: [
    'Descend through 5 unique cave biomes with procedurally generated floors, hazards, and valuable resources.',
    'Race toward floor 20 of each cave to collect powerful gems and uncover the route back to the void.',
    'Return to camp between runs to trade, craft, and upgrade with the Blacksmith, Shopkeeper, and Witch.',
    'Mine, fight, and loot 60+ unique items while progressing through 100+ upgrades and 27 powerful skills.',
  ],
  facts: [
    { label: 'Release Date', value: 'April 13, 2026' },
    { label: 'Version', value: '1.0' },
    { label: 'Platforms', value: 'Windows, Mac, iPhone & Android' },
  ],
  credits: [
    { role: 'Main Creator', name: 'Jasper Levin' },
    { role: 'Pixel Artist', name: 'FatalVortex' },
    { role: '3D Artist', name: 'Rajdi' },
    { role: 'Promotional Art', name: 'Aerkinov' },
  ],
  about:
    'Voidloop began development in late 2024, originally titled Magical Mining, during Jasper Levin’s self-employed placement year at university under the studio name IndieGameStudio. The game has been built with help from a small group of friends and collaborators, including former Minecraft map makers and university peers.',
  links: {
    steam: 'https://store.steampowered.com/app/3803180/Voidloop/',
    appStore: 'https://apps.apple.com/us/app/voidloop/id6746944662',
    googlePlay:
      'https://play.google.com/store/apps/details?id=com.IndieGameStudio.Voidloop&hl=en',
    pressKit: 'https://drive.google.com/drive/folders/1bpScdtBRKcSQULzFvpSdec0MIaM3vaFo',
    reqKey: 'mailto:request-key@indiegamestud.io',
    discord: 'https://discord.gg/gHrC4XSpuy',
  },
}
