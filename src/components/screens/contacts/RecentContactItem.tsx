'use client'
import React, {FC, memo} from "react";
import {Loader} from "@/components/ui/loader/Loader";
import {shortenName} from "@/utils/globalFunctions/shortenName";
import styles from './RecentContactItem.module.scss'
import {ProfilePicture} from "@/components/ui/profilePicture/ProfilePicture";
import {IUser} from "@/types/user.types";

interface Props {
    user: IUser
    isLast?: boolean
}
export const RecentContactItem: FC<Props> = memo(({user, isLast = false}) => {
    return (<div className={`select-none w-16 box-border   ${!isLast && 'mr-3'}`}>
            {!user
                ? <div className={'h-21'}>
                    <Loader size={40}/>
            </div>
                : <div className={`relative ${styles.hoverParent}`}>
                    <ProfilePicture user={user} />
                    <div className={`text-center  w-full h-5 `}>
                        <div className={'font-bold text-sm overflow-hidden whitespace-nowrap text-ellipsis'} >
                            {shortenName(user.full_name)}
                        </div>
                    </div>
                    <div className={`bg-darkGrey after:bg-darkGrey dark:bg-secondary dark:after:bg-secondary text-sm text-white dark:text-black dark:font-bold absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap ${styles.fullName}`}>
                        {user.full_name}
                    </div>
                </div>}
        </div>

    )
})