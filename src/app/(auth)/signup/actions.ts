'use server'

import {createClient} from '@/utils/supabase/server'
import { AuthError } from '@supabase/supabase-js';
import {getErrorMessage} from "@/lib/actions/error.actions";
import {capitalizeWords} from "@/utils/globalFunctions/capitilizeWords";


export async function signUp(formData: any) {
    const supabase = createClient()
    const {data, error} = await supabase.auth.signUp({
        email: formData.email as string,
        password: formData.password as string,
        options: {
            data: {
                full_name: `${formData.first_name} ${formData.last_name}`,
                avatar_background: `${formData.avatar_background}`,
                referral_code: `${formData.referral_code}`
            }
        }
    });
    if (error) {
        return getErrorMessage(error)
    } else return
}
