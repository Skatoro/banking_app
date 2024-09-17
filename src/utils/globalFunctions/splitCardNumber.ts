export function splitCardNumber(cardNumber: string) {
    if(!cardNumber) return ''
    let splitArray = cardNumber.match(/.{1,4}/g);
    return splitArray ? splitArray.join(' ') : '';
}