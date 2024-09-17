import {Loader2} from "lucide-react";
import styles from './Loader.module.scss'

interface Props {
    size?: number
}

export function Loader({size}: Props) {
    return <>
        <div className={'flex items-center justify-center w-full h-full'}>
            <div
                className={`${styles.loaderContainer}`}
                style={{height: `${size}px`}}
            >
                <Loader2 className={styles.loader}/>
            </div>
        </div>
    </>
}