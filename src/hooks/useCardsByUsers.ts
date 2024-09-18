import {useQueries} from "@tanstack/react-query";
import {IUser} from "@/types/user.types";

export default function useCardsByUsers(users: IUser[]) {
    const cardsByUserQueries = useQueries({
        queries: users ? users?.map((contact: any) => ({
            queryKey: ['card', contact?.id],
            queryFn: async () => {
                const response = await fetch(`/api/getAllUserCards/${contact.id}`, {
                    mode: 'no-cors',
                    method: 'GET'
                });
                return await response.json();
            },
            enabled: users.length !== 0
        })) : []
    });

    const cardsByUsers = cardsByUserQueries.flatMap(response => response.data?.data);

    return cardsByUsers
}