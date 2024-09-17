import cn from 'clsx'
import {forwardRef, memo} from "react";

import styles from './Filed.module.scss'
import {TypeInputProps} from "@/components/ui/field/field.types";

 const FieldMemo = forwardRef<HTMLInputElement, TypeInputProps>(
    ({error, style, Icon, className, disabled, autoFocus, isSmall, maxLength, textCentered, ...rest}, ref) => {
        return (
            <label className={cn('group' ,styles.field, className)} style={style} >
                {Icon && (
                    <div className={cn(styles.icon, 'group-focus-within:text-black dark:group-focus-within:text-white')}>
                        <Icon/>
                    </div>
                )}

                <input
                    ref={ref} maxLength={maxLength ? maxLength : 1000}
                    disabled={disabled} autoFocus={autoFocus}
                    className={`${isSmall && '!p-1'} ${textCentered && 'text-center'} 
                    bg-secondary dark:bg-bang1`}
                    {...rest}
                />
                {error && <div className={`absolute -bottom-5 text-red-600 text-xs ${Icon ? 'left-9' : ''}`}>
                    {error.message}
                </div>}
            </label>
        )
    }
)
export const Field =  memo(FieldMemo);
