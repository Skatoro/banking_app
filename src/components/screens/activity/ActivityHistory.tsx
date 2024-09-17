'use client'
import React, {FC} from "react";
import {ITransaction} from "@/types/transaction.types";
import {Transactions} from "@/components/screens/transactions/Transactions";

interface Props {
    transactions: ITransaction[]
}

export const ActivityHistory: FC<Props> = ({transactions}) => {

    return (<>
            <div className={'grow'}>
                <Transactions transactions={transactions} stepLoading={false}/>
            </div>
        </>
    )
}