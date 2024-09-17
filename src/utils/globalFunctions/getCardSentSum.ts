import {ITransaction} from "@/types/transaction.types";

export function getCardSentSum(transactions: ITransaction[]) {
    if (!transactions) return 0;

    let sent = 0;
    transactions.forEach(transaction => {
        if (!transaction.received) {
            sent += transaction.amount
        }
    })
    return sent
}