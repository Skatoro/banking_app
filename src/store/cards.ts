import {create} from 'zustand';
import {getAllUserCards} from "@/api/api";
import {ICard} from "@/types/card.types";
import {IUser} from "@/types/user.types";
export const cardsStore = create((set) => ({
    cards: [] as ICard[],
    active: 0 as number,
    cardsInitialized: false as boolean,
    updateCards: (newCardsArray: any) => set((state: any) => ({
        cards: newCardsArray,
    })),
    updateActive: (newActive: number) => set((state: any) => {
        return ({
            active: newActive,
        })
    }),
    fetchCards: async (user: IUser) => {
        if (!user) return
        const cards = await getAllUserCards(user.id);
        if (cards) {
            set({cards})
            set({cardsInitialized: true})
        }
        return cards;
    },
    reset: () => {
        set({
            cards: [],
            active: 0,
            cardsInitialized: false,
        });
    },
}))