import {emojis} from "@/constants/emojis";

export function getRandomEmoji() {
    const length = emojis.length

    return emojis[Math.floor(Math.random() * length)]
}