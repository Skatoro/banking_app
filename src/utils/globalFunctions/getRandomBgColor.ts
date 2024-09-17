const colors = [
    '#9f25b5',
    '#2095f2',
    '#3f51b3',
    '#91da5e',
    '#00bcdc',
    '#fb9809',
    '#d192d8',
    '#f14436',
    '#fec009',
    '#7950f3',
    '#ec5389',
]

export function getRandomBgColor() {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    return randomColor
}