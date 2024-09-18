import {Dispatch, FC, MutableRefObject, SetStateAction, useEffect, useRef, useState} from "react";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import {useHandleOutsideClick} from "@/hooks/useHandleOutsideClick";
import {cardsStore} from "@/store/cards";
import {ICard} from "@/types/card.types";
import {CardSelectorItem} from "@/components/screens/activity/cardSelector/CardSelectorItem";
import styles from './CardSelector.module.scss'

interface Props {
    selectedCards: ICard[]
    setSelectedCards: Dispatch<SetStateAction<ICard[]>>
    setMenuOpened: Dispatch<SetStateAction<boolean>>
    buttonRef: MutableRefObject<HTMLElement> | MutableRefObject<null>
}

export const CardSelector: FC<Props> = ({selectedCards, setMenuOpened, buttonRef, setSelectedCards}) => {
    const menuRef = useRef<HTMLDivElement>(null);
    const cards = cardsStore((state: any) => state.cards)
    const [selectedCardsIndexes, setSelectedCardsIndexes] = useState<boolean[]>([])
    let isClickedOutside = useHandleOutsideClick(menuRef, buttonRef)

    useEffect(() => {
        if (isClickedOutside) setMenuOpened(false)
    }, [isClickedOutside]);

    useEffect(() => {
        const selectedCardsIndexes = cards.map((card: ICard) =>
            selectedCards.some(selected =>
                selected.id === card.id)
        );
        setSelectedCardsIndexes(selectedCardsIndexes);
    }, []);

    function handleCardSelection(cardIndex: number) {
        const selected = !selectedCardsIndexes[cardIndex];
        const updatedArray = [...selectedCardsIndexes.slice(0, cardIndex), selected, ...selectedCardsIndexes.slice(cardIndex + 1)]
        setSelectedCardsIndexes(updatedArray);
        setSelectedCards(cards.filter((card: ICard, index: number) => updatedArray[index]));
    }

    return (<>
        <div
            className={`rounded-lg overflow-y-scroll 
            ${cards.length !== 0 && 'border-2 border-stone-500'} 
            ${styles.scrollbar}`} ref={menuRef}
            style={{boxShadow: '0 3px 12px 0 rgba(0,0,0,0.1),0 1px 2px 0 rgba(0,0,0,0.08)'}}
        >
            <div className={'max-h-80 '}>
                {cards.map((card: ICard, index: number) =>
                    <CardSelectorItem
                        selected={selectedCardsIndexes[index]} key={index}
                        cardNumber={card.number} payment_network={card.payment_network}
                        onClick={() => handleCardSelection(index)}
                    />
                )}
            </div>
        </div>
    </>)
}