import carOne from '../assets/ANormalQuizGameGallery/Individual/Car1.png'
import dice from '../assets/ANormalQuizGameGallery/Individual/Dice.png'
import taxes from '../assets/ANormalQuizGameGallery/Individual/Taxes.png'
import button from '../assets/ANormalQuizGameGallery/Individual/Button.png'
import orphan from '../assets/ANormalQuizGameGallery/Individual/Orphan.png'
import logo from '../assets/ANormalQuizGameGallery/Individual/Logo_4k.png'
import logoTrimmed from '../assets/ANormalQuizGameGallery/Individual/Logo_Trimmed.png'
import monster from '../assets/ANormalQuizGameGallery/Individual/Monster.png'
import background from '../assets/ANormalQuizGameGallery/Individual/Background.png'
import questionOne from '../assets/ANormalQuizGameGallery/Screenshots/ScreenshotQuestion1.png'
import questionTwo from '../assets/ANormalQuizGameGallery/Screenshots/ScreenshotQuestion2.png'
import questionThree from '../assets/ANormalQuizGameGallery/Screenshots/ScreenshotQuestion3.png'
import questionFour from '../assets/ANormalQuizGameGallery/Screenshots/ScreenshotQuestion4.png'
import questionFive from '../assets/ANormalQuizGameGallery/Screenshots/ScreenshotQuestion5.png'
import questionSix from '../assets/ANormalQuizGameGallery/Screenshots/ScreenshotQuestion6.png'
import punishmentOne from '../assets/ANormalQuizGameGallery/Screenshots/ScreenshotPunishment1.png'
import punishmentTwo from '../assets/ANormalQuizGameGallery/Screenshots/ScreenshotPunishment2.png'
import punishmentThree from '../assets/ANormalQuizGameGallery/Screenshots/ScreenshotPunishment3.png'
import punishmentFour from '../assets/ANormalQuizGameGallery/Screenshots/ScreenshotPunishment4.png'
import punishmentFive from '../assets/ANormalQuizGameGallery/Screenshots/ScreenshotPunishment5.png'
import punishmentSix from '../assets/ANormalQuizGameGallery/Screenshots/ScreenshotPunishment6.png'
import finalArt from '../assets/ANormalQuizGameGallery/PromotionalArt/Final_4k__Compressed_.png'
import verticalCapsule from '../assets/ANormalQuizGameGallery/PromotionalArt/Vertical_Capsule__2635x3157px.png'

export const aNormalQuizGame = {
    title: 'A Normal Quiz Game',
    releaseDate: 'Q1 2027',
    platforms: 'Windows & Mac',
    logo,
    logoTrimmed,
    background,
    links: {
        steam: 'https://store.steampowered.com/app/5109940',
        pressKit:
            'https://drive.google.com/drive/u/1/folders/1cthQ0FnTPmEMOYMFKQ-elup4e8eqxrlv',
        requestKey:
            'mailto:request-key@indiegamestud.io?subject=A%20Normal%20Quiz%20Game%20Steam%20key%20request',
    },
    gallery: [
        {image: questionOne, label: 'In-Game', group: 'Questions'},
        {image: questionTwo, label: 'In-Game', group: 'Questions'},
        {image: questionThree, label: 'In-Game', group: 'Questions'},
        {image: questionFour, label: 'In-Game', group: 'Questions'},
        {image: questionFive, label: 'In-Game', group: 'Questions'},
        {image: questionSix, label: 'In-Game', group: 'Questions'},
        {image: punishmentOne, label: 'In-Game', group: 'Punishments'},
        {image: punishmentTwo, label: 'In-Game', group: 'Punishments'},
        {image: punishmentThree, label: 'In-Game', group: 'Punishments'},
        {image: punishmentFour, label: 'In-Game', group: 'Punishments'},
        {image: punishmentFive, label: 'In-Game', group: 'Punishments'},
        {image: punishmentSix, label: 'In-Game', group: 'Punishments'},
    ],
    showcaseArt: finalArt,
    capsuleArt: verticalCapsule,
    decorativeArt: {carOne, dice, taxes, button, monster, orphan, logo},
}
