export function shortenName(name: string) {

    const dividedName = name.split(' ')
    const firstName = dividedName[0]
    const lastName = dividedName[1]
    const shortenedName = `${firstName} ${lastName !== undefined ? lastName[0] : ''}`

    return shortenedName
}