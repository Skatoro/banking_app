import Image from "next/image";
import {FC,} from "react";
import {CvvButton} from "@/components/screens/cards/currentCard/cvvButton/CvvButton";
import {CardNumber} from "@/components/screens/cards/currentCard/cardNumber/CardNumber";

interface Props {
    cardNumber: string;
    cardCvv: string;
    cardName: string | undefined;
    paymentNetworkImage: any
    cardExpYear?: string
    cardExpMonth?: string
}

export const CardInterface: FC<Props> = (
    {cardNumber, cardCvv, cardName, paymentNetworkImage, cardExpYear, cardExpMonth}) => {
    return (<>
        <div className={'flex flex-col justify-between h-full'}>
            <div className={'flex justify-between '}>
                <div>{cardName}</div>
                <Image src={paymentNetworkImage} alt={'mastercardLogo'} className={'w-8 select-none'}/>
            </div>
            <div className={'flex justify-between items-center relative select-none mb-8'}>
                <div>
                    <CardNumber cardNumber={cardNumber}/>
                    {cardExpYear && cardExpMonth
                        && <div className={'flex justify-end'}>
                            {cardExpYear} / {cardExpMonth}
                        </div>}
                </div>
                <CvvButton cvv={cardCvv}/>
            </div>
        </div>
    </>)
}