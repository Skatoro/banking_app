
export function prettifyBalance(balance: string | number, decimal: boolean = true) {
    if(!balance) return '0'

    balance = balance.toString()
    let [integer, float = ''] = balance.split('.');

    const reversed = integer.split('').reverse().join('');
    const split = reversed.match(/.{1,3}/g)?.join(',') || '';
    const pretty = split.split('').reverse().join('');

    if (!decimal) return pretty;
    if (float.length === 1) float += '0';
    if (!float) float += '00'
    return `${pretty}.${float}`
}