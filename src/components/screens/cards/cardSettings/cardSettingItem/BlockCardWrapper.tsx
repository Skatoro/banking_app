import {Lock, LockOpen} from "lucide-react";
import {CardSettingItem} from "@/components/screens/cards/cardSettings/cardSettingItem/CardSettingItem";
import {memo, useEffect, useState} from "react";
import {cardsStore} from "@/store/cards";
import {toggleBlockCard} from "@/api/api";
import {ICard} from "@/types/card.types";

export const BlockCardWrapper = memo(({activeCard}: {activeCard: ICard}) => {

    const [isBlockAvailable, setIsBlockAvailable] = useState(false)
    const [isBlockedThrottled, setIsBlockedThrottled] = useState(activeCard.blocked)
    function handleBlock() {
        toggleBlockCard(!activeCard.blocked, activeCard.id)
        setIsBlockAvailable(false)
        setTimeout(() => {
            setIsBlockAvailable(true)
        }, 1100)
    }

    useEffect(() => {
        setTimeout(() => {
            setIsBlockAvailable(true)
        }, 1000)
    }, []);

    useEffect(() => {
        setIsBlockedThrottled(activeCard.blocked)
    }, [isBlockAvailable, activeCard]);

    return (<>
        {isBlockedThrottled
            ? <CardSettingItem Icon={LockOpen} text={'Unblock Card'} onClick={handleBlock} disabledButton={!isBlockAvailable}/>
            : <CardSettingItem Icon={Lock} text={'Block Card'} onClick={handleBlock} disabledButton={!isBlockAvailable}/>}
    </>)
})