import {CreditCard, RectangleEllipsis, Settings2} from "lucide-react";
import {CardDetails} from './dropdownSettings/CardDetails'
import {CardLimits} from "@/components/screens/cards/cardSettings/dropdownSettings/CardLimits";
import {CardPIN} from "@/components/screens/cards/cardSettings/dropdownSettings/CardPIN";
import {CardSettingItem} from "@/components/screens/cards/cardSettings/cardSettingItem/CardSettingItem";
import {memo} from "react";
import {BlockCardWrapper} from "@/components/screens/cards/cardSettings/cardSettingItem/BlockCardWrapper";
import {cardsStore} from "@/store/cards";

export const CardSettings = memo(() => {

    const activeCardIndex = cardsStore((state: any) => state.active)
    const cards = cardsStore((state: any) => state.cards)
    const activeCard = cards[activeCardIndex]
    return (
        <div className={'mb-5'}>
            <CardSettingItem Icon={CreditCard} text={'Show Card Details'} DropdownContent={CardDetails}/>
            <CardSettingItem Icon={RectangleEllipsis} text={'Your PIN'} DropdownContent={CardPIN}/>
            <CardSettingItem Icon={Settings2} text={'Edit Limits'}  DropdownContent={CardLimits}/>
            <BlockCardWrapper activeCard={activeCard}/>
        </div>
    )
})