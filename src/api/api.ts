'use server'
import {createClient} from "@/utils/supabase/server";
import {ICreateCardData} from "@/api/api.types";
import {IUser} from "@/types/user.types";
import {DateTime} from "luxon";
import {systemUserID, systemUserName} from "@/constants/systemUser";
import {ISettings} from "@/types/settings.types";


export async function getAuthUser() {
    const supabase = createClient()
    const {data} = await supabase.auth.getUser();

    return data ? data.user : null;
}

export async function getUser() {
    const supabase = createClient();
    const user = await getAuthUser();
    if (user) {
        let {data} = await supabase
            .from('users')
            .select()
            .eq('id', user.id);
        return data && data[0]
    }
    return

}

export async function getAllUserCards(userId: string) {
    const supabase = createClient();

    let {data} = await supabase.from('credit_cards')
        .select()
        .eq('user_id', userId)
        .order('created_at', {ascending: true});
    return data
}


export async function createCard(
    {
        balance, pin, cvv, expiration_month,
        expiration_year, name, number,
        user_id, payment_network
    }: ICreateCardData) {
    const supabase = createClient();
    const {error} = await supabase
        .from('credit_cards')
        .insert([{
            balance, pin, cvv, expiration_month, expiration_year, name, number, user_id, payment_network
        },
        ])
        .select()
    return error
}

export async function updateCardLimit(cardId: string, limit: number) {
    const supabase = createClient();
    const {error} = await supabase
        .from('credit_cards')
        .update({transfer_limit: limit})
        .eq('id', cardId)
        .select()
    return error
}

export async function updatePin(cardId: string, pin: number) {
    const supabase = createClient();
    const {error} = await supabase
        .from('credit_cards')
        .update({pin: pin})
        .eq('id', cardId)
        .select()
    return error
}

export async function deleteCard(cardId: string) {
    const supabase = createClient();
    const {error} = await supabase
        .from('credit_cards')
        .delete()
        .eq('id', cardId)
    return error
}

export async function changeBalance(
    difference: number,
    recipientCardId: string,
    senderCardId?: string,
    transactionUser?: IUser) {
    // Getting card process is being made by api instead of local storage values, because simultaneous queries
    // can work with outdated values and therefore lose money
    const received = difference > 0
    const supabase = createClient();
    const currentCard = await supabase
        .from('credit_cards')
        .select()
        .eq('id', received ? recipientCardId : senderCardId)
        .then(data => data.data?.[0]);
    const unformattedTime = Date.now();
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const transactionDateTime = DateTime.fromMillis(unformattedTime, {zone: timeZone});
    const formattedTime = transactionDateTime.toFormat('ccc, dd LLL yyyy HH:mm');
    const transactions = currentCard.transactions || [];
    transactions.push({
        unformattedTime: unformattedTime,
        formattedTime: formattedTime,
        received: received,
        recipientCardId: recipientCardId,
        senderCardId: senderCardId,
        amount: Math.abs(difference),
        transactionUserId: transactionUser ? transactionUser.id : systemUserID,
        transactionUserName: transactionUser ? transactionUser.full_name : systemUserName,
    })

    const {error} = await supabase
        .from('credit_cards')
        .update({
            balance: currentCard.balance + difference,
            transactions: transactions
        })
        .eq('id', received ? recipientCardId : senderCardId)
        .select()
    return error
}

export async function getUserMatches(matchingInput: string) {
    const supabase = createClient();
    const {data} = await supabase
        .from('users')
        .select()
        .ilike('full_name', `%${matchingInput}%`)
    if (data) {
        return data
    }

}

export async function getUserByID(userId: string) {
    const supabase = createClient();
    const user = await supabase
        .from('users')
        .select()
        .eq('id', userId)
        .then(data => data.data?.[0]);

    return user
}

export async function addContact(userid: string, newContactId: string) {
    const supabase = createClient();
    const {data, error: selectError} = await supabase
        .from('users')
        .select('contacts')
        .eq('id', userid);

    if (selectError) {
        return selectError;
    }

    let userContacts = data?.[0].contacts || []
    userContacts.push(newContactId)
    const uniqueUserContacts = new Set(userContacts);
    // @ts-ignore
    userContacts = [...uniqueUserContacts];

    const {error: updateError} = await supabase
        .from('users')
        .update({['contacts']: userContacts})
        .eq('id', userid);

    return updateError
}

export async function getCardByNumber(number: string) {
    const supabase = createClient();
    let {data} = await supabase
        .from('credit_cards')
        .select()
        .match({
            'number': number,
            'blocked': false,
        })
    return data
}

export async function toggleBlockCard(blocked: boolean, cardId: string) {
    const supabase = createClient();
    const {error} = await supabase
        .from('credit_cards')
        .update({blocked: blocked})
        .eq('id', cardId)
        .select()

    return error
}

export async function getUserByReferral(referral_code: string) {
    const supabase = createClient();
    const {data} = await supabase
        .from('users')
        .select()
        .eq('referral_code', referral_code);

    return data && data[0]
}

export async function setReferralActivated(userId: string) {
    const supabase = createClient();
    const {error} = await supabase
        .from('users')
        .update({has_referral_activated: true})
        .eq('id', userId);

    return error
}

export async function deleteProfileImage(userId: string) {
    const supabase = createClient();
    const {error} = await supabase.storage
        .from('profile_images')
        .remove([`profile_${userId}.png`]);
    return error
}

export async function updateAvatarURL(userId: string, URL: string) {
    const supabase = createClient();
    const {error} = await supabase
        .from('users')
        .update({avatar_url: URL})
        .eq('id', userId);

    return error
}

export async function getAvatarUrl(userId: string) {
    const supabase = createClient();
    const {data} = supabase
        .storage
        .from('profile_images')
        .getPublicUrl(`profile_${userId}.png`)

    return data.publicUrl
}

export async function updateUserSettings(userID: string, attributeValue: boolean, attributeName: string) {
    const supabase = createClient();

    const {data} = await supabase
        .from('users')
        .select('settings')
        .eq('id', userID)
    if (!data) return 'No settings'

    const updatedSettings = { ...data[0].settings };
    updatedSettings[attributeName as keyof ISettings] = attributeValue;

    const {error} = await supabase
        .from('users')
        .update({settings: updatedSettings})
        .eq('id', userID)
        .select()
    return error
}

export async function deleteContact(userId: string, contactId: string) {
    const supabase = createClient();
    const {data, error: selectError} = await supabase
        .from('users')
        .select('contacts')
        .eq('id', userId);

    if (selectError) {
        return selectError;
    }


    const userContacts = data?.[0].contacts || []
    const newArray = userContacts.filter((id: string) => id !== contactId)

    const {error: updateError} = await supabase
        .from('users')
        .update({['contacts']: newArray})
        .eq('id', userId);

    return updateError
}
