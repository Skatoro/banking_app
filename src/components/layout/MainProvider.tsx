'use client'

import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {type PropsWithChildren, useEffect} from 'react'
import {cardsStore} from "@/store/cards";
import {userStore} from "@/store/user";
import {subscribeCards} from "@/utils/globalFunctions/subscribeCards";
import {subscribeUser} from "@/utils/globalFunctions/subscribeUser";
import InitializationPage from "@/components/layout/InitializationPage";
import {IUser} from "@/types/user.types";
import {ICard} from "@/types/card.types";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity,
        },
    },
})

export default function MainProvider({children}: PropsWithChildren<unknown>) {
    const fetchCards = cardsStore((state: any) => state.fetchCards)
    const updateCards = cardsStore((state: any) => state.updateCards)

    const userInitializationFinished = userStore((state: any) => state.initializationFinished)
    const user = userStore((state: any) => state.user)
    const updateUser = userStore((state: any) => state.updateUser)
    const fetchUser = userStore((state: any) => state.fetchUser)

    useEffect(() => {
        fetchUser().then((user: IUser) => {
            if (!!user) {
                subscribeUser(user, updateUser)
                fetchCards(user.id).then((cards: ICard[]) => {
                    if (!!cards) {
                        subscribeCards(cards, updateCards)
                    }
                })
            }
        })
    }, []);
    useEffect(() => {
        if (user.settings.nightMode) {
            document.body.classList.add('dark')
        } else {
            document.body.classList.remove('dark')
        }
    }, [user.settings.nightMode]);
    return (
        <div className={'relative'}>
            {!userInitializationFinished && <InitializationPage/>}
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>

        </div>
    )
}
