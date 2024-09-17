import {MutableRefObject, useEffect, useState} from 'react'


export function useHandleOutsideClick(
    windowRef?: MutableRefObject<HTMLElement> | MutableRefObject<null> | null,
    buttonRef?: MutableRefObject<HTMLElement> | MutableRefObject<null> | null
): boolean {
    const [isOutside, setIsOutside] = useState<boolean>(false)

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            const outsideWindow = windowRef
                ? windowRef.current && !(windowRef.current as HTMLElement).contains(event.target)
                : true;
            const outsideButton = buttonRef
                ? buttonRef.current && !(buttonRef.current as HTMLElement).contains(event.target)
                : true
            if (outsideWindow && outsideButton) {
                setIsOutside(true)
            } else {
                setIsOutside(false)
            }
        };

        document.addEventListener('mouseup', handleClickOutside);

        return () => {
            document.removeEventListener('mouseup', handleClickOutside);
        }

    }, [windowRef]);

    return isOutside
}
