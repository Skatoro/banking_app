import Image from "next/image";
import {FC, memo,} from "react";
import {CvvButton} from "@/components/screens/cards/currentCard/cvvButton/CvvButton";
import {CardNumber} from "@/components/screens/cards/currentCard/cardNumber/CardNumber";
import {BadgePlus} from "lucide-react";
import {ICard} from "@/types/card.types";
import questionMarkWhite from '../../../../../public/questionMarkWhite.svg'
import mastercardLogo from '../../../../../public/mastercardLogo.svg'
import visaLogo from '../../../../../public/visaLogo.svg'
import {userStore} from "@/store/user";

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
                <Image src={paymentNetworkImage} alt={'mastercardLogo'} className={'w-6 h-6 mr-4 select-none'}/>
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