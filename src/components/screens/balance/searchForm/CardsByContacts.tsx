import useUserByCardID from "@/hooks/useUserByID";
import {splitCardNumber} from "@/utils/globalFunctions/splitCardNumber";
import {secureCardNumber} from "@/utils/globalFunctions/secureCardNumber";
import {SearchCardItem} from "@/components/screens/balance/searchForm/SearchCardItem";
import React, {Dispatch, FC, SetStateAction} from "react";
import {ICard} from "@/types/card.types";
import {IUser} from "@/types/user.types";
interface Props {
    cards: ICard[]
    contacts: IUser[]
    selectedItemIndex: number | undefined
    setSelectedItemIndex: Dispatch<SetStateAction<number | undefined>>
}
export const CardsByContacts: FC<Props> = ({cards, contacts, selectedItemIndex, setSelectedItemIndex}) => {
    const cardsWithUsers = cards.map((card: ICard, index) => {
        if (!card) return

        const matchingUser = contacts.find((contact: IUser) => contact?.id === card?.user_id)
        if (!matchingUser) return

        const cardNumber = splitCardNumber(secureCardNumber(card.number))
        return <SearchCardItem
            key={card.id} number={cardNumber}
            user={matchingUser} isActive={selectedItemIndex === index} onClick={() => setSelectedItemIndex(index)}/>
    });

    return cardsWithUsers
}