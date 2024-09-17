import {Dispatch, FC, SetStateAction, useRef, useState} from "react";
import {CalendarDays} from "lucide-react";
import {Range} from "react-date-range";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import {CalendarWindow} from "@/components/ui/calendar/CalendarWindow";
import cn from "clsx";

interface Props {
    ranges: Range[]
    setRanges: Dispatch<SetStateAction<Range[]>>
    windowClass?: string
}

export const CalendarWrapper: FC<Props> = ({ranges, setRanges, windowClass}) => {
    const [calendarOpened, setCalendarOpened] = useState<boolean>(false)
    const buttonRef = useRef(null)
    if (!windowClass) windowClass = 'top-12 left-0'

    return (<>
        <div
            className={`rounded-full py-2 cursor-pointer flex px-4
            ${calendarOpened 
                ? 'bg-primary hover:bg-primary-darker text-white' 
                : 'bg-white hover:bg-secondary text-black dark:bg-bang1 dark:hover:bg-bang1Darker dark:text-white'}`}
            onClick={() => setCalendarOpened(!calendarOpened)}
            style={{boxShadow: '0 3px 12px 0 rgba(0,0,0,0.1),0 1px 2px 0 rgba(0,0,0,0.08)'}}
            ref={buttonRef}
        >
            <div className={'mr-3 select-none'}>Date Range</div>
            <div className={`flex items-center `}>
                <CalendarDays size={20} />
            </div>
        </div>
        {calendarOpened &&
            <div className={cn('absolute', windowClass)}>
                <CalendarWindow
                    ranges={ranges}
                    setRanges={setRanges}
                    setCalendarOpened={setCalendarOpened}
                    buttonRef={buttonRef}
                />
            </div>
        }
    </>)
}