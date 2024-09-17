'use client'

import {Loader} from "@/components/ui/loader/Loader";
import React from "react";
import {userStore} from "@/store/user";
import {CurrentReferral} from "@/components/screens/referrals/CurrentReferral";
import {referralBonusAmount} from "@/constants/referralBonusAmount";
import {currency} from "@/constants/currency";
import {EnterReferral} from "@/components/screens/referrals/EnterReferral";

export default function EarnGifts() {
    const userInitialized = userStore((state: any) => state.userInitialized)
    const user = userStore((state: any) => state.user)
    return (<>
            <div className={'h-full'}>
                {userInitialized
                    ? <div>
                        <div className={'flex items-center mb-6'}>
                            <div className={'text-xl text-center w-full mx-10'}>
                                Invite friends by this code and receive {referralBonusAmount} {currency} each! There is no limit to the number of times your referral code can be used.
                            </div>
                            <CurrentReferral referralCode={user?.referral_code}/>
                        </div>
                        <div className={'flex items-center'}>
                            <div className={'text-xl text-center w-full mx-10'}>
                                Enter your friend's code and get {referralBonusAmount} {currency} each! But remember, you can only use the referral once.
                            </div>
                            <EnterReferral/>
                        </div>
                    </div>
                    : <div className={'h-full'}><Loader size={50}/></div>}
            </div>
        </>
    )
}