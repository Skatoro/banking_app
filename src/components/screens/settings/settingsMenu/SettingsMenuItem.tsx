'use client'

import React, {FC} from "react";
import {usePathname, useRouter} from "next/navigation";
import {LucideProps} from "lucide-react";
import cn from "clsx";

interface Props {
    title: string
    Icon?: React.FC<LucideProps>
    redirectURL: string
}

export const SettingsMenuItem: FC<Props> = ({redirectURL, title, Icon}) => {
    const router = useRouter()
    const pathname = usePathname()

    const active = pathname.startsWith(redirectURL)
    return (<div className={'hover:bg-grey/5 dark:hover:bg-bang1/40 rounded-xl overflow-hidden'}>
            <div
                className={cn(active && 'bg-grey/10 dark:bg-bang1/70', 'flex -darker px-4 py-3  cursor-pointer select-none')}
                onClick={() => router.push(redirectURL)}
            >
                {Icon && <Icon/>}
                <div>{title}</div>
            </div>
        </div>
    )
}