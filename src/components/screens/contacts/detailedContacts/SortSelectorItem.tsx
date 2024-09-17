import React, {FC, InputHTMLAttributes} from "react";
import {LucideProps} from "lucide-react";
import cn from "clsx";

interface Props extends InputHTMLAttributes<HTMLElement> {
    Icon: React.FC<LucideProps>;
    text: string
    active?: boolean
}

export const SortSelectorItem: FC<Props> = ({Icon, text, active, onClick}) => {

    return (<>
            <div className={cn('flex p-2  cursor-pointer',
                active
                    ? 'bg-primary'
                    : 'bg-white dark:bg-bang hover:bg-secondary dark:hover:bg-bang1Darker')}
                style={{boxShadow: '0 3px 12px 0 rgba(0,0,0,0.1),0 1px 2px 0 rgba(0,0,0,0.08)'}}
                onClick={onClick}
            >
                <Icon className={`mr-2 ${active && 'text-white'}`}/>
                <div className={`text-nowrap ${active ? 'text-white' : ' text-black dark:text-white'}`}>{text}</div>
            </div>
        </>
    )
}