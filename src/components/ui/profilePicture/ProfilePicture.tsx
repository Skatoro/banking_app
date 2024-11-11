import {getAvatarName} from "@/utils/globalFunctions/getAvatarName";
import React, {FC, memo, useEffect, useState} from "react";
import cn from "clsx";
import {IUser} from "@/types/user.types";
import {BigProfilePicture} from "@/components/ui/profilePicture/BigProfilePicture";

interface Props {
    user: IUser
    size?: string
    avatarImage?: File
    zoom?: boolean
}

export const ProfilePicture: FC<Props> = memo(({user, avatarImage, size = 'md', zoom = false}) => {
    const [imageWidth, setImageWidth] = useState<number>(0)
    const [imageHeight, setImageHeight] = useState<number>(0)
    const [activeBig, setActiveBig] = useState(false)

    let pictureStyle;
    if (size === 'sm') pictureStyle = 'h-12 w-12 text-md'
    if (size === 'md') pictureStyle = 'h-16 w-16 text-lg'
    if (size === 'lg') pictureStyle = 'h-20 w-20 text-2xl'
    if (size === '3xl') pictureStyle = 'h-40 w-40 text-5xl'
    if (size === '5xl') pictureStyle = 'h-72 w-72 text-5xl'

    useEffect(() => {
        if (avatarImage || user.avatar_url) {
            const blobURL = avatarImage ? URL.createObjectURL(avatarImage) : user.avatar_url;
            const imageBlob = new Image();
            imageBlob.src = blobURL;
            imageBlob.onload = () => {
                setImageWidth(imageBlob.width)
                setImageHeight(imageBlob.height)
                URL.revokeObjectURL(blobURL);
            };
        } else {
            setImageWidth(0)
            setImageHeight(0)
        }
    }, [avatarImage, user.avatar_url])

    function handleBigClick(e: any) {
        if (zoom) {
            e.stopPropagation()
            setActiveBig(!activeBig)
        }
    }

    return <>
        <div className={cn(`select-none`, pictureStyle, zoom && user.avatar_url && 'cursor-pointer')}>
            {imageHeight && imageWidth
                ? <div className={'rounded-full overflow-hidden w-full h-full relative'}
                       onClick={handleBigClick}>
                    <div className={`absolute left-1/2 top-1/2 ${imageWidth > imageHeight ? 'h-full' : 'w-full'}`}
                         style={{transform: 'translate(-50%, -50%)', aspectRatio: imageWidth / imageHeight}}>
                        <img className={'pointer-events-none'} alt={''}
                             src={avatarImage
                                 ? URL.createObjectURL(avatarImage)
                                 : user.avatar_url || ''}
                        />
                    </div>
                </div>
                : <div className={`flex justify-center items-center text-white font-bold rounded-full h-full`}
                       style={{background: user.avatar_background}}
                >
                    {user.full_name && <div>{getAvatarName(user.full_name)}</div>}
                </div>
            }
        </div>
        {activeBig && zoom && user.avatar_url &&
            <BigProfilePicture avatarUrl={user.avatar_url} imageWidth={imageWidth}
                               imageHeight={imageHeight} handleBigClick={handleBigClick}
            />}
    </>
})
