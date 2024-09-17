import {ICard} from "@/types/card.types";
import {createClient} from "@/utils/supabase/client";

export function subscribeCards(cards: ICard[], updateCards: any) {

    const clonedCards = structuredClone(cards)

    const supabase = createClient();
    cards.forEach((card) => {
        supabase
            .channel(`cardsFollowUp${Math.random()}`)
            .on('postgres_changes', {
                event: '*',
                schema: 'public',
                table: 'credit_cards',
                filter: `id=eq.${card.id}`,
            }, (payload: any) => {
                updateCardsHandler(payload.new, clonedCards)
            })
            .subscribe()
    })

    function updateCardsHandler(newCard: ICard, clonedCards: ICard[]): void {
        clonedCards.forEach((card, index) =>  {
            if (card.id === newCard.id) {
                clonedCards[index] = newCard
                updateCards(clonedCards)
            }
        })
    }
}