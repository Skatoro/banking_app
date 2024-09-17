'use client'
import React, {FC} from "react";
import {MoveUpRight} from "lucide-react";
import {currency} from "@/constants/currency";
import {getCardSentSum} from "@/utils/globalFunctions/getCardSentSum";
import {ITransaction} from "@/types/transaction.types";
import {ConditionalBalance} from "@/components/ui/conditionalBalance/ConditionalBalance";

interface Props {
    transactions: ITransaction[] | null
    hideBalance: boolean
    showDecimal: boolean
}

export const ActivityExpenses: FC<Props> = ({transactions, hideBalance, showDecimal}) => {
    const expenses = transactions ? getCardSentSum(transactions) : 0
    const transactionAmount = transactions?.filter(transaction => !transaction.received).length;


    return (<>
            <div className={'w-1/2 rounded-3xl mr-5 p-5 bg-grey/90 text-white'}>
                <div className={'flex justify-between'}>
                    <div>
                        <div className={'bg-orange w-fit p-5 rounded-full mb-3'}>
                            <MoveUpRight color={'#fff'} size={42}/>
                        </div>
                        <h2 className={''}>Expenses</h2>
                        <div className={'text-4xl font-bold'}>
                            <ConditionalBalance
                                balance={expenses} emojiClass={'text-6xl mt-1'} afterText={currency}
                                hideBalance={hideBalance} showDecimal={showDecimal} beforeText={'-'}
                            />
                        </div>
                    </div>
                    <div>Transactions: {transactionAmount}</div>
                </div>
            </div>
        </>
    )
}