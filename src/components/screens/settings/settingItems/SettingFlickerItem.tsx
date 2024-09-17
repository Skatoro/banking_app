import React, {FC, memo, useEffect, useRef, useState} from "react";
import {Flicker} from "@/components/ui/flicker/Flicker";
import {useDebounce} from "@/hooks/useDebounce";
import {changeBalance, updateUserSettings} from "@/api/api";

interface Props {
    userId: string
    active: boolean
    title: string
    bodyText: string
    attributeName: string
}

export const SettingFlickerItem:FC<Props> = memo(({userId, active, title, bodyText, attributeName}) => {
    const [isActive, setIsActive] = useState(active)
    const flickerTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // to prevent unnecessary server queries
    const startTimeout = () => {
        if (flickerTimeoutRef.current) {
            clearTimeout(flickerTimeoutRef.current);
        }
        flickerTimeoutRef.current = setTimeout(() => {
            updateUserSettings(userId, !isActive, attributeName)
        }, 500);
    };

    function handleClick() {
        startTimeout()
        setIsActive(!isActive)
    }


    return (<>
            <div className={'flex justify-between items-center h-full'}>
                <div>
                    <div className={'text-lg font-bold'}>
                        {title}
                    </div>
                    <div>
                        {bodyText}
                    </div>
                </div>
                <div className={'flex items-center'}>
                    <Flicker active={isActive} onClick={handleClick} flickerSize={'md'}/>
                </div>
            </div>
        </>
    )
})