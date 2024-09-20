import {create} from 'zustand';
import {getAllUserCards} from "@/api/api";
import {ICard} from "@/types/card.types";

export const cardsStore = create((set) => ({
    cards: [] as ICard[],
    active: 0 as number,
    cardsInitialized: false as boolean,
    updateCards: (newCardsArray: ICard[]) => set(() => ({
        cards: JSON.parse(JSON.stringify(newCardsArray)),
    })),
    updateActive: (newActive: number) => set(() => {
        return ({
            active: newActive,
        })
    }),
    fetchCards: async (userId: string) => {
        if (!userId) return
        const cards = await getAllUserCards(userId);
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