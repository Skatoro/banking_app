export function reverseArray(array: []) {
    return array.reduce((acc: any, curr: any) => [curr, ...acc], [])
}