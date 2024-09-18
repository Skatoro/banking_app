'use server'

import {redirect} from 'next/navigation'

import {createClient} from '@/utils/supabase/server'

export async function signOut() {
    const supabase = createClient()

    const { error } = await supabase.auth.signOut()
    if (error) {
        redirect('/error')
    }
    redirect('/signin')
}