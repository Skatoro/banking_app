'use client'
import React, {FC, memo, useState} from "react";
import {ProfilePicture} from "@/components/ui/profilePicture/ProfilePicture";
import {IUser} from "@/types/user.types";
import {DateTime} from "luxon";
import {Loader} from "@/components/ui/loader/Loader";
import {TransactionItemPreview} from "@/components/screens/transactions/TransactionItemPreview";
import {ITransaction} from "@/types/transaction.types";
import {ConditionalBalance} from "@/components/ui/conditionalBalance/ConditionalBalance";
import useCardsByIds from "@/hooks/useCardsByIds";

interface Props {
    transaction: ITransaction,
    user: IUser
    hideBalance: boolean
    showDecimal: boolean
}

export const TransactionItem: FC<Props> = memo(({transaction, user, hideBalance, showDecimal}) => {
    const [previewOpened, setPreviewOpened] = useState(false)
    useCardsByIds([transaction.senderCardId, transaction.recipientCardId]) // caching before render

    if (!user) return <div className={'h-22'}><Loader size={40}/></div>
    const isReceived = transaction.received

    const transactionTime = transaction.unformattedTime
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const transactionDateTime = DateTime.fromMillis(transactionTime, {zone: userTimezone});

    const formattedDate = transactionDateTime.toFormat('ccc, dd LLL yyyy ');
    const formattedTime = transactionDateTime.toFormat('HH:mm');

    return (<>
        <div
            className={`flex p-3 hover:bg-secondary dark:hover:bg-bang1 rounded-3xl cursor-pointer select-none`}
            onClick={() => setPreviewOpened(true)}
        >
            <div className={'flex w-1/2'}>
                <div className={'mr-5'}>
                    <ProfilePicture user={user} zoom={true}/>
                </div>
                <div className={'flex justify-between flex-col py-1'}>
                    <div className={'font-bold'}>
                        {user.full_name}
                    </div>
                    <div className={'text-gray-400'}>
                        {isReceived ? 'Received' : 'Sent'}
                    </div>
                </div>
            </div>
            <div className={'flex justify-between w-7/12'}>
                <div className={'flex justify-between flex-col py-1'}>
                    <div className={'font-bold'}>{formattedDate}</div>
                    <div>{formattedTime}</div>
                </div>
                <div
                    className={`font-bold text-lg flex items-center ${!isReceived && 'text-red-600 text-ellipsis overflow-hidden  '}`}>

                    <ConditionalBalance
                        balance={transaction.amount} emojiClass={'text-3xl'}
                        hideBalance={hideBalance} showDecimal={showDecimal}
                        beforeText={'USD '}
                    />
                </div>
            </div>
        </div>
        {previewOpened
            && <TransactionItemPreview disableForm={() => setPreviewOpened(false)} transaction={transaction}/>}
    </>)
})