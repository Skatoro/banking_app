import {InputHTMLAttributes} from "react";
import {Loader} from "@/components/ui/loader/Loader";
import styles from './Button.module.scss';
import cn from "clsx";
import {LucideIcon} from "lucide-react";

interface IButton extends InputHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
    disabled?: boolean
    disabledStyle?: string
    Icon?: LucideIcon
}

export function Button(
    {
        isLoading = false,
        className,
        onClick,
        children,
        disabled,
        disabledStyle = '!bg-primary-lighter cursor-not-allowed',
        Icon,
    }: IButton) {

    return <>
        <button
            onClick={onClick}
            className={cn(styles.button, className, `${disabled && disabledStyle}`)}
            disabled={disabled}
        >
            {isLoading
                ? <Loader/>
                : <div className={Icon ? 'flex' : ''}>
                    <div className={Icon ? 'mr-3' : ''} style={{userSelect: 'none'}}>
                        {children}
                    </div>
                    {Icon && <Icon/>}
                </div>}
        </button>
    </>
}
