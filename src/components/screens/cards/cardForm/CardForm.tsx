'use client'
import {FC, memo, useEffect, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {Field} from "@/components/ui/field/Field";
import {generateCardNumber} from "@/utils/globalFunctions/generateCardNumber";
import {splitCardNumber} from "@/utils/globalFunctions/splitCardNumber";
import mastercardLogo from "../../../../../public/mastercardLogo.svg";
import visaLogo from "../../../../../public/visaLogo.svg";
import {createCard} from "@/api/api";
import {Flicker} from "@/components/ui/flicker/Flicker";
import {ICardFormState, Props} from "@/components/screens/cards/cardForm/cardForm.types";
import {cardsStore} from "@/store/cards";
import {handleDigitInput} from "@/utils/globalFunctions/handleDigitInput";
import {userStore} from "@/store/user";
import {ICard} from "@/types/card.types";
import {subscribeCards} from "@/utils/globalFunctions/subscribeCards";


export const CardForm: FC<Props> = memo(({setShownCardForm, ownerName}) => {
    const [paymentNetwork, setPaymentNetwork] = useState('mastercard');
    const [isFlickerActive, setIsFlickerActive] = useState(false);
    const [cardNumber, setCardNumber] = useState(splitCardNumber(generateCardNumber(paymentNetwork)));
    const fetchCards = cardsStore((state: any) => state.fetchCards)
    const user = userStore((state: any) => state.user)
    const updateCards = cardsStore((state: any) => state.updateCards)

    const {register, handleSubmit, formState: {errors}, setError} = useForm<ICardFormState>({
        mode: 'onSubmit',
    })
    useEffect(() => {
        setCardNumber(splitCardNumber(generateCardNumber(paymentNetwork)))
    }, [paymentNetwork]);

    useEffect(() => {
        setPaymentNetwork(isFlickerActive ? 'visa' : 'mastercard')
    }, [isFlickerActive]);



    const onSubmit: SubmitHandler<ICardFormState> = async (data) => {
        const cardData = {
            balance: '10000' as string,
            pin: data.pin,
            cvv: data.cvv,
            expiration_month: data.expiration_month,
            expiration_year: data.expiration_year,
            name: ownerName as string,
            number: cardNumber.replace(/\s/g, "") as string,
            user_id: user.id,
            payment_network: paymentNetwork,
        }
        const error = await createCard(cardData)
        if (!error) {
            fetchCards(user).then((cards: ICard[]) => {
                if (!!cards) {
                    subscribeCards(cards, updateCards)
                }
            })
            setShownCardForm(false);
        } else {
            setError("name", {
                type: "manual",
                message: "Internal server error",
            })
        }
    }
    return (<>
        <form className={'bg-white dark:bg-bang'} onSubmit={handleSubmit(onSubmit)}>
            <div className={'justify-between '}>
                <div className={'mb-3 '}>
                    Card number
                    <div className={'relative'}>
                        <Field {...register('number')} disabled={true} value={cardNumber}/>
                        <button onClick={() => setCardNumber(splitCardNumber(generateCardNumber(paymentNetwork)))}
                                type={'button'}
                                className={'absolute right-0 bottom-0 h-full w-24 bg-primary hover:bg-primary-darker rounded-r flex items-center justify-center text-white text-sm'}
                        >
                            Randomize
                        </button>
                    </div>
                </div>
                <div className={'mb-6'}>
                    Card name
                    <Field {...register('name')} disabled={true} value={ownerName}/>
                </div>
                <div className={'mb-6'}>
                    <Field {...register('pin', {
                        required: true,
                        minLength: {
                            value: 4,
                            message: 'Should be 4 characters long'
                        }
                    })}
                           type={'tel'} maxLength={4} onInput={handleDigitInput}
                           placeholder={'PIN'} error={errors.pin}/>
                </div>
                <div className={'mb-6 flex items-center'}>
                    <Field className={'!w-1/2 mr-6'}
                           {...register('cvv', {
                                   required: true,
                                   minLength: {
                                       value: 3,
                                       message: 'Should be 3 characters long'
                                   }
                               }
                           )}
                           type={'tel'} maxLength={3} onInput={handleDigitInput}
                           placeholder={'CVV'} error={errors.cvv}/>
                    <div className={'flex justify-center items-center !w-1/2'}>
                        <Flicker leftIcon={mastercardLogo} rightIcon={visaLogo}
                                 active={isFlickerActive} onClick={() => setIsFlickerActive(!isFlickerActive)}/>
                    </div>
                </div>
                <div className={'flex items-center mb-6'}>
                    <Field className={'!w-1/2'} placeholder={'MM'} error={errors.expiration_month}
                           {...register('expiration_month', {
                               required: true,
                               max: {
                                   value: 12,
                                   message: 'Month should not exceed 12'
                               },
                               min: {
                                   value: 1,
                                   message: 'Month is too low'
                               },
                           })}
                           type={'tel'} maxLength={2} onInput={handleDigitInput}/>
                    <div className={'text-xl w-6 text-center'}>/</div>
                    <Field className={'!w-1/2'} placeholder={'YY'} error={errors.expiration_year}
                           {...register('expiration_year', {
                               required: true,
                               min: {
                                   value: new Date().getFullYear() - 1997,
                                   message: 'Year is too low',
                               }
                           })}
                           type={'tel'} maxLength={2} onInput={handleDigitInput}/>
                </div>
            </div>
            <div className={'flex justify-end'}>
                <input type={"submit"} value={"Create"}
                       className={'bg-primary hover:bg-primary-darker rounded-3xl text-white px-5 py-2 cursor-pointer'}/>
            </div>
        </form>
    </>)
})