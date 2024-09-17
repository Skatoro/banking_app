import {hasNumbersOnly} from "@/utils/globalFunctions/hasNumbersOnly";

export function secureCardNumber(number:string) {
    if (!number || number.length !== 16 || !hasNumbersOnly(number)) return ''

    let digits = number.split('')
    digits = digits.map((digit, index) => {
        if (index > 5 && index < 12) {
            return '*'
        }
        return digit
    })

    return digits.join('')
}