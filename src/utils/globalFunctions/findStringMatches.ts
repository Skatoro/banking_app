export function stringHasPart(stringPart: string, stringFull: string) {
    if (!stringPart || !stringFull) return false

    stringPart = stringPart.toLowerCase()
    stringFull = stringFull.toLowerCase()

    const amountOfCombinations = stringFull.length + 1 - stringPart.length
    for (let i = 0; i < amountOfCombinations; i++) {
        for (let j = 0; j < stringPart.length; j++) {
            if (stringPart[j] !== stringFull[i + j]) break
            if (j === stringPart.length - 1) return true
        }
    }
    return false
}