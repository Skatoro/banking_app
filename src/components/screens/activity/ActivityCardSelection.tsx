import React, {Dispatch, FC, SetStateAction, useRef, useState} from "react";
import {CreditCard} from "lucide-react";
import {ICard} from "@/types/card.types";
import {CardSelector} from "@/components/screens/activity/cardSelector/CardSelector";

interface Props {
    selectedCards: ICard[]
    setSelectedCards: Dispatch<SetStateAction<ICard[]>>
}

export const ActivityCardSelection: FC<Props> = ({selectedCards, setSelectedCards}) => {

    const [cardsOpened, setCardsOpened] = useState<boolean>(false)
    const cardsButtonRef = useRef(null)
    return (<>
            <div className={'relative'}>
                <div
                    className={`rounded-full py-2  cursor-pointer flex px-4 
                    ${cardsOpened
                        ? 'bg-primary hover:bg-primary-darker text-white'
                        : 'bg-white hover:bg-secondary text-black dark:bg-bang1 dark:hover:bg-bang1Darker dark:text-white'}`}
                    onClick={() => setCardsOpened(!cardsOpened)}
                    style={{boxShadow: '0 3px 12px 0 rgba(0,0,0,0.1),0 1px 2px 0 rgba(0,0,0,0.08)'}}
                    ref={cardsButtonRef}
                >
                    <div className={' mr-3 select-none'}>Cards</div>
                    <div className={`flex items-center `}>
                        <CreditCard size={20} />
                    </div>
                </div>
                {cardsOpened &&
                    <div className={'absolute top-12 left-0'}>
                        <CardSelector
                            setMenuOpened={setCardsOpened} buttonRef={cardsButtonRef}
                            selectedCards={selectedCards} setSelectedCards={setSelectedCards}
                        />
                    </div>}
            </div>
        </>
    )
}