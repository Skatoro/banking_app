import {Dispatch, FC, MutableRefObject, SetStateAction, useEffect, useRef} from "react";
import {DateRangePicker, Range} from "react-date-range";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import {getDateTillMidnight} from "@/utils/globalFunctions/getDateTillMidnight";
import {useHandleOutsideClick} from "@/hooks/useHandleOutsideClick";

interface Props {
    ranges: Range[]
    setRanges: Dispatch<SetStateAction<Range[]>>
    setCalendarOpened: Dispatch<SetStateAction<boolean>>
    buttonRef: MutableRefObject<HTMLElement> | MutableRefObject<null>
}

export const CalendarWindow: FC<Props> = ({
                                               ranges,
                                               setRanges,
                                               setCalendarOpened,
                                               buttonRef
}) => {
    const colors = ['rgb(101 64 132)']
    const calendarRef = useRef(null);

    let isClickedOutside = useHandleOutsideClick(calendarRef, buttonRef)
    useEffect(() => {
        if (isClickedOutside) setCalendarOpened(false)
    }, [isClickedOutside]);

    return (<>
        <div className={'rounded-3xl'} ref={calendarRef}
             style={{boxShadow: '0 3px 12px 0 rgba(0,0,0,0.1),0 1px 2px 0 rgba(0,0,0,0.08)'}}
        >
            <DateRangePicker
                rangeColors={colors}
                className={'rounded-3xl overflow-hidden '}
                onChange={item => {
                    if (item.selection.endDate) {
                        item.selection.endDate = getDateTillMidnight(item.selection.endDate)
                    }
                    return setRanges([item.selection])
                }}
                moveRangeOnFirstSelection={false}
                months={1}
                maxDate={new Date()}
                minDate={new Date(2000, 0, 1)}
                ranges={ranges}
                direction="horizontal"
            />
        </div>
    </>)
}