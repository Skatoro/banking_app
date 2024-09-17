import {LucideIcon} from "lucide-react";
import {InputHTMLAttributes} from "react";
import {FieldError} from "react-hook-form";

export interface IFieldProps {
    placeholder?: string
    error?: FieldError
    isEyeIcon?: boolean
    Icon?: LucideIcon
    maxLength?: number
    disabled?: boolean
    isSmall?: boolean
    autoFocus?: boolean
    textCentered?: boolean
}

export type TypeInputProps = InputHTMLAttributes<HTMLInputElement> & IFieldProps

