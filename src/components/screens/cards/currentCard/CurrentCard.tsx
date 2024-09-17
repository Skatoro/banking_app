import React, {FC, memo,} from "react";
import {BadgePlus, RotateCcw} from "lucide-react";
import {ICard} from "@/types/card.types";
import questionMarkWhite from '../../../../../public/questionMarkWhite.svg'
import mastercardLogo from '../../../../../public/mastercardLogo.svg'
import visaLogo from '../../../../../public/visaLogo.svg'
import {CardInterface} from "@/components/screens/cards/currentCard/CardInterface";
import {BlockAnimation} from "@/components/ui/blockAnimation/BlockAnimation";
import {toggleBlockCard} from "@/api/api";

interface Props {
    card: ICard;
    name: string | undefined;
    haveCard: boolean;
    setShownCardForm: any
}

export const CurrentCard: FC<Props> = memo(({card, name, haveCard, setShownCardForm}) => {
    let paymentNetworkImage = questionMarkWhite;
    if (card) {
        if (card.payment_network === 'mastercard') paymentNetworkImage = mastercardLogo
        if (card.payment_network === 'visa') paymentNetworkImage = visaLogo
    }

    return (
        <div className={'w-full h-48 relative mb-6'}>
            <div className={'bg-black w-full h-5/6 absolute bottom-0 rounded-t-2xl z-10 text-white px-6 pt-8 overflow-hidden'}>
                {haveCard
                    ? <>
                        <BlockAnimation
                            closed={card.blocked}
                            buttonTitle={'Unblock Card'}
                            buttonAction={() => toggleBlockCard(false, card.id)}
                            Icon={RotateCcw}
                        />
                        <CardInterface
                            cardNumber={card.number}
                            cardCvv={card.cvv}
                            cardName={name}
                            paymentNetworkImage={paymentNetworkImage}
                        />
                    </>
                    : <div className={'flex justify-center items-center '}>
                        <BadgePlus className={'w-24 h-24 cursor-pointer'} onClick={() => setShownCardForm(true)}/>
                    </div>}
            </div>
            <div className={'bg-primary w-11/12 h-5/6 absolute bottom-4 left-4 -rotate-2 rounded-t-2xl z-0'}></div>
        </div>
    )
})