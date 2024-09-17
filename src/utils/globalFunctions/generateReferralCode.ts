export function generateReferralCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    const referralLength = 16
    let referralCode = ''
    for ( let i = 0; i < referralLength; i++ ) {
        referralCode += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return referralCode
}