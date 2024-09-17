
export const handleDigitInput = (event: any) => {
    const newValue = event.target.value.replace(/\D/g, ""); // Remove non-digits
    if (newValue.length > event.target.maxLength) {
        event.target.value = newValue.slice(0, event.target.maxLength);
    } else {
        event.target.value = newValue;
    }
};