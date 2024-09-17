
export interface ICreateCardData {
    balance: string,
    pin: string,
    cvv: string,
    expiration_month: string,
    expiration_year: string,
    name: string,
    number: string,
    user_id: string,
    payment_network: string,
}
export interface IReceivedUsers {
    id: string,
    full_name: string
}