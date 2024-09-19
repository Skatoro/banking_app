import React, {Dispatch, FC, SetStateAction} from "react";
import {cardsStore} from "@/store/cards";
import {ITransaction} from "@/types/transaction.types";
import useUsersByMultipleIDs from "@/hooks/useUsersByMultipleIDs";
import {SearchCardItem} from "@/components/screens/balance/searchForm/SearchCardItem";
import {ICard} from "@/types/card.types";
import {splitCardNumber} from "@/utils/globalFunctions/splitCardNumber";
import {secureCardNumber} from "@/utils/globalFunctions/secureCardNumber";
import useCardsByIds from "@/hooks/useCardsByIds";

interface Props {
    selectedItemIndex: number | undefined
    setSelectedItemIndex: Dispatch<SetStateAction<number | undefined>>
}

export const RecentCards: FC<Props> = ({setSelectedItemIndex, selectedItemIndex}) => {
    const activeIndex = cardsStore((state: any) => state.active)
    const cards = cardsStore((state: any) => state.cards)
    const activeCard = cards[activeIndex]

    const transactionUserIDs = activeCard?.transactions.map((transaction: ITransaction) => {
        return transaction.transactionUserName !== 'System' && transaction.transactionUserId;
    }).filter((id: any) => id !== false)
    const transactionCardIDs = activeCard?.transactions.map((transaction: ITransaction) => transaction.received
        ? transaction.senderCardId
        : transaction.recipientCardId).filter((id: any) => id !== undefined)

    const transactionUsers = useUsersByMultipleIDs(transactionUserIDs)
    const transactionCards = useCardsByIds(transactionCardIDs)
    transactionCards.forEach((card, index) => {
        if (!card) {
            transactionUsers.splice(index, 1)
            transactionCards.splice(index, 1)
        }
    })
    const seenIds: string[] = []
    const recentCards = transactionCards.map((card: ICard, index: number) => {
        if (!card || !transactionUsers[index] || !transactionUsers[index]?.should_be_shown
            || seenIds.some(id => id === card.id)
        ) return
        seenIds.push(card.id)
        const cardNumber = splitCardNumber(secureCardNumber(card.number))
        return <SearchCardItem
            key={card.id} number={cardNumber} onClick={() => setSelectedItemIndex(index)}
            user={transactionUsers[index]} isActive={selectedItemIndex === index}/>
    })

    return <>
        {recentCards}
    </>
}