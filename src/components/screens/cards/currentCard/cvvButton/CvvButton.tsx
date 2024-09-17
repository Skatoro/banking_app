'use client'
import styles from './CvvButton.module.scss'
import cn from "clsx";
import {FC, memo, useState} from "react";

interface Props {
    cvv: string;
}
export const CvvButton:FC<Props> = ({cvv}) => {

    const processTime = 10; // to prevent cvv flicking
    const rotationTime = 400 - processTime;
    const [cvvActive, setCvvActive] = useState(false);
    const [cvvRotating, setCvvRotating] = useState(false);
    const [cvvRotatedHalfway, setCvvRotatedHalfway] = useState(false);

    function toggleCVV() {
        setCvvRotating(true)
        setTimeout(() => {
            setCvvRotatedHalfway(true)
        }, rotationTime / 2)
        setTimeout(() => {
            setCvvRotating(false)
            setCvvActive(!cvvActive)
            setCvvRotatedHalfway(false)
        }, rotationTime)
    }

    return (
        <button
            onClick={toggleCVV}
            disabled={cvvRotating}
            className={cn('bg-grey rounded-2xl py-1 px-3 text-sm cursor-pointer w-14 select-none',
                cvvRotating ? styles.rotateHorizontal : '')}
        >
            <div className={cvvRotatedHalfway ? styles.mirrorHorizontal : ''}>

                {cvv && (cvvActive)
                    ? (!cvvRotatedHalfway ? cvv : 'CVV')
                    : (!cvvRotatedHalfway ? 'CVV' : cvv)}
            </div>
        </button>
    )
}