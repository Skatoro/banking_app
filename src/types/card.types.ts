import {ITransaction} from "@/types/transaction.types";

export interface ICard {
    id: string,
    balance: string,
    pin: string,
    cvv: string,
    name: string
    number: string,
    transfer_limit: string,
    expiration_month: string,
    expiration_year: string,
    payment_network: string,
    transactions: ITransaction[],
    user_id: string,
    blocked: boolean,
}