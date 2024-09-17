export function getAvatarName(name: string) {
    const dividedLetters = [];
    const dividedName = name.split(' ')
    for (const element of dividedName) {
        dividedLetters.push(element[0].toUpperCase());
        if (dividedLetters.length === 2) {
            break;
        }
    }
    return dividedLetters.join('')
}