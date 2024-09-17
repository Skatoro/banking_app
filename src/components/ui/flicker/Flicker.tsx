import {FC, InputHTMLAttributes, memo} from "react";
import Image from "next/image";
import cn from "clsx";
import {StaticImport} from "next/dist/shared/lib/get-img-props";

interface Props extends InputHTMLAttributes<HTMLElement> {
    leftIcon?: string
    rightIcon?: string
    active: boolean
    flickerSize?: string
}

export const Flicker: FC<Props> = memo(({leftIcon, rightIcon, active, onClick, className, flickerSize = 'md'}) => {
    let flickerClass;
    let circleClass;
    let circleMove;
    if (flickerSize === 'md') {
        flickerClass = 'h-7 w-12'
        circleClass = 'w-5'
        circleMove = 'translate-x-5'
    }
    if (flickerSize === 'lg') {
        flickerClass = 'h-9 w-16'
        circleClass = 'w-7'
        circleMove = 'translate-x-7'
    }
    if (flickerSize === '3xl') {
        flickerClass = 'h-10 w-24'
        circleClass = 'w-8'
        circleMove = 'translate-x-14'
    }

    return (<>
        {leftIcon && <Image src={leftIcon} alt={'leftBrandName'} className={'h-7 w-9'}/>}
        <button
            className={cn('rounded-full mx-3 relative overflow-hidden box-content ',
                active
                    ? 'bg-flickerActive dark:bg-flickerDarkActive'
                    : 'bg-flicker dark:bg-flickerDark', className, flickerClass)}
            onClick={onClick} type={'button'} tabIndex={-1}
        >
            <div
                className={cn(`absolute bg-flickerCircle dark:bg-flickerDarkCircle ease-in-out top-1 bottom-1 left-1 rounded-3xl duration-200`,
                    active && circleMove, circleClass)}
            />
        </button>
        {rightIcon && <Image src={rightIcon} alt={'rightBrandName'} className={'h-5 w-12'}/>}
    </>)
})