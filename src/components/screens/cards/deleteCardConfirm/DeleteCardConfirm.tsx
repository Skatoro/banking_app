
import {Button} from "@/components/ui/button/Button";
import React, {Dispatch, FC, SetStateAction} from "react";
import {deleteCard} from "@/api/api";
import {cardsStore} from "@/store/cards";
import {userStore} from "@/store/user";

interface Props {
    setShownDeleteConfirm: Dispatch<SetStateAction<boolean>>,
    id: string,
}
export const DeleteCardConfirm: FC<Props> = ({setShownDeleteConfirm, id}) => {
    const fetchCards = cardsStore((state: any) => state.fetchCards)
    const updateActiveCard = cardsStore((state: any) => state.updateActive)
    const user = userStore((state: any) => state.user)
    async function confirmAction() {
        const error = await deleteCard(id)
        if (!error) {
            setShownDeleteConfirm(false)
            fetchCards(user)
            updateActiveCard(0)
        }
    }
    return (<>
            <div className={'p-5 bg-white dark:bg-bang fixed top-1/2 left-1/2 z-20 rounded-3xl overflow-hidden '}
                 style={{transform: 'translate(-50%, -50%)', width: '450px'}}
            >
                <div className={'w-full h-12 flex justify-center items-center mb-5'}>
                    <span className={'text-xl font-bold text-center'}>Do you really want to delete this card?</span>
                </div>
                <div className={'flex justify-between'}>
                    <Button
                        type={'button'} className={'bg-primary w-1/2 mr-3 hover:bg-primary-darker'}
                        onClick={confirmAction}
                    >
                        Confirm
                    </Button>
                    <Button
                        className={'bg-pink-lighter w-1/2 !text-red-500 hover:bg-pink'}
                        onClick={() => setShownDeleteConfirm(false)}
                    >
                        Cancel
                    </Button>
                </div>

            </div>
            <div className={'fixed top-0 left-0 w-screen h-screen bg-black/30 z-10'}
                 onClick={() => setShownDeleteConfirm(false)}/>
        </>
    )
}