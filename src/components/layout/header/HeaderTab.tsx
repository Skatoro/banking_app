'use client'

import {FC, InputHTMLAttributes, memo} from "react";
import {usePathname, useRouter} from "next/navigation";

interface Props extends InputHTMLAttributes<HTMLElement> {
    isSelected: boolean
    title: string
    address: string
}

export const HeaderTab: FC<Props> = memo(({title, isSelected, address, onClick}) => {
    const router = useRouter();
    const pathname = usePathname()
    // 1.if page opened by header button - instantly indicates that tab is active
    // 2.if page opened by url - checks if current tab address matches pathname and then indicates whether tab is active
    // second option is a necessity, first one is for better user experience, so user won`t wait for full page load
    // before seeing that tab is selected
    const isPathnameMatches = address === '/'
        ? pathname === address
        : pathname.startsWith(address)
    const isActive = isSelected || isPathnameMatches
    function handleClick(e: any) {
        if (onClick) {
            onClick(e)
        }
        router.push(address)
    }

    return (<>
        <div className={`p-3 cursor-pointer text-center ${isActive ? 'font-bold ' : ''}`}
             style={{textShadow: `${isActive ? '#000 1px 0 50px' : ''}`}}
             onClick={handleClick}
        >
            {title}
        </div>
    </>)
})