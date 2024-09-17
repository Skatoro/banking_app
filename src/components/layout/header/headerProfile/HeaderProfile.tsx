'use client'

import {ProfilePicture} from "@/components/ui/profilePicture/ProfilePicture";
import {FC, useState} from "react";
import {IUser} from "@/types/user.types";
import {HeaderMenuWrapper} from "@/components/layout/header/headerProfile/HeaderMenuWrapper";
import {userStore} from "@/store/user";

interface Props {
}

export const HeaderProfile: FC<Props> = ({}) => {
    const user = userStore((state: any) => state.user)
    const firstName = user.full_name.split(' ')[0]
    const [isMenuActive, setIsMenuActive] = useState<boolean>(false)

    return (<>
        <div className={'mr-5 grow relative'}>
            <div
                className={`bg-white dark:bg-bang hover:bg-secondary-darker dark:hover:bg-bang1Darker flex items-center justify-between p-4 cursor-pointer border-2 h-full 
                ${isMenuActive
                    ? 'rounded-t-3xl border-t-stone-500 border-x-stone-500'
                    : 'rounded-3xl border-transparent'}`}
                onClick={() => setIsMenuActive(!isMenuActive)}
            >
                <div className={'flex items-center'}>
                    <div className={'mt-[2px]'}>Welcome back,&nbsp;</div>
                    <div
                        className={'text-secondary dark:text-secondary-lighter font-bold text-lg overflow-x-hidden text-ellipsis max-w-24 '}>
                        {firstName}!
                    </div>
                </div>
                <ProfilePicture user={user} size={'sm'}/>
            </div>
            {isMenuActive &&
                <HeaderMenuWrapper setIsMenuActive={setIsMenuActive}/>}
        </div>
    </>)
}