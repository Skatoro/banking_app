'use client'
import React, {FC, memo, useEffect, useState} from "react";
import {ICard} from "@/types/card.types";
import {cardsStore} from "@/store/cards";
import {Button} from "@/components/ui/button/Button";
import mastercardLogo from "../../../../public/mastercardLogo.svg";
import visaLogo from "../../../../public/visaLogo.svg";
import questionMarkWhite from "../../../../public/questionMarkWhite.svg";
import {CardInterface} from "@/components/screens/cards/currentCard/CardInterface";
import {currency} from "@/constants/currency";
import {toggleBlockCard} from "@/api/api";
import {BlockAnimation} from "@/components/ui/blockAnimation/BlockAnimation";
import {RotateCcw} from "lucide-react";
import {ConditionalBalance} from "@/components/ui/conditionalBalance/ConditionalBalance";
import {DeleteCardConfirm} from "@/components/screens/cards/deleteCardConfirm/DeleteCardConfirm";
import {FormFrame} from "@/components/ui/formFrame/FormFrame";

interface Props {
    card: ICard
    cardIndex: number
    name: string
    userId: string
    hideBalance: boolean
    showDecimal: boolean
}

export const DetailedCardItem: FC<Props> = memo(({card, cardIndex, name, userId, hideBalance, showDecimal}) => {
    const updateActive = cardsStore((state: any) => state.updateActive)
    const activeCardIndex = cardsStore((state: any) => state.active)
    const isCurrentActive = activeCardIndex === cardIndex
    const [shownDeleteConfirmation, setShownDeleteConfirmation] = useState(false);

    const [isBlockAvailable, setIsBlockAvailable] = useState(false)

    let paymentNetworkImage = questionMarkWhite;
    if (card) {
        if (card.payment_network === 'mastercard') paymentNetworkImage = mastercardLogo
        if (card.payment_network === 'visa') paymentNetworkImage = visaLogo
    }

    useEffect(() => {
        setTimeout(() => {
            setIsBlockAvailable(true)
        }, 1000)
    }, []);

    function handleBlock() {
        toggleBlockCard(!card.blocked, card.id)
        setIsBlockAvailable(false)
        setTimeout(() => {
            setIsBlockAvailable(true)
        }, 1100)
    }

    return (<>
            <div className={'w-full mb-3 p-3  rounded-xl border-4  flex justify-between ' +
                `${isCurrentActive
                    ? 'bg-grey/90 text-white border-stone-800 dark:bg-secondary/80 dark:border-stone-200 dark:text-black'
                    : "bg-secondary/30 border-stone-200 dark:bg-grey/90 dark:border-stone-800 dark:text-white"}`}
            >
                <div className={'relative overflow-hidden rounded-2xl text-white '}>
                    <BlockAnimation
                        closed={card.blocked}
                        buttonTitle={'Unblock Card'}
                        buttonAction={() => toggleBlockCard(false, card.id)}
                        Icon={RotateCcw}
                    />
                    <div className={'text-white bg-black  px-6 pt-8 w-80 h-44  '}>
                        <CardInterface
                            paymentNetworkImage={paymentNetworkImage} cardName={name} cardNumber={card.number}
                            cardExpYear={card.expiration_year} cardExpMonth={card.expiration_month} cardCvv={card.cvv}
                        />
                    </div>
                </div>

                <div className={'flex'}>
                    <div className={'mr-5 mt-6 font-bold text-4xl'}>
                        <div className={'mb-3'}>
                            <ConditionalBalance
                                balance={Number(card.balance)} emojiClass={'text-6xl mt-1'} afterText={currency}
                                hideBalance={hideBalance} showDecimal={showDecimal}
                            />
                        </div>
                        <div className={'text-lg flex justify-end'}>
                            Transactions: {card?.transactions && card?.transactions.length || 0}
                        </div>
                    </div>
                    <div className={'flex flex-col justify-around w-40'}>
                        <Button className={`bg-primary border-2 border-transparent 
                                ${isCurrentActive ? '' : 'hover:bg-primary-darker'}`}
                                onClick={() => updateActive(cardIndex)}
                                disabled={isCurrentActive}
                        >
                            {isCurrentActive ? 'Active' : 'Set Active'}
                        </Button>
                        <Button className={`bg-pink-lighter !text-red-500 hover:bg-pink border-2 border-transparent 
                                ${isCurrentActive && ''}`}
                                onClick={handleBlock}
                                disabled={!isBlockAvailable} disabledStyle={'!bg-pink-lighter'}
                        >
                            {card.blocked ? 'Unblock' : 'Block Card'}
                        </Button>
                        <Button className={`bg-pink-lighter !text-red-500 hover:bg-pink border-2 border-transparent 
                                ${isCurrentActive && ''}`}
                                onClick={() => setShownDeleteConfirmation(true)}
                        >
                            Delete Card
                        </Button>
                    </div>
                </div>
            </div>

            {shownDeleteConfirmation
                && <FormFrame disableForm={() => setShownDeleteConfirmation(false)} cross={false}>
                    <DeleteCardConfirm setShownDeleteConfirm={setShownDeleteConfirmation}
                                       id={card.id}/>
                </FormFrame>}
        </>
    )
})