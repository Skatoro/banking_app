export function getAvatarName(name: string) {
    const dividedLetters = [];
    let dividedName = name.split(' ')
    dividedName = dividedName.filter(item => item !== null && item !== undefined && item !== '');
    for (const element of dividedName) {
        dividedLetters.push(element[0].toUpperCase());
        if (dividedLetters.length === 2) {
            break;
        }
    }
    return dividedLetters.join('')
}