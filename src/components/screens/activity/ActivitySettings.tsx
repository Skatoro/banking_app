import React, {Dispatch, FC, SetStateAction} from "react";
import {ActivityTimeSelection} from "@/components/screens/activity/ActivityTimeSelection";
import {ActivityCardSelection} from "@/components/screens/activity/ActivityCardSelection";
import {Range} from "react-date-range";
import {ICard} from "@/types/card.types";
import {cardsStore} from "@/store/cards";

interface Props {
    dateRanges: Range[]
    setDateRanges: Dispatch<SetStateAction<Range[]>>
    selectedCards: ICard[]
    setSelectedCards: Dispatch<SetStateAction<ICard[]>>
}

export const ActivitySettings:FC<Props> = ({dateRanges, setDateRanges, selectedCards, setSelectedCards}) => {
    return (<>
            <div className={'flex mb-5'}>
                <div className={'mr-5'}>
                    <ActivityTimeSelection dateRanges={dateRanges} setDateRanges={setDateRanges}/>
                </div>
                <ActivityCardSelection selectedCards={selectedCards} setSelectedCards={setSelectedCards}/>
            </div>
        </>
    )
}