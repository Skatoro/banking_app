import React, {FC, memo, useEffect, useState} from "react";
import {Button} from "@/components/ui/button/Button";
import {Field} from "@/components/ui/field/Field";
import {SubmitHandler, useForm} from "react-hook-form";
import {ISettingItemState, Props} from "./settingItemForm.types";
import {handleDigitInput} from "@/utils/globalFunctions/handleDigitInput";

export const SettingItemForm: FC<Props> = memo((
    {
        isParentActive, dropdownTime, buttonText, bodyValue,
        bodyText, apiFunction, id, maxLength, minLength,
    }) => {
    const [isFormActive, setIsFormActive] = useState(false)

    const {register, handleSubmit} = useForm<ISettingItemState>({
        mode: 'onBlur',
    })
    useEffect(() => {
        if (!isParentActive) {
            setTimeout(() => setIsFormActive(false), dropdownTime)
        }
    }, [isParentActive]);
    const onSubmit: SubmitHandler<ISettingItemState> = async (data) => {
        const value = parseInt(data.value)
        const error = await apiFunction(id, value)
        if (!error) {
            setIsFormActive(false)
        }
    }
    return (<>
            <form onSubmit={handleSubmit(onSubmit)}>
                {!isFormActive
                    ? <div className={'mb-3 flex items-center h-9'}>
                        {bodyText}: {bodyValue || 0}</div>
                    : <div className={'flex items-center mb-3'}>
                        <Field
                            className={'[&_input]:!bg-white h-9 text-black font-bold'} autoFocus={true} isSmall={true}
                            {...register('value', {required: true, minLength: minLength || 0})}
                            type={'tel'} onInput={handleDigitInput} maxLength={maxLength || 999}
                        />
                    </div>}

                {!isFormActive
                    ? <Button onClick={() => setIsFormActive(true)}
                              className={'bg-primary w-full hover:bg-primary-darker'}> {buttonText}</Button>
                    : <div className={'flex'}>
                        <Button
                            type={'submit'} className={'bg-primary w-1/2 mr-3 hover:bg-primary-darker'}
                        >
                            Save
                        </Button>
                        <Button
                            className={'bg-pink-lighter w-1/2 !text-red-500 hover:bg-pink'}
                            onClick={() => setIsFormActive(false)}
                        >
                            Cancel
                        </Button>
                    </div>}
            </form>
        </>
    )

})