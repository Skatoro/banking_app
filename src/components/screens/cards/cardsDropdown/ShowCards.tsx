'use client'
import React, {memo, useState} from "react";
import {CardsDropdown} from "@/components/screens/cards/cardsDropdown/CardsDropdown";

export const ShowCards = memo(() => {

    const [cardsShown, setCardsShown] = useState(false);
    return (<>
            <button onClick={() => setCardsShown(true)}>
                <h4 className={'text-secondary dark:text-secondary-lighter'}>Show all</h4>
            </button>
            {cardsShown && <CardsDropdown setCardsShown={setCardsShown}/>}
        </>
    )
})