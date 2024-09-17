export function getDateFromMidnight(date: Date) {
    const midnight = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    return midnight;
}