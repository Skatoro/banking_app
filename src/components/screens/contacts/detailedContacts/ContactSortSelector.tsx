import React, {Dispatch, FC, MutableRefObject, SetStateAction, useEffect, useRef} from "react";
import {ArrowDown, ArrowLeftRight, ArrowUp, Clock} from "lucide-react";
import {useHandleOutsideClick} from "@/hooks/useHandleOutsideClick";
import {SortSelectorItem} from "@/components/screens/contacts/detailedContacts/SortSelectorItem";

interface Props {
    buttonRef: MutableRefObject<HTMLElement> | MutableRefObject<null>
    sortCriteria: string
    setSortCriteria: Dispatch<SetStateAction<string>>
    closeSelector: () => void
}

export const ContactSortSelector: FC<Props> = ({sortCriteria, setSortCriteria, buttonRef, closeSelector}) => {
    const menuRef = useRef<HTMLDivElement>(null);
    let isClickedOutside = useHandleOutsideClick(null, buttonRef)

    useEffect(() => {
        if (isClickedOutside) closeSelector()
    }, [isClickedOutside]);

    return (<>
            <div className={'rounded-lg border-2 border-stone-500 overflow-hidden select-none bg-white dark:bg-bang w-40'} ref={menuRef}>
                <SortSelectorItem Icon={Clock} onClick={() => setSortCriteria('TimeAsc')}
                                  text={'First added'} active={sortCriteria === 'TimeAsc'}
                />
                <SortSelectorItem Icon={Clock} onClick={() => setSortCriteria('TimeDesc')}
                                  text={'Last added'} active={sortCriteria === 'TimeDesc'}
                />
                <SortSelectorItem Icon={ArrowDown} onClick={() => setSortCriteria('NameAsc')}
                                  text={'Name'} active={sortCriteria === 'NameAsc'}
                />
                <SortSelectorItem Icon={ArrowUp} onClick={() => setSortCriteria('NameDesc')}
                                  text={'Name'} active={sortCriteria === 'NameDesc'}
                />
            </div>
        </>
    )
}