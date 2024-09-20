import {Transactions} from "@/components/screens/transactions/Transactions";
import {Loader} from "@/components/ui/loader/Loader";
import React, {useEffect, useState} from "react";
import {cardsStore} from "@/store/cards";
import {TransactionsHeader} from "@/components/screens/transactions/TransactionsHeader";
import { Range } from 'react-date-range';
import {allCalendarDates, todayCalendarDates} from "@/constants/calendarRanges";
import {reverseArray} from "@/utils/globalFunctions/reverseArray";
import {ITransaction} from "@/types/transaction.types";

export default function TransactionsWrapper() {
    const [isAllDates, setIsAllDates] = useState<boolean>(true)
    const [ranges, setRanges] = useState<Range[]>([allCalendarDates]);

    const cardsInitialized = cardsStore((state: any) => state.cardsInitialized)
    const cards = cardsStore((state: any) => state.cards)
    const activeCardIndex = cardsStore((state: any) => state.active)
    const currentCard = cards[activeCardIndex]
    const transactions = currentCard?.transactions

    const reversedTransactions = transactions ? reverseArray(transactions) : []
    const trimmedTransactions: ITransaction[] = [];
    reversedTransactions.forEach((transaction: any) => {
        if (ranges[0].endDate && ranges[0].startDate) {
            const {unformattedTime} = transaction;
            const {startDate, endDate} = ranges[0];

            if (((unformattedTime > endDate && unformattedTime < startDate)
                || (unformattedTime < endDate && unformattedTime > startDate))) {
                trimmedTransactions.push(transaction)
            }
        }
    })

    useEffect(() => {
        if (isAllDates) {
            setRanges([allCalendarDates])
        } else {
            setRanges([todayCalendarDates])
        }
    }, [isAllDates]);

    return <div className={'bg-white dark:bg-bang p-6 rounded-t-3xl  grow '}>
        {cardsInitialized
            ? <>
                <TransactionsHeader hasTransactions={!!transactions} isAllDates={isAllDates}
                                    ranges={ranges} setRanges={setRanges} setIsAllDates={setIsAllDates}
                />
                {trimmedTransactions.length !== 0
                    ? <Transactions transactions={trimmedTransactions} />
                    : <div className={'h-full flex justify-center items-center font-bold text-lg'}>No transactions</div>}
            </>
            : <Loader size={50}/>}
    </div>
}