'use client'
import React from "react";
import {cardsStore} from "@/store/cards";
import {Loader} from "@/components/ui/loader/Loader";
import {DetailedCardItem} from "@/components/layout/cards/DetailedCardItem";
import {ICard} from "@/types/card.types";
import {userStore} from "@/store/user";

export default function DetailedCards() {
    const cards = cardsStore((state: any) => state.cards)
    const cardsInitialized = cardsStore((state: any) => state.cardsInitialized)
    const user = userStore((state: any) => state.user)

    const detailedCardElements = cards.map((card: ICard, index: number) => {
        return <DetailedCardItem card={card} key={index} cardIndex={index}
                                 name={user.full_name} hideBalance={user.settings.hideBalance}
                                 showDecimal={user.settings.showDecimal}/>
    })

    return (<>
            <div className={'h-full'}>
                {cardsInitialized
                    ? detailedCardElements
                    : <div className={'h-full'}><Loader size={50}/></div>}
            </div>
        </>
    )
}