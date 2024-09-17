'use client'
import {FC, useState} from "react";
import styles from './CardNumber.module.scss'
import {splitCardNumber} from "@/utils/globalFunctions/splitCardNumber";

interface ICardNumber {
    cardNumber: string
}

export const CardNumber: FC<ICardNumber> = ({cardNumber}) => {
    const [copyText, setCopyText] = useState("Copy");
    function CopyCardNumber() {
        const cardNumberCompressed = cardNumber.replace(/\s/g, '');
        navigator.clipboard.writeText(cardNumberCompressed);
        setCopyText('Copied!')
    }

    return (
        <div onClick={CopyCardNumber} onMouseLeave={() => setCopyText('Copy')}
             className={`cursor-pointer relative ${styles.hoverParent}`}>
            {cardNumber && splitCardNumber(cardNumber)}
            <div className={`absolute bottom-7 left-1/2 -translate-x-1/2 ${styles.copyClipboardText}`}>
                {copyText}
            </div>
        </div>
    )
}