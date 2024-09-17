'use client'
import React, {FC, memo, useEffect, useRef, useState} from "react";
import {ICard} from "@/types/card.types";
import {currency} from "@/constants/currency";
import {Field} from "@/components/ui/field/Field";
import {Button} from "@/components/ui/button/Button";
import {ProfilePicture} from "@/components/ui/profilePicture/ProfilePicture";
import useUserByID from "@/hooks/useUserByID";
import {handleMoneyInput} from "@/utils/globalFunctions/handleMoneyInput";
import {useDebounce} from "@/hooks/useDebounce";
import {cardsStore} from "@/store/cards";
import {userStore} from "@/store/user";
import {prettifyBalance} from "@/utils/globalFunctions/prettifyBalance";
import {prettifyMoneyInput} from "@/utils/globalFunctions/prettifyMoneyInput";
import styles from './TransferForm.module.scss'
import {changeBalance} from "@/api/api";

interface Props {
    recipientCard: ICard
    personalCard: ICard
    disableForm: () => void
}

export const TransferForm: FC<Props> = memo(({recipientCard, personalCard, disableForm}) => {
    if (!recipientCard || !personalCard) return

    const user = userStore((state: any) => state.user)
    const recipientUser = useUserByID(recipientCard.user_id)
    const personalLimit = personalCard.transfer_limit
    const personalBalance = personalCard.balance

    const [transferAmount, setTransferAmount] = useState('')
    const debouncedTransferAmount = useDebounce(transferAmount, 700);
    const [formError, setFormError] = useState('')

    const [timerStarted, setTimerStarted] = useState(false)
    const submitTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const startTimeout = () => {
        setTimerStarted(true)
        submitTimeoutRef.current = setTimeout(() => {
            changeBalance(Number(transferAmount), recipientCard.id, personalCard.id, user)
            changeBalance(Number(-transferAmount), recipientCard.id, personalCard.id, recipientUser)
            disableForm()
        }, 5000);
    };

    const clearTimeoutHandler = () => {
        setTimerStarted(false)
        if (submitTimeoutRef.current) {
            clearTimeout(submitTimeoutRef.current);
        }
    };
    useEffect(() => {
        prettifyMoneyInput(transferAmount)
        if (Number(debouncedTransferAmount) > Number(personalLimit)) {
            setFormError('Transfer amount exceeds transfer limit')
        } else if (Number(debouncedTransferAmount) > Number(personalBalance)) {
            setFormError('Insufficient funds')
        } else if (Number(debouncedTransferAmount) < 0) {
            setFormError('The transfer amount must not be less than zero')
        } else {
            setFormError('')
        }
    }, [debouncedTransferAmount]);
    function onSubmit() {
        if (!formError) {
            startTimeout()
        }
    }

    return <>
        <div>
            <div className={'flex justify-center mb-7'}>
                <div className={'mr-3 '}>
                    <ProfilePicture user={recipientUser} size={'md'} />
                </div>
                <div className={'text-ellipsis flex items-center  text-3xl'}>
                    {recipientUser.full_name}
                </div>
            </div>
            <div>
                <div className={'mb-7 relative'}>
                    <div className={'flex justify-center '}>
                        <Field className={'bg-none text-center w-auto border-none outline-none text-xl !px-10'}
                               onInput={handleMoneyInput} value={prettifyMoneyInput(transferAmount)}
                               onChange={e => setTransferAmount(e.target.value)} maxLength={16}
                               placeholder={'Transfer amount'} isSmall={true} textCentered={true}/>
                    </div>
                    <div className={'flex justify-center text-red-500 absolute left-0 right-0'}>
                        {formError}
                    </div>
                </div>
                <div className={'flex justify-center mb-10'}>
                    Balance {prettifyBalance(personalBalance)} {currency}
                </div>
            </div>
            <div className={'flex'}>
                {timerStarted
                    ? <div className={'w-full'}>
                        <Button className={`bg-pink-lighter w-full !text-red-500 hover:bg-pink 
                        ${styles.cancelTransaction} `} onClick={clearTimeoutHandler}
                        >
                            Cancel transaction
                        </Button>
                    </div>
                    : <>
                        <Button className={'bg-primary w-1/2 mr-3 hover:bg-primary-darker'} onClick={onSubmit}
                                disabled={!Number(transferAmount)}>
                            Send
                        </Button>
                        <Button className={'bg-pink-lighter w-1/2 !text-red-500 hover:bg-pink'} onClick={disableForm}>
                            Cancel
                        </Button>
                    </>
                }
            </div>
        </div>
    </>
})