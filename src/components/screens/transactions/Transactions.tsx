import useUsersByMultipleIDs from "@/hooks/useUsersByMultipleIDs";
import {TransactionItem} from "@/components/screens/transactions/TransactionItem";
import {FC, useEffect, useState} from "react";
import {ITransaction} from "@/types/transaction.types";
import {RotateCcw} from "lucide-react";
import {Button} from "@/components/ui/button/Button";
import {userStore} from "@/store/user";

interface Props {
    transactions: ITransaction[]
    stepLoading?: boolean
}

export const Transactions: FC<Props> = ({transactions, stepLoading = true}) => {
    const userSettings = userStore((state: any) => state.user.settings)
    const userStepAmount = stepLoading ? 3 : transactions.length
    const [shownUserAmount, setShownUserAmount] = useState<number>(stepLoading ? userStepAmount : transactions.length)
    const [canShowMore, setCanShowMore] = useState<boolean>(stepLoading)

    useEffect(() => {
        if (!stepLoading) {
            setShownUserAmount(transactions.length)
        }
        if (transactions.length > shownUserAmount) {
            setCanShowMore(true)
        } else {
            setCanShowMore(false)
        }
    }, [transactions.length, shownUserAmount]);


    const shownTransactions = transactions.slice(0, shownUserAmount)
    const transactionUserIDs = shownTransactions.map((transaction: ITransaction) => transaction.transactionUserId)
    const transactionUsers = useUsersByMultipleIDs(transactionUserIDs)
    const transactionItemsElements = shownTransactions.map((transaction: ITransaction, index: number) => {

        return <TransactionItem
            transaction={transaction} key={index} hideBalance={userSettings.hideBalance}
            user={transactionUsers[index]} showDecimal={userSettings.showDecimal}
        />
    })
    return (
        <div className={''}>
            {transactionItemsElements}
            {canShowMore &&
                <div className={'flex justify-center mt-3'}>
                    <div className={'bg-primary text-white rounded-3xl cursor-pointer flex w-fit '}
                         onClick={() => setShownUserAmount(shownUserAmount + userStepAmount)}
                    >
                        <Button className={'hover:bg-primary-darker'} Icon={RotateCcw}>Show More </Button>
                    </div>
                </div>}
        </div>
    )
}