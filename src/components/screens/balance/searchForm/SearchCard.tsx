'use client'
import React, {Dispatch, FC, memo, SetStateAction, useEffect, useState} from "react";
import {Field} from "@/components/ui/field/Field";
import {Button} from "@/components/ui/button/Button";
import {useDebounce} from "@/hooks/useDebounce";
import {contactsStore} from "@/store/contacts";
import {stringHasPart} from "@/utils/globalFunctions/findStringMatches";
import {IUser} from "@/types/user.types";
import useCardByNumber from "@/hooks/useCardByNumber";
import useCardsByUsers from "@/hooks/useCardsByUsers";
import {CardByNumber} from "@/components/screens/balance/searchForm/CardByNumber";
import {CardsByContacts} from "@/components/screens/balance/searchForm/CardsByContacts";
import {userStore} from "@/store/user";
import {ICard} from "@/types/card.types";

interface Props {
    disableForm: () => void
    setSelectedCard: Dispatch<SetStateAction<ICard | null>>
}

// SearchCard & SearchContact are very similar, yet they have different logic.
// My heart bleeds, but I couldn't make them in one component that won`t be a million line long, so I made it readable
export const SearchCard: FC<Props> = memo(({disableForm, setSelectedCard}) => {
    const user = userStore((state: any) => state.user)
    const [selectedItemIndex, setSelectedItemIndex] = useState<number | undefined>()
    const [searchTerm, setSearchTerm] = useState('')
    const debouncedSearchTerm = useDebounce(searchTerm, 300);
    const contacts = contactsStore((state: any) => state.contacts)

    const foundContacts = contacts
        .filter((contact: IUser) => stringHasPart(debouncedSearchTerm, contact?.full_name)) as IUser[];

    const cardByNumber = useCardByNumber(debouncedSearchTerm)
    const cardsByContacts = useCardsByUsers(foundContacts)

    const cardByNumberElement = <CardByNumber
        card={cardByNumber} user={user}
        selectedItemIndex={selectedItemIndex}
        setSelectedItemIndex={setSelectedItemIndex}
    />

    const cardsByContactsElements = <CardsByContacts
        cards={cardsByContacts} contacts={contacts}
        selectedItemIndex={selectedItemIndex}
        setSelectedItemIndex={setSelectedItemIndex}
    />

    function onSubmit() {
        if (typeof selectedItemIndex === 'number') {
            if (cardsByContacts.length !== 0) {
                setSelectedCard(cardsByContacts[selectedItemIndex])
            }
            if (cardByNumber) {
                setSelectedCard(cardByNumber)
            }
            disableForm()
        }

    }

    useEffect(() => {
        setSelectedItemIndex(undefined)
    }, [debouncedSearchTerm]);

    return <>
        <div>
            <Field className={'mb-4'} placeholder={'Enter contact name or card number'}
                   value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
            />
            <div className={'h-[35vh] rounded-md border-2 border-black/40 mb-4 overflow-y-auto'}>
                {cardsByContactsElements}
                {cardByNumberElement}
            </div>
        </div>
        <div className={'flex'}>
            <Button className={'bg-primary w-1/2 mr-3 hover:bg-primary-darker'} onClick={onSubmit}>
                Select
            </Button>
            <Button className={'bg-pink-lighter w-1/2 !text-red-500 hover:bg-pink'}
                    onClick={disableForm}
            >
                Cancel
            </Button>
        </div>
    </>
})