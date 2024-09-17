export const handleMoneyInput = (event: any) => {
    const inputValue = event.target.value;

    let lettersExcluded = inputValue.replace(/[^0-9.]/g, '');
    let dotsAmount = lettersExcluded ? lettersExcluded.split('.').length - 1 : 0;
    let firstDotIndex = lettersExcluded.indexOf('.');

    if (dotsAmount >= 1) {
        const beforeDot = Number(lettersExcluded.slice(0, firstDotIndex))
        const afterDot = lettersExcluded.slice(firstDotIndex + 1, lettersExcluded.length)
        const afterDotDigits = afterDot.replace(/[^0-9]/g, '');
        const twoAfterDotDigits = afterDotDigits.slice(0, 2)
        let result = beforeDot + '.' + twoAfterDotDigits

        event.target.value = result[0] === '.'  ? '' : result
    } else {
        let result = lettersExcluded.replace(/[^0-9.]/g, '');
        result = clearFirstZeros(result)
        event.target.value =  result[0] === '.'  ? '' : result
    }
};

function clearFirstZeros(numberString: string) {
    let amountToTrim = 0
    for (const char of numberString) {
        if(char !== '0') {
            break
        }
        amountToTrim += 1
    }
    if (!!amountToTrim) {
        return numberString.slice(amountToTrim - 1)
    }
    return numberString
}