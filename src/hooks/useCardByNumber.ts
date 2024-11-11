import {useQuery} from "@tanstack/react-query";
import {getCardByNumber} from "@/api/api";
import {hasNumbersOnly} from "@/utils/globalFunctions/hasNumbersOnly";

export default function useCardByNumber(number: string) {
    const { data } = useQuery({
        queryKey: ['card', number],
        queryFn: async () => {
            return await getCardByNumber(number);
        },
        enabled: number.length === 16 && hasNumbersOnly(number),
    });
    return data && data[0];
}