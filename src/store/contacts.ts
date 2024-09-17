import {create} from 'zustand';

export const contactsStore = create((set) => ({
    contacts: [],
    updateContacts: (newContacts: any) => set((state: any) => ({
        contacts: newContacts,
    })),
    reset: () => {
        set({
            contacts: [],
        });
    },
}))