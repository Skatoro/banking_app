import React, {Dispatch, FC, SetStateAction, useRef, useState} from "react";
import {CalendarDays} from "lucide-react";
import {CalendarWindow} from "@/components/ui/calendar/CalendarWindow";
import {Range} from "react-date-range";
import {CalendarWrapper} from "@/components/ui/calendar/CalendarWrapper";

interface Props {
    dateRanges: Range[]
    setDateRanges: Dispatch<SetStateAction<Range[]>>
}

export const ActivityTimeSelection: FC<Props> = ({dateRanges, setDateRanges}) => {
    return (<>
            <div className={'relative'}>
                <CalendarWrapper ranges={dateRanges} setRanges={setDateRanges}/>
            </div>
        </>
    )
}