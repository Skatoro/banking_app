'use client'
import {Dispatch, FC, memo, SetStateAction} from "react";
import cn from "clsx";
import styles from './CardsDropdown.module.scss'
import {cardsStore} from "@/store/cards";
import {CardsDropdownItem} from "@/components/screens/cards/cardsDropdown/CardsDropdownItem";

interface Props {
    setCardsShown: Dispatch<SetStateAction<boolean>>;
}

export const CardsDropdown: FC<Props> = memo(({setCardsShown}) => {

    const cards = cardsStore((state: any) => state.cards)
    const updateActiveCard = cardsStore((state: any) => state.updateActive)

    function handleSelection(index: number) {
        updateActiveCard(index)
        setCardsShown(false)
    }
    return (
        <>
            <div className={cn(
                'absolute top-14 right-6 max-h-72 bg-darkGrey z-30 text-tertiary border-darkGrey dark:border-stone-500 border-2 rounded-lg !overflow-y-scroll',
                styles.scrollbar)}
            >
                {cards.map((card: { number: string, payment_network: string }, index: number) => {
                    return <CardsDropdownItem card={card} key={index}
                                              onClick={() => handleSelection(index)}
                    />
                })}
            </div>
            <div
                className={'w-screen h-screen fixed left-0 top-0 overflow-hidden z-20'}
                onClick={() => setCardsShown(false)}
            ></div>
        </>
    )
})
