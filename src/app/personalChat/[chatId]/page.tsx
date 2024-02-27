'use client';
import SideBar from '@/components/UI/SideBar';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import ChatRoom from '@/components/sections/chatRoom/ChatRoom';
import { useParams } from 'next/navigation';
import ModalWindow from '@/components/layouts/ModalWindow/ModalWindow';
const Page = () => {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const params: any = useParams();
  useEffect(() => {
    if (!user && !localStorage.getItem('logged')) {
      router.push('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="w-full h-[100vh] flex flex-row-reverse justify-center items-start relative">
      {isLoading && (
        <span className="loader2 absolute top-[50%] left-[50%]"></span>
      )}
      {!isLoading && (
        <>
          <ModalWindow />
          <ChatRoom
            chatId={
              user?.uid == params.chatId.slice(0, 28)
                ? params.chatId.slice(28)
                : params.chatId.slice(0, 28)
            }
          />
          <SideBar user={user} />
        </>
      )}
    </div>
  );
};

export default Page;
