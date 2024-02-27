import { firestore } from '@/firebase/firebase.config';
import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import ChatItem from './features/ChatItem';
const ChatList = ({ user }: any) => {
    const [chats, setChats] = useState<any>(null);

    useEffect(() => {
        const getChats = () => {
            const reference = doc(firestore, `usersChats/${user.uid}`);
            const result = onSnapshot(reference, (doc) => {
                setChats(doc.data());
            });
            return () => {
                result();
            };
        };
        if (user) {
            user.uid && getChats();
        }
    }, [user]);
    return (
        <div className="bg-[#B5BFC6] dark:bg-[#24273D] w-full h-[78%] relative overflow-y-auto">
            {chats == '' && <span className="loader absolute"></span>}
            {chats && Object.entries(chats)?.length == 0 && (
                <p className="text-[15px] mt-[25%] text-center font-[300] text-[#9495A4]">
                    У тебя пока нет ни одного чата📌
                    <br /> Ты можешь найти собеседника с помощью поискововй
                    строки!
                </p>
            )}
            {chats &&
                Object.entries(chats)
                    ?.sort((a: any, b: any) => b[1]?.date - a[1]?.date)
                    .map((chat: any) => (
                        <div key={chat[1]?.userInfo?.combinedUid}>{chat[1]?.userInfo && (<ChatItem
                            lastMessage={chat[1]?.lastMessage?.text}
                            name={chat[1]?.userInfo?.name}
                            photoUrl={chat[1]?.userInfo?.photoUrl}
                            uid={chat[1]?.userInfo?.uid}
                            combinedUid={chat[1]?.userInfo?.combinedUid}
                            key={chat[1]?.userInfo?.combinedUid}
                        />)}</div>
                    ))}
        </div>
    );
};

export default ChatList;
