import Image from 'next/image';
import React, { FC } from 'react';
import { useRouter } from 'next/navigation';
import avatar from '@/assets/defAvatar.png';
import { getUserAvatar } from '@/utils/getUserInfo';
import { updateUserAvatarInOtherChats } from '@/utils/userSettings';
interface ChatItemProps {
    name: string | any;
    photoUrl: string;
    uid: string;
    combinedUid: string;
    lastMessage: string;
}
const ChatItem: FC<ChatItemProps> = ({
    name,
    photoUrl,
    uid,
    combinedUid,
    lastMessage,
}) => {
    const router = useRouter();
    const goToChatRoom = () => {
        getUserAvatar(uid).then((val: any) => {
            if (uid == combinedUid?.slice(0, 28)) {
                updateUserAvatarInOtherChats(
                    combinedUid,
                    combinedUid?.slice(28),
                    val[0],
                    name,
                )
                    .then(() => {
                        router.push(`/personalChat/${combinedUid}`);
                    })
                    .catch(() => {
                        alert('Error');
                    });
            } else {
                updateUserAvatarInOtherChats(
                    combinedUid,
                    combinedUid?.slice(0, 28),
                    val[0],
                    name,
                )
                    .then(() => {
                        router.push(`/personalChat/${combinedUid}`);
                    })
                    .catch(() => {
                        alert('Error');
                    });
            }
        });
    };
    return (
        <div
            onClick={goToChatRoom}
            className=" overflow-hidden w-full h-[70px] border-b py-[5px] border-[white] hover:bg-[#acbecb] dark:border-b-[#323657] dark:hover:bg-[#252844] cursor-pointer duration-300 flex flex-row pl-[10px] justify-start items-center"
        >
            {photoUrl ? (
                <Image
                    src={photoUrl}
                    alt="avatar"
                    className="size-[50px] mr-[15px] rounded-[50%]"
                    width={100}
                    height={100}
                />
            ) : (
                <Image
                    src={avatar}
                    alt="avatar"
                    className="size-[50px] mr-[15px] rounded-[50%]"
                    width={100}
                    height={100}
                />
            )}
            <div className="flex flex-col w-full h-full justify-center items-start">
                <p className="text-white text-[13px]">{name}</p>
                {lastMessage && (
                    <p className="text-[11px] text-[#9495A4] whitespace-nowrap">
                        {lastMessage}
                    </p>
                )}
            </div>
        </div>
    );
};

export default ChatItem;
