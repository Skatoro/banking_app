'use client'
import React, {FC, InputHTMLAttributes, memo} from "react";
import {ProfilePicture} from "@/components/ui/profilePicture/ProfilePicture";
import {IUser} from "@/types/user.types";
import {ICard} from "@/types/card.types";
import {secureCardNumber} from "@/utils/globalFunctions/secureCardNumber";
import {splitCardNumber} from "@/utils/globalFunctions/splitCardNumber";
import questionMarkWhite from "../../../../public/questionMarkWhite.svg";
import mastercardLogo from "../../../../public/mastercardLogo.svg";
import visaLogo from "../../../../public/visaLogo.svg";
import Image from "next/image";

interface Props extends InputHTMLAttributes<HTMLButtonElement> {
    user: IUser
    card: ICard
    title: string
}

export const TransactionInfoItem: FC<Props> = memo(({user, card, title, className}) => {

    let paymentNetworkImage = questionMarkWhite;
    if (card) {
        if (card.payment_network === 'mastercard') paymentNetworkImage = mastercardLogo
        if (card.payment_network === 'visa') paymentNetworkImage = visaLogo
    }
    return (<>
        <div className={className}>
            <div className={'font-bold mb-3 text-lg'}>{title}</div>
            <div className={'flex items-center mb-3'}>
                <div className={'mr-3'}><ProfilePicture user={user}/></div>
                <div className={'font-bold'}>{user.full_name}</div>
            </div>

            <div className={`h-12 flex items-center justify-center rounded-lg overflow-hidden border-2 ${!card && 'border-stone-800'}`}>
                {card
                    ? <div className={'flex bg-grey dark:bg-black p-3 w-full'}>
                        <Image src={paymentNetworkImage} alt={'Logo'} className={'w-6 h-6 mr-3'}/>
                        <div className={'text-white'}>{splitCardNumber(secureCardNumber(card.number))}</div>
                    </div>
                    : <div className={'text-lg font-bold'}>
                        No Card Info
                    </div>}
            </div>
        </div>
    </>)
})