'use client'
import {Button} from "@/components/ui/button/Button";
import {cardsStore} from "@/store/cards";
import {Loader} from "@/components/ui/loader/Loader";
import React, {useState} from "react";
import {FormFrame} from "@/components/ui/formFrame/FormFrame";
import {SearchCard} from "@/components/screens/balance/searchForm/SearchCard";
import {ICard} from "@/types/card.types";
import {TransferForm} from "@/components/screens/balance/transferingForm/TransferForm";
import {currency} from "@/constants/currency";
import {userStore} from "@/store/user";
import {CurrentReferral} from "@/components/screens/referrals/CurrentReferral";
import styles from './Balance.module.scss'
import {TransactionInterrupted} from "@/components/screens/balance/searchForm/TransactionInterrupted";
import {balanceFormInfoText, balanceFormInfoTitle, transferInfoText, transferInfoTitle} from "@/constants/formInfos";
import {ConditionalBalance} from "@/components/ui/conditionalBalance/ConditionalBalance";

export default function Balance() {
    const [selectCardFormShown, setSelectCardFormShown] = useState<boolean>(false);
    const [transferFormShown, setTransferFormShown] = useState<boolean>(false);
    const [selectedCard, setSelectedCard] = useState<ICard | null>(null)

    const cardsInitialized = cardsStore((state: any) => state.cardsInitialized)
    const cards = cardsStore((state: any) => state.cards)
    const activeCardIndex = cardsStore((state: any) => state.active)
    const currentCard = cards[activeCardIndex]

    const user = userStore((state: any) => state.user)
    const userInitialized = userStore((state: any) => state.userInitialized)

    return (<>
            <div className={`flex mb-5 `}>
                <div className={'bg-white dark:bg-bang p-6 rounded-3xl grow'}>
                    {cardsInitialized
                        ? <>
                            <h4>Balance</h4>
                            <div className={'text-[42px] font-semibold mb-3 flex h-16'}>
                                <ConditionalBalance
                                    balance={Number(cards[activeCardIndex].balance)} emojiClass={'text-6xl mt-1'}
                                    hideBalance={user.settings.hideBalance} showDecimal={user.settings.showDecimal}
                                    afterText={currency}
                                />
                            </div>
                            <div className={'flex'}>
                                <Button
                                    className={'mr-3 px-7 bg-primary hover:bg-primary-darker'}
                                    onClick={() => setSelectCardFormShown(true)}
                                >
                                    Send
                                </Button>
                            </div>
                        </>
                        : <div className={'h-36'}><Loader size={50}/></div>
                    }
                </div>
                {userInitialized && cardsInitialized &&
                    <div className={`ml-5 ${styles.personalCode}`}>
                        <CurrentReferral referralCode={user.referral_code}/>
                    </div>}
            </div>

            {selectCardFormShown &&
                (!currentCard.blocked
                    ? <FormFrame title={'Select Card'} disableForm={() => setSelectCardFormShown(false)}
                                 infoTitle={balanceFormInfoTitle} infoText={balanceFormInfoText}
                    >
                        <SearchCard disableForm={() => setSelectCardFormShown(false)}
                                    setSelectedCard={setSelectedCard} openTransferForm={() => setTransferFormShown(true)}/>
                    </FormFrame>
                    : <TransactionInterrupted onClick={() => setSelectCardFormShown(false)}/>)}

            {transferFormShown && selectedCard &&
                <FormFrame title={'Transfer Details'} disableForm={() => setTransferFormShown(false)}
                           infoTitle={transferInfoTitle} infoText={transferInfoText}
                >
                    <TransferForm
                        recipientCard={selectedCard}
                        personalCard={cards[activeCardIndex]}
                        disableForm={() => setTransferFormShown(false)}
                    />
                </FormFrame>
            }
        </>
    )
}