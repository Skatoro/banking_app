'use client'

import React, {PropsWithChildren} from "react";


export const SettingItem = ({children}: PropsWithChildren<unknown>) => {
    return (<>
            <div className={'border-2 border-[#dbdbdb] px-4 py-3 rounded-2xl mb-4'}>
                {children}
            </div>
        </>
    )
}