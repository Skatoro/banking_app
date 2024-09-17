
export function generateNumber(length: number) {
    let value = "";

    for (let i = 0; i < length; i++) {
        value += Math.floor(Math.random() * 10).toString();
    }
    return value
}