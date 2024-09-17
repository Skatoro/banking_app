import {FC, InputHTMLAttributes} from "react";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import {Check} from "lucide-react";
import questionMarkBlack from "../../../../../public/questionMarkBlack.svg";
import mastercardLogo from "../../../../../public/mastercardLogo.svg";
import visaLogo from "../../../../../public/visaLogo.svg";
import Image from "next/image";

interface Props extends InputHTMLAttributes<HTMLElement> {
    selected: boolean
    cardNumber: string
    payment_network: string
}

export const CardSelectorItem: FC<Props> = ({selected, cardNumber, onClick, payment_network}) => {
    let paymentNetworkImage = questionMarkBlack;
    if (payment_network === 'mastercard') paymentNetworkImage = mastercardLogo
    if (payment_network === 'visa') paymentNetworkImage = visaLogo

    return (<>
        <div
            className={`bg-white hover:bg-secondary dark:bg-bang dark:hover:bg-bang1Darker select-none flex items-center p-3 cursor-pointer `}
            style={{boxShadow: '0 3px 12px 0 rgba(0,0,0,0.1),0 1px 2px 0 rgba(0,0,0,0.08)'}}
            onClick={onClick}
        >
            <div className={'mr-3 flex w-48'}>
                <Image src={paymentNetworkImage} alt={'logo'} className={'w-6 h-6 mr-4 select-none'}/>
                <div >{cardNumber}</div>
            </div>
            <div className={'border-[2px] w-4 h-4 border-gray-500 dark:border-black rounded-sm overflow-hidden '}>
                {selected && <div className={'bg-primary w-full h-full flex justify-center items-center'}>
                    <Check strokeWidth={5} size={9} color={'#fff'} className={'mt-[1px]'}/>
                </div>}
            </div>
        </div>
    </>)
}