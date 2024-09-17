'use client'

import React, {useEffect} from "react";
import {useRouter} from "next/navigation";

export default function SettingsMain() {
    const router = useRouter()
    useEffect(() => {
        router.push('/settings/profile')
    }, []);
    return (<>
            <div className={'text-transparent'}>
                You are a curious one, huh?)
            </div>
        </>
    )
}