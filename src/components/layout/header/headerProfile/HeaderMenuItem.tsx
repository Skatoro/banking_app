import React, {FC, InputHTMLAttributes} from "react";
import {LucideProps} from "lucide-react";
import {useRouter} from "next/navigation";

interface Props extends InputHTMLAttributes<HTMLElement> {
    Icon: React.FC<LucideProps>
    title: string
    pushTo?: string
}

export const HeaderMenuItem: FC<Props> = ({Icon, title, pushTo, onClick}) => {
    const router = useRouter();

    function handleClick(e: any) {
        onClick && onClick(e)
        pushTo && router.push(pushTo)
    }

    return (<>
        <div onClick={handleClick} className={'flex px-5 py-4 hover:bg-secondary dark:hover:bg-bang1Darker cursor-pointer'}>
            <Icon color={'#9d9d9d'} className={'mr-3'}/>
            <div>{title}</div>
        </div>
    </>)
}