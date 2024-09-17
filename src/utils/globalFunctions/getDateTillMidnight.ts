export function getDateTillMidnight(date: Date) {
    const midnight = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
    midnight.setMilliseconds(midnight.getMilliseconds() - 1); // Set to just before midnight

    return midnight;
}