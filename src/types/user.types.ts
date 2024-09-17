export interface IUser {
    avatar_background: string
    contacts?: string[]
    created_at: string
    email: string
    full_name: string
    id: string
    referral_code: string
    has_referral_activated: boolean
    should_be_shown: boolean
    avatar_url: string
    settings: {
        showDecimal: boolean,
        nightMode: boolean,
        hideBalance: boolean
    }
}