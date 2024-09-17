'use client'
import React, {FC, InputHTMLAttributes, memo} from "react";
import {ProfilePicture} from "@/components/ui/profilePicture/ProfilePicture";
import {IUser} from "@/types/user.types";

interface Props extends InputHTMLAttributes<HTMLElement> {
    number: string
    isActive: boolean
    user: IUser
}

export const SearchCardItem: FC<Props> = memo(({number, onClick, user, isActive}) => {
    if (!user) return
    return (<>
        <div
            onClick={onClick}
            className={`p-3 cursor-pointer select-none
            ${isActive ? 'bg-black/15 dark:bg-black/45' : 'hover:bg-black/5 dark:hover:bg-black/20'}`}

        >
            <div className={'flex items-center'}>
                <div className={'mr-3'}>
                    <ProfilePicture user={user} size={'sm'} />
                </div>
                <div className={'text-ellipsis'}>
                    <div className={'mr-5'}>
                        {user.full_name}
                    </div>
                    <div>
                        {number}
                    </div>
                </div>
            </div>
        </div>
    </>)
})