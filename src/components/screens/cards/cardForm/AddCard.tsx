'use client'
import {Button} from "@/components/ui/button/Button";
import React, {FC, useState} from "react";
import {CardForm} from "@/components/screens/cards/cardForm/CardForm";
import {FormFrame} from "@/components/ui/formFrame/FormFrame";

interface Props {
    haveCard: boolean
    userName: string
}

export const AddCard:FC<Props> = ({haveCard, userName}) => {
    const [shownCardForm, setShownCardForm] = useState(false);

    return (<>
            <Button onClick={() => setShownCardForm(!shownCardForm)}
                    className={`bg-primary hover:bg-primary-darker ${!haveCard ? 'w-full' : ''}`}
            >
                Add Card &nbsp; &nbsp; +
            </Button>

            {shownCardForm &&
                <FormFrame disableForm={() => setShownCardForm(false)} title={'Create Card'}>
                    <CardForm setShownCardForm={setShownCardForm} ownerName={userName}/>
                </FormFrame>}

        </>
    )
}