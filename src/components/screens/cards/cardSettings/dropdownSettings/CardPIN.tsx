import React, {FC, memo} from "react";
import {cardsStore} from "@/store/cards";
import {updatePin} from "@/api/api";
import {DropdownData} from "@/components/screens/cards/cardSettings/cardSettingItem/cardSettingItem.types";
import {SettingItemForm} from "@/components/screens/cards/cardSettings/cardSettingItem/settingItemForm/SettingItemForm";

export const CardPIN: FC<DropdownData> = memo(({isParentActive, dropdownTime}) => {
    const activeCard = cardsStore((state: any) => state.active)
    const cards = cardsStore((state: any) => state.cards)
    const currentCard = cards[activeCard]
    const id = currentCard.id;

    return (<>
            <SettingItemForm
                isParentActive={isParentActive}
                dropdownTime={dropdownTime}
                bodyText={'PIN'}
                bodyValue={currentCard.pin}
                buttonText={'Change PIN'}
                apiFunction={updatePin}
                id={id}
                maxLength={4}
                minLength={4}
            />
        </>
    )

})