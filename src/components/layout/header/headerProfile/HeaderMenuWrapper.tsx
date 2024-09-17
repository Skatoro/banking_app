
import React, {Dispatch, FC, SetStateAction, useEffect, useRef} from "react";
import {useHandleOutsideClick} from "@/hooks/useHandleOutsideClick";
import {HeaderMenuItem} from "@/components/layout/header/headerProfile/HeaderMenuItem";
import {Settings} from "lucide-react";
import {LogOut} from "lucide-react";
import {headerStore} from "@/store/header";
import useClearStore from "@/hooks/useClearStore";
import {signOut} from "@/app/(auth)/signout/actions";

interface Props {
    setIsMenuActive: Dispatch<SetStateAction<boolean>>
}

export const HeaderMenuWrapper: FC<Props> = ({setIsMenuActive}) => {
    const clearStore = useClearStore()
    const menuRef = useRef(null)
    const setActiveTabName = headerStore((state: any) => state.setActiveTabName)
    
    let isClickedOutside = useHandleOutsideClick(menuRef)
    useEffect(() => {
        if (isClickedOutside) setIsMenuActive(false)
    }, [isClickedOutside]);

    return (<>
        <div className={'absolute overflow-hidden w-full bg-white dark:bg-bang left-0 top-15 ' +
            'z-20 rounded-b-3xl border-2 border-x-stone-500 border-b-stone-500 border-t-0'}
            ref={menuRef}
        >
            <HeaderMenuItem
                Icon={Settings}
                title={'Settings'}
                pushTo={'/settings/profile'}
                onClick={() => {
                    setActiveTabName('Settings')
                    setIsMenuActive(false)
                }}
            />
            <HeaderMenuItem
                Icon={LogOut}
                title={'Sign out'}
                onClick={() => {
                    signOut().then(clearStore)
                }}
            />
        </div>
    </>)
}