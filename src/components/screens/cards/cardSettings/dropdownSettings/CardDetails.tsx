import React, {memo} from "react";
import {cardsStore} from "@/store/cards";
import {userStore} from "@/store/user";
import {currency} from "@/constants/currency";

export const CardDetails = memo(() => {
    const activeCard = cardsStore((state: any) => state.active)
    const cards = cardsStore((state: any) => state.cards)
    const user = userStore((state: any) => state.user)

    const currentCard = cards[activeCard]

    return (<>
            <div>Owner: {user.full_name}</div>
            <div>Number: {currentCard.number}</div>
            <div>CVV: {currentCard.cvv}</div>
            <div>Expiration: {currentCard.expiration_month}/{currentCard.expiration_year}</div>
            <div>Balance: {currentCard.balance} {currency}</div>
        </>
    )

})