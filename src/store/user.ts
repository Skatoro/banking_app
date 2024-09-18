import {create} from 'zustand';
import {getUser} from "@/api/api";
import {IUser} from "@/types/user.types";

export const userStore = create((set) => ({
    user: {
        full_name: '',
        email: '',
        id: '',
        contacts: [],
        avatar_background: '',
        referral_code: '',
        has_referral_activated: true,
        should_be_shown: false,
        avatar_url: '',
        settings: {
            showDecimal: true,
            nightMode: true,
            hideBalance: true
        }
    },
    userInitialized: false as boolean,
    initializationFinished: false as boolean,
    updateUser: (newUser: any) => set((state: any) => ({
        user: {...state.user, ...newUser}
    })),
    fetchUser: async () => {
        set({initializationFinished: false})
        const user = await getUser();
        console.log(user)
        if (user) {
            set({
                user: {
                    full_name: user.full_name,
                    id: user?.id,
                    email: user?.email,
                    contacts: user?.contacts,
                    avatar_background: user?.avatar_background,
                    referral_code: user?.referral_code,
                    has_referral_activated: user?.has_referral_activated,
                    should_be_shown: user?.should_be_shown,
                    avatar_url: user?.avatar_url,
                    settings: {
                        showDecimal: user?.settings.showDecimal,
                        nightMode: user?.settings.nightMode,
                        hideBalance: user?.settings.hideBalance
                    }
                }
            })
            set({userInitialized: true})
        }
        set({initializationFinished: true})
        return user as IUser
    },
    reset: () => {
        set((state: any) => ({
            user: {
                full_name: '',
                email: '',
                id: '',
                contacts: [],
                avatar_background: '',
                referral_code: '',
                has_referral_activated: true,
                should_be_shown: false,
                avatar_url: '',
                settings: {
                    showDecimal: true,
                    nightMode: state.user.settings.nightMode, // to persist previous nightMode state for Auth page
                    hideBalance: true
                }
            },
            userInitialized: false,
            initializationFinished: true,
        }));
    },
}))