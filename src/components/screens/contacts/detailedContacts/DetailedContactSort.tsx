import React, {Dispatch, FC, SetStateAction, useRef, useState} from "react";
import {ArrowDownUp} from "lucide-react";
import {ContactSortSelector} from "@/components/screens/contacts/detailedContacts/ContactSortSelector";

interface Props {
    sortCriteria: string
    setSortCriteria: Dispatch<SetStateAction<string>>
}

export const DetailedContactSort: FC<Props> = ({sortCriteria, setSortCriteria}) => {
    const [sortOpened, setSortOpened] = useState(false)
    const sortButtonRef = useRef(null)
    return (<>
            <div className={'relative'}>
                <div
                    className={`rounded-full w-fit  py-2 cursor-pointer flex px-4 
                    ${sortOpened
                        ? 'bg-primary hover:bg-primary-darker text-white'
                        : 'bg-white hover:bg-secondary text-black dark:bg-bang1 dark:hover:bg-bang1Darker dark:text-white'}`}
                    onClick={() => setSortOpened(!sortOpened)}
                    style={{boxShadow: '0 3px 12px 0 rgba(0,0,0,0.1),0 1px 2px 0 rgba(0,0,0,0.08)'}}
                    ref={sortButtonRef}
                >
                    <div className={' mr-3 select-none'}>Sort by</div>
                    <div className={`flex items-center `}>
                        <ArrowDownUp size={20} />
                    </div>
                </div>

                {sortOpened &&
                    <div className={'absolute top-12 left-0 z-20'}>
                        <ContactSortSelector
                            closeSelector={() => setSortOpened(false)} buttonRef={sortButtonRef}
                            sortCriteria={sortCriteria} setSortCriteria={setSortCriteria}
                        />
                    </div>}
            </div>
        </>
    )
}