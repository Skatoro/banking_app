import {Dispatch, SetStateAction} from "react";

export interface ICardFormState {
    pin: string;
    cvv: string;
    expiration_month: string;
    expiration_year: string;
    number: string;
    name: string;
    payment_network: string;
}
export interface Props {
    setShownCardForm: Dispatch<SetStateAction<boolean>>;
    ownerName: string | undefined;
}
