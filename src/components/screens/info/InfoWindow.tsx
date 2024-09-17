import {FC} from "react";
import {CircleHelp} from "lucide-react";

interface Props {
    title: string
    bodyText: string
}

export const InfoWindow: FC<Props> = ({title, bodyText}) => {
    return <>
        <div className={'items-center flex group select-text'}>
            <CircleHelp className={`w-5 h-5 text-icon_grey`}/>
            <div className={`hidden group-hover:block absolute text-black
                text-sm text-justify left-1/2 right-1/2  top-11 w-64 
                z-10 bg-white  rounded-3xl border-[1px] 
                border-gray-500 p-3`} style={{transform: 'translate(-50%, 0)'}}
            >
                <div className={'mb-2'}>{title}</div>
                <div className={'font-medium '}>{bodyText}</div>
            </div>
        </div>
    </>
}
