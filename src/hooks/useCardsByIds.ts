import {useQueries} from "@tanstack/react-query";
import {IUser} from "@/types/user.types";

export default function useCardsByIds(cardIds: string[]) {
    const cardsByUserIds = useQueries({
        queries: cardIds ? cardIds?.map((cardId: string) => ({
            queryKey: ['card', cardId],
            queryFn: async () => {
                const response = await fetch(`/api/getCardById/${cardId}`, {
                    mode: 'no-cors',
                    method: 'GET'
                });
                return await response.json();
            },
            enabled: cardIds.length !== 0
        })) : []
    });

    const cardsByIds = cardsByUserIds.flatMap(response => response.data?.data);

    return cardsByIds
}