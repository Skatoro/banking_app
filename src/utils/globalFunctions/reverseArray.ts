export function reverseArray(array: any) {
    return array.reduce((acc: any, curr: any) => [curr, ...acc], [])
}