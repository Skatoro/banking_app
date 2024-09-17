'use client'

import Image from "next/image";
import bankLogo from "../../../../public/bankLogo.svg";
import {useRouter} from "next/navigation";

export const HeaderLogo= () => {
    const router = useRouter();

    return (<>
        <div className={'rounded-full bg-primary  p-4 mr-5 cursor-pointer'}
             onClick={() => {
                 router.push('/')
             }}>
            <Image src={bankLogo} alt={'logo'} className={'w-8'} priority={true}/>
        </div>
    </>)
}