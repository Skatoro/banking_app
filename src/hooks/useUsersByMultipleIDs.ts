import {useQueries} from "@tanstack/react-query";
import {IUser} from "@/types/user.types";

export default function useUsersByMultipleIDs(idArray: string[]) {
    const userQueries = useQueries({
        queries: idArray ? idArray.map((contactId: string) => ({
            queryKey: ['user', contactId],
            queryFn: async () => {
                const response = await fetch(`/api/getUserById/${contactId}`, {
                    method: 'GET'
                });
                return await response.json();
            },
        })) : []
    });

    const userQueriesData = userQueries.map(user => {
        if (user.data) {
            if (user.data.user) {
                return user.data.user
            }
            return user.data
        }
    })
    return userQueriesData
}