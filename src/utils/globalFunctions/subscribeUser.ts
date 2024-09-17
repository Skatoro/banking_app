import {ICard} from "@/types/card.types";
import {createClient} from "@/utils/supabase/client";
import {IUser} from "@/types/user.types";

export function subscribeUser(user: IUser, updateUser: any) {
    const supabase = createClient();
    supabase
        .channel(`userFollowUp${Math.random()}`)
        .on('postgres_changes', {
            event: '*',
            schema: 'public',
            table: 'users',
            filter: `id=eq.${user.id}`,
        }, (payload: any) => {
            updateUser(payload.new)
        })
        .subscribe()
}