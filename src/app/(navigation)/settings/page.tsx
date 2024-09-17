import React from "react";
import SettingsMain from "@/components/layout/settings/SettingsMain";
import {getAuthUser} from "@/api/api";
import {redirect} from "next/navigation";

export default async function SettingsPage() {
    const user = await getAuthUser();
    if (!user) redirect('/signin')

    return (
        <SettingsMain/>
    )
}
