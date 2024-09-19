export function combineAndTrimDuplicates<T>(array1: T[], array2: T[]): T[] {
    if (array1.length !== array2.length) {
        throw new Error("Arrays must have the same length.");
    }

    const combinedArray: T[] = [];
    const seenValues: Set<string> = new Set();

    for (let i = 0; i < array1.length; i++) {
        const combinedValue = { ...array1[i], ...array2[i] };
        const valueString = JSON.stringify(combinedValue);

        if (!seenValues.has(valueString)) {
            combinedArray.push(combinedValue);
            seenValues.add(valueString);
        }
    }

    return combinedArray;
}