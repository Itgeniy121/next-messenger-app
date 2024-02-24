import React, { FC, useEffect, useRef } from 'react';
import Image from 'next/image';
interface messageProps {
    message: any;
    user: any;
}
const Message: FC<messageProps> = ({ message, user }) => {
    const ref: any = useRef();
    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    }, [message]);
    return (
        <>
            {message.senderId == user?.uid ? (
                <div
                    ref={ref}
                    className="w-full flex justify-end items-end px-[10px]"
                >
                    <div className="p-[10px] bg-[#4682B4] rounded-[7px] max-w-[320px] bM:max-w-[400px] ipad:max-w-[500px] ipadBig:max-w-[650px] sidebar:max-w-[360px] overflow-x-auto flex flex-col mb-[10px]">
                        <div className="flex flex-row">
                            <p className="text-[18px] font-[300] mr-[10px]">
                                {message.text}
                            </p>
                            <p className="text-[10px] text-[#a8a7a7] mt-[5px]">
                                {new Date(
                                    message.date * 1000,
                                ).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                                &#10003;
                            </p>
                        </div>
                        {message.imgUrl && (
                            <Image
                                src={message.imgUrl}
                                alt="img"
                                className="size-[300px]"
                                width={100}
                                height={100}
                            />
                        )}
                    </div>
                </div>
            ) : (
                <div
                    ref={ref}
                    className="w-full flex bM:max-w-[400px] ipad:max-w-[500px] sidebar:max-w-[360px] ipadBig:max-w-[650px] justify-start max-w-[320px] items-start px-[10px]"
                >
                    <div className="p-[10px] bg-[#4682B4] rounded-[7px] flex flex-col mb-[10px]">
                        <div className="flex flex-row">
                            <p className="text-[18px] font-[300] mr-[10px]">
                                {message.text}
                            </p>
                            <p className="text-[10px] text-[#a8a7a7] mt-[5px]">
                                {new Date(
                                    message.date * 1000,
                                ).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                                &#10003;
                            </p>
                        </div>
                        {message.imgUrl && (
                            <Image
                                src={message.imgUrl}
                                alt="img"
                                className="size-[300px]"
                                width={100}
                                height={100}
                            />
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Message;
