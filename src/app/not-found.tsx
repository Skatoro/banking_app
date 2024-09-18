'use client'
import {useRouter} from "next/navigation";

export default function NotFound() {
    const router = useRouter()
    function handleClick() {
        router.push('/')
    }

    return (<>
        <div className={' text-center pt-10'}>
            <div className={'text-2xl mb-3'}>Unfortunately, this page is unavailable</div>
            <div>
                <div>
                    You may have used an invalid link or the page has been removed
                </div>
                <div className={'hover:text-black/50 dark:hover:text-icon_grey cursor-pointer'} onClick={handleClick}>
                    Back to App
                </div>
            </div>
        </div>
    </>)
}