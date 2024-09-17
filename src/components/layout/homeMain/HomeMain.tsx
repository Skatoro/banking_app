'use client'
import Balance from "@/components/screens/balance/Balance";
import {cardsStore} from "@/store/cards";
import React from "react";
import NoCards from "@/components/layout/homeMain/NoCards";
import RecentContactsWrapper from "@/components/screens/contacts/RecentContactsWrapper";
import TransactionsWrapper from "@/components/screens/transactions/TransactionsWrapper";

export default function HomeMain() {
    const cards = cardsStore((state: any) => state.cards)
    const cardsInitialized = cardsStore((state: any) => state.cardsInitialized)
    return (<>
            {((!cardsInitialized) || (cardsInitialized && cards.length !== 0))
                ? <div className={'flex-grow  min-w-142 flex flex-col'}>
                    <Balance/>
                    <RecentContactsWrapper/>
                    <TransactionsWrapper/>
                </div>
                : <NoCards/>}

        </>
    )
}