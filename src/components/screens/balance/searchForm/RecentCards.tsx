import React, {Dispatch, FC, SetStateAction} from "react";
import {cardsStore} from "@/store/cards";
import {ITransaction} from "@/types/transaction.types";
import useUsersByMultipleIDs from "@/hooks/useUsersByMultipleIDs";
import useCardsByUsers from "@/hooks/useCardsByUsers";
import {SearchCardItem} from "@/components/screens/balance/searchForm/SearchCardItem";
import {ICard} from "@/types/card.types";
import {splitCardNumber} from "@/utils/globalFunctions/splitCardNumber";
import {secureCardNumber} from "@/utils/globalFunctions/secureCardNumber";

interface Props {
    selectedItemIndex: number | undefined
    setSelectedItemIndex: Dispatch<SetStateAction<number | undefined>>
}
export const RecentCards: FC<Props> = ({setSelectedItemIndex, selectedItemIndex}) => {
    const activeIndex = cardsStore((state: any) => state.active)
    const cards = cardsStore((state: any) => state.cards)
    const activeCard = cards[activeIndex]

    const transactionUserIDs = activeCard?.transactions.map((transaction: ITransaction) => transaction.transactionUserId)
    const transactionUsers = useUsersByMultipleIDs(transactionUserIDs)
    const transactionCards = useCardsByUsers(transactionUsers)

    const recentCards = transactionCards.map((card:ICard, index: number) => {
        if (!card || !transactionUsers[index]) return
        const cardNumber = splitCardNumber(secureCardNumber(card.number))
        return <SearchCardItem
            key={card.id} number={cardNumber} onClick={() => setSelectedItemIndex(index)}
            user={transactionUsers[index]} isActive={selectedItemIndex === index} />
    })

    // @ts-ignore
    const uniqueCards = [...new Set(recentCards.reverse())];
    return <>
        {uniqueCards}
    </>
}