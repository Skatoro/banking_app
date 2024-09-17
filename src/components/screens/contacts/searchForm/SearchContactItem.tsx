'use client'
import React, {FC, InputHTMLAttributes, memo} from "react";
import {ProfilePicture} from "@/components/ui/profilePicture/ProfilePicture";
import {IUser} from "@/types/user.types";

interface Props extends InputHTMLAttributes<HTMLElement> {
    isActive: boolean
    key: number
    user: IUser
}
export const SearchContactItem: FC<Props> = memo(({user, isActive, onClick}) => {


    return (<>
        <div
            onClick={onClick}
            className={`p-3  cursor-pointer select-none  
            ${isActive ? 'bg-black/15 dark:bg-black/45' : 'hover:bg-black/5 dark:hover:bg-black/20'}`}
        >
            <div className={'flex items-center'}>
                <div className={'mr-3'}>
                    <ProfilePicture user={user} size={'sm'} />
                </div>
                <div className={'text-ellipsis'}>{user.full_name}</div>
            </div>
        </div>
    </>)
})