import React, {FC, useEffect, useState} from "react";
import {FormFrame} from "@/components/ui/formFrame/FormFrame";
import {userStore} from "@/store/user";
import {ProfilePicture} from "@/components/ui/profilePicture/ProfilePicture";
import {Button} from "@/components/ui/button/Button";
import {createClient} from "@/utils/supabase/client";
import {deleteProfileImage, getAvatarUrl, updateAvatarURL} from "@/api/api";

interface Props {
    disablePreview: () => void
    image: File
}

export const PreviewProfile: FC<Props> = ({disablePreview, image}) => {
    const user = userStore((state: any) => state.user)
    const [clicked, setClicked] = useState(false)
    const [uploadError, setUploadError] = useState<string>('')
    useEffect(() => {
        if (clicked) {
            handleUpload()
            setClicked(false)
        }
        async function handleUpload() {
            const deleteError = await deleteProfileImage(user.id)
            if (deleteError) {
                setUploadError('Unexpected server error')
                return
            }
            const uploadError = await uploadImage(user.id)
            if (uploadError) {
                setUploadError('Unexpected server error')
                return
            }
            const avatarUrl = await getAvatarUrl(user.id)
            if (avatarUrl) {
                updateAvatarURL(user.id, avatarUrl + `?${Date.now()}`)
                disablePreview()
            }
        }

        // cannot pass 'File' format from client to server component
        async function uploadImage(userId: string) {
            const supabase = createClient();
            const {error} = await supabase.storage
                .from('profile_images').upload(`profile_${userId}.png`, image)
            return error
        }
    }, [clicked]);

    return (<>
            <FormFrame disableForm={disablePreview} title={'Preview'}>
                <div className={'flex items-center mb-6'}>
                    <div className={'mr-6'}>
                        <ProfilePicture user={user} size={'lg'} avatarImage={image}/>
                    </div>
                    <div className={'text-2xl font-bold'}>
                        {user.full_name}
                    </div>
                </div>
                {uploadError && <div className={'text-red-500 mb-3'}>{uploadError}</div>}
                <div className={'flex'}>
                    <Button
                        className={'bg-primary hover:bg-primary-darker w-1/2 mr-5'}
                        onClick={() => setClicked(true)}
                    >
                        Confirm
                    </Button>
                    <Button
                        className={'bg-pink-lighter !text-red-500 hover:bg-pink w-1/2'}
                        onClick={disablePreview}
                    >
                        Cancel
                    </Button>
                </div>
            </FormFrame>
        </>
    )
}