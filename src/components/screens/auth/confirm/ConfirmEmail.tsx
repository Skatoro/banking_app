'use client'
interface IAuth {
    type?: 'Login' | 'Register',
}

export default function  ConfirmEmail({type}: IAuth) {
    return (
        <div className={'flex justify-center items-center text-2xl'}>
            We sent a confirmation message to your email.
            Confirm email to proceed
        </div>
    )
}