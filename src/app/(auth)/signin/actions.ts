'use server'

import {createClient} from '@/utils/supabase/server'
import {getErrorMessage} from "@/lib/actions/error.actions";
import {ISignIn} from "@/app/(auth)/signin/signin.types";

export async function signIn(formData: ISignIn) {
    const supabase = createClient()
    const data = {
        email: formData.email,
        password: formData.password,
    }

    const {error} = await supabase.auth.signInWithPassword(data);
    if (error) {
        return getErrorMessage(error)
    }

}
