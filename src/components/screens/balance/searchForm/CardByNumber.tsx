import useUserByID from "@/hooks/useUserByID";
import {splitCardNumber} from "@/utils/globalFunctions/splitCardNumber";
import {SearchCardItem} from "@/components/screens/balance/searchForm/SearchCardItem";
import React, {Dispatch, FC, SetStateAction} from "react";
import {ICard} from "@/types/card.types";
import {IUser} from "@/types/user.types";

interface Props {
    user: IUser
    card: ICard
    selectedItemIndex: number | undefined
    setSelectedItemIndex: Dispatch<SetStateAction<number | undefined>>
    setSelectedCard: Dispatch<SetStateAction<ICard | null>>
}
export const CardByNumber: FC<Props> = ({card, selectedItemIndex, setSelectedItemIndex, user, setSelectedCard}) => {
    const matchingUser = useUserByID(card?.user_id);
    if (matchingUser && user.id === matchingUser.id) return
    const cardNumber = splitCardNumber(card?.number)
    return <SearchCardItem
        key={card?.id}
        number={cardNumber}
        user={matchingUser}
        isActive={selectedItemIndex === 0}
        onClick={() => {
            setSelectedItemIndex(0)
            setSelectedCard(card)
        }}
    />
}