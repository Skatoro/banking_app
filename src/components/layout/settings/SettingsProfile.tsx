'use client'

import {Loader} from "@/components/ui/loader/Loader";
import React from "react";
import {userStore} from "@/store/user";
import {SettingItem} from "@/components/screens/settings/SettingItem";
import ChangeProfilePicture from "@/components/screens/settings/settingItems/ChangeProfilePicture";

export default function SettingsProfile() {
    const userInitialized = userStore((state: any) => state.userInitialized)
    return (<>
            <div className={'h-full'}>
                {userInitialized
                    ? <div>
                        <SettingItem> <ChangeProfilePicture/> </SettingItem>
                    </div>
                    : <div className={'h-full'}><Loader size={50}/></div>}
            </div>
        </>
    )
}