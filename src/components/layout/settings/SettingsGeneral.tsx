'use client'

import {Loader} from "@/components/ui/loader/Loader";
import React from "react";
import {userStore} from "@/store/user";
import {SettingItem} from "@/components/screens/settings/SettingItem";
import {SettingFlickerItem} from "@/components/screens/settings/settingItems/SettingFlickerItem";

export default function SettingsGeneral() {
    const userInitialized = userStore((state: any) => state.userInitialized)
    const user = userStore((state: any) => state.user)

    return (<>
            <div className={`h-full `}>
                {userInitialized
                    ? <div>
                        <SettingItem>
                            <SettingFlickerItem
                                active={user.settings.showDecimal}
                                userId={user.id}
                                attributeName={'showDecimal'}
                                bodyText={'Select if you want all transfer amounts, card accounts and other financial values to be shown with a value after the decimal point.'}
                                title={'Show decimal point'}
                            />
                        </SettingItem>
                        <SettingItem>
                            <SettingFlickerItem
                                active={user.settings.nightMode}
                                userId={user.id}
                                attributeName={'nightMode'}
                                bodyText={'Select if you want to switch to the night mode.'}
                                title={'Night mode'}
                            />
                        </SettingItem>
                        <SettingItem>
                            <SettingFlickerItem
                                active={user.settings.hideBalance}
                                userId={user.id}
                                attributeName={'hideBalance'}
                                bodyText={'Select if you dont want your balance and transaction amounts to be displayed. Random emoji would be displayed instead.'}
                                title={'Hide Balance'}
                            />
                        </SettingItem>
                    </div>
                    : <div className={'h-full'}><Loader size={50}/></div>}
            </div>
        </>
    )
}