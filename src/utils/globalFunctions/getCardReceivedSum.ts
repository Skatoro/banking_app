import {ITransaction} from "@/types/transaction.types";

export function getCardReceivedSum(transactions: ITransaction[]) {
    if (!transactions) return 0;
    let received = 0;
    transactions.forEach(transaction => {
        if (transaction.received) {
            received += transaction.amount
        }
    })
    return received
}