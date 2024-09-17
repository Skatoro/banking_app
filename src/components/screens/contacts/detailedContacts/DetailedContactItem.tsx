import React, {FC, memo, useState} from "react";
import {IUser} from "@/types/user.types";
import {ProfilePicture} from "@/components/ui/profilePicture/ProfilePicture";
import {Loader} from "@/components/ui/loader/Loader";
import {Button} from "@/components/ui/button/Button";
import {ITransaction} from "@/types/transaction.types";
import {Transactions} from "@/components/screens/transactions/Transactions";
import cn from "clsx";

interface Props {
    contact: IUser
    transactions: ITransaction[]
    handleDelete: () => void
}

export const DetailedContactItem: FC<Props> = memo(({contact, transactions, handleDelete}) => {
    const [contactWindowActive, setContactWindowActive] = useState(false)
    function localHandleDelete(e: any) {
        e.stopPropagation()
        handleDelete()
    }
    return (<>
            <div className={cn(`border-2 rounded-3xl mb-3`,
                contactWindowActive ? 'border-stone-500 pb-5' : 'border-transparent')}
            >
                <div className={'flex items-center'} onClick={() => setContactWindowActive(!contactWindowActive)}>
                    {contact
                        ? <div
                            className={`flex justify-between w-full rounded-3xl hover:bg-secondary dark:hover:bg-bang1 cursor-pointer p-5 select-none `}>
                            <div className={'flex items-center'}>
                                <div className={'mr-8'}><ProfilePicture user={contact} size={'md'}/></div>
                                <div className={'text-xl font-bold'}>{contact.full_name}</div>
                            </div>
                            <div className={'flex justify-between h-full'}>
                                <div className={'text-lg font-bold mr-5'}>Transactions: {transactions.length}</div>
                                <Button className={'bg-pink-lighter !text-red-500 hover:bg-pink'}
                                        onClick={localHandleDelete}
                                >
                                    Delete
                                </Button>
                            </div>
                        </div>
                        : <div className={'h-26 w-full'}>
                            <Loader size={45}/>
                        </div>}
                </div>

                {contactWindowActive &&
                    <div className={'px-10 mt-3'}>
                        <div className={'font-bold text-lg mb-3'}>Transactions</div>

                        {transactions.length !== 0
                            ? <Transactions transactions={transactions} stepLoading={false}/>
                            : <div> There is no transactions related to this user </div>}
                    </div>}
            </div>
        </>
    )
})