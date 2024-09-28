'use client'

import {signIn} from '@/app/(auth)/signin/actions';
import {signUp} from '@/app/(auth)/signup/actions';
import {Field} from "@/components/ui/field/Field";
import {AtSign, KeyRound, User} from "lucide-react";
import {Button} from "@/components/ui/button/Button";
import styles from './Auth.module.scss'
import cn from "clsx";
import Link from "next/link";
import {IAuthFormState} from "@/components/screens/auth/auth.types";
import {SubmitHandler, useForm} from "react-hook-form";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {capitalizeWords} from "@/utils/globalFunctions/capitilizeWords";
import {getRandomBgColor} from "@/utils/globalFunctions/getRandomBgColor";
import {userStore} from "@/store/user";
import {generateReferralCode} from "@/utils/globalFunctions/generateReferralCode";
import {subscribeUser} from "@/utils/globalFunctions/subscribeUser";
import {subscribeCards} from "@/utils/globalFunctions/subscribeCards";
import {cardsStore} from "@/store/cards";

interface IAuth {
    type?: 'Login' | 'Register',
}

export default function Auth({type}: IAuth) {
    const updateUser = userStore((state: any) => state.updateUser)
    const fetchUser = userStore((state: any) => state.fetchUser)
    const userInitialized = userStore((state: any) => state.userInitialized)

    const updateCards = cardsStore((state: any) => state.updateCards)
    const fetchCards = cardsStore((state: any) => state.fetchCards)

    const router = useRouter();
    const {register, handleSubmit} = useForm<IAuthFormState>({
        mode: 'onChange'
    })
    const [errorMessage, setErrorMessage] = useState<string | undefined>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    if (userInitialized) return

    const onSubmit: SubmitHandler<IAuthFormState> = async (data) => {
        setIsLoading(true);
        if (type === "Login") {
            const tempErrorMessage = await signIn(data);
            setErrorMessage(tempErrorMessage);
            if (!tempErrorMessage) {
                let fetchedUser = await fetchUser()
                if (!!fetchedUser) {
                    router.push('/')
                    subscribeUser(fetchedUser, updateUser)
                    let fetchedCards = await fetchCards(fetchedUser.id)
                    if (!!fetchedCards) subscribeCards(fetchedCards, updateCards)
                }
            }
        } else {
            data = { ...data,
                first_name: capitalizeWords(data.first_name),
                last_name: capitalizeWords(data.last_name),
                avatar_background: getRandomBgColor(),
                referral_code: generateReferralCode()
            };

            const tempErrorMessage = await signUp(data);
            if(tempErrorMessage === 'Email address not authorized') {
                setErrorMessage('Supabase(the Back-End handler) is not supporting registrations via email since 26 September 2024. Developer comment:`Currently this behavior is not supported and we\'ll be rolling out a fix for it during the first week of October.`')
            } else {
                setErrorMessage(tempErrorMessage)
            }

            if (!tempErrorMessage) {
                router.push('/signup/confirm')
            }
        }
        setIsLoading(false);
    }


    return (
        <div className={"flex w-screen h-screen bg-opacity-0"}>
            <form
                className={cn(styles.w156, 'w-96 m-auto block border dark:border-none p-8 text-center bg-white dark:bg-bang rounded-3xl')}
                onSubmit={handleSubmit(onSubmit)}
            >
                <h1 className={"mb-8"}>{type}</h1>
                {type === "Register" && <div>
                    <Field
                        {...register('first_name', {
                            required: true,
                        })}
                        placeholder={'First Name'} type={'first_name'} Icon={User} className={"mb-6"} maxLength={30}
                    />
                    <Field
                        {...register('last_name', {
                            required: true,
                        })}
                        placeholder={'Last Name'} type={'last_name'} Icon={User} className={"mb-6 "} maxLength={30}
                    />
                </div>}
                <Field
                    {...register('email', {
                        required: true,
                    })}
                    placeholder={'Email'} type={'email'} Icon={AtSign} className={"mb-6"}
                />
                <Field
                    {...register('password', {
                        required: true,
                    })}
                    placeholder={'Password'} type={'password'} Icon={KeyRound} className={`${!errorMessage ? 'mb-6' : 'mb-2'}`}
                />
                <div className={'text-start text-red-600 text-xs ml-10'}>{errorMessage}</div>
                <div className={"flex justify-end items-center"}>
                    {type == 'Login'
                        ? <Link href={'/signup'} className={styles.link}>Create account</Link>
                        : <Link href={'/signin'} className={styles.link}>Already have an account?</Link>
                    }
                    <Button
                        className={"mx-10 bg-primary hover:bg-primary-darker"}
                        isLoading={isLoading}
                        disabled={isLoading}
                        type={"submit"}
                    >
                        {type}
                    </Button>
                </div>
            </form>
        </div>
    )
}