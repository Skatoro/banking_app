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

        return <DetailedCardItem card={card} key={card.id} cardIndex={index} userId={user.id}
                                 name={user.full_name} hideBalance={user.settings.hideBalance}
                                 showDecimal={user.settings.showDecimal}/>
    })

    return (<>
            <div className={'h-full'}>
                {cardsInitialized && cards.length === 0 && <div className={'w-full h-full flex justify-center items-center text-2xl font-bold'}>
                    No cards available
                </div>}
                {cardsInitialized
                    ? detailedCardElements
                    : <div className={'h-full'}><Loader size={50}/></div>}
            </div>
        </>
    )
}