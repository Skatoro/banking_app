'use client'

import React, {useEffect, useState} from "react";
import {Button} from "@/components/ui/button/Button";
import {ProfilePicture} from "@/components/ui/profilePicture/ProfilePicture";
import {userStore} from "@/store/user";
import {PreviewProfile} from "@/components/screens/settings/PreviewProfile";
import {deleteProfileImage, updateAvatarURL} from "@/api/api";

export default function ChangeProfilePicture() {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const user = userStore((state: any) => state.user)

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedImage(file);
        }
    };
    const handleDelete = () => {
        deleteProfileImage(user.id).then(error => {
            if (!error) updateAvatarURL(user.id, '')
        })
    }
    useEffect(() => {
        if (selectedImage && selectedImage?.size >= 5 * 1048576) {
        }
    }, [selectedImage]);

    return (<>
            <div className={'flex justify-between h-full'}>
                <div className={'flex items-center'}>
                    <div className={'mr-5'}>
                        <ProfilePicture user={user} size={'lg'} zoom={true}/>
                    </div>
                    <div className={'text-black dark:text-white text-2xl font-bold'}>{user.full_name}</div>
                </div>
                <div className={'w-40 flex flex-col justify-around'}>
                    <div className={'w-full '}>
                        <label htmlFor="file" className='cursor-pointer '>
                            <div className="flex items-center w-full">
                                <div
                                    className={'bg-primary hover:bg-primary-darker rounded-3xl py-2 ' +
                                        'px-5 text-white w-full text-center select-none mb-3'}>
                                    Change Image
                                </div>
                            </div>
                            <input
                                id="file"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                        </label>
                    </div>
                    <Button className={'bg-pink-lighter !text-red-500 hover:bg-pink '}
                        onClick={handleDelete}
                    >
                        Delete Image
                    </Button>
                </div>
            </div>
            {selectedImage && (
                <PreviewProfile disablePreview={() => setSelectedImage(null)} image={selectedImage}/>
            )}
        </>
    )
}