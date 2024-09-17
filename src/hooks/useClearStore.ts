import {userStore} from "@/store/user";
import {cardsStore} from "@/store/cards";
import {contactsStore} from "@/store/contacts";
import {headerStore} from "@/store/header";


function useClearStore() {
    const resetUsers = userStore((state: any) => state.reset)
    const resetCards = cardsStore((state: any) => state.reset)
    const resetContacts = contactsStore((state: any) => state.reset)
    const resetHeader = headerStore((state: any) => state.reset)

    return () => {
        resetCards()
        resetContacts()
        resetUsers()
        resetHeader()
    };
}

export default useClearStore;
