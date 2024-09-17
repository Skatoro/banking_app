import ContactsMain from "@/components/screens/contacts/RecentContacts";
import {Loader} from "@/components/ui/loader/Loader";
import React from "react";
import {userStore} from "@/store/user";

export default function RecentContactsWrapper () {
    const userInitialized = userStore((state: any) => state.userInitialized)
    return <div className={'bg-white dark:bg-bang p-6 rounded-3xl mb-5'}>
        {userInitialized
            ? <ContactsMain/>
            : <div className={'h-32 '}>
                <Loader size={50}/>
            </div>}
    </div>
}