import {useQuery} from "@tanstack/react-query";
import {getUserByID} from "@/api/api";

export default function useUserByID(userID: string) {
    const { data } = useQuery({
        queryKey: ['user', userID],
        queryFn: async () => {
            return await getUserByID(userID);
        },
        enabled: !!userID
    });

    if (data && data.user) {
        return data.user
    }

    return data;
}