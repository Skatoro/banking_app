export function hasNumbersOnly(str: string): boolean {
    const numberRegExp = /^\d+$/;
    return numberRegExp.test(str);
}