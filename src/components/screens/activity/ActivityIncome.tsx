'use client'
import React, {FC} from "react";
import {MoveDownLeft} from "lucide-react";
import {getCardReceivedSum} from "@/utils/globalFunctions/getCardReceivedSum";
import {ITransaction} from "@/types/transaction.types";
import {ConditionalBalance} from "@/components/ui/conditionalBalance/ConditionalBalance";
import {currency} from "@/constants/currency";

interface Props {
    transactions: ITransaction[] | null
    hideBalance: boolean
    showDecimal: boolean
}

export const ActivityIncome: FC<Props> = ({transactions, hideBalance, showDecimal}) => {
    const income = transactions ? getCardReceivedSum(transactions) : 0
    const transactionAmount = transactions?.filter(transaction => transaction.received).length;
    return (<>
            <div className={'w-1/2 rounded-3xl p-5 bg-grey/90 text-white'}>
                <div className={'flex justify-between'}>
                    <div>
                        <div className={'bg-green w-fit p-5 rounded-full mb-3'}>
                            <MoveDownLeft color={'#fff'} size={42}/>
                        </div>
                        <h2 className={''}>Income</h2>
                        <div className={'text-4xl font-bold'}>
                            <ConditionalBalance
                                balance={income} emojiClass={'text-6xl mt-1'} afterText={currency}
                                hideBalance={hideBalance} showDecimal={showDecimal}
                            />
                        </div>
                    </div>
                    <div>Transactions: {transactionAmount}</div>
                </div>
            </div>
        </>
    )
}