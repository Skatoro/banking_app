'use server'

import {createClient} from '@/utils/supabase/server'
import {getErrorMessage} from "@/lib/actions/error.actions";

export async function signIn(formData: any) {
    const supabase = createClient()
    const data = {
        email: formData.email as string,
        password: formData.password as string,
    }

    const {error} = await supabase.auth.signInWithPassword(data);
    if (error) {
        return getErrorMessage(error)
    }

}
