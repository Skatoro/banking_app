'use client'
import React, {FC, memo, useEffect, useRef, useState} from "react";
import styles from './BlockAnimation.module.scss'
import {LucideIcon} from "lucide-react";

interface Props {
    closed: boolean
    buttonTitle?: string
    buttonAction?: () => void
    Icon?: LucideIcon
}

export const BlockAnimation: FC<Props> = memo(({closed, buttonTitle, buttonAction, Icon}) => {
    const [isFirstRender, setIsFirstRender] = useState(true);
    const [prevClosed, setPrevClosed] = useState(closed);
    const openAnimationTime = 500;
    const closeAnimationTime = 800;
    const [finishedClosing, setFinishedClosing] = useState(closed)
    const [finishedOpening, setFinishedOpening] = useState(!closed)

    //to prevent early shadow and button unmount
    const [hasShadow, setHasShadow] = useState(closed)
    const [hasButton, setHasButton] = useState(closed)

    useEffect(() => {
        if (prevClosed !== closed) {
            setIsFirstRender(false);
            setPrevClosed(closed);
            if (closed) {
                setFinishedOpening(!closed)
                setTimeout(() => setFinishedClosing(closed), closeAnimationTime - 30) // small gap for computing time
            } else {
                setFinishedClosing(closed)
                setTimeout(() => setFinishedOpening(!closed), openAnimationTime)
            }
        }
    }, [closed, prevClosed]);

    useEffect(() => {
        if (closed) {
            setHasShadow(true)
            setTimeout(() => setHasButton(true), 1000)
        } else {
            setTimeout(() => setHasShadow(false), 1000)
            setHasButton(false)
        }

    }, [closed]);
    return (<>
            <div
                className={`absolute bg-[#2E2F31] border-b-[3px] border-b-[#1C1D1F] w-full top-0 z-30 left-0 flex justify-center items-center ` +
                    `${!isFirstRender && (closed ? styles.close : styles.open)} ` +
                    `${finishedOpening ? 'h-0 !border-0' : ''} ` +
                    `${finishedClosing ? 'h-1/2' : ''} `}
            >
                {hasButton && <button
                    className={'flex items-center p-4 pt-5 cursor-pointer select-none'}
                    onClick={buttonAction}
                >
                    <div className={'mr-3'}>{Icon && <Icon color={'#a72f30'}/>}</div>
                    <div>{buttonTitle}</div>
                </button>}
            </div>
            <div
                className={`absolute bg-[#2E2F31] border-t-[3px] border-t-[#3F4042] w-full bottom-0 z-30 left-0 ` +
                    `${!isFirstRender && (closed ? styles.close : styles.open)} ` +
                    `${finishedOpening ? 'h-0 !border-0' : ''} ` +
                    `${finishedClosing ? 'h-1/2' : ''} `}
            />
            <div
                className={`absolute top-0 left-0 right-0 z-20 ` +
                    `${!isFirstRender && (closed ? styles.closeShadow : styles.openShadow)} ` +
                    `${hasShadow ? 'bottom-0' : ''}`}
            />
        </>
    )
})