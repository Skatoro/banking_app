import {AuthError} from "@supabase/supabase-js";

export function getErrorMessage(error: AuthError){
    let errorMessage;
    if (error.code){
        errorMessage = error.code.replaceAll('_', ' ')
        errorMessage = errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1)
    } else {
        if (error.status === 400){
            errorMessage = 'Incorrect username or password'
        } else {
            errorMessage = 'Bad request'
        }
    }
    return errorMessage
}