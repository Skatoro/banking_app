import {ChevronDown, LucideProps} from "lucide-react";
import React, {FC, InputHTMLAttributes, memo, PropsWithChildren, useEffect, useRef, useState} from "react";
import styles from './CardSettingItem.module.scss'
import {DropdownData} from "@/components/screens/cards/cardSettings/cardSettingItem/cardSettingItem.types";
import cn from "clsx";
import {useHandleOutsideClick} from "@/hooks/useHandleOutsideClick";

export interface Props extends InputHTMLAttributes<HTMLButtonElement> {
    text: string;
    Icon: React.FC<LucideProps>;
    DropdownContent?: FC<DropdownData>;
    disabledButton?: boolean
}

export const CardSettingItem: FC<Props> = memo(({text, Icon, DropdownContent, onClick, disabledButton}) => {
    const dropdownTime = 300;
    const [active, setActive] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [isClosing, setIsClosing] = useState(false)
    const [roundStyle, setRoundStyle] = useState('rounded-3xl');

    // cannot use useHandleOutsideClick because of identical refs of each settingItem
    function handleClick() {
        if (DropdownContent) {
            setDisabled(true);
            setTimeout(() => setDisabled(false), dropdownTime)
            if (!active) {
                setRoundStyle('rounded-t-3xl')
            } else {
                setRoundStyle('rounded-3xl')
                setTimeout(() => setIsClosing(false), dropdownTime)
                setIsClosing(true)
            }
            setActive(!active)
        }
    }

    return (
        <div className={'relative '}>
            <button
                onClick={onClick || handleClick} disabled={disabled || disabledButton}
                className={cn(`flex items-center py-3 px-2 w-full hover:bg-secondary dark:hover:bg-bang1 border-x-2 border-t-2`,
                    roundStyle, active || disabled ? 'bg-secondary dark:bg-bang1 border-stone-500' : 'border-transparent')}
            >
                {Icon && <div className={'bg-secondary dark:bg-bang1 p-2 rounded-3xl mr-4'}>
                    <Icon color={'#9d9d9d'}/>
                </div>}
                {text && <div className={'text-sm flex-grow justify-start flex'}>
                    <span>{text}</span>
                </div>}
                {DropdownContent &&
                    <ChevronDown className={cn(active ? styles.rotateIconActivate : styles.rotateIconDisable)}/>}
            </button>

            {DropdownContent && <>
                <div
                    className={cn(`absolute left-0 bg-secondary dark:bg-bang1 z-30 overflow-hidden w-full rounded-b-3xl`,
                        active ? 'max-h-96 border-x-2 border-b-2 border-stone-500' : 'max-h-0 ',
                        isClosing ? 'top-11 pt-5 border-x-2 border-b-2 border-stone-500' : 'top-16',
                        styles.dropdownAnimation)}
                >
                    <div className={'px-5 pb-5'}>
                        <DropdownContent isParentActive={active} dropdownTime={dropdownTime}/>
                    </div>
                </div>
            </>}
            {active && <button
                className={'w-screen h-screen fixed left-0 top-0 overflow-hidden z-20 cursor-default'}
                onClick={handleClick}
                disabled={disabled}
            />}

            {/*/Ужасный костыль, но я о нем узнал слишком поздно, чтобы переделывать всю архитектуру/*/}
            {/*/A terrible crutch, but I learned about it too late to redo the entire architecture/*/}
            {active && <div className={'w-[332px] h-[66px] rounded-t-3xl absolute top-0 z-30 cursor-pointer'}
                            onClick={handleClick}/>}
        </div>)
})