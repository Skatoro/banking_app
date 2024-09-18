'use client'
import React, {useEffect, useRef, useState} from "react";
import {CircleFadingPlus} from "lucide-react";
import {userStore} from "@/store/user";
import {RecentContactItem} from "@/components/screens/contacts/RecentContactItem";
import {FormFrame} from "@/components/ui/formFrame/FormFrame";
import {SearchContact} from "@/components/screens/contacts/searchForm/SearchContact";
import {contactsStore} from "@/store/contacts";
import useUsersByMultipleIDs from "@/hooks/useUsersByMultipleIDs";
import {useRouter} from "next/navigation";
import {headerStore} from "@/store/header";
import {recentContactMargin, recentContactWidth} from "@/constants/recentContactParams";

export default function ContactsMain() {
    const [contactFormShown, setContactFormShown] = useState(false);
    const ref: React.Ref<HTMLDivElement> = useRef(null);
    const [childrenAmount, setChildrenAmount] = useState(0)
    const user = userStore((state: any) => state.user)
    const contacts = useUsersByMultipleIDs(user?.contacts)
    const updateContacts = contactsStore((state: any) => state.updateContacts)
    const router = useRouter()
    const setActiveTabName = headerStore((state: any) => state.setActiveTabName)

    // made with debounce at first to make is less laggy, decided to leave it as it is, because this one is
    // smoother, and user probably will never change width rapidly using something like dev tool
    useEffect(() => {
        const handleResize = () => {
            if (ref.current) {
                const childrenCanFit = Math.floor
                ((ref.current.offsetWidth - recentContactWidth)
                    / (recentContactWidth + recentContactMargin))
                setChildrenAmount(childrenCanFit)
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [])

    // passing reversed array to useUsersByMultipleIDs for some reason fetches it not reversed
    const reversedContacts = contacts.reverse()
    useEffect(() => {
        updateContacts(reversedContacts)
    }, [reversedContacts]);

    return (<>
            <div className={'flex justify-between mb-3'}>
                <h4>Recent Contacts</h4>
                {user.contacts && <button className={'text-secondary dark:text-secondary-lighter'} onClick={() => {
                    router.push('/contacts')
                    setActiveTabName('Contacts')
                }}>
                    <h4>All Contacts</h4>
                </button>}
            </div>
            <div className={'flex relative'} ref={ref}>
                <div className={'w-16 cursor-pointer mr-3'} onClick={() => {
                    setContactFormShown(true)
                }}>
                    <CircleFadingPlus
                        className={'w-full h-16 text-secondary dark:text-secondary-lighter'}
                        strokeWidth={1}
                    />
                    <div className={'text-center text-secondary dark:text-secondary-lighter font-bold text-sm'}>
                        Add
                    </div>
                </div>
                <div className={`absolute left-20 flex`}>
                    {contacts?.map((contactUser, index: number) => {
                        if (index < childrenAmount) {
                            if (contactUser?.full_name) {
                                return <RecentContactItem
                                    key={index}
                                    user={contactUser}
                                    isLast={index === childrenAmount - 1}
                                />
                            }
                        }
                    })}
                </div>
            </div>
            {contactFormShown &&
                <FormFrame title={'Add Contacts'} disableForm={() => setContactFormShown(false)}>
                    <SearchContact setFormShown={setContactFormShown}/>
                </FormFrame>}
        </>
    )
}