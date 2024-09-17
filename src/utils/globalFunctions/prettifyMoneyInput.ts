
export function prettifyMoneyInput(moneyAmount: string) {
    if(!moneyAmount) return ''
    const hasDot = moneyAmount.split('.').length >= 2

    moneyAmount = moneyAmount.toString()
    const dividedBalance = moneyAmount.split('.')
    let integerBalance = dividedBalance[0]
    let floatBalance = dividedBalance[1] || ''

    let reversedBalance = reverseString(integerBalance);
    let splitBalance = reversedBalance.match(/.{1,3}/g);
    let prettyReversed = splitBalance ? splitBalance.join(',') : '';
    let prettyBalance = reverseString(prettyReversed)

    return prettyBalance + (hasDot ? '.' : '') + floatBalance;
    function reverseString(str: string) {
        return str.split('').reverse().join('');
    }
}