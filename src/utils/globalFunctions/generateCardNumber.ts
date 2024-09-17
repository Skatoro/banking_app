import {ChangeEvent} from "react";

export function generateCardNumber(payment_network: string) {
    const length = 16 - 1;
    let cardNumber = "";
    if (payment_network === 'visa') {
        cardNumber = '4'
    } else if (payment_network === 'mastercard') {
        cardNumber = '5'
    }
    for (let i = 0; i < length; i++) {
        cardNumber += Math.floor(Math.random() * 10).toString();
    }

    return cardNumber
}
