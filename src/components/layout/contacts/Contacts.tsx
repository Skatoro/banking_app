'use client'

import React, {useState} from "react";
import {userStore} from "@/store/user";
import useUsersByMultipleIDs from "@/hooks/useUsersByMultipleIDs";
import {DetailedContactItem} from "@/components/screens/contacts/detailedContacts/DetailedContactItem";
import {FormFrame} from "@/components/ui/formFrame/FormFrame";
import {SearchContact} from "@/components/screens/contacts/searchForm/SearchContact";
import {DetailedContactSort} from "@/components/screens/contacts/detailedContacts/DetailedContactSort";
import {IUser} from "@/types/user.types";
import {sortContactsName} from "@/utils/globalFunctions/sortContactsName";
import {ITransaction} from "@/types/transaction.types";
import {cardsStore} from "@/store/cards";
import {deleteContact} from "@/api/api";
import {Button} from "@/components/ui/button/Button";
import {ICard} from "@/types/card.types";

export default function Contacts() {
    const user = userStore((state: any) => state.user)
    const userInitialized = userStore((state: any) => state.userInitialized)
    const cards = cardsStore((state: any) => state.cards)
    const cardsInitialized = cardsStore((state: any) => state.cardsInitialized)
    const contacts = useUsersByMultipleIDs(user.contacts)

    const [contactFormShown, setContactFormShown] = useState(false);
    const [sortCriteria, setSortCriteria] = useState('TimeDesc');

    const sortedContacts = sortContacts(contacts)
    const transactions: ITransaction[][] = sortedContacts.map((contact) =>
        cards.flatMap((card: ICard) =>
            card.transactions?.filter((t: ITransaction) =>
                t.transactionUserId === contact?.id)
            || [])
    );

    function sortContacts(contacts: IUser[]): IUser[] {
        switch (sortCriteria) {
            case 'TimeAsc':
                return contacts.reverse();
            case 'TimeDesc':
                return contacts;
            case 'NameAsc':
                return sortContactsName(contacts, true);
            case 'NameDesc':
                return sortContactsName(contacts, false);
            default:
                return contacts;
        }
    }

    return (<>
            <div className={'max-h-full '}>
                {userInitialized && cardsInitialized
                    && <>
                        <div className={'flex mb-5 items-center '}>
                            <div className={'mr-6'}>
                                <DetailedContactSort sortCriteria={sortCriteria} setSortCriteria={setSortCriteria}/>
                            </div>
                            <div className={'cursor-pointer'} onClick={() => setContactFormShown(true)}>
                                <Button className={'bg-primary hover:bg-primary-darker'}>Add</Button>
                            </div>
                        </div>
                        {sortedContacts.map((contact, index: number) =>
                            <DetailedContactItem contact={contact} transactions={transactions[index]}
                                                 key={Math.random()}
                                                 handleDelete={() => deleteContact(user.id, contact.id)}
                            />
                        )}
                    </>}
            </div>

            {contactFormShown &&
                <FormFrame title={'Add Contacts'} disableForm={() => setContactFormShown(false)}>
                    <SearchContact setFormShown={setContactFormShown}/>
                </FormFrame>}
        </>
    )
}