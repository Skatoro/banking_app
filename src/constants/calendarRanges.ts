
import { Range } from 'react-date-range';
import {getDateTillMidnight} from "@/utils/globalFunctions/getDateTillMidnight";
import {getDateFromMidnight} from "@/utils/globalFunctions/getDateFromMidnight";

export const allCalendarDates: Range = {
    startDate: new Date(getDateTillMidnight(new Date())),
    endDate: new Date(0),
    key: 'selection'
}
export const todayCalendarDates: Range = {
    startDate: new Date(getDateTillMidnight(new Date())),
    endDate: new Date(getDateFromMidnight(new Date())),
    key: 'selection'
}