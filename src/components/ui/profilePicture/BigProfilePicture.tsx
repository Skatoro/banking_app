import React, {FC, memo} from "react";

interface Props {
    avatarImage?: File
    imageHeight: number
    imageWidth: number
    avatarUrl: string
    handleBigClick: (e: any) => void
}

export const BigProfilePicture: FC<Props> = memo((
    {
        avatarUrl,
        avatarImage,
        imageHeight,
        imageWidth,
        handleBigClick,
    }) => {
    const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    const size = screenWidth > screenHeight ? '80vh' : '80vw'

    return <>
        <div
            className={'cursor-pointer fixed top-0 left-0 w-screen h-screen bg-black/30 z-30 flex justify-center items-center'}
            onClick={handleBigClick}
        >
            <div
                className={'bg-black rounded-full relative overflow-hidden pointer-events-none border-4 border-stone-500'}
                style={{height: size, width: size}}>
                <div className={`absolute left-1/2 top-1/2 ${imageWidth > imageHeight ? 'h-full' : 'w-full'}`}
                     style={{transform: 'translate(-50%, -50%)', aspectRatio: imageWidth / imageHeight}}>
                    <img
                        className={'pointer-events-none w-full h-full'}
                        src={avatarImage
                            ? URL.createObjectURL(avatarImage)
                            : avatarUrl}
                        alt=""
                    />
                </div>
            </div>
        </div>
    </>
})
