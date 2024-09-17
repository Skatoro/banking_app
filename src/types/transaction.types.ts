
export interface ITransaction {
    unformattedTime: number,
    formattedTime: string,
    received: boolean,
    recipientCardId: string,
    senderCardId: string,
    amount: number,
    transactionUserId: string,
    transactionUserName: string,
}