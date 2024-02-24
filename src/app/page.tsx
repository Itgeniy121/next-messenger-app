'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AllChats from '@/components/sections/main/allChats/AllChats';
import useAuth from '@/hooks/useAuth';
export default function Home() {
    const { user, isLoading } = useAuth();
    const router = useRouter();
    useEffect(() => {
        if (!user && !localStorage.getItem('logged')) {
            router.push('/login');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className="w-full sidebar:bg-[#E4EBF1] dark:sidebar:bg-[#1c1e33] h-[100vh] sidebar:justify-start flex flex-row justify-center items-center relative">
            {isLoading && (
                <span className="loader2 absolute top-[50%] left-[50%]"></span>
            )}
            {!isLoading && <AllChats user={user} />}
            {!isLoading && (
                <p className="text-[15px] ml-[15%] ipadBig:ml-[27%] hidden sidebar:flex text-center text-[#9495A4]">
                    Привет✋ <br />У тебя пока нет открытых чатов.
                </p>
            )}
        </div>
    );
}
