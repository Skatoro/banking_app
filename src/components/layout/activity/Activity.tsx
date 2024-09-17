'use client'
import React, {useEffect, useState} from "react";
import {ActivitySettings} from "@/components/screens/activity/ActivitySettings";
import {ActivityExpenses} from "@/components/screens/activity/ActivityExpenses";
import {ActivityIncome} from "@/components/screens/activity/ActivityIncome";
import {ActivityHistory} from "@/components/screens/activity/ActivityHistory";
import {Range} from "react-date-range";
import {allCalendarDates} from "@/constants/calendarRanges";
import {ICard} from "@/types/card.types";
import {cardsStore} from "@/store/cards";
import {Loader} from "@/components/ui/loader/Loader";
import {ITransaction} from "@/types/transaction.types";
import {userStore} from "@/store/user";

export default function Activity() {
    const cards: ICard[] = cardsStore((state: any) => state.cards)
    const cardsInitialized = cardsStore((state: any) => state.cardsInitialized)
    const userSettings = userStore((state: any) => state.user.settings)

    const [dateRanges, setDateRanges] = useState<Range[]>([allCalendarDates]);
    const [selectedCards, setSelectedCards] = useState<ICard[]>(cards);
    const [transactions, setTransactions] = useState<ITransaction[] | null>(null)

    useEffect(() => {
        const tempTransactions: ITransaction[] = []
        selectedCards.forEach(card => {
            card.transactions?.forEach((transaction: any) => {
                if (dateRanges[0].endDate && dateRanges[0].startDate) {
                    const {unformattedTime} = transaction;
                    const {startDate, endDate} = dateRanges[0];

                    if (((unformattedTime > endDate && unformattedTime < startDate) ||
                        (unformattedTime < endDate && unformattedTime > startDate))) {
                        tempTransactions.push(transaction)
                    }
                }
            })
        })
        const sortedTransactions = tempTransactions.sort((a, b) => b.unformattedTime - a.unformattedTime);
        setTransactions(sortedTransactions)
    }, [dateRanges, selectedCards]);

    useEffect(() => {
        cardsInitialized && setSelectedCards(cards)
    }, [cardsInitialized]);

    return (<>
            <div className={'grow flex flex-col'}>
                {cardsInitialized
                    ? <>
                        <ActivitySettings
                            dateRanges={dateRanges} setDateRanges={setDateRanges}
                            selectedCards={selectedCards} setSelectedCards={setSelectedCards}
                        />
                        <div className={'flex mb-5'}>
                            <ActivityExpenses transactions={transactions} hideBalance={userSettings.hideBalance}
                                              showDecimal={userSettings.showDecimal}/>
                            <ActivityIncome transactions={transactions} hideBalance={userSettings.hideBalance}
                                            showDecimal={userSettings.showDecimal}/>
                        </div>
                        {transactions && transactions?.length !== 0
                            ? <ActivityHistory transactions={transactions}/>
                            : <div className={'font-bold text-xl flex justify-center w-full h-full items-center'}>
                                No Card History
                            </div>}
                    </>
                    : <div className={'h-full'}><Loader size={50}/></div>}
            </div>
        </>
    )
}