import Image from "next/image";
import peopleBg from "../../../../public/peopleBg.png";
import React, {InputHTMLAttributes, memo, useRef, useState} from "react";
import {Files, LucideIcon} from "lucide-react";
import cn from "clsx";
import {referralBonusAmount} from "@/constants/referralBonusAmount";
import {currency} from "@/constants/currency";

interface Props extends InputHTMLAttributes<HTMLButtonElement> {
    referralCode: string
}

export const CurrentReferral = memo(({className, referralCode}: Props) => {
    const [copyTextShown, setCopyTextShown] = useState(false)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    function handleClick() {
        navigator.clipboard.writeText(referralCode)
        setCopyTextShown(true)
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(() => setCopyTextShown(false), 1000)
    }
    return <>
        <div className={cn(className, 'w-72 min-w-72 relative rounded-3xl bg-black overflow-hidden h-48')}>
            <Image src={peopleBg} alt={''} className={'opacity-50 h-[63%]'} priority={true}/>
            <div className={'absolute top-0 bottom-0 left-0 right-0 px-4 pt-20'}>
                <div className={'text-white text-center mb-4 text-sm'}>
                    Invite a friend with code below and redeem special bonus {referralBonusAmount} {currency} from us!
                </div>
                <div className={'bg-grey rounded-full flex p-1 justify-between  items-center'}>
                    <div className={'ml-5 text-white h-fit text-sm'}>{referralCode}</div>
                    <button
                        className={`relative w-9 h-9 rounded-full bg-black hover:bg-black/50 flex justify-center items-center cursor-pointer`}
                        onClick={handleClick}
                    >
                        {copyTextShown && <div className={'absolute -top-9 bg-darkGrey text-tertiary p-2 rounded-lg text-xs'}>
                            Copied!
                        </div>}
                        <Files color={'#fff'} size={17}/>
                    </button>

                </div>
            </div>
        </div>
    </>
})