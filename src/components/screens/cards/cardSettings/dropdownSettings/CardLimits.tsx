import React, {FC, memo} from "react";
import {cardsStore} from "@/store/cards";
import {updateCardLimit} from "@/api/api";
import {prettifyBalance} from "@/utils/globalFunctions/prettifyBalance";
import {currency} from "@/constants/currency";
import {DropdownData} from "@/components/screens/cards/cardSettings/cardSettingItem/cardSettingItem.types";
import {SettingItemForm} from "@/components/screens/cards/cardSettings/cardSettingItem/settingItemForm/SettingItemForm";

export const CardLimits: FC<DropdownData> = memo(({isParentActive, dropdownTime}) => {
    const activeCard = cardsStore((state: any) => state.active)
    const cards = cardsStore((state: any) => state.cards)
    const currentCard = cards[activeCard]
    const id = currentCard.id;
    const limit = prettifyBalance(currentCard.transfer_limit, false) + ' ' + currency
    return (<>
            <SettingItemForm
                isParentActive={isParentActive}
                dropdownTime={dropdownTime}
                bodyText={'Transfer Limit'}
                bodyValue={limit}
                buttonText={'Change Transfer Limit'}
                apiFunction={updateCardLimit}
                id={id}
                maxLength={12}
            />
        </>
    )

})