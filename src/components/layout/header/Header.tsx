'use client'
import {userStore} from "@/store/user";
import {HeaderProfile} from "@/components/layout/header/headerProfile/HeaderProfile";
import {HeaderTabs} from "@/components/layout/header/HeaderTabs";
import {HeaderLogo} from "@/components/layout/header/HeaderLogo";

export function Header() {
    const userInitialized = userStore((state: any) => state.userInitialized)

    return (<>
        {userInitialized && <header>
            <div className={'flex h-16 my-5 max-w-338 w-full '}>
                <div className={'min-w-100 flex select-none '}>
                    <HeaderLogo/>
                    <HeaderProfile/>
                </div>
                <HeaderTabs/>
            </div>
        </header>}

    </>)
}