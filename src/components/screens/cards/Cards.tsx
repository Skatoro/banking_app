'use client'
import {CurrentCard} from "@/components/screens/cards/currentCard/CurrentCard";
import {CardSettings} from "@/components/screens/cards/cardSettings/CardSettings";
import {Button} from "@/components/ui/button/Button";
import React, {useState} from "react";
import {CardForm} from "@/components/screens/cards/cardForm/CardForm";
import {cardsStore} from "@/store/cards";
import {DeleteCardConfirm} from "@/components/screens/cards/deleteCardConfirm/DeleteCardConfirm";
import {Loader} from "@/components/ui/loader/Loader";
import {userStore} from "@/store/user";
import {FormFrame} from "@/components/ui/formFrame/FormFrame";
import {ShowCards} from "@/components/screens/cards/cardsDropdown/ShowCards";

export default function Cards() {
    const activeCard = cardsStore((state: any) => state.active);
    const cards = cardsStore((state: any) => state.cards)
    const cardsInitialized = cardsStore((state: any) => state.cardsInitialized)
    const user = userStore((state: any) => state.user)
    const haveCard = !!cards[0];
    const [shownCardForm, setShownCardForm] = useState(false);
    const [shownDeleteConfirmation, setShownDeleteConfirmation] = useState(false);

    return (<>
            <div className={' min-w-100'}>
                <div className={'relative bg-white dark:bg-bang mr-5 p-6 rounded-3xl '}>
                    {cardsInitialized
                        ? <>
                            <div className={''}>
                                <div className={'flex justify-between'}>
                                    <h4>Cards</h4>
                                    {haveCard && <ShowCards/>}
                                </div>
                                <CurrentCard card={cards[activeCard]} name={user.full_name} haveCard={haveCard}
                                             setShownCardForm={setShownCardForm}/>
                                {haveCard && <CardSettings/>}
                                <div className={'flex justify-between'}>
                                    <Button onClick={() => setShownCardForm(!shownCardForm)}
                                        className={`bg-primary hover:bg-primary-darker ${!haveCard ? 'w-full' : ''}`}
                                    >
                                        Add Card &nbsp; &nbsp; +
                                    </Button>
                                    {haveCard && <Button
                                        className={'bg-pink-lighter !text-red-500 hover:bg-pink'}
                                        onClick={() => setShownDeleteConfirmation(true)}
                                    >
                                        Remove &nbsp; &nbsp; -
                                    </Button>}
                                </div>
                            </div>
                            {shownCardForm &&
                                <FormFrame disableForm={() => setShownCardForm(false)} title={'Create Card'}>
                                    <CardForm setShownCardForm={setShownCardForm} ownerName={user.full_name}/>
                                </FormFrame>}
                            {shownDeleteConfirmation
                                && <DeleteCardConfirm setShownDeleteConfirm={setShownDeleteConfirmation}
                                                      id={cards[activeCard].id}/>}
                        </>
                        : <div className={'h-125 '}>
                            <Loader size={50}/>
                        </div>}
                </div>
            </div>
        </>
    )
}