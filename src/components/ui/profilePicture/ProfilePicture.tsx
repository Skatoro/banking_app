import {getAvatarName} from "@/utils/globalFunctions/getAvatarName";
import React, {FC, memo, useEffect, useState} from "react";
import cn from "clsx";
import {IUser} from "@/types/user.types";

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
    if (size === 'sm') {
        pictureStyle = 'h-12 w-12 text-md'
    }
    if (size === 'md') {
        pictureStyle = 'h-16 w-16 text-lg'
    }
    if (size === 'lg') {
        pictureStyle = 'h-20 w-20 text-2xl'
    }
    if (size === '3xl') {
        pictureStyle = 'h-40 w-40 text-5xl'
    }

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
        e.stopPropagation()
        setActiveBig(!activeBig)
    }

    return <>
        <div className={cn(`select-none`, pictureStyle, zoom && user.avatar_url && 'cursor-pointer')}>
            {imageHeight && imageWidth
                ? <div className={'rounded-full overflow-hidden w-full h-full relative'}
                       onClick={handleBigClick}>
                    <div className={`absolute left-1/2 top-1/2 ${imageWidth > imageHeight ? 'h-full' : 'w-full'}`}
                         style={{transform: 'translate(-50%, -50%)', aspectRatio: imageWidth / imageHeight}}>
                        <img
                            className={'pointer-events-none'}
                            src={avatarImage
                                ? URL.createObjectURL(avatarImage)
                                : user.avatar_url
                                    ? user.avatar_url
                                    : ''}
                            alt=""
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
            <div className={' cursor-pointer fixed top-0 left-0 w-screen h-screen bg-black/30 dark:bg-white/5 z-30 flex justify-center items-center'}
                onClick={handleBigClick}
            >
                <div className={'bg-black rounded-full relative overflow-hidden pointer-events-none'}
                     style={{height: '80vh', width: '80vh'}}>
                    <div className={`absolute left-1/2 top-1/2 ${imageWidth > imageHeight ? 'h-full' : 'w-full'}`}
                         style={{transform: 'translate(-50%, -50%)', aspectRatio: imageWidth / imageHeight}}>
                        <img
                            className={'pointer-events-none w-full h-full'}
                            src={avatarImage
                                ? URL.createObjectURL(avatarImage)
                                : user.avatar_url
                                    ? user.avatar_url
                                    : ''}
                            alt=""
                        />
                    </div>
                </div>
            </div>}
    </>
})
