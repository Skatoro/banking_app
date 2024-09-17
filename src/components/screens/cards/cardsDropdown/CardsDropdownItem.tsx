'use client'
import {FC, InputHTMLAttributes, memo} from "react";
import mastercardLogo from '../../../../../public/mastercardLogo.svg'
import questionMark from '../../../../../public/questionMarkWhite.svg'
import visaLogo from '../../../../../public/visaLogo.svg'
import Image from "next/image";
import {splitCardNumber} from "@/utils/globalFunctions/splitCardNumber";

interface Props extends InputHTMLAttributes<HTMLElement> {
    card: {
        number: string,
        payment_network: string
    }
}

export const CardsDropdownItem: FC<Props> = memo(({card, onClick}) => {
    let logo = questionMark;
    if (card.payment_network === 'mastercard') logo = mastercardLogo
    if (card.payment_network === 'visa') logo = visaLogo

    return (<>

        <button
            className={'rounded-md hover:bg-grey flex px-2 py-3 items-center select-none'}
            onClick={onClick}
        >
            <div
                className={'w-10 h-6 rounded-sm border-2 border-white flex justify-center items-center mr-4'}
            >
                <Image
                    src={logo} alt={'card brand'}
                    className={`${logo === questionMark ? 'w-4 ' : 'w-5'}`}
                />
            </div>
            <div className={'text-sm mr-4'}>{splitCardNumber(card.number)}</div>
        </button>
    </>)
})
