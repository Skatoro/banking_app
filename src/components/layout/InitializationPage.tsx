'use client'

import Image from "next/image";
import bankLogoPurple from "../../../public/bankLogoPurple.svg";


export default function InitializationPage() {
    return (<>
        <div className={'bg-white dark:bg-bang fixed left-0 top-0 w-screen h-screen flex justify-center items-center  z-50'}>
            <Image src={bankLogoPurple} alt={'logo'} className={'w-20'} priority={true}/>
        </div>
    </>)
}
