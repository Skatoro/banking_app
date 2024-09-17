'use client'
import React, {FC, InputHTMLAttributes, memo} from "react";
import {ProfilePicture} from "@/components/ui/profilePicture/ProfilePicture";
import {IUser} from "@/types/user.types";
import {Button} from "@/components/ui/button/Button";
import {FormFrame} from "@/components/ui/formFrame/FormFrame";

interface Props  {
    onClick: () => void
}

export const TransactionInterrupted: FC<Props> = memo(({onClick}) => {

    return (<>
        <FormFrame title={'Transaction Interrupted'} disableForm={onClick}
        >
            <div className={'text-lg mb-5'}>
                The transaction cannot be continued due to the card being blocked. Please change card
                settings
                to continue.
            </div>
            <div className={'flex justify-center'}>
                <Button
                    className={'bg-primary hover:bg-primary-darker'}
                    onClick={onClick}
                >
                    Ok
                </Button>
            </div>
        </FormFrame>
    </>)
})