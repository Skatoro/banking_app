import React, {useEffect, useRef, useState} from "react";
import Image from "next/image";
import peopleBg1 from "../../../../public/peopleBg1.png";
import peopleBg2 from "../../../../public/peopleBg2.png";
import {referralBonusAmount} from "@/constants/referralBonusAmount";
import {Send} from "lucide-react";
import {currency} from "@/constants/currency";
import {changeBalance, getAllUserCards, getUserByReferral, setReferralActivated} from "@/api/api";
import {userStore} from "@/store/user";
import {cardsStore} from "@/store/cards";

export const EnterReferral = () => {
    const user = userStore((state: any) => state.user)
    const updateUser = userStore((state: any) => state.updateUser)
    const referralActivated = user.has_referral_activated

    const activeCard = cardsStore((state: any) => state.active)
    const cards = cardsStore((state: any) => state.cards)
    const currentCard = cards[activeCard]

    const [inputValue, setInputValue] = useState<string>('')
    const [clicked, setClicked] = useState<boolean>(false)
    const [disabled, setDisabled] = useState<boolean>(false)

    const [operationMessage, setOperationMessage] = useState<string>('')
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (clicked) {
            handleClick()
            setClicked(false)
        }

        async function handleClick() {
            if (disabled) return
            setDisabled(true)
            if (user.referral_code === inputValue) {
                setOperationMessage('You cannot activate your own referral code')
                return handleUnmount()
            }
            if (referralActivated) {
                setOperationMessage('Referral code has already been activated on this account')
                return handleUnmount()
            }

            const referralUser = await getUserByReferral(inputValue);
            if (!referralUser) {
                setOperationMessage('Referral code not found')
                return handleUnmount()
            }

            const cardArray = await getAllUserCards(referralUser.id);
            if (!cardArray || cardArray.length === 0) {
                setOperationMessage('This user does not have any cards')
                return handleUnmount()
            }

            const [activationError, referralBalanceChangeError, userBalanceChangeError] = await Promise.all([
                setReferralActivated(user.id),
                changeBalance(referralBonusAmount, cardArray[0].id),
                changeBalance(referralBonusAmount, currentCard.id)
            ]);
            if (!activationError && !referralBalanceChangeError && !userBalanceChangeError) {
                setOperationMessage('Successful!')
                updateUser({has_referral_activated: true})
                return handleUnmount()
            }
            setOperationMessage('Unexpected error')
            handleUnmount()
        }

        function handleUnmount() {
            setDisabled(false)
            if (timeoutRef.current) clearTimeout(timeoutRef.current)
            timeoutRef.current = setTimeout(() => setOperationMessage(''), 3000)
        }
    }, [clicked]);


    return <>
        <div
            className={`w-72 min-w-72 relative rounded-3xl bg-black overflow-hidden h-48 flex flex-col`}>
            <div className={'flex h-full'}>
                <Image src={peopleBg1} alt={''} className={'opacity-50 h-full mr-9'} priority={true}/>
                <Image src={peopleBg2} alt={''} className={'opacity-50 h-full'} priority={true}/>
            </div>
            <div className={'absolute top-0 bottom-0 left-0 right-0 px-4 pt-20'}>
                <div className={'text-white text-center mb-4 text-sm'}>
                    Enter your friend`s code below to redeem special bonus {referralBonusAmount} {currency} from us!
                </div>
                <div className={'bg-grey rounded-full flex p-1 justify-between  items-center relative'}>
                    {operationMessage &&
                        <div className={'absolute left-0 right-0 bottom-12 flex justify-center'}>
                            <div className={'bg-darkGrey p-2 text-tertiary rounded-lg text-xs'}>
                                {operationMessage}
                            </div>
                        </div>}
                    <input className={'ml-5 text-white h-fit text-sm bg-[transparent] outline-0'}
                           placeholder={'Enter code'} onChange={(e: any) => setInputValue(e.target.value)}
                    />
                    <button
                        className={`relative w-9 h-9 rounded-full bg-black hover:bg-black/50 flex justify-center items-center cursor-pointer`}
                        onClick={() => setClicked(true)}
                    >
                        <Send color={'#fff'} size={17} className={'mr-[2px] mt-[2px]'}/>
                    </button>

                </div>
            </div>
        </div>
    </>
}