'use client'

import React from "react";
import {SettingsMenuItem} from "@/components/screens/settings/settingsMenu/SettingsMenuItem";
import {Settings, User} from "lucide-react";

export default function SettingsMenu() {
    return (<>
            <div className={'rounded-2xl border-2 border-[#dbdbdb] mr-5 p-3'}>
                <SettingsMenuItem title={'Profile'} redirectURL={'/settings/profile'} Icon={User}/>
                <SettingsMenuItem title={'General'} redirectURL={'/settings/general'} Icon={Settings}/>
            </div>
        </>
    )
}