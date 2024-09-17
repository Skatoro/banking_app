import React, {FC, useMemo} from 'react'
import {getRandomEmoji} from "@/utils/globalFunctions/getRandomEmoji";
import {prettifyBalance} from "@/utils/globalFunctions/prettifyBalance";
import cn from "clsx";

interface Props {
    balance: number
    emojiClass: string,
    showDecimal: boolean,
    hideBalance: boolean
    beforeText?: string
    afterText?: string
}

export const ConditionalBalance:FC<Props> = ({balance, showDecimal, hideBalance, emojiClass, beforeText, afterText}) => {

    const randomEmoji = useMemo(() => getRandomEmoji(), []);

    return <>
        {hideBalance
            ? <div className={cn(emojiClass, 'select-none')}>{randomEmoji}</div>
            : <>{beforeText}{prettifyBalance(balance.toFixed(2), showDecimal)} {afterText}</>}
    </>
}
