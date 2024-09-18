import React from "react";
import SettingsMenu from "@/components/screens/settings/settingsMenu/SettingsMenu";
import {getAuthUser} from "@/api/api";
import {redirect} from "next/navigation";

async function SettingsLayout ({children}: { children: React.ReactNode }) {
    const user = await getAuthUser();
    if (!user) redirect('/signin')
    return (

        <div className={'w-full max-w-338 rounded-3xl bg-white dark:bg-bang mb-5 flex'}>
            <div className={'p-10 w-full '}>
                <h2 className={'mb-5'}>Settings</h2>
                <div className={'flex'}>
                    <aside className={'w-80 min-w-80'}>
                        <SettingsMenu/>
                    </aside>
                    <div className={'grow'}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SettingsLayout;