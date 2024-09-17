'use client'
import React, {FC, InputHTMLAttributes, memo} from "react";
import {X} from "lucide-react";
import {InfoWindow} from "@/components/screens/info/InfoWindow";
import cn from "clsx";

interface Props extends InputHTMLAttributes<HTMLButtonElement> {
    disableForm: () => void
    title?: string
    children?: React.ReactNode
    infoTitle?: string
    infoText?: string
}

export const FormFrame: FC<Props> = memo(({disableForm, title, children, infoTitle, infoText, className}) => {
    return <>
        <div className={cn(className, 'bg-white dark:bg-bang fixed top-1/2 left-1/2 z-20 rounded-3xl overflow-hidden min-w-96 w-96 select-none')}
             style={{transform: 'translate(-50%, -50%)'}}
        >
            <div className={'w-full h-16 px-5 flex justify-between items-center mb-3 relative'}>
                <div className={'text-xl font-bold flex'}>
                    <div className={'mr-2 '}>{title}</div>
                    {infoText && infoTitle &&
                        <InfoWindow title={infoTitle} bodyText={infoText}/>
                    }
                </div>

                <button onClick={disableForm}>
                    <X className={'w-7 h-7 text-black/50 hover:text-black dark:text-white/70 dark:hover:text-white'}/>
                </button>
            </div>
            <div className={'px-5 pb-5'}>
                {children}
            </div>
        </div>
        <div className={'fixed top-0 left-0 w-screen h-screen bg-black/30 z-10'}
             onClick={disableForm}/>
    </>
})