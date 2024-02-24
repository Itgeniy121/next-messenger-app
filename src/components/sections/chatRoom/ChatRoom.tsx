import ChatRoomHeader from './components/ChatRoomHeader';
import { getUserToUid } from '@/utils/getUserInfo';
import InputField from './components/InputField';
import MessagesField from './components/MessagesField';
import { FC, useEffect, useState } from 'react';
interface ChatProps {
    chatId: any;
}
const ChatRoom: FC<ChatProps> = ({ chatId }) => {
    const [user, setUser] = useState();
    useEffect(() => {
        getUserToUid(chatId).then((val: any) => {
            setUser(val);
        });
    }, []);
    return (
        <div className="w-full h-[100vh] flex flex-col justify-center items-center">
            <ChatRoomHeader user={user} />
            <MessagesField />
            <InputField />
        </div>
    );
};

export default ChatRoom;
