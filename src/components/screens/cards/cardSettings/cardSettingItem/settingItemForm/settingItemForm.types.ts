export interface ISettingItemState {
    value: string
}
export interface Props {
    isParentActive: boolean;
    dropdownTime: number;
    buttonText: string;
    bodyValue: string;
    bodyText: string;
    apiFunction: any;
    id: string
    maxLength?: number
    minLength?: number
}