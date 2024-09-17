'use client'
import React, {FC, memo} from "react";
import {FormFrame} from "@/components/ui/formFrame/FormFrame";
import {ITransaction} from "@/types/transaction.types";
import {userStore} from "@/store/user";
import useUsersByMultipleIDs from "@/hooks/useUsersByMultipleIDs";
import useCardsByIds from "@/hooks/useCardsByIds";
import {TransactionInfoItem} from "@/components/screens/transactions/TransactionInfoItem";
import {DateTime} from "luxon";
import {currency} from "@/constants/currency";

interface Props {
    disableForm: () => void
    transaction: ITransaction
}

export const TransactionItemPreview: FC<Props> = memo(({disableForm, transaction}) => {
    const transactionUser = useUsersByMultipleIDs([transaction.transactionUserId])
    const user = userStore((state: any) => state.user)

    const recipientUser = transaction.received ? user : transactionUser[0]
    const senderUser = transaction.received ? transactionUser[0] : user

    const [senderCard, recipientCard] = useCardsByIds([transaction.senderCardId, transaction.recipientCardId])
    console.log(senderCard, recipientCard)
    const transactionTime = transaction.unformattedTime
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const transactionDateTime = DateTime.fromMillis(transactionTime, {zone: userTimezone});

    const formattedDate = transactionDateTime.toFormat('dd LLL yyyy');
    const formattedTime = transactionDateTime.toFormat('HH:mm');

    return (<>
        <FormFrame disableForm={disableForm} title={'Transaction Preview'} className={'!w-[600px]'}>
            <div className={'text-5xl font-bold flex justify-center mb-8'}>
                {!transaction.received && '-'}{transaction.amount}{currency}
            </div>
            <div className={'flex justify-between mb-3'}>
                <TransactionInfoItem user={recipientUser} card={recipientCard}
                                     title={'Recipient'} className={'w-5/12'}/>
                <TransactionInfoItem user={senderUser} card={senderCard}
                                     title={'Sender'} className={'w-5/12'}/>
            </div>
            <div className={'flex justify-center font-bold'}>{formattedDate}, {formattedTime}</div>
        </FormFrame>
    </>)
})