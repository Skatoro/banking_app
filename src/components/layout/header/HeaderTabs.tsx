'use client'

import {FC, useState} from "react";
import {HeaderTab} from "@/components/layout/header/HeaderTab";
import {headerTabsData} from "@/constants/headerTabsData";
import {headerStore} from "@/store/header";

interface Props {
}

export const HeaderTabs: FC<Props> = ({}) => {
    const setActiveTabName = headerStore((state: any) => state.setActiveTabName)
    const activeTab = headerStore((state: any) => state.activeTab)

    const tabsElements = headerTabsData.map((tab) => {
        const isSelected = activeTab === tab.title
        return <HeaderTab
            key={tab.title}
            isSelected={isSelected}
            title={tab.title}
            address={tab.address}
            onClick={() => setActiveTabName(tab.title)}
        />
    })
    return (<>
        <div className={'min-w-142 bg-white dark:bg-bang rounded-3xl w-full flex justify-center'}>
            <div className={'flex justify-between items-center w-11/12 select-none'}>
                {tabsElements}
            </div>
        </div>
    </>)
}