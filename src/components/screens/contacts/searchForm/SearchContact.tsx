'use client'
import React, {Dispatch, FC, memo, SetStateAction, useState} from "react";
import {Field} from "@/components/ui/field/Field";
import {Button} from "@/components/ui/button/Button";
import {useDebounce} from "@/hooks/useDebounce";
import {addContact, getUserMatches} from "@/api/api";
import {useQuery} from "@tanstack/react-query";
import {SearchContactItem} from "@/components/screens/contacts/searchForm/SearchContactItem";
import {userStore} from "@/store/user";

interface Props {
    setFormShown: Dispatch<SetStateAction<boolean>>
}

// SearchCard & SearchContact are very similar, yet they have different logic.
// My heart bleeds, but I couldn't make them in one component that won`t be a million line long, so I made it readable
export const SearchContact: FC<Props> = memo(({setFormShown}) => {
    const user = userStore((state: any) => state.user)
    const [selectedItemIndex, setSelectedItemIndex] = useState<number | undefined>()
    const [searchTerm, setSearchTerm] = useState('')
    const debouncedSearchTerm = useDebounce(searchTerm, 300);


    const {data} = useQuery({
        queryKey: ['user', debouncedSearchTerm],
        queryFn: async () => {
            return await getUserMatches(debouncedSearchTerm)
        }
    })
    const filteredExistingMyselfSystem = data?.filter(userContact =>
        userContact.id !== user.id && userContact.should_be_shown &&
        !user?.contacts?.includes(userContact.id))

    const availableContactElements = filteredExistingMyselfSystem?.map((userContact, index) =>
        <SearchContactItem
            key={userContact.id} onClick={() => setSelectedItemIndex(index)}
            user={userContact} isActive={selectedItemIndex === index}
        />)

    function onSubmit() {
        if (selectedItemIndex !== undefined && filteredExistingMyselfSystem) {
            addContact(user.id, filteredExistingMyselfSystem[selectedItemIndex].id).then(error => {
                if (!error) {
                    setFormShown(false)
                }
            })
        }
    }

    return <>
        <div>
            <Field className={'mb-4'} placeholder={'Find users by first and last name'}
                   value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
            />
            <div className={'h-[35vh] rounded-md border-2 border-black/40 mb-4 overflow-y-auto'}>
                {data?.length === 0
                    && <div className={'flex items-center justify-center h-full text-lg font-bold text-center p-3'}>
                        No users found matching this request
                    </div>}
                {availableContactElements}
            </div>
        </div>
        <div className={'flex'}>
            <Button className={'bg-primary w-1/2 mr-3 hover:bg-primary-darker'} onClick={onSubmit}>
                Add
            </Button>
            <Button className={'bg-pink-lighter w-1/2 !text-red-500 hover:bg-pink'}
                    onClick={() => setFormShown(false)}
            >
                Cancel
            </Button>
        </div>
    </>
})