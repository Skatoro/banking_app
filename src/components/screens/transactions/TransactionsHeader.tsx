import {Dispatch, FC, SetStateAction, useRef, useState} from "react";
import {CalendarDays} from "lucide-react";
import {Range} from "react-date-range";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import {CalendarWindow} from "@/components/ui/calendar/CalendarWindow";
import {CalendarWrapper} from "@/components/ui/calendar/CalendarWrapper";

interface Props {
    hasTransactions: boolean
    ranges: Range[]
    setRanges: Dispatch<SetStateAction<Range[]>>
    setIsAllDates: Dispatch<SetStateAction<boolean>>
    isAllDates: boolean
}

export const TransactionsHeader: FC<Props> = (
    {
        hasTransactions,
        ranges,
        setRanges,
        setIsAllDates,
        isAllDates
    }) => {

    return (<div className={'relative mb-2'}>
        <div className={'flex justify-between'}>
            <h4>Transaction History</h4>

            {hasTransactions && <div className={'flex items-center'}>
                <div style={{boxShadow: '0 3px 12px 0 rgba(0,0,0,0.1),0 1px 2px 0 rgba(0,0,0,0.08)'}}
                     className={`mr-5 rounded-3xl py-2 px-4  cursor-pointer select-none
                     ${isAllDates 
                         ? 'bg-primary hover:bg-primary-darker text-white' 
                         : 'bg-white hover:bg-secondary dark:bg-bang1 dark:hover:bg-bang1Darker'}`}
                     onClick={() => setIsAllDates(!isAllDates)}
                >
                    All
                </div>
                <CalendarWrapper ranges={ranges} setRanges={setRanges} windowClass={'right-0 top-12'}/>
            </div>}

        </div>
    </div>)
}